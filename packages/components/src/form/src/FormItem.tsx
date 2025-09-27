import {
  h,
  defineComponent,
  computed,
  toRef,
  type PropType,
  type CSSProperties,
  type ExtractPropTypes,
  ref,
  provide,
  inject,
  watch,
  Transition,
  onMounted,
  type LabelHTMLAttributes,
  type VNodeChild
} from 'vue'
import Schema from 'async-validator'
import type { ValidateError, RuleItem, ValidateOption } from 'async-validator'
import { get } from 'lodash-es'
import { createId } from 'seemly'
import { formItemInjectionKey } from '../../_mixins/use-form-item'
import {
  type ThemeProps,
  useConfig,
  useTheme,
  useThemeClass
} from '../../_mixins'
import {
  createKey,
  useInjectionInstanceCollection,
  keysOf,
  resolveWrappedSlot
} from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'
import { formLight, type FormTheme } from '../styles'
import { formItemMisc, formItemSize, formItemRule } from './utils'
import type {
  ShouldRuleBeApplied,
  FormItemRule,
  LabelAlign,
  LabelPlacement,
  ValidateCallback,
  ValidationTrigger,
  FormItemValidateOptions,
  FormItemInst,
  FormItemInternalValidate,
  FormValidationStatus,
  Size
} from './interface'
import { formInjectionKey, formItemInstsInjectionKey } from './context'
import style from './styles/form-item.cssr'
import { ZTooltip } from '../../tooltip'
import { ZEllipsis } from '../../ellipsis'
import { ZIcon } from '../../icon'
import { HelpIcon } from '../../_internal/icons'
import { wrapValidator } from './wrapValidator'
import { FeedbackIcon } from './FeedbackIcon'
import { type TooltipProps } from '../../tooltip/src/Tooltip'
import { ZLabel } from '../../typography'

export const formItemProps = {
  ...(useTheme.props as ThemeProps<FormTheme>),
  helpMessageProps: Object as PropType<TooltipProps>,
  label: String,
  description: String,
  labelWidth: [Number, String] as PropType<string | number>,
  labelStyle: [String, Object] as PropType<CSSProperties | string>,
  labelAlign: String as PropType<LabelAlign>,
  labelPlacement: String as PropType<LabelPlacement>,
  path: String,
  first: Boolean,
  rulePath: String,
  required: Boolean,
  optional: Boolean,
  helpMessage: String,
  showIndicator: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  indicatorPlacement: String as PropType<'start' | 'end'>,
  showFeedback: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  rule: [Object, Array] as PropType<FormItemRule | FormItemRule[]>,
  size: String as PropType<Size>,
  ignorePathChange: Boolean,
  validationStatus: String as PropType<FormValidationStatus>,
  feedback: String,
  showLabel: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  labelProps: Object as PropType<LabelHTMLAttributes>
} as const

export type FormItemSetupProps = ExtractPropTypes<typeof formItemProps>
export type FormItemProps = ExtractPublicPropTypes<typeof formItemProps>
export const formItemPropKeys = keysOf(formItemProps)

export default defineComponent({
  name: 'FormItem',
  props: formItemProps,
  setup (props) {
    useInjectionInstanceCollection(
      formItemInstsInjectionKey,
      'formItems',
      toRef(props, 'path')
    )
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
    const ZForm = inject(formInjectionKey, null)
    const formItemSizeRefs = formItemSize(props)
    const formItemMiscRefs = formItemMisc(props)
    const { validationErrored: validationErroredRef } = formItemMiscRefs
    const { mergedRequired: mergedRequiredRef, mergedRules: mergedRulesRef } =
      formItemRule(props)
    const { mergedSize: mergedSizeRef } = formItemSizeRefs
    const {
      mergedLabelPlacement: labelPlacementRef,
      mergedLabelAlign: labelTextAlignRef,
      mergedIndicatorPlacement: mergedIndicatorPlacementRef
    } = formItemMiscRefs
    const renderExplainsRef = ref<
    Array<{
      key: string
      render: () => VNodeChild
    }>
    >([])
    const feedbackIdRef = ref(createId())
    const mergedDisabledRef = ZForm
      ? toRef(ZForm.props, 'disabled')
      : ref(false)
    const themeRef = useTheme(
      'Form',
      '-form-item',
      style,
      formLight,
      props,
      mergedClsPrefixRef
    )
    watch(toRef(props, 'path'), () => {
      if (props.ignorePathChange) return
      restoreValidation()
    })
    function restoreValidation (): void {
      renderExplainsRef.value = []
      validationErroredRef.value = false
      if (props.feedback) {
        feedbackIdRef.value = createId()
      }
    }
    function handleContentBlur (): void {
      void internalValidate('blur')
    }
    function handleContentChange (): void {
      void internalValidate('change')
    }
    function handleContentFocus (): void {
      void internalValidate('focus')
    }
    function handleContentInput (): void {
      void internalValidate('input')
    }
    // Resolve : ()
    // Reject  : (errors: AsyncValidator.ValidateError[])
    async function validate (options: FormItemValidateOptions): Promise<void>
    async function validate (
      trigger?: string | null,
      callback?: ValidateCallback
    ): Promise<void>
    async function validate (
      options?: string | null | FormItemValidateOptions,
      callback?: ValidateCallback
    ): Promise<void> {
      /** the following code is for compatibility */
      let trigger: ValidationTrigger | string | undefined
      let validateCallback: ValidateCallback | undefined
      let shouldRuleBeApplied: ShouldRuleBeApplied | undefined
      let asyncValidatorOptions: Record<string, any> | undefined
      if (typeof options === 'string') {
        trigger = options
        validateCallback = callback
      } else if (options !== null && typeof options === 'object') {
        trigger = options.trigger
        validateCallback = options.callback
        shouldRuleBeApplied = options.shouldRuleBeApplied
        asyncValidatorOptions = options.options
      }
      await new Promise<void>((resolve, reject) => {
        void internalValidate(
          trigger,
          shouldRuleBeApplied,
          asyncValidatorOptions
        ).then(({ valid, errors }) => {
          if (valid) {
            if (validateCallback) {
              validateCallback()
            }
            resolve()
          } else {
            if (validateCallback) {
              validateCallback(errors)
            }
            reject(errors)
          }
        })
      })
    }
    const internalValidate: FormItemInternalValidate = async (
      trigger: ValidationTrigger | string | null = null,
      shouldRuleBeApplied: ShouldRuleBeApplied = () => true,
      options: ValidateOption = {
        suppressWarning: true
      }
    ): Promise<{
      valid: boolean
      errors?: ValidateError[]
    }> => {
      const { path } = props
      if (!options) {
        options = {}
      } else {
        if (!options.first) options.first = props.first
      }
      const { value: rules } = mergedRulesRef
      const value = ZForm ? get(ZForm.props.model, path || '') : undefined
      const messageRenderers: Record<string, () => VNodeChild> = {}
      const originalMessageRendersMessage: Record<string, any> = {}
      const activeRules = (
        !trigger
          ? rules
          : rules.filter((rule) => {
            if (Array.isArray(rule.trigger)) {
              return rule.trigger.includes(trigger)
            } else {
              return rule.trigger === trigger
            }
          })
      )
        .filter(shouldRuleBeApplied)
        .map((rule, i) => {
          const shallowClonedRule = Object.assign({}, rule)
          if (shallowClonedRule.validator) {
            shallowClonedRule.validator = wrapValidator(
              shallowClonedRule.validator,
              false
            )
          }
          if (shallowClonedRule.asyncValidator) {
            shallowClonedRule.asyncValidator = wrapValidator(
              shallowClonedRule.asyncValidator,
              true
            ) as any
          }
          if (shallowClonedRule.renderMessage) {
            const rendererKey = `__renderMessage__${i}`
            originalMessageRendersMessage[rendererKey] =
              shallowClonedRule.message
            shallowClonedRule.message = rendererKey
            messageRenderers[rendererKey] = shallowClonedRule.renderMessage
          }
          return shallowClonedRule
        })
      if (!activeRules.length) {
        return {
          valid: true
        }
      }
      const mergedPath = path ?? '__n_no_path__'
      const validator = new Schema({ [mergedPath]: activeRules as RuleItem[] })
      const { validateMessages } = ZForm?.props || {}
      if (validateMessages) {
        validator.messages(validateMessages)
      }
      return await new Promise((resolve) => {
        void validator.validate({ [mergedPath]: value }, options, (errors) => {
          if (errors?.length) {
            renderExplainsRef.value = errors.map((error: ValidateError) => {
              const transformedMessage = error?.message || ''
              return {
                key: transformedMessage,
                render: () => {
                  if (transformedMessage.startsWith('__renderMessage__')) {
                    return messageRenderers[transformedMessage]()
                  }
                  return transformedMessage
                }
              }
            })
            errors.forEach((error) => {
              if (error.message?.startsWith('__renderMessage__')) {
                error.message = originalMessageRendersMessage[error.message]
              }
            })
            validationErroredRef.value = true
            resolve({
              valid: false,
              errors
            })
          } else {
            restoreValidation()
            resolve({
              valid: true
            })
          }
        })
      })
    }
    provide(formItemInjectionKey, {
      path: toRef(props, 'path'),
      disabled: mergedDisabledRef,
      mergedSize: formItemSizeRefs.mergedSize,
      mergedValidationStatus: formItemMiscRefs.mergedValidationStatus,
      restoreValidation,
      handleContentBlur,
      handleContentChange,
      handleContentFocus,
      handleContentInput
    })
    const exposedRef: FormItemInst = {
      validate,
      restoreValidation,
      internalValidate
    }
    const labelElementRef = ref<null | HTMLLabelElement>(null)
    onMounted((): void => {
      if (!formItemMiscRefs.isAutoLabelWidth.value) return
      const labelElement = labelElementRef.value
      if (labelElement !== null) {
        const memoizedWhitespace = labelElement.style.whiteSpace
        labelElement.style.whiteSpace = 'nowrap'
        labelElement.style.width = ''
        ZForm?.deriveMaxChildLabelWidth(
          Number(getComputedStyle(labelElement).width.slice(0, -2))
        )
        labelElement.style.whiteSpace = memoizedWhitespace
      }
    })
    const cssVarsRef = computed(() => {
      const { value: size } = mergedSizeRef
      const { value: labelPlacement } = labelPlacementRef
      const direction: 'vertical' | 'horizontal' =
        labelPlacement === 'top' ? 'vertical' : 'horizontal'
      const {
        common: { cubicBezierEaseInOut },
        self: {
          labelTextColor,
          labelDescriptionTextColor,
          asteriskColor,
          lineHeight,
          feedbackTextColor,
          feedbackTextColorNeutral,
          feedbackTextColorWarning,
          feedbackTextColorError,
          feedbackTextColorSuccess,
          feedbackIconColorNeutral,
          feedbackIconColorWarning,
          feedbackIconColorError,
          feedbackIconColorSuccess,
          feedbackPadding,
          helpIconColor,
          inputBackgroundColor,
          labelFontWeight,
          [createKey('labelHeight', size)]: labelHeight,
          [createKey('blankHeight', size)]: blankHeight,
          [createKey('feedbackFontSize', size)]: feedbackFontSize,
          [createKey('feedbackIconSize', size)]: feedbackIconSize,
          [createKey('feedbackHeight', size)]: feedbackHeight,
          [createKey('labelPadding', direction)]: labelPadding,
          [createKey('labelTextAlign', direction)]: labelTextAlign,
          [createKey('labelDescriptionFontSize', size)]:
            labelDescriptionFontSize,
          [createKey(createKey('labelFontSize', labelPlacement), size)]:
            labelFontSize
        }
      } = themeRef.value

      let mergedLabelTextAlign = labelTextAlignRef.value ?? labelTextAlign
      if (labelPlacement === 'top') {
        mergedLabelTextAlign =
          mergedLabelTextAlign === 'right' ? 'flex-end' : 'flex-start'
      } else {
        mergedLabelTextAlign =
          mergedLabelTextAlign === 'right' ? 'flex-end' : 'flex-start'
      }

      const cssVars = {
        '--z-bezier': cubicBezierEaseInOut,
        '--z-line-height': lineHeight,
        '--z-blank-height': blankHeight,
        '--z-label-font-size': labelFontSize,
        '--z-label-text-align': mergedLabelTextAlign,
        '--z-label-height': labelHeight,
        '--z-label-padding': labelPadding,
        '--z-label-font-weight': labelFontWeight,
        '--z-label-description-text-color': labelDescriptionTextColor,
        '--z-label-description-font-size': labelDescriptionFontSize,
        '--z-asterisk-color': asteriskColor,
        '--z-optional-color': inputBackgroundColor,
        '--z-help-icon-color': helpIconColor,
        '--z-label-text-color': labelTextColor,
        '--z-feedback-padding': feedbackPadding,
        '--z-feedback-font-size': feedbackFontSize,
        '--z-feedback-icon-size': feedbackIconSize,
        '--z-feedback-height': feedbackHeight,
        '--z-feedback-text-color': feedbackTextColor,
        '--z-feedback-text-color-neutral': feedbackTextColorNeutral,
        '--z-feedback-text-color-warning': feedbackTextColorWarning,
        '--z-feedback-text-color-error': feedbackTextColorError,
        '--z-feedback-text-color-success': feedbackTextColorSuccess,
        '--z-feedback-icon-color-neutral': feedbackIconColorNeutral,
        '--z-feedback-icon-color-warning': feedbackIconColorWarning,
        '--z-feedback-icon-color-error': feedbackIconColorError,
        '--z-feedback-icon-color-success': feedbackIconColorSuccess
      }
      return cssVars
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'form-item',
        computed(() => {
          return `${mergedSizeRef.value[0]}${labelPlacementRef.value[0]}${
              labelTextAlignRef.value?.[0] || ''
            }`
        }),
        cssVarsRef,
        props
      )
      : undefined
    const reverseColSpaceRef = computed(() => {
      // label placement left
      // indicator-placement | label align | areas (1fr auto)
      // left                   | left        | mark text (need reverse)
      // left                   | right       | mark text (okay)
      // right                  | left        | mark text (okay)
      // right                  | right       | mark text (okay)
      // right-hanging          | left        | text mark (okay)
      // right-hanging          | right       | text mark (okay)
      return (
        labelPlacementRef.value === 'left' &&
        mergedIndicatorPlacementRef.value === 'start' &&
        labelTextAlignRef.value === 'left'
      )
    })
    return {
      labelElementRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedRequired: mergedRequiredRef,
      feedbackId: feedbackIdRef,
      renderExplains: renderExplainsRef,
      reverseColSpace: reverseColSpaceRef,
      helpMessage: props.helpMessage,
      ...formItemMiscRefs,
      ...formItemSizeRefs,
      ...exposedRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    const {
      $slots,
      mergedClsPrefix,
      helpMessage,
      mergedShowLabel,
      mergedShowIndicator,
      mergedIndicatorPlacement,
      mergedOptional,
      description,
      onRender
    } = this
    onRender?.()

    const renderLabel = (): JSX.Element | null => {
      const labelText = this.$slots.label ? this.$slots.label() : this.label
      if (!labelText) return null
      const textNode = (
        <ZLabel
          variant="1-r"
          class={`${mergedClsPrefix}-form-item-label__text`}
        >
          {labelText}
        </ZLabel>
      )
      const markNode =
        mergedShowIndicator !== false &&
        (this.mergedRequired ? (
          <span class={`${mergedClsPrefix}-form-item-label__asterisk`}>
            {mergedIndicatorPlacement !== 'start' ? '\u00A0*' : '*\u00A0'}
          </span>
        ) : mergedOptional ? (
          <span class={`${mergedClsPrefix}-form-item-`}>
            {'\u00A0(Optional)'}
          </span>
        ) : null)
      const helperMessageNode = helpMessage ? (
        <ZTooltip {...this.helpMessageProps} trigger="hover">
          {{
            trigger: () => (
              <span class={`${mergedClsPrefix}-form-item-label__help-icon`}>
                <ZIcon>{{ default: () => <HelpIcon /> }}</ZIcon>
              </span>
            ),
            default: () => helpMessage
          }}
        </ZTooltip>
      ) : null
      const descriptionNode = description ? (
        <ZEllipsis line-clamp={2}>{{ default: () => description }}</ZEllipsis>
      ) : null
      const { labelProps } = this
      return (
        <label
          {...labelProps}
          class={[
            labelProps?.class,
            `${mergedClsPrefix}-form-item-label`,
            `${mergedClsPrefix}-form-item-label--${
              mergedIndicatorPlacement as string
            }-mark`,
            this.reverseColSpace &&
              `${mergedClsPrefix}-form-item-label--reverse-columns-space`
          ]}
          style={this.mergedLabelStyle as any}
          ref="labelElementRef"
        >
          <div class={`${mergedClsPrefix}-form-item-title-wrapper`}>
            {mergedIndicatorPlacement === 'start'
              ? [markNode, textNode, helperMessageNode]
              : [textNode, markNode, helperMessageNode]}
          </div>
          <div class={`${mergedClsPrefix}-form-item-description`}>
            {descriptionNode}
          </div>
        </label>
      )
    }

    return (
      <div
        class={[
          `${mergedClsPrefix}-form-item`,
          this.themeClass,
          `${mergedClsPrefix}-form-item--${this.mergedSize}-size`,
          `${mergedClsPrefix}-form-item--${this.mergedLabelPlacement}-labelled`,
          this.isAutoLabelWidth &&
            `${mergedClsPrefix}-form-item--auto-label-width`,
          !mergedShowLabel && `${mergedClsPrefix}-form-item--no-label`
        ]}
        style={this.cssVars as CSSProperties}
      >
        {mergedShowLabel && renderLabel()}

        <div
          class={[
            `${mergedClsPrefix}-form-item-blank`,
            this.mergedValidationStatus &&
              `${mergedClsPrefix}-form-item-blank--${this.mergedValidationStatus}`
          ]}
        >
          {$slots}
        </div>
        {this.mergedShowFeedback ? (
          <div
            key={this.feedbackId}
            class={`${mergedClsPrefix}-form-item-feedback-wrapper`}
          >
            <Transition name="fade-down-transition" mode="out-in">
              {{
                default: () => {
                  const { mergedValidationStatus } = this
                  return resolveWrappedSlot($slots.feedback, (children) => {
                    const { feedback } = this
                    const feedbackNodes =
                      children || feedback ? (
                        <div
                          key="__feedback__"
                          class={`${mergedClsPrefix}-form-item-feedback__line`}
                        >
                          {FeedbackIcon(
                            mergedClsPrefix,
                            mergedValidationStatus
                          )}
                          {children || feedback}
                        </div>
                      ) : this.renderExplains.length ? (
                        this.renderExplains?.map(({ key, render }) => (
                          <div
                            key={key}
                            class={`${mergedClsPrefix}-form-item-feedback__line`}
                          >
                            {FeedbackIcon(
                              mergedClsPrefix,
                              mergedValidationStatus
                            )}
                            <span>{render()}</span>
                          </div>
                        ))
                      ) : null
                    return feedbackNodes ? (
                      mergedValidationStatus === 'warning' ? (
                        <div
                          key="controlled-warning"
                          class={`${mergedClsPrefix}-form-item-feedback ${mergedClsPrefix}-form-item-feedback--warning`}
                        >
                          {feedbackNodes}
                        </div>
                      ) : mergedValidationStatus === 'error' ? (
                        <div
                          key="controlled-error"
                          class={`${mergedClsPrefix}-form-item-feedback ${mergedClsPrefix}-form-item-feedback--error`}
                        >
                          {feedbackNodes}
                        </div>
                      ) : mergedValidationStatus === 'success' ? (
                        <div
                          key="controlled-success"
                          class={`${mergedClsPrefix}-form-item-feedback ${mergedClsPrefix}-form-item-feedback--success`}
                        >
                          {feedbackNodes}
                        </div>
                      ) : (
                        <div
                          key="controlled-default"
                          class={`${mergedClsPrefix}-form-item-feedback`}
                        >
                          {feedbackNodes}
                        </div>
                      )
                    ) : null
                  })
                }
              }}
            </Transition>
          </div>
        ) : null}
      </div>
    )
  }
})
