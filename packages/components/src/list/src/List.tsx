import { computed, defineComponent, h, provide, ref, toRef } from 'vue'
import type { PropType, CSSProperties } from 'vue'
import {
  useConfig,
  useTheme,
  useThemeClass,
  useRtl,
  useProxyModel
} from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import {
  createInjectionKey,
  resolveWrappedSlot,
  type MaybeArray,
  type ExtractPublicPropTypes
} from '../../_utils'
import { listLight } from '../styles'
import type { ListTheme } from '../styles'
import style from './styles/index.cssr'

import type { ListInjection, OnUpdateModelValue } from './interface'
import { useMergedState } from '../../_external-dependencies/vooks'
import { cloneDeep } from 'lodash-es'

export const listProps = {
  ...(useTheme.props as ThemeProps<ListTheme>),
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: 'medium'
  },
  bordered: Boolean as PropType<boolean>,
  clickable: Boolean as PropType<boolean>,
  hoverable: Boolean as PropType<boolean>,
  selectable: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  multiple: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  showDivider: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  showIndicator: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  modelValue: Array as PropType<
  Array<string | number> | string | number | null
  >,
  onUpdateModelValue: [Function, Array] as PropType<
  MaybeArray<OnUpdateModelValue>
  >,
  'onUpdate:modelValue': [Function, Array] as PropType<
  MaybeArray<OnUpdateModelValue>
  >,
  defaultModelValue: Array as PropType<
  Array<string | number> | string | number | null
  >
}

export type ListProps = ExtractPublicPropTypes<typeof listProps>

export const listInjectionKey = createInjectionKey<ListInjection>('z-list')

export default defineComponent({
  name: 'List',
  props: listProps,
  setup (props) {
    const { mergedClsPrefixRef, inlineThemeDisabled, mergedRtlRef } =
      useConfig(props)
    const rtlEnabledRef = useRtl('List', mergedRtlRef, mergedClsPrefixRef)
    const uncontrolledValueRef = ref(cloneDeep(props.defaultModelValue || null))
    const controlledValueRef = useProxyModel(props, 'modelValue')
    const mergedValueRef = useMergedState(
      controlledValueRef,
      uncontrolledValueRef
    )

    const doUpdateValue = (val: string): void => {
      if (!props.selectable || !props.multiple) {
        controlledValueRef.value = props.multiple ? [val] : val
      } else if (Array.isArray(mergedValueRef.value)) {
        if (mergedValueRef.value.includes(val)) {
          controlledValueRef.value = mergedValueRef.value.filter(
            (item) => item !== val
          )
        } else {
          controlledValueRef.value = [...mergedValueRef.value, val]
        }
      }
    }

    const themeRef = useTheme(
      'List',
      '-list',
      style,
      listLight,
      props,
      mergedClsPrefixRef
    )
    provide(listInjectionKey, {
      showDividerRef: toRef(props, 'showDivider'),
      mergedClsPrefixRef,
      modelValue: mergedValueRef,
      doUpdateValue,
      selectableRef: toRef(props, 'selectable'),
      multipleRef: toRef(props, 'multiple'),
      showIndicatorRef: toRef(props, 'showIndicator')
    })
    const cssVarsRef = computed(() => {
      const {
        common: { cubicBezierEaseInOut },
        self: {
          fontSize,
          textColor,
          color,
          colorModal,
          colorPopover,
          borderColor,
          borderColorModal,
          borderColorPopover,
          borderRadius,
          colorHover,
          colorHoverModal,
          colorHoverPopover,
          selectedColor
        }
      } = themeRef.value
      return {
        '--z-font-size': fontSize,
        '--z-bezier': cubicBezierEaseInOut,
        '--z-text-color': textColor,
        '--z-color': color,
        '--z-border-radius': borderRadius,
        '--z-border-color': borderColor,
        '--z-border-color-modal': borderColorModal,
        '--z-border-color-popover': borderColorPopover,
        '--z-color-modal': colorModal,
        '--z-color-popover': colorPopover,
        '--z-color-hover': colorHover,
        '--z-color-hover-modal': colorHoverModal,
        '--z-color-hover-popover': colorHoverPopover,
        '--z-selected-color': selectedColor
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('list', undefined, cssVarsRef, props)
      : undefined

    return {
      mergedClsPrefix: mergedClsPrefixRef,
      rtlEnabled: rtlEnabledRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    const {
      $slots,
      mergedClsPrefix,
      onRender,
      rtlEnabled,
      bordered,
      showDivider,
      hoverable,
      clickable,
      themeClass
    } = this
    const header = resolveWrappedSlot(
      this.$slots.header,
      (children) =>
        children && (
          <div class={`${mergedClsPrefix}-list__header`}>{children}</div>
        )
    )
    const footer = resolveWrappedSlot(
      this.$slots.footer,
      (children) =>
        children && (
          <div class={`${mergedClsPrefix}-list__footer`}>{children}</div>
        )
    )
    onRender?.()
    return (
      <ul
        class={[
          `${mergedClsPrefix}-list`,
          themeClass,
          {
            [`${mergedClsPrefix}-list--rtl`]: rtlEnabled,
            [`${mergedClsPrefix}-list--bordered`]: bordered,
            [`${mergedClsPrefix}-list--show-divider`]: showDivider,
            [`${mergedClsPrefix}-list--hoverable`]: hoverable,
            [`${mergedClsPrefix}-list--clickable`]: clickable
          }
        ]}
        style={this.cssVars as CSSProperties}
      >
        {header}
        {$slots.default?.()}
        {footer}
      </ul>
    )
  }
})
