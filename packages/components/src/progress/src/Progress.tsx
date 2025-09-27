import {
  h,
  computed,
  defineComponent,
  type PropType,
  type CSSProperties
} from 'vue'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { createKey, type ExtractPublicPropTypes } from '../../_utils'
import { progressLight } from '../styles'
import type { ProgressTheme } from '../styles'
import style from './styles/index.cssr'
import { type Status } from './interface'
import Line from './Line'
import Circle from './Circle'
import MultipleCircle from './MultipleCircle'

export const progressProps = {
  ...(useTheme.props as ThemeProps<ProgressTheme>),
  processing: Boolean,
  indeterminant: Boolean,
  variant: {
    type: String as PropType<
    'line' | 'circle' | 'multiple-circle' | 'dashboard'
    >,
    default: 'line'
  },
  gapDegree: Number,
  gapOffsetDegree: Number,
  status: {
    type: String as PropType<Status>,
    default: 'primary'
  },
  railStyle: [String, Array] as PropType<
  string | CSSProperties | Array<string | CSSProperties>
  >,
  color: {
    type: Object as PropType<{
      color: string | string[]
      railColor: string | string[]
      indicatorTextColor: string
    }>,
    default: {}
  },
  viewBoxWidth: {
    type: Number,
    default: 100
  },
  strokeWidth: {
    type: Number,
    default: 7
  },
  percentage: [Number, Array] as PropType<number | number[]>,
  unit: {
    type: String,
    default: '%'
  },
  showIndicator: {
    type: Boolean,
    default: true
  },
  indicatorPosition: {
    type: String as PropType<'inside' | 'outside'>,
    default: 'outside'
  },
  indicatorPlacement: {
    type: String as PropType<'inside' | 'outside'>,
    default: 'outside'
  },
  circleGap: {
    type: Number,
    default: 1
  },
  height: Number,
  borderRadius: [String, Number] as PropType<string | number>,
  fillBorderRadius: [String, Number] as PropType<string | number>,
  offsetDegree: Number
} as const

export type ProgressProps = ExtractPublicPropTypes<typeof progressProps>

export default defineComponent({
  name: 'Progress',
  props: progressProps,
  setup (props) {
    const mergedIndicatorPlacementRef = computed(() => {
      return props.indicatorPlacement || props.indicatorPosition
    })
    const gapDeg = computed(() => {
      if (props.gapDegree || props.gapDegree === 0) {
        return props.gapDegree
      }
      if (props.variant === 'dashboard') {
        return 75
      }
      return undefined
    })
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)

    const themeRef = useTheme(
      'Progress',
      '-progress',
      style,
      progressLight,
      props,
      mergedClsPrefixRef
    )
    const cssVarsRef = computed(() => {
      const { status } = props
      const {
        common: { cubicBezierEaseInOut },
        self: {
          fontSize,
          fontSizeCircle,
          railColor,
          railHeight,
          iconSizeCircle,
          iconSizeLine,
          textColorCircle,
          textColorLineInner,
          textColorLineOuter,
          lineBgProcessing,
          fontWeightCircle,
          [createKey('iconColor', status)]: iconColor,
          [createKey('fillColor', status)]: fillColor
        }
      } = themeRef.value
      return {
        '--z-bezier': cubicBezierEaseInOut,
        '--z-fill-color': fillColor,
        '--z-font-size': fontSize,
        '--z-font-size-circle': fontSizeCircle,
        '--z-font-weight-circle': fontWeightCircle,
        '--z-icon-color': iconColor,
        '--z-icon-size-circle': iconSizeCircle,
        '--z-icon-size-line': iconSizeLine,
        '--z-line-bg-processing': lineBgProcessing,
        '--z-rail-color': railColor,
        '--z-rail-height': railHeight,
        '--z-text-color-circle': textColorCircle,
        '--z-text-color-line-inner': textColorLineInner,
        '--z-text-color-line-outer': textColorLineOuter
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'progress',
        computed(() => props.status[0]),
        cssVarsRef,
        props
      )
      : undefined
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      mergedIndicatorPlacement: mergedIndicatorPlacementRef,
      gapDeg,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    // it's ok to expand all prop here since no slots' deps
    const {
      variant,
      cssVars,
      showIndicator,
      status,
      railStyle,
      color,
      percentage,
      viewBoxWidth,
      strokeWidth,
      mergedIndicatorPlacement,
      unit,
      borderRadius,
      fillBorderRadius,
      height,
      processing,
      indeterminant,
      circleGap,
      mergedClsPrefix,
      gapDeg,
      gapOffsetDegree,
      themeClass,
      $slots,
      onRender
    } = this

    const { indicatorTextColor, railColor, color: _color } = color || {}
    onRender?.()
    return (
      <div
        class={[
          themeClass,
          `${mergedClsPrefix}-progress`,
          `${mergedClsPrefix}-progress--${variant}`,
          `${mergedClsPrefix}-progress--${status}`
        ]}
        style={cssVars as CSSProperties}
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={percentage as number}
        role={
          variant === 'circle' || variant === 'line' || variant === 'dashboard'
            ? 'progressbar'
            : 'none'
        }
      >
        {variant === 'circle' || variant === 'dashboard' ? (
          <Circle
            clsPrefix={mergedClsPrefix}
            status={status}
            showIndicator={showIndicator}
            indicatorTextColor={indicatorTextColor}
            railColor={railColor as any}
            fillColor={_color as any}
            railStyle={railStyle as any}
            offsetDegree={this.offsetDegree}
            percentage={percentage as number}
            viewBoxWidth={viewBoxWidth}
            strokeWidth={strokeWidth}
            gapDegree={
              gapDeg === undefined ? (variant === 'dashboard' ? 75 : 0) : gapDeg
            }
            gapOffsetDegree={gapOffsetDegree}
            unit={unit}
          >
            {$slots}
          </Circle>
        ) : variant === 'line' ? (
          <Line
            clsPrefix={mergedClsPrefix}
            status={status}
            showIndicator={showIndicator}
            indicatorTextColor={indicatorTextColor}
            railColor={railColor as any}
            fillColor={_color as any}
            railStyle={railStyle as any}
            percentage={percentage as number}
            processing={processing}
            indicatorPlacement={mergedIndicatorPlacement}
            unit={unit}
            fillBorderRadius={fillBorderRadius}
            railBorderRadius={borderRadius}
            height={height}
            indeterminant={indeterminant}
          >
            {$slots}
          </Line>
        ) : variant === 'multiple-circle' ? (
          <MultipleCircle
            clsPrefix={mergedClsPrefix}
            strokeWidth={strokeWidth}
            railColor={railColor as any}
            fillColor={_color as any}
            railStyle={railStyle as any}
            viewBoxWidth={viewBoxWidth}
            percentage={percentage as number[]}
            showIndicator={showIndicator}
            circleGap={circleGap}
          >
            {$slots}
          </MultipleCircle>
        ) : null}
      </div>
    )
  }
})
