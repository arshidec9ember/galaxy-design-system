import {
  h,
  defineComponent,
  type VNode,
  provide,
  type PropType,
  type VNodeChild,
  type ExtractPropTypes,
  type Ref,
  type Slots
} from 'vue'
import type { MergedTheme, ThemeProps } from '../../_mixins'
import { useConfig, useTheme, useRtl } from '../../_mixins'
import { createInjectionKey, flatten, getSlot } from '../../_utils'
import type { ExtractPublicPropTypes, MaybeArray } from '../../_utils'
import type { StepperTheme } from '../styles'
import { stepperLight } from '../styles'
import style from './styles/index.cssr'

function stepWithIndex (step: VNodeChild, i: number): VNode | null {
  if (typeof step !== 'object' || step === null || Array.isArray(step)) {
    return null
  }
  if (!step.props) step.props = {}
  step.props.internalIndex = i + 1
  return step
}

function stepperWithIndex (steps: VNodeChild[]): Array<VNode | null> {
  return steps.map((step, i) => stepWithIndex(step, i))
}

export const stepperProps = {
  ...(useTheme.props as ThemeProps<StepperTheme>),
  current: Number,
  status: {
    type: String as PropType<'process' | 'finish' | 'error' | 'wait'>,
    default: 'process'
  },
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: 'medium'
  },
  vertical: Boolean,
  'onUpdate:current': [Function, Array] as PropType<
  MaybeArray<(current: number) => void>
  >,
  onUpdateCurrent: [Function, Array] as PropType<
  MaybeArray<(current: number) => void>
  >
}

export interface StepperInjection {
  props: ExtractPropTypes<typeof stepperProps>
  mergedClsPrefixRef: Ref<string>
  mergedThemeRef: Ref<MergedTheme<StepperTheme>>
  stepperSlots: Slots
}

export type StepperProps = ExtractPublicPropTypes<typeof stepperProps>

export const stepperInjectionKey =
  createInjectionKey<StepperInjection>('z-stepper')

export default defineComponent({
  name: 'Stepper',
  props: stepperProps,
  setup (props, { slots }) {
    const { mergedClsPrefixRef, mergedRtlRef } = useConfig(props)
    const rtlEnabledRef = useRtl('Stepper', mergedRtlRef, mergedClsPrefixRef)
    const themeRef = useTheme(
      'Stepper',
      '-stepper',
      style,
      stepperLight,
      props,
      mergedClsPrefixRef
    )
    provide(stepperInjectionKey, {
      props,
      mergedThemeRef: themeRef,
      mergedClsPrefixRef,
      stepperSlots: slots
    })
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      rtlEnabled: rtlEnabledRef
    }
  },
  render () {
    const { mergedClsPrefix } = this
    return (
      <div
        class={[
          `${mergedClsPrefix}-stepper`,
          {
            [`${mergedClsPrefix}-stepper--rtl`]: this.rtlEnabled,
            [`${mergedClsPrefix}-stepper--vertical`]: this.vertical,
            [`${mergedClsPrefix}-stepper--horizontal`]: !this.vertical
          }
        ]}
      >
        {stepperWithIndex(flatten(getSlot(this)))}
      </div>
    )
  }
})
