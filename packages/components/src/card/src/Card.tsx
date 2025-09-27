import {
  h,
  defineComponent,
  computed,
  type PropType,
  type CSSProperties,
  toRef,
  ref
} from 'vue'
import { getPadding } from 'seemly'
import { useRtl } from '../../_mixins/use-rtl'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import {
  createKey,
  keysOf,
  resolveWrappedSlot,
  type ExtractPublicPropTypes
} from '../../_utils'
import { cardLight } from '../styles'
import type { CardTheme } from '../styles'
import style from './styles/index.cssr'
import {
  type CardContextValue,
  provideCardContext,
  useCardSelectorContext
} from './CardContext'
import CardControl from './_internals/CardControl'

export interface CardDivider {
  content?: boolean | 'inset'
  footer?: boolean | 'inset'
  action?: boolean | 'inset'
}

export const cardBaseProps = {
  divider: {
    type: [Boolean, Object] as PropType<boolean | CardDivider>,
    default: false
  },
  size: {
    type: String as PropType<
    'x-small' | 'small' | 'medium' | 'large' | 'x-large'
    >,
    default: 'medium'
  },
  bordered: {
    type: Boolean,
    default: true
  },
  closable: Boolean,
  hoverable: Boolean,
  role: String,
  tag: {
    type: String as PropType<keyof HTMLElementTagNameMap>,
    default: 'div'
  },
  /**
   * to turn the card into a selector component inside a card selector parent
   */
  value: {
    type: [String, Number, Boolean] as PropType<
    string | number | boolean | undefined
    >,
    default: undefined
  }
} as const

export const cardBasePropKeys = keysOf(cardBaseProps)

export const cardProps = {
  ...(useTheme.props as ThemeProps<CardTheme>),
  ...cardBaseProps
}

export type CardProps = ExtractPublicPropTypes<typeof cardProps>

export default defineComponent({
  name: 'Card',
  props: cardProps,
  setup (props) {
    const hasBackgroundRef = ref(false)

    const setHasBackground = (value: boolean): void => {
      hasBackgroundRef.value = value
    }

    // use provideCardContext
    const cardContext: CardContextValue = {
      size: toRef(props, 'size'),
      bordered: toRef(props, 'bordered'),
      setHasBackground
    }
    provideCardContext(cardContext)

    const { inlineThemeDisabled, mergedClsPrefixRef, mergedRtlRef } =
      useConfig(props)
    const themeRef = useTheme(
      'Card',
      '-card',
      style,
      cardLight,
      props,
      mergedClsPrefixRef
    )
    const rtlEnabledRef = useRtl('Card', mergedRtlRef, mergedClsPrefixRef)
    const cssVarsRef = computed(() => {
      const { size } = props
      const {
        self: {
          color,
          colorModal,
          colorTarget,
          textColor,
          titleTextColor,
          titleFontWeight,
          borderColor,
          borderWidth,
          actionColor,
          actionAreaColor,
          borderRadius,
          lineHeight,
          closeIconColor,
          closeIconColorHover,
          closeIconColorPressed,
          closeColorHover,
          closeColorPressed,
          closeBorderRadius,
          closeIconSize,
          closeSize,
          boxShadow,
          selectorBoxShadow,
          colorPopover,
          borderShadow,
          selectionShadow,
          [createKey('padding', size)]: padding,
          [createKey('fontSize', size)]: fontSize,
          [createKey('titleFontSize', size)]: titleFontSize
        },
        common: { cubicBezierEaseInOut, cubicBezierEaseOut, dividerColor }
      } = themeRef.value
      const {
        top: paddingTop,
        left: paddingLeft,
        bottom: paddingBottom
      } = getPadding(padding)
      return {
        '--z-bezier': cubicBezierEaseInOut,
        '--z-bezier-ease-out': cubicBezierEaseOut,
        '--z-border-radius': borderRadius,
        '--z-color': color,
        '--z-color-modal': colorModal,
        '--z-color-popover': colorPopover,
        '--z-color-target': colorTarget,
        '--z-text-color': textColor,
        '--z-text-content-color': textColor,
        '--z-line-height': lineHeight,
        '--z-action-background-color': actionColor,
        '--z-action-area-color': actionAreaColor,
        '--z-title-text-color': titleTextColor,
        '--z-title-font-weight': titleFontWeight,
        '--z-close-icon-color': closeIconColor,
        '--z-close-icon-color-hover': closeIconColorHover,
        '--z-close-icon-color-pressed': closeIconColorPressed,
        '--z-close-color-hover': closeColorHover,
        '--z-close-color-pressed': closeColorPressed,
        '--z-border-color': borderColor,
        '--z-border-width': borderWidth,
        '--z-border-shadow': borderShadow,
        '--z-border-selection-shadow': selectionShadow,
        '--z-border-color-checked': selectionShadow,
        '--z-divider-border-color': dividerColor,
        '--z-box-shadow': boxShadow,
        '--z-selector-box-shadow': selectorBoxShadow,
        // size
        '--z-padding-top': paddingTop,
        '--z-padding-bottom': paddingBottom,
        '--z-padding-left': paddingLeft,
        '--z-font-size': fontSize,
        '--z-title-font-size': titleFontSize,
        '--z-close-size': closeSize,
        '--z-close-icon-size': closeIconSize,
        '--z-close-border-radius': closeBorderRadius
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'card',
        computed(() => props.size[0]),
        cssVarsRef,
        props
      )
      : undefined
    return {
      rtlEnabled: rtlEnabledRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedTheme: themeRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender,
      hasBackground: hasBackgroundRef
    }
  },
  render () {
    const {
      divider,
      bordered,
      hoverable,
      mergedClsPrefix,
      rtlEnabled,
      onRender,
      tag: Component,
      value,
      $slots,
      hasBackground,
      $attrs
    } = this
    onRender?.()
    const ZCardSelector = useCardSelectorContext()

    const CardRoot = (
      <Component
        class={[
          `${mergedClsPrefix}-card`,
          this.themeClass,
          {
            [`${mergedClsPrefix}-card--rtl`]: rtlEnabled,
            [`${mergedClsPrefix}-card--content${
              typeof divider !== 'boolean' && divider.content === 'inset'
                ? '-inset'
                : ''
            }-divider`]:
              divider === true || (divider !== false && divider.content),
            [`${mergedClsPrefix}-card--footer${
              typeof divider !== 'boolean' && divider.footer === 'inset'
                ? '-inset'
                : ''
            }-divider`]:
              divider === true || (divider !== false && divider.footer),
            [`${mergedClsPrefix}-card--action-divider`]:
              divider === true || (divider !== false && divider.action),
            [`${mergedClsPrefix}-card--bordered`]: bordered,
            [`${mergedClsPrefix}-card--hoverable`]: hoverable,
            [`${mergedClsPrefix}-card--has-background`]: hasBackground
          }
        ]}
        style={this.cssVars as CSSProperties}
        role={this.role}
      >
        {resolveWrappedSlot($slots.default, (defaultChild) => {
          return defaultChild
        })}
      </Component>
    )

    // default render  | this will fix css issue
    if (ZCardSelector && value !== undefined) {
      // add card modifier
      return (
        <CardControl {...$attrs} value={value}>
          {{
            default: () => CardRoot
          }}
        </CardControl>
      )
    } else {
      return CardRoot
    }
  }
})
