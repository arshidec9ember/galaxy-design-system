import { computed, defineComponent, h, type PropType } from 'vue'
import { type ThemeProps, useConfig, useTheme } from '../../_mixins'
import { useHoudini } from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'
import type { SkeletonTheme } from '../styles'
import { skeletonLight } from '../styles'
import style from './styles/index.cssr'
import { ContentLoader } from 'vue-content-loader'

export const skeletonProps = {
  ...(useTheme.props as ThemeProps<SkeletonTheme>),
  width: {
    type: [Number, String] as PropType<string | number>
  },
  height: {
    type: [Number, String] as PropType<string | number>
  },
  viewBox: {
    type: String
  },
  preserveAspectRatio: {
    type: String,
    default: 'xMidYMid meet'
  },
  speed: {
    type: Number,
    default: 2
  },
  baseUrl: {
    type: String,
    default: ''
  },
  uniqueKey: {
    type: String
  },
  animate: {
    type: Boolean,
    default: true
  }
} as const

export type SkeletonProps = ExtractPublicPropTypes<typeof skeletonProps>

export default defineComponent({
  name: 'Skeleton',
  inheritAttrs: false,
  props: skeletonProps,
  setup (props) {
    useHoudini()
    const { mergedClsPrefixRef } = useConfig(props)
    const themeRef = useTheme(
      'Skeleton',
      '-skeleton',
      style,
      skeletonLight,
      props,
      mergedClsPrefixRef
    )
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      modifiedProps: computed(() => {
        const theme = themeRef.value
        const selfThemeVars = theme.self
        const { color, colorEnd, colorEndOpacity, colorOpacity } = selfThemeVars
        return {
          primaryColor: color,
          secondaryColor: colorEnd,
          colorEndOpacity,
          primaryOpacity: colorOpacity
        }
      }),
      style: computed(() => {
        const theme = themeRef.value
        const {
          common: { cubicBezierEaseInOut }
        } = theme
        const selfThemeVars = theme.self
        const { color, colorEnd } = selfThemeVars

        return {
          // TODO: bezier curve not working | need to create map to content loader
          '--z-bezier': cubicBezierEaseInOut,
          '--z-color-start': color,
          '--z-color-end': colorEnd
        }
      })
    }
  },
  render () {
    const { style, mergedClsPrefix, $props, $attrs, $slots, modifiedProps } =
      this
    return (
      <ContentLoader
        style={style}
        class={`${mergedClsPrefix}-skeleton`}
        primaryColor={modifiedProps.primaryColor}
        secondaryColor={modifiedProps.secondaryColor}
        primaryOpacity={modifiedProps.primaryOpacity}
        secondaryOpacity={modifiedProps.colorEndOpacity}
        {...$attrs}
        {...$props}
      >
        {$slots}
      </ContentLoader>
    )
  }
})
