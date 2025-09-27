import {
  h,
  computed,
  defineComponent,
  type CSSProperties,
  type PropType,
  provide,
  toRef,
  type Slots,
  type VNode,
  ref
} from 'vue'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { breadcrumbLight } from '../styles'
import type { BreadcrumbTheme } from '../styles'
import style from './styles/index.cssr'
import { throwError, type ExtractPublicPropTypes } from '../../_utils'
import BreadcrumbItem from './BreadcrumbItem'
import {
  breadcrumbInjectionKey,
  type BreadcrumbSize,
  type BreadcrumbWeight
} from './context'
import { ZDropdown } from '../../dropdown'
import { type DropdownOption } from '../../dropdown'
import { type PopoverTrigger } from '../../popover'

export const breadcrumbProps = {
  ...(useTheme.props as ThemeProps<BreadcrumbTheme>),
  separator: {
    type: String,
    default: '/'
  },
  maxItems: {
    type: Number
  },
  showOverflowMenu: {
    type: Boolean,
    default: false
  },
  overflowMenuTrigger: {
    type: String as PropType<PopoverTrigger>,
    default: 'hover'
  },
  itemsBeforeCollapse: {
    type: Number,
    default: 1,
    validator: (value: number) => value >= 0
  },
  itemsAfterCollapse: {
    type: Number,
    default: 1,
    validator: (value: number) => value >= 0
  },
  size: {
    type: String as PropType<BreadcrumbSize>,
    default: 'medium'
  },
  weight: {
    type: String as PropType<BreadcrumbWeight>,
    default: 'regular'
  }
} as const

export type BreadcrumbProps = ExtractPublicPropTypes<typeof breadcrumbProps>

export default defineComponent({
  name: 'Breadcrumb',
  props: breadcrumbProps,
  setup (props) {
    const expandedRef = ref(false)
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
    const themeRef = useTheme(
      'Breadcrumb',
      '-breadcrumb',
      style,
      breadcrumbLight,
      props,
      mergedClsPrefixRef
    )
    provide(breadcrumbInjectionKey, {
      separatorRef: toRef(props, 'separator'),
      mergedClsPrefixRef,
      expandedRef,
      sizeRef: toRef(props, 'size'),
      weightRef: toRef(props, 'weight')
    })
    const cssVarsRef = computed(() => {
      const {
        common: { cubicBezierEaseInOut },
        self: {
          separatorColor,
          itemTextColor,
          itemTextColorHover,
          itemTextColorPressed,
          itemTextColorActive,
          fontSize,
          fontWeightActive,
          itemBorderRadius,
          itemColorHover,
          itemColorPressed,
          itemLineHeight,
          separatorPadding,
          padding,
          linkDecor
        }
      } = themeRef.value
      return {
        '--z-font-size': fontSize,
        '--z-bezier': cubicBezierEaseInOut,
        '--z-item-text-color': itemTextColor,
        '--z-item-text-color-hover': itemTextColorHover,
        '--z-item-text-color-pressed': itemTextColorPressed,
        '--z-item-text-color-active': itemTextColorActive,
        '--z-separator-color': separatorColor,
        '--z-item-color-hover': itemColorHover,
        '--z-item-color-pressed': itemColorPressed,
        '--z-item-border-radius': itemBorderRadius,
        '--z-font-weight-active': fontWeightActive,
        '--z-item-line-height': itemLineHeight,
        '--z-separator-padding': separatorPadding,
        '--z-link-decor': linkDecor,
        '--z-padding': padding
      }
    })

    const insertEllipses = (slots: Slots): Slots | VNode[] => {
      if (props.maxItems === undefined) {
        return slots
      }
      const children = slots.default?.() as VNode[]
      const breadcrumbChild: VNode[] = []
      if (children?.length) {
        children.forEach((child: VNode) => {
          if (child.type === BreadcrumbItem) {
            breadcrumbChild.push(child)
          }
        })
      } else {
        return slots
      }

      if (expandedRef.value) {
        return slots
      } else {
        return renderItemsBeforeAndAfter(breadcrumbChild)
      }
    }

    const generateDropdownOptions = (children: VNode[]): DropdownOption[] => {
      return children.map((child, index) => ({
        key: index,
        label: index,
        render: child
      }))
    }

    const generateRenderOption = (option: DropdownOption): VNode => {
      return option.render as VNode
    }

    const renderItemsBeforeAndAfter = (children: VNode[]): VNode[] => {
      const handleClickExpand = (): void => {
        expandedRef.value = true
      }

      if (typeof props.maxItems !== 'number') {
        throwError('breadcrumb', '`maxItems` must be of type number.')
      }
      const totalChildren = children.length

      if (
        props.itemsBeforeCollapse + props.itemsAfterCollapse >= totalChildren ||
        (props.maxItems !== undefined && props.maxItems >= children.length)
      ) {
        // Condition: If itemsBeforeCollapse and itemsAfterCollapse together exceed the number of children
        return children
      }

      const ellipsedChildren = children.slice(
        props.itemsBeforeCollapse,
        totalChildren - props.itemsAfterCollapse
      )

      if (props.showOverflowMenu) {
        return [
          ...children.slice(0, props.itemsBeforeCollapse),
          <ZDropdown
            trigger={props.overflowMenuTrigger}
            options={generateDropdownOptions(ellipsedChildren)}
            renderOptionLabel={generateRenderOption}
          >
            {{
              default: () => (
                <BreadcrumbItem separator={props.separator}>
                  {() => '...'}
                </BreadcrumbItem>
              )
            }}
          </ZDropdown>,
          ...children.slice(
            totalChildren - props.itemsAfterCollapse,
            totalChildren
          )
        ]
      }
      return [
        ...children.slice(0, props.itemsBeforeCollapse),
        <BreadcrumbItem separator={props.separator} onClick={handleClickExpand}>
          {{
            default: () => '...' // Render the ellipsis item
          }}
        </BreadcrumbItem>,
        ...children.slice(
          totalChildren - props.itemsAfterCollapse,
          totalChildren
        )
      ]
    }

    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('breadcrumb', undefined, cssVarsRef, props)
      : undefined
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender,
      insertEllipses
    }
  },
  render () {
    this.onRender?.()
    return (
      <nav
        class={[`${this.mergedClsPrefix}-breadcrumb`, this.themeClass]}
        style={this.cssVars as CSSProperties}
        aria-label="Breadcrumb"
      >
        <ul>{this.insertEllipses(this.$slots)}</ul>
      </nav>
    )
  }
})
