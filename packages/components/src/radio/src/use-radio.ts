import {
  inject,
  ref,
  toRef,
  type ExtractPropTypes,
  type PropType,
  type Ref,
  type ComputedRef,
  watchEffect
} from 'vue'
import { useMemo, useMergedState } from '../../_external-dependencies/vooks'
import { useConfig, useFormItem } from '../../_mixins'
import { call, createInjectionKey, warnOnce } from '../../_utils'
import type { MaybeArray } from '../../_utils'
import {
  type OnUpdateModelValue,
  type OnUpdateModelValueImpl
} from './interface'

export const radioBaseProps = {
  name: String,
  value: {
    type: [String, Number, Boolean] as PropType<string | number | boolean>,
    default: 'on'
  },
  modelValue: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  defaultModelValue: Boolean,
  disabled: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  label: String,
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: 'medium'
  },
  onUpdateModelValue: [Function, Array] as PropType<
  undefined | MaybeArray<(value: boolean) => void>
  >,
  'onUpdate:modelValue': [Function, Array] as PropType<
  undefined | MaybeArray<(value: boolean) => void>
  >,
  // deprecated
  checkedValue: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  }
} as const

export interface RadioGroupInjection {
  mergedClsPrefixRef: Ref<string>
  nameRef: Ref<string | undefined>
  valueRef: Ref<string | number | boolean | null>
  mergedSizeRef: Ref<'small' | 'medium' | 'large'>
  disabledRef: Ref<boolean>
  doUpdateValue: OnUpdateModelValue
  bordered: Ref<boolean>
}

export const radioGroupInjectionKey =
  createInjectionKey<RadioGroupInjection>('z-radio-group')

export interface UseRadio {
  mergedClsPrefix: Ref<string>
  inputRef: Ref<HTMLElement | null>
  labelRef: Ref<HTMLElement | null>
  mergedName: Ref<string | undefined>
  mergedDisabled: Ref<boolean>
  uncontrolledChecked: Ref<boolean>
  renderSafeChecked: Ref<boolean>
  focus: Ref<boolean>
  mergedSize: ComputedRef<'small' | 'medium' | 'large'>
  bordered: Ref<boolean>
  handleRadioInputChange: () => void
  handleRadioInputBlur: () => void
  handleRadioInputFocus: () => void
}

function setup (props: ExtractPropTypes<typeof radioBaseProps>): UseRadio {
  if (__DEV__) {
    watchEffect(() => {
      if (props.checkedValue !== undefined) {
        warnOnce(
          'radio',
          '`checked-value` is deprecated, please use `checked` instead.'
        )
      }
    })
  }
  const formItem = useFormItem(props, {
    mergedSize (ZFormItem) {
      const { size } = props
      if (size !== undefined) return size
      if (ZRadioGroup) {
        const {
          mergedSizeRef: { value: mergedSize }
        } = ZRadioGroup
        if (mergedSize !== undefined) {
          return mergedSize
        }
      }
      if (ZFormItem) {
        return ZFormItem.mergedSize.value
      }
      return 'medium'
    },
    mergedDisabled (ZFormItem) {
      if (props.disabled) return true
      if (ZRadioGroup?.disabledRef.value) return true
      if (ZFormItem?.disabled.value) return true
      return false
    }
  })
  const { mergedSizeRef, mergedDisabledRef } = formItem
  const inputRef = ref<HTMLElement | null>(null)
  const labelRef = ref<HTMLElement | null>(null)
  const ZRadioGroup = inject(radioGroupInjectionKey, null)
  const uncontrolledCheckedRef = ref(props.defaultModelValue)
  const controlledCheckedRef = toRef(props, 'modelValue')
  const mergedCheckedRef = useMergedState(
    controlledCheckedRef,
    uncontrolledCheckedRef
  )
  const renderSafeCheckedRef = useMemo(() => {
    if (ZRadioGroup) return ZRadioGroup.valueRef.value === props.value
    return mergedCheckedRef.value
  })
  const mergedNameRef = useMemo(() => {
    const { name } = props
    if (name !== undefined) return name
    if (ZRadioGroup) return ZRadioGroup.nameRef.value
  })
  const focusRef = ref(false)
  function doUpdateChecked (): void {
    if (ZRadioGroup) {
      const { doUpdateValue } = ZRadioGroup
      const { value } = props
      call(doUpdateValue as OnUpdateModelValueImpl, value)
    } else {
      const { onUpdateModelValue, 'onUpdate:modelValue': _onUpdateModelValue } =
        props
      const { nTriggerFormInput, nTriggerFormChange } = formItem
      if (onUpdateModelValue) call(onUpdateModelValue, true)
      if (_onUpdateModelValue) call(_onUpdateModelValue, true)
      nTriggerFormInput()
      nTriggerFormChange()
      uncontrolledCheckedRef.value = true
    }
  }
  function toggle (): void {
    if (mergedDisabledRef.value) return
    if (!renderSafeCheckedRef.value) {
      doUpdateChecked()
    }
  }
  function handleRadioInputChange (): void {
    toggle()
  }
  function handleRadioInputBlur (): void {
    focusRef.value = false
  }
  function handleRadioInputFocus (): void {
    focusRef.value = true
  }
  return {
    mergedClsPrefix: ZRadioGroup
      ? ZRadioGroup.mergedClsPrefixRef
      : useConfig(props).mergedClsPrefixRef,
    inputRef,
    labelRef,
    mergedName: mergedNameRef,
    mergedDisabled: mergedDisabledRef,
    uncontrolledChecked: uncontrolledCheckedRef,
    renderSafeChecked: renderSafeCheckedRef,
    focus: focusRef,
    mergedSize: mergedSizeRef,
    bordered: toRef(ZRadioGroup?.bordered ?? false),
    handleRadioInputChange,
    handleRadioInputBlur,
    handleRadioInputFocus
  }
}

export type RadioBaseProps = ExtractPropTypes<typeof radioBaseProps>
export { setup }
