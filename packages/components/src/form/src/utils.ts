import { inject, computed, ref, type ComputedRef } from 'vue'
import { get } from 'lodash-es'
import type { FormItemSetupProps } from './FormItem'
import { formInjectionKey } from './context'
import type { Size, FormItemRule } from './interface'
import { formatLength } from '../../_utils'

export function formItemSize (props: FormItemSetupProps): {
  mergedSize: ComputedRef<Size>
} {
  const ZForm = inject(formInjectionKey, null)
  return {
    mergedSize: computed(() => {
      if (props.size !== undefined) return props.size
      if (ZForm?.props.size !== undefined) return ZForm.props.size
      return 'medium'
    })
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function formItemMisc (props: FormItemSetupProps) {
  const ZForm = inject(formInjectionKey, null)
  const mergedLabelPlacementRef = computed(() => {
    const { labelPlacement } = props
    if (labelPlacement !== undefined) return labelPlacement
    if (ZForm?.props.labelPlacement) return ZForm.props.labelPlacement
    return 'top'
  })
  const isAutoLabelWidthRef = computed(() => {
    return (
      mergedLabelPlacementRef.value === 'left' &&
      (props.labelWidth === 'auto' || ZForm?.props.labelWidth === 'auto')
    )
  })
  const mergedLabelWidthRef = computed(() => {
    if (mergedLabelPlacementRef.value === 'top') return
    const { labelWidth } = props

    if (labelWidth !== undefined && labelWidth !== 'auto') {
      return formatLength(labelWidth)
    }

    if (isAutoLabelWidthRef.value) {
      const autoComputedWidth = ZForm?.maxChildLabelWidthRef.value
      if (autoComputedWidth !== undefined) {
        return formatLength(autoComputedWidth)
      } else {
        return undefined
      }
    }

    if (ZForm?.props.labelWidth !== undefined) {
      return formatLength(ZForm.props.labelWidth)
    }
    return undefined
  })
  const mergedLabelAlignRef = computed(() => {
    const { labelAlign } = props
    if (labelAlign) return labelAlign
    if (ZForm?.props.labelAlign) return ZForm.props.labelAlign
    return undefined
  })
  const mergedLabelStyleRef = computed(() => {
    return [
      props.labelProps?.style,
      props.labelStyle,
      {
        width: mergedLabelWidthRef.value
      }
    ]
  })
  const mergedShowIndicatorRef = computed(() => {
    const { showIndicator } = props
    if (showIndicator !== undefined) return showIndicator
    return ZForm?.props.showIndicator
  })
  const mergedIndicatorPlacementRef = computed(() => {
    const { indicatorPlacement } = props
    if (indicatorPlacement !== undefined) return indicatorPlacement
    return ZForm?.props.indicatorPlacement || 'end'
  })
  const validationErroredRef = ref(false)
  const mergedValidationStatusRef = computed(() => {
    const { validationStatus } = props
    if (validationStatus !== undefined) return validationStatus
    if (validationErroredRef.value) return 'error'
    return undefined
  })
  const mergedShowFeedbackRef = computed(() => {
    const { showFeedback } = props
    if (showFeedback !== undefined) return showFeedback
    if (ZForm?.props.showFeedback !== undefined) return ZForm.props.showFeedback
    return true
  })
  const mergedShowLabelRef = computed(() => {
    const { showLabel } = props
    if (showLabel !== undefined) return showLabel
    if (ZForm?.props.showLabel !== undefined) return ZForm.props.showLabel
    return true
  })
  return {
    validationErrored: validationErroredRef,
    mergedLabelStyle: mergedLabelStyleRef,
    mergedLabelPlacement: mergedLabelPlacementRef,
    mergedLabelAlign: mergedLabelAlignRef,
    mergedOptional: props.optional,
    mergedShowIndicator: mergedShowIndicatorRef,
    mergedIndicatorPlacement: mergedIndicatorPlacementRef,
    mergedValidationStatus: mergedValidationStatusRef,
    mergedShowFeedback: mergedShowFeedbackRef,
    mergedShowLabel: mergedShowLabelRef,
    isAutoLabelWidth: isAutoLabelWidthRef
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function formItemRule (props: FormItemSetupProps) {
  const ZForm = inject(formInjectionKey, null)
  const compatibleRulePathRef = computed(() => {
    const { rulePath } = props
    if (rulePath !== undefined) return rulePath
    const { path } = props
    if (path !== undefined) return path
    return undefined
  })
  const mergedRulesRef = computed(() => {
    const rules: FormItemRule[] = []
    const { rule } = props
    if (rule !== undefined) {
      if (Array.isArray(rule)) rules.push(...rule)
      else rules.push(rule)
    }
    if (ZForm) {
      const { rules: formRules } = ZForm.props
      const { value: rulePath } = compatibleRulePathRef
      if (formRules !== undefined && rulePath !== undefined) {
        const formRule = get(formRules, rulePath)
        if (formRule !== undefined) {
          if (Array.isArray(formRule)) {
            rules.push(...formRule)
          } else {
            // terminate object must be a form item rule
            rules.push(formRule as FormItemRule)
          }
        }
      }
    }
    return rules
  })
  const hasRequiredRuleRef = computed(() => {
    return mergedRulesRef.value.some((rule) => rule.required)
  })
  // deprecated
  const mergedRequiredRef = computed(() => {
    return hasRequiredRuleRef.value || props.required
  })
  return {
    mergedRules: mergedRulesRef,
    mergedRequired: mergedRequiredRef
  }
}
