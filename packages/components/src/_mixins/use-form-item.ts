import {
  computed,
  inject,
  provide,
  onBeforeUnmount,
  type ComputedRef,
  type Ref
} from 'vue'
import type { FormValidationStatus } from '../form/src/interface'
import { createInjectionKey } from '../_utils'

type FormItemSize = 'small' | 'medium' | 'large'
type AllowedSize = 'x-small' | 'small' | 'medium' | 'large' | 'x-large' | number

export interface FormItemInjection {
  path: Ref<string | undefined>
  disabled: Ref<boolean>
  mergedSize: ComputedRef<FormItemSize>
  mergedValidationStatus: ComputedRef<FormValidationStatus | undefined>
  restoreValidation: () => void
  handleContentBlur: () => void
  handleContentFocus: () => void
  handleContentInput: () => void
  handleContentChange: () => void
}

export const formItemInjectionKey =
  createInjectionKey<FormItemInjection | null>('z-form-item')

interface UseFormItemOptions<T> {
  defaultSize?: FormItemSize
  mergedSize?: (formItem: FormItemInjection | null) => T
  mergedDisabled?: (formItem: FormItemInjection | null) => boolean
}

interface UseFormItemProps<T> {
  size?: T
  disabled?: boolean
  status?: FormValidationStatus
}

export interface UseFormItem<T> {
  mergedSizeRef: ComputedRef<T>
  mergedDisabledRef: ComputedRef<boolean>
  mergedStatusRef: ComputedRef<FormValidationStatus | undefined>
  nTriggerFormBlur: () => void
  nTriggerFormChange: () => void
  nTriggerFormFocus: () => void
  nTriggerFormInput: () => void
}

export default function useFormItem<T extends AllowedSize = FormItemSize> (
  props: UseFormItemProps<T>,
  {
    defaultSize = 'medium',
    mergedSize,
    mergedDisabled
  }: UseFormItemOptions<T> = {}
): UseFormItem<T> {
  const ZFormItem = inject(formItemInjectionKey, null)
  provide(formItemInjectionKey, null)
  const mergedSizeRef = computed(
    mergedSize
      ? () => mergedSize(ZFormItem)
      : () => {
          const { size } = props as any
          if (size) return size
          if (ZFormItem) {
            const { mergedSize } = ZFormItem
            if (mergedSize.value !== undefined) {
              return mergedSize.value as T
            }
          }
          return defaultSize as T
        }
  )
  const mergedDisabledRef = computed(
    mergedDisabled
      ? () => mergedDisabled(ZFormItem)
      : () => {
          const { disabled } = props
          if (disabled !== undefined) {
            return disabled
          }
          if (ZFormItem) {
            return ZFormItem.disabled.value
          }
          return false
        }
  )
  const mergedStatusRef = computed<FormValidationStatus | undefined>(() => {
    const { status } = props
    if (status) return status
    return ZFormItem?.mergedValidationStatus.value
  })
  onBeforeUnmount(() => {
    if (ZFormItem) {
      ZFormItem.restoreValidation()
    }
  })
  return {
    mergedSizeRef,
    mergedDisabledRef,
    mergedStatusRef,
    nTriggerFormBlur () {
      if (ZFormItem) {
        ZFormItem.handleContentBlur()
      }
    },
    nTriggerFormChange () {
      if (ZFormItem) {
        ZFormItem.handleContentChange()
      }
    },
    nTriggerFormFocus () {
      if (ZFormItem) {
        ZFormItem.handleContentFocus()
      }
    },
    nTriggerFormInput () {
      if (ZFormItem) {
        ZFormItem.handleContentInput()
      }
    }
  }
}
