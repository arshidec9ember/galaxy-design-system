import {
  h,
  defineComponent,
  computed,
  type PropType,
  type CSSProperties
} from 'vue'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { typographyLight } from '../styles'
import type { TypographyTheme } from '../styles'
import style from './styles/p.cssr'
import type { ExtractPublicPropTypes } from '../../_utils'

import { createKey } from '../../_utils'
export const pProps = {
  variant: {
    type: String,
    default: '2-r'
  },
  ...(useTheme.props as ThemeProps<TypographyTheme>),
  depth: [String, Number] as PropType<1 | 2 | 3 | '1' | '2' | '3'>
}

export type PProps = ExtractPublicPropTypes<typeof pProps>

export default defineComponent({
  name: 'P',
  props: pProps,
  setup (props) {
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
    const themeRef = useTheme(
      'Typography',
      '-p',
      style,
      typographyLight,
      props,
      mergedClsPrefixRef
    )
    const cssVarsRef = computed(() => {
      const { depth } = props
      const typeSafeDepth = depth || '1'
      const {
        common: { cubicBezierEaseInOut },
        self: {
          pTextColor,
          [`pTextColor${typeSafeDepth}Depth` as const]: depthTextColor
        }
      } = themeRef.value

      const variant =
        themeRef.value.self[createKey('fontParagraph', props.variant)]
      return {
        '--z-bezier': cubicBezierEaseInOut,
        '--z-text-color': depth === undefined ? pTextColor : depthTextColor,
        '--z-font': variant
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'p',
        computed(() => `${props.depth || ''}`),
        cssVarsRef,
        props
      )
      : undefined
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    this.onRender?.()
    return (
      <p
        class={[`${this.mergedClsPrefix}-p`, this.themeClass]}
        style={this.cssVars as CSSProperties}
      >
        {this.$slots}
      </p>
    )
  }
})
