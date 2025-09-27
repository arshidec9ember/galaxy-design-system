import {
  h,
  defineComponent,
  computed,
  type PropType,
  type VNode,
  ref,
  toRef,
  provide,
  type VNodeChild,
  type CSSProperties
} from 'vue'
import { useMergedState } from '../../_external-dependencies/vooks'
import {
  useTheme,
  useFormItem,
  useConfig,
  useThemeClass,
  useProxyModel
} from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { getSlot, warn, createKey, flatten } from '../../_utils'
import type { ExtractPublicPropTypes, MaybeArray } from '../../_utils'
import { radioLight } from '../styles'
import type { RadioTheme } from '../styles'
import type { RadioBaseProps } from './use-radio'
import { radioGroupInjectionKey } from './use-radio'
import style from './styles/radio-group.cssr'
import { type OnUpdateModelValue } from './interface'
import { useRtl } from '../../_mixins/use-rtl'

function mapSlot (
  defaultSlot: VNode[],
  value: string | number | boolean | null,
  clsPrefix: string,
  bordered: boolean
): {
    children: VNodeChild[]
    isButtonGroup: boolean
  } {
  const children: VNode[] = []
  let isButtonGroup = false
  for (let i = 0; i < defaultSlot.length; ++i) {
    const wrappedInstance = defaultSlot[i]
    const name = (wrappedInstance.type as any)?.name
    if (name === 'RadioButton') {
      isButtonGroup = true
    }
    if (__DEV__ && isButtonGroup && name !== 'RadioButton') {
      warn(
        'radio-group',
        '`z-radio-group` in button mode only takes `z-radio-button` as children.'
      )
      continue
    }
    const instanceProps: RadioBaseProps = wrappedInstance.props as any
    if (name !== 'RadioButton') {
      children.push(wrappedInstance)
      continue
    }
    if (i === 0) {
      children.push(wrappedInstance)
    } else {
      const lastInstanceProps: RadioBaseProps = children[children.length - 1]
        .props as any
      const lastInstanceChecked = value === lastInstanceProps.value
      const lastInstanceDisabled: boolean | undefined =
        lastInstanceProps.disabled
      const currentInstanceChecked = value === instanceProps.value
      const currentInstanceDisabled = instanceProps.disabled
      /**
       * Priority of button splitor:
       * !disabled  checked >
       *  disabled  checked >
       * !disabled !checked >
       *  disabled !checked
       */
      const lastInstancePriority: number =
        (lastInstanceChecked ? 2 : 0) + (!lastInstanceDisabled ? 1 : 0)
      const currentInstancePriority =
        (currentInstanceChecked ? 2 : 0) + (!currentInstanceDisabled ? 1 : 0)
      const lastInstanceClass = {
        [`${clsPrefix}-radio-group__splitor--disabled`]:
          lastInstanceDisabled || !bordered,
        [`${clsPrefix}-radio-group__splitor--checked`]: lastInstanceChecked
      }
      const currentInstanceClass = {
        [`${clsPrefix}-radio-group__splitor--disabled`]:
          currentInstanceDisabled || !bordered,
        [`${clsPrefix}-radio-group__splitor--checked`]: currentInstanceChecked
      }
      const splitorClass =
        lastInstancePriority < currentInstancePriority
          ? currentInstanceClass
          : lastInstanceClass
      children.push(
        <div
          class={[
            {
              [`${clsPrefix}-radio-group__splitor`]: bordered
            },
            splitorClass
          ]}
        />,
        wrappedInstance
      )
    }
  }
  return {
    children,
    isButtonGroup
  }
}

export const radioGroupProps = {
  ...(useTheme.props as ThemeProps<RadioTheme>),
  name: String,
  modelValue: [String, Number, Boolean] as PropType<
  string | number | boolean | null
  >,
  defaultModelValue: {
    type: [String, Number, Boolean] as PropType<
    string | number | boolean | null
    >,
    default: null
  },
  bordered: {
    type: Boolean,
    default: true
  },
  size: String as PropType<'small' | 'medium' | 'large'>,
  disabled: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  'onUpdate:modelValue': [Function, Array] as PropType<
  MaybeArray<OnUpdateModelValue>
  >,
  onUpdateModelValue: [Function, Array] as PropType<
  MaybeArray<OnUpdateModelValue>
  >
} as const

export type RadioGroupProps = ExtractPublicPropTypes<typeof radioGroupProps>

export default defineComponent({
  name: 'RadioGroup',
  props: radioGroupProps,
  setup (props) {
    const selfElRef = ref<HTMLDivElement | null>(null)
    const {
      mergedSizeRef,
      mergedDisabledRef,
      nTriggerFormChange,
      nTriggerFormInput,
      nTriggerFormBlur,
      nTriggerFormFocus
    } = useFormItem(props)
    const { mergedClsPrefixRef, inlineThemeDisabled, mergedRtlRef } =
      useConfig(props)
    const themeRef = useTheme(
      'Radio',
      '-radio-group',
      style,
      radioLight,
      props,
      mergedClsPrefixRef
    )
    const uncontrolledValueRef = ref(props.defaultModelValue)
    const controlledValueRef = useProxyModel(props, 'modelValue')
    const mergedValueRef = useMergedState(
      controlledValueRef,
      uncontrolledValueRef
    )
    function doUpdateValue (value: string | number | boolean): void {
      controlledValueRef.value = value
      uncontrolledValueRef.value = value
      nTriggerFormChange()
      nTriggerFormInput()
    }
    function handleFocusin (e: FocusEvent): void {
      const { value: selfEl } = selfElRef
      if (!selfEl) return
      if (selfEl.contains(e.relatedTarget as HTMLElement | null)) return
      nTriggerFormFocus()
    }
    function handleFocusout (e: FocusEvent): void {
      const { value: selfEl } = selfElRef
      if (!selfEl) return
      if (selfEl.contains(e.relatedTarget as HTMLElement | null)) return
      nTriggerFormBlur()
    }

    const borderedRef = toRef(props, 'bordered')
    provide(radioGroupInjectionKey, {
      mergedClsPrefixRef,
      nameRef: toRef(props, 'name'),
      valueRef: mergedValueRef,
      disabledRef: mergedDisabledRef,
      mergedSizeRef,
      doUpdateValue,
      bordered: borderedRef
    })
    const rtlEnabledRef = useRtl('Radio', mergedRtlRef, mergedClsPrefixRef)
    const cssVarsRef = computed(() => {
      const { value: size } = mergedSizeRef
      const {
        common: { cubicBezierEaseInOut },
        self: {
          buttonBorderColor,
          buttonBorderColorActive,
          buttonBorderRadius,
          buttonBoxShadow,
          buttonBoxShadowFocus,
          buttonBoxShadowHover,
          buttonColorActive,
          buttonTextColor,
          buttonTextColorActive,
          buttonTextColorHover,
          opacityDisabled,
          buttonBackgroundColorActive,
          buttonBackgroundColorHover,
          buttonBackgroundColorHoverActive,
          [createKey('buttonHeight', size)]: height,
          [createKey('fontSize', size)]: fontSize
        }
      } = themeRef.value
      return {
        '--z-font-size': fontSize,
        '--z-bezier': cubicBezierEaseInOut,
        '--z-button-border-color': buttonBorderColor,
        '--z-button-border-color-active': buttonBorderColorActive,
        '--z-button-border-radius': buttonBorderRadius,
        '--z-button-box-shadow': buttonBoxShadow,
        '--z-button-box-shadow-focus': buttonBoxShadowFocus,
        '--z-button-box-shadow-hover': buttonBoxShadowHover,
        '--z-button-color-active': buttonColorActive,
        '--z-button-text-color': buttonTextColor,
        '--z-button-text-color-hover': buttonTextColorHover,
        '--z-button-text-color-active': buttonTextColorActive,
        '--z-button-bg-color-hover': buttonBackgroundColorHover,
        '--z-button-bg-color-active': buttonBackgroundColorActive,
        '--z-button-bg-color-active-hover': buttonBackgroundColorHoverActive,
        '--z-height': height,
        '--z-opacity-disabled': opacityDisabled
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'radio-group',
        computed(() => mergedSizeRef.value[0]),
        cssVarsRef,
        props
      )
      : undefined
    return {
      selfElRef,
      rtlEnabled: rtlEnabledRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedValue: mergedValueRef,
      handleFocusout,
      handleFocusin,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    const {
      mergedValue,
      mergedClsPrefix,
      handleFocusin,
      handleFocusout,
      bordered
    } = this
    const { children, isButtonGroup } = mapSlot(
      flatten(getSlot(this)),
      mergedValue,
      mergedClsPrefix,
      bordered
    )
    this.onRender?.()
    return (
      <div
        onFocusin={handleFocusin}
        onFocusout={handleFocusout}
        ref="selfElRef"
        class={[
          `${mergedClsPrefix}-radio-group`,
          this.themeClass,
          {
            [`${mergedClsPrefix}-radio-group--rtl`]: this.rtlEnabled,
            [`${mergedClsPrefix}-radio-group--button-group`]: isButtonGroup,
            [`${mergedClsPrefix}-radio-group--borderless`]: !bordered
          }
        ]}
        style={this.cssVars as CSSProperties}
      >
        {children}
      </div>
    )
  }
})
