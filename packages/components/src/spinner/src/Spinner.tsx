import {
  computed,
  defineComponent,
  h,
  Transition,
  type PropType,
  type CSSProperties,
  ref,
  watchEffect
} from 'vue'
import { useCompitable } from '../../_external-dependencies/vooks'
import { pxfy } from 'seemly'
import { ZBaseLoading } from '../../_internal'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { createKey, type ExtractPublicPropTypes, warnOnce } from '../../_utils'
import { spinnerLight } from '../styles'
import type { SpinnerTheme } from '../styles'
import style from './styles/index.cssr'

const STROKE_WIDTH = {
  small: 20,
  medium: 18,
  large: 16
}

export const spinnerProps = {
  ...(useTheme.props as ThemeProps<SpinnerTheme>),
  description: String,
  color: String,
  size: {
    type: [String, Number] as PropType<'small' | 'medium' | 'large' | number>,
    default: 'medium'
  },
  inverted: {
    type: Boolean,
    default: true
  },
  show: {
    type: Boolean,
    default: true
  },
  strokeWidth: Number,
  rotate: {
    type: Boolean,
    default: true
  },
  spinning: {
    type: Boolean,
    validator: () => {
      return true
    },
    default: undefined
  },
  delay: Number
}

export type SpinnerProps = ExtractPublicPropTypes<typeof spinnerProps>

export default defineComponent({
  name: 'Spinner',
  props: spinnerProps,
  setup (props) {
    if (__DEV__) {
      watchEffect(() => {
        if (props.spinning !== undefined) {
          warnOnce(
            'spinner',
            '`spinning` is deprecated, please use `show` instead.'
          )
        }
      })
    }
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
    const themeRef = useTheme(
      'Spinner',
      '-spinner',
      style,
      spinnerLight,
      props,
      mergedClsPrefixRef
    )
    const cssVarsRef = computed(() => {
      const { size: spinnerSize, inverted } = props
      const {
        common: { cubicBezierEaseInOut },
        self
      } = themeRef.value
      const {
        opacitySpinning,
        color,
        invertedColor,
        textColor,
        invertedTextColor,
        secondaryColor,
        invertedSecondaryColor,
        scrimColor
      } = self
      const size =
        typeof spinnerSize === 'number'
          ? pxfy(spinnerSize)
          : self[createKey('size', spinnerSize)]
      return {
        '--z-bezier': cubicBezierEaseInOut,
        '--z-opacity-spinning': opacitySpinning,
        '--z-size': size,
        '--z-scrim-color': scrimColor,
        '--z-color': inverted ? invertedColor : color,
        '--z-secondary-color': inverted
          ? invertedSecondaryColor
          : secondaryColor,
        '--z-text-color': inverted ? invertedTextColor : textColor
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'spinner',
        computed(() => {
          const { size } = props
          return typeof size === 'number' ? String(size) : size[0]
        }),
        cssVarsRef,
        props
      )
      : undefined

    const compitableShow = useCompitable(props, ['spinning', 'show'])
    const activeRef = ref(false)

    watchEffect((onCleanup) => {
      let timerId: number
      if (compitableShow.value) {
        const { delay } = props
        if (delay) {
          timerId = window.setTimeout(() => {
            activeRef.value = true
          }, props.delay)
          onCleanup(() => {
            clearTimeout(timerId)
          })
          return
        }
      }
      activeRef.value = compitableShow.value
    })

    return {
      mergedClsPrefix: mergedClsPrefixRef,
      active: activeRef,
      mergedStrokeWidth: computed(() => {
        const { strokeWidth } = props
        if (strokeWidth !== undefined) return strokeWidth
        const { size } = props
        return STROKE_WIDTH[typeof size === 'number' ? 'medium' : size]
      }),
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    const { $slots, mergedClsPrefix, description } = this
    const rotate = $slots.icon && this.rotate
    const descriptionNode = (description || $slots.description) && (
      <div class={`${mergedClsPrefix}-spinner-description`}>
        {description || $slots.description?.()}
      </div>
    )
    const icon = $slots.icon ? (
      <div class={[`${mergedClsPrefix}-spinner-body`, this.themeClass]}>
        <div
          class={[
            `${mergedClsPrefix}-spinner`,
            rotate && `${mergedClsPrefix}-spinner--rotate`
          ]}
          style={$slots.default ? '' : (this.cssVars as CSSProperties)}
        >
          {$slots.icon()}
        </div>
        {descriptionNode}
      </div>
    ) : (
      <div class={[`${mergedClsPrefix}-spinner-body`, this.themeClass]}>
        <ZBaseLoading
          clsPrefix={mergedClsPrefix}
          style={$slots.default ? '' : (this.cssVars as CSSProperties)}
          stroke={this.color}
          stroke-width={this.mergedStrokeWidth}
          class={`${mergedClsPrefix}-spinner`}
        />
        {descriptionNode}
      </div>
    )
    this.onRender?.()
    return $slots.default ? (
      <div
        class={[`${mergedClsPrefix}-spinner-container`, this.themeClass]}
        style={this.cssVars as CSSProperties}
      >
        <div
          class={[
            `${mergedClsPrefix}-spinner-content`,
            this.active && `${mergedClsPrefix}-spinner-content--spinning`
          ]}
        >
          {$slots}
        </div>
        <Transition name="fade-in-transition">
          {{
            default: () => (this.active ? icon : null)
          }}
        </Transition>
      </div>
    ) : (
      icon
    )
  }
})
