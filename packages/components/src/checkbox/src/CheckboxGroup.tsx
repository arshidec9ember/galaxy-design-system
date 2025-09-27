import {
  h,
  defineComponent,
  provide,
  type PropType,
  computed,
  toRef,
  ref,
  watchEffect,
  type CSSProperties,
  type VNode,
  type VNodeChild,
  warn
} from 'vue'
import { useMergedState } from '../../_external-dependencies/vooks'
import {
  type ThemeProps,
  useConfig,
  useFormItem,
  useTheme,
  useRtl,
  useThemeClass
} from '../../_mixins'
import {
  call,
  type MaybeArray,
  warnOnce,
  type ExtractPublicPropTypes,
  createKey,
  getSlot,
  flatten
} from '../../_utils'
import style from './styles/checkbox-group.cssr'
import { type CheckboxTheme, checkboxLight } from '../styles'
import {
  type CheckboxBaseProps,
  checkboxGroupInjectionKey
} from './use-checkbox'

function mapSlot (
  defaultSlot: VNode[],
  value: Array<string | number> | null,
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
    if (name === 'CheckboxButton') {
      isButtonGroup = true
    }
    if (__DEV__ && isButtonGroup && name !== 'CheckboxButton') {
      warn(
        'checkbox-group',
        '`z-checkbox-group` in button mode only takes `z-checkbox-button` as children.'
      )
      continue
    }
    const instanceProps: CheckboxBaseProps = wrappedInstance.props as any
    if (name !== 'CheckboxButton') {
      children.push(wrappedInstance)
      continue
    }
    if (i === 0) {
      children.push(wrappedInstance)
    } else {
      const lastInstanceProps: CheckboxBaseProps = children[children.length - 1]
        .props as any
      const lastInstanceChecked =
        value && lastInstanceProps.value !== undefined
          ? value.includes(lastInstanceProps.value)
          : false

      const lastInstanceDisabled: boolean | undefined =
        lastInstanceProps.disabled
      const currentInstanceChecked =
        value && lastInstanceProps.value !== undefined
          ? value.includes(lastInstanceProps.value)
          : false
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
        [`${clsPrefix}-checkbox-group__splitor--disabled`]:
          lastInstanceDisabled || !bordered,
        [`${clsPrefix}-checkbox-group__splitor--checked`]: lastInstanceChecked
      }
      const currentInstanceClass = {
        [`${clsPrefix}-checkbox-group__splitor--disabled`]:
          currentInstanceDisabled || !bordered,
        [`${clsPrefix}-checkbox-group__splitor--checked`]:
          currentInstanceChecked
      }
      const splitorClass =
        lastInstancePriority < currentInstancePriority
          ? currentInstanceClass
          : lastInstanceClass
      children.push(
        <div
          class={[
            {
              [`${clsPrefix}-checkbox-group__splitor`]: bordered
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

export const checkboxGroupProps = {
  ...(useTheme.props as ThemeProps<CheckboxTheme>),
  minItems: Number,
  maxItems: Number,
  size: String as PropType<'small' | 'medium' | 'large'>,
  modelValue: Array as PropType<Array<string | number> | null>,
  bordered: {
    type: Boolean,
    default: true
  },
  defaultModelValue: {
    type: Array as PropType<Array<string | number> | null>,
    default: null
  },
  disabled: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  'onUpdate:modelValue': [Function, Array] as PropType<
  MaybeArray<
  (
    value: Array<string | number>,
    meta: {
      actionType: 'check' | 'uncheck'
      value: string | number
    }
  ) => void
  >
  >,
  onUpdateModelValue: [Function, Array] as PropType<
  MaybeArray<
  (
    value: Array<string | number>,
    meta: {
      actionType: 'check' | 'uncheck'
      value: string | number
    }
  ) => void
  >
  >,
  // deprecated
  onChange: [Function, Array] as PropType<
  MaybeArray<(value: Array<string | number>) => void> | undefined
  >
} as const

export type CheckboxGroupProps = ExtractPublicPropTypes<
  typeof checkboxGroupProps
>

export default defineComponent({
  name: 'CheckboxGroup',
  props: checkboxGroupProps,
  setup (props) {
    if (__DEV__) {
      watchEffect(() => {
        if (props.onChange !== undefined) {
          warnOnce(
            'checkbox-group',
            '`on-change` is deprecated, please use `on-update:model-value` instead.'
          )
        }
      })
    }
    const { mergedClsPrefixRef, inlineThemeDisabled, mergedRtlRef } =
      useConfig(props)
    const themeRef = useTheme(
      'Checkbox',
      '-checkbox-group',
      style,
      checkboxLight,
      props,
      mergedClsPrefixRef
    )
    const formItem = useFormItem(props)
    const { mergedSizeRef, mergedDisabledRef } = formItem
    const uncontrolledValueRef = ref(props.defaultModelValue)
    const controlledValueRef = toRef(props, 'modelValue')
    const mergedValueRef = useMergedState(
      controlledValueRef,
      uncontrolledValueRef
    )
    const checkedCount = computed(() => {
      return mergedValueRef.value?.length || 0
    })

    const valueSetRef = computed<Set<string | number>>(() => {
      if (Array.isArray(mergedValueRef.value)) {
        return new Set(mergedValueRef.value)
      }
      return new Set()
    })
    const { nTriggerFormInput, nTriggerFormChange } = formItem
    function toggleCheckbox (
      checked: boolean,
      checkboxValue: string | number
    ): void {
      const {
        onChange,
        'onUpdate:modelValue': _onUpdateModelValue,
        onUpdateModelValue
      } = props

      if (Array.isArray(mergedValueRef.value)) {
        const groupValue = Array.from(mergedValueRef.value)
        const index = groupValue.findIndex((value) => value === checkboxValue)
        if (checked) {
          if (!~index) {
            groupValue.push(checkboxValue)
            if (onUpdateModelValue) {
              call(onUpdateModelValue, groupValue, {
                actionType: 'check',
                value: checkboxValue
              })
            }
            if (_onUpdateModelValue) {
              call(_onUpdateModelValue, groupValue, {
                actionType: 'check',
                value: checkboxValue
              })
            }
            nTriggerFormInput()
            nTriggerFormChange()
            uncontrolledValueRef.value = groupValue
            // deprecated
            if (onChange) call(onChange, groupValue)
          }
        } else {
          if (~index) {
            groupValue.splice(index, 1)
            if (onUpdateModelValue) {
              call(onUpdateModelValue, groupValue, {
                actionType: 'uncheck',
                value: checkboxValue
              })
            }
            if (_onUpdateModelValue) {
              call(_onUpdateModelValue, groupValue, {
                actionType: 'uncheck',
                value: checkboxValue
              })
            }
            if (onChange) call(onChange, groupValue) // deprecated
            uncontrolledValueRef.value = groupValue
            nTriggerFormInput()
            nTriggerFormChange()
          }
        }
      } else {
        if (checked) {
          if (onUpdateModelValue) {
            call(onUpdateModelValue, [checkboxValue], {
              actionType: 'check',
              value: checkboxValue
            })
          }
          if (_onUpdateModelValue) {
            call(_onUpdateModelValue, [checkboxValue], {
              actionType: 'check',
              value: checkboxValue
            })
          }
          if (onChange) call(onChange, [checkboxValue]) // deprecated
          uncontrolledValueRef.value = [checkboxValue]
          nTriggerFormInput()
          nTriggerFormChange()
        } else {
          if (onUpdateModelValue) {
            call(onUpdateModelValue, [], {
              actionType: 'uncheck',
              value: checkboxValue
            })
          }
          if (_onUpdateModelValue) {
            call(_onUpdateModelValue, [], {
              actionType: 'uncheck',
              value: checkboxValue
            })
          }
          if (onChange) call(onChange, []) // deprecated
          uncontrolledValueRef.value = []
          nTriggerFormInput()
          nTriggerFormChange()
        }
      }
    }

    const borderedRef = toRef(props, 'bordered')
    provide(checkboxGroupInjectionKey, {
      checkedCountRef: checkedCount,
      maxRef: toRef(props, 'maxItems'),
      minRef: toRef(props, 'minItems'),
      valueSetRef,
      disabledRef: mergedDisabledRef,
      mergedSizeRef,
      toggleCheckbox,
      bordered: borderedRef
    })
    const rtlEnabledRef = useRtl('Checkbox', mergedRtlRef, mergedClsPrefixRef)
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
        'checkbox-group',
        computed(() => mergedSizeRef.value[0]),
        cssVarsRef,
        props
      )
      : undefined

    return {
      rtlEnabled: rtlEnabledRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedValue: mergedValueRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    const { mergedValue, mergedClsPrefix, bordered } = this
    const { children, isButtonGroup } = mapSlot(
      flatten(getSlot(this)),
      mergedValue,
      mergedClsPrefix,
      bordered
    )
    this.onRender?.()

    return (
      <div
        ref="selfElRef"
        role="group"
        class={[
          `${mergedClsPrefix}-checkbox-group`,
          this.themeClass,
          {
            [`${mergedClsPrefix}-checkbox-group--rtl`]: this.rtlEnabled,
            [`${mergedClsPrefix}-checkbox-group--button-group`]: isButtonGroup,
            [`${mergedClsPrefix}-checkbox-group--borderless`]: !bordered
          }
        ]}
        style={this.cssVars as CSSProperties}
      >
        {children}
      </div>
    )
  }
})
