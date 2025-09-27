import { h } from 'vue'
import {
  ErrorRhombusIcon,
  WarningIcon,
  SuccessIcon
} from '../../_internal/icons'
import type { FormValidationStatus } from './interface'

export function FeedbackIcon (
  mergedClsPrefix: string,
  mergedValidationStatus?: FormValidationStatus
): JSX.Element | null {
  if (mergedValidationStatus === 'warning') {
    return (
      <WarningIcon
        class={`
        ${mergedClsPrefix}-form-item-feedback 
        ${mergedClsPrefix}-form-item-feedback--icon ${mergedClsPrefix}-form-item-feedback--warning-icon`}
      />
    )
  } else if (mergedValidationStatus === 'error') {
    return (
      <ErrorRhombusIcon
        class={`${mergedClsPrefix}-form-item-feedback 
        ${mergedClsPrefix}-form-item-feedback--icon
        ${mergedClsPrefix}-form-item-feedback--error-icon`}
      />
    )
  } else if (mergedValidationStatus === 'success') {
    return (
      <SuccessIcon
        class={`${mergedClsPrefix}-form-item-feedback ${mergedClsPrefix}-form-item-feedback--icon ${mergedClsPrefix}-form-item-feedback--success-icon`}
      />
    )
  } else if (mergedValidationStatus === 'neutral') {
    return (
      <WarningIcon
        class={`${mergedClsPrefix}-form-item-feedback ${mergedClsPrefix}-form-item-feedback--icon ${mergedClsPrefix}-form-item-feedback--neutral-icon`}
      />
    )
  } else {
    return null
  }
}
