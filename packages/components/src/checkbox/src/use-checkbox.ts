import {
  watchEffect,
  type ExtractPropTypes,
  type PropType,
  inject,
  type ComputedRef,
  type Ref,
  ref,
  toRef
} from 'vue'
import {
  warnOnce,
  type MaybeArray,
  createInjectionKey,
  call
} from '../../_utils'
import {
  type OnUpdateCheckedImpl,
  type OnUpdateChecked,
  type CheckboxInst
} from './interface'
import { useConfig, useFormItem } from '../../_mixins'
import { useMergedState, useMemo } from '../../_external-dependencies/vooks'

export const checkboxBaseProps = {
  size: String as PropType<'small' | 'medium' | 'large'>,
  modelValue: {
    type: [Boolean, String, Number] as PropType<
    boolean | string | number | undefined
    >,
    default: undefined
  },
  defaultModelValue: {
    type: [Boolean, String, Number] as PropType<boolean | string | number>,
    default: false
  },
  value: [String, Number] as PropType<string | number>,
  disabled: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  indeterminate: Boolean,
  label: String,
  focusable: {
    type: Boolean,
    default: true
  },
  checkedValue: {
    type: [Boolean, String, Number],
    default: true
  },
  uncheckedValue: {
    type: [Boolean, String, Number],
    default: false
  },
  'onUpdate:modelValue': [Function, Array] as PropType<
  MaybeArray<OnUpdateChecked>
  >,
  onUpdateModelValue: [Function, Array] as PropType<
  MaybeArray<OnUpdateChecked>
  >,
  // private
  privateInsideTable: Boolean,
  // deprecated
  onChange: [Function, Array] as PropType<MaybeArray<OnUpdateChecked>>
}

export interface CheckboxGroupInjection {
  checkedCountRef: ComputedRef<number>
  maxRef: Ref<number | undefined>
  minRef: Ref<number | undefined>
  disabledRef: Ref<boolean>
  valueSetRef: Ref<Set<string | number>>
  mergedSizeRef: Ref<'small' | 'medium' | 'large'>
  bordered: Ref<boolean>
  toggleCheckbox: (checked: boolean, checkboxValue: string | number) => void
}

export const checkboxGroupInjectionKey =
  createInjectionKey<CheckboxGroupInjection>('z-checkbox-group')

export interface UseCheckbox {
  mergedSizeRef: ComputedRef<'small' | 'medium' | 'large'>
  selfRef: Ref<HTMLDivElement | null>
  labelRef: Ref<HTMLElement | null>
  mergedClsPrefix: Ref<string>
  mergedDisabled: Ref<boolean>
  renderedChecked: Ref<boolean>
  bordered: Ref<boolean | undefined> | undefined
  focus: () => void
  blur: () => void
  toggle: (e: MouseEvent | KeyboardEvent) => void
  handleClick: (e: MouseEvent) => void
  handleKeyUp: (e: KeyboardEvent) => void
  handleKeyDown: (e: KeyboardEvent) => void
}

function setup (props: ExtractPropTypes<typeof checkboxBaseProps>): UseCheckbox {
  if (__DEV__) {
    watchEffect(() => {
      if (props.onChange) {
        warnOnce(
          'checkbox',
          '`on-change` is deprecated, please use `on-update:checked` instead.'
        )
      }
    })
  }
  const selfRef = ref<HTMLDivElement | null>(null)
  const labelRef = ref<HTMLElement | null>(null)
  const { mergedClsPrefixRef } = useConfig(props)
  const ZCheckboxGroup = inject(checkboxGroupInjectionKey, null)
  const uncontrolledCheckedRef = ref(props.defaultModelValue)
  const controlledCheckedRef = toRef(props, 'modelValue')
  const mergedCheckedRef = useMergedState(
    controlledCheckedRef,
    uncontrolledCheckedRef
  )
  const renderedCheckedRef = useMemo(() => {
    if (ZCheckboxGroup) {
      const groupValueSet = ZCheckboxGroup.valueSetRef.value
      if (groupValueSet && props.value !== undefined) {
        return groupValueSet.has(props.value)
      }
      return false
    } else {
      return mergedCheckedRef.value === props.checkedValue
    }
  })
  const formItem = useFormItem(props, {
    mergedSize (ZFormItem) {
      const { size } = props
      if (size !== undefined) return size
      if (ZCheckboxGroup) {
        const { value: mergedSize } = ZCheckboxGroup.mergedSizeRef
        if (mergedSize !== undefined) {
          return mergedSize
        }
      }
      if (ZFormItem) {
        const { mergedSize } = ZFormItem
        if (mergedSize !== undefined) return mergedSize.value
      }
      return 'medium'
    },
    mergedDisabled (ZFormItem) {
      const { disabled } = props
      if (disabled !== undefined) return disabled
      if (ZCheckboxGroup) {
        if (ZCheckboxGroup.disabledRef.value) return true
        const {
          maxRef: { value: maxItems },
          checkedCountRef
        } = ZCheckboxGroup
        if (
          maxItems !== undefined &&
          checkedCountRef.value >= maxItems &&
          !renderedCheckedRef.value
        ) {
          return true
        }
        const {
          minRef: { value: min }
        } = ZCheckboxGroup
        if (
          min !== undefined &&
          checkedCountRef.value <= min &&
          renderedCheckedRef.value
        ) {
          return true
        }
      }
      if (ZFormItem) {
        return ZFormItem.disabled.value
      }
      return false
    }
  })
  const { mergedDisabledRef, mergedSizeRef } = formItem
  function toggle (e: MouseEvent | KeyboardEvent): void {
    if (ZCheckboxGroup && props.value !== undefined) {
      ZCheckboxGroup.toggleCheckbox(!renderedCheckedRef.value, props.value)
    } else {
      const {
        onChange,
        'onUpdate:modelValue': _onUpdateModelValue,
        onUpdateModelValue
      } = props
      const { nTriggerFormInput, nTriggerFormChange } = formItem
      const nextChecked = renderedCheckedRef.value
        ? props.uncheckedValue
        : props.checkedValue
      if (_onUpdateModelValue) {
        call(_onUpdateModelValue as OnUpdateCheckedImpl, nextChecked, e)
      }
      if (onUpdateModelValue) {
        call(onUpdateModelValue as OnUpdateCheckedImpl, nextChecked, e)
      }
      if (onChange) call(onChange as OnUpdateCheckedImpl, nextChecked, e) // deprecated
      nTriggerFormInput()
      nTriggerFormChange()
      uncontrolledCheckedRef.value = nextChecked
    }
  }
  function handleClick (e: MouseEvent): void {
    if (!mergedDisabledRef.value) {
      toggle(e)
    }
  }
  function handleKeyUp (e: KeyboardEvent): void {
    if (mergedDisabledRef.value) return
    switch (e.key) {
      case ' ':
      case 'Enter':
        toggle(e)
    }
  }
  function handleKeyDown (e: KeyboardEvent): void {
    switch (e.key) {
      case ' ':
        e.preventDefault()
    }
  }

  const exposedMethods: CheckboxInst = {
    focus: () => {
      selfRef.value?.focus()
    },
    blur: () => {
      selfRef.value?.blur()
    }
  }
  const { focus, blur } = exposedMethods

  return {
    focus,
    blur,
    mergedSizeRef,
    selfRef,
    labelRef,
    mergedClsPrefix: mergedClsPrefixRef,
    mergedDisabled: mergedDisabledRef,
    renderedChecked: renderedCheckedRef,
    bordered: ZCheckboxGroup?.bordered,
    toggle,
    handleClick,
    handleKeyUp,
    handleKeyDown
  }
}

export type CheckboxBaseProps = ExtractPropTypes<typeof checkboxBaseProps>
export { setup }
