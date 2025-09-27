import {
  h,
  defineComponent,
  computed,
  inject,
  type PropType,
  type CSSProperties
} from 'vue'
import {
  SuccessIcon as FinishedIcon,
  InfoIcon as ErrorIcon
} from '../../_internal/icons'
import { ZIconSwitchTransition, ZBaseIcon } from '../../_internal'
import {
  call,
  createKey,
  resolveSlot,
  resolveWrappedSlot,
  throwError
} from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'
import { stepperInjectionKey } from './Stepper'
import { useConfig, useThemeClass } from '../../_mixins'
import { ZText, ZP, ZTitle } from '../../typography'

export const stepProps = {
  status: {
    type: String as PropType<'process' | 'finish' | 'error' | 'wait'>
  },
  title: String,
  description: String,
  disabled: Boolean,
  // index will be filled by parent stepper, not user
  internalIndex: {
    type: Number,
    default: 0
  }
} as const

export type StepProps = ExtractPublicPropTypes<typeof stepProps>

export default defineComponent({
  name: 'Step',
  props: stepProps,
  setup (props) {
    const ZStepper = inject(stepperInjectionKey, null)

    if (!ZStepper) {
      throwError('step', '`z-step` must be placed inside `z-stepper`.')
    }

    const { inlineThemeDisabled } = useConfig()

    const {
      props: stepperProps,
      mergedThemeRef,
      mergedClsPrefixRef,
      stepperSlots
    } = ZStepper

    const verticalRef = computed(() => {
      return stepperProps.vertical
    })
    const mergedStatusRef = computed<'process' | 'finish' | 'error' | 'wait'>(
      () => {
        const { status } = props
        if (status) {
          return status
        } else {
          const { internalIndex } = props
          const { current } = stepperProps
          if (current === undefined) return 'process'
          if (internalIndex < current) {
            return 'finish'
          } else if (internalIndex === current) {
            return stepperProps.status || 'process'
          } else if (internalIndex > current) {
            return 'wait'
          }
        }
        return 'process'
      }
    )
    const cssVarsRef = computed(() => {
      const { value: status } = mergedStatusRef
      const { size } = stepperProps
      const {
        common: { cubicBezierEaseInOut },
        self: {
          [createKey('stepHeaderFontWeight', status)]: stepHeaderFontWeight,
          [createKey('stepHeaderFontSize', size)]: stepHeaderFontSize,
          [createKey('indicatorIndexFontSize', size)]: indicatorIndexFontSize,
          [createKey('indicatorSize', size)]: indicatorSize,
          [createKey('indicatorIconSize', size)]: indicatorIconSize,
          [createKey('indicatorTextColor', status)]: indicatorTextColor,
          [createKey('indicatorIconColor', status)]: indicatorIconColor,
          [createKey('indicatorBorderColor', status)]: indicatorBorderColor,
          [createKey('headerTextColor', status)]: headerTextColor,
          [createKey('hoverTextColor', status)]: hoverTextColor,
          [createKey('hoverIndicatorColor', status)]: hoverIndicatorColor,
          [createKey('hoverIndicatorBorderColor', status)]:
            hoverIndicatorBorderColor,
          [createKey('hoverDescriptionColor', status)]: hoverDescriptionColor,
          [createKey('splitorColor', status)]: splitorColor,
          [createKey('splitorBorderStyle', status)]: splitorBorderStyle,
          [createKey('indicatorColor', status)]: indicatorColor,
          [createKey('descriptionTextColor', status)]: descriptionTextColor
        }
      } = mergedThemeRef.value
      return {
        '--z-bezier': cubicBezierEaseInOut,
        '--z-description-text-color': descriptionTextColor,
        '--z-header-text-color': headerTextColor,
        '--z-step-header-font-weight': stepHeaderFontWeight,
        '--z-hover-text-color': hoverTextColor,
        '--z-hover-description-color': hoverDescriptionColor,
        '--z-hover-indicator-color': hoverIndicatorColor,
        '--z-hover-indicator-border-color': hoverIndicatorBorderColor,
        '--z-indicator-border-color': indicatorBorderColor,
        '--z-indicator-color': indicatorColor,
        '--z-indicator-icon-size': indicatorIconSize,
        '--z-indicator-index-font-size': indicatorIndexFontSize,
        '--z-indicator-size': indicatorSize,
        '--z-indicator-text-color': indicatorTextColor,
        '--z-indicator-icon-color': indicatorIconColor,
        '--z-splitor-color': splitorColor,
        '--z-splitor-border-style': splitorBorderStyle,
        '--z-step-header-font-size': stepHeaderFontSize
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'step',
        computed(() => {
          const { value: status } = mergedStatusRef
          const { size } = stepperProps
          return `${status[0]}${size[0]}`
        }),
        cssVarsRef,
        stepperProps
      )
      : undefined

    const handleStepClick = computed((): undefined | (() => void) => {
      if (props.disabled) return undefined
      const { onUpdateCurrent, 'onUpdate:current': _onUpdateCurrent } =
        stepperProps
      return onUpdateCurrent || _onUpdateCurrent
        ? () => {
            if (onUpdateCurrent) {
              call(onUpdateCurrent, props.internalIndex)
            }
            if (_onUpdateCurrent) {
              call(_onUpdateCurrent, props.internalIndex)
            }
          }
        : undefined
    })
    return {
      stepperSlots,
      mergedClsPrefix: mergedClsPrefixRef,
      vertical: verticalRef,
      mergedStatus: mergedStatusRef,
      handleStepClick,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    const { mergedClsPrefix, onRender, handleStepClick, disabled } = this
    const descriptionNode = resolveWrappedSlot(
      this.$slots.default,
      (children) => {
        const mergedDescription = children || this.description
        if (mergedDescription) {
          return (
            <ZP class={`${mergedClsPrefix}-step-content__description`}>
              {mergedDescription}
            </ZP>
          )
        }
        return null
      }
    )
    onRender?.()
    return (
      <div
        class={[
          `${mergedClsPrefix}-step`,
          disabled && `${mergedClsPrefix}-step--disabled`,
          !disabled && handleStepClick && `${mergedClsPrefix}-step--clickable`,
          this.themeClass,
          descriptionNode && `${mergedClsPrefix}-step--show-description`,
          `${mergedClsPrefix}-step--${this.mergedStatus}-status`
        ]}
        style={this.cssVars as CSSProperties}
        onClick={handleStepClick}
      >
        <div class={`${mergedClsPrefix}-step-indicator`}>
          <div class={`${mergedClsPrefix}-step-indicator-slot`}>
            <ZIconSwitchTransition>
              {{
                default: () => {
                  return resolveWrappedSlot(this.$slots.icon, (icon) => {
                    const { mergedStatus, stepperSlots } = this
                    return !(
                      mergedStatus === 'finish' || mergedStatus === 'error'
                    ) ? (
                          icon || (
                        <ZTitle
                          variant="6-r"
                          key={this.internalIndex}
                          class={`${mergedClsPrefix}-step-indicator-slot__index`}
                        >
                          {this.internalIndex}
                        </ZTitle>
                          )
                        ) : mergedStatus === 'finish' ? (
                      <ZBaseIcon clsPrefix={mergedClsPrefix} key="finish">
                        {{
                          default: () =>
                            resolveSlot(stepperSlots['finish-icon'], () => [
                              <FinishedIcon />
                            ])
                        }}
                      </ZBaseIcon>
                        ) : mergedStatus === 'error' ? (
                      <ZBaseIcon clsPrefix={mergedClsPrefix} key="error">
                        {{
                          default: () =>
                            resolveSlot(stepperSlots['error-icon'], () => [
                              <ErrorIcon />
                            ])
                        }}
                      </ZBaseIcon>
                        ) : null
                  })
                }
              }}
            </ZIconSwitchTransition>
          </div>
          <div class={`${mergedClsPrefix}-step-splitor`} />
        </div>
        <header class={`${mergedClsPrefix}-step-content`}>
          <div class={`${mergedClsPrefix}-step-content-header`}>
            <ZText
              variant={this.mergedStatus === 'process' ? '3-m' : '3-r'}
              class={`${mergedClsPrefix}-step-content-header__title`}
            >
              {{ default: () => this.title }}
            </ZText>
          </div>
          {descriptionNode}
        </header>
      </div>
    )
  }
})
