import { h, defineComponent, computed, type CSSProperties } from 'vue'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { typographyLight } from '../styles'
import type { TypographyTheme } from '../styles'
import style from './styles/label.cssr'
import type { ExtractPublicPropTypes } from '../../_utils'

import { createKey } from '../../_utils'
export const labelProps = {
  variant: {
    type: String,
    default: '1-r'
  },
  ...(useTheme.props as ThemeProps<TypographyTheme>)
}

export type LabelProps = ExtractPublicPropTypes<typeof labelProps>

export default defineComponent({
  name: 'Label',
  props: labelProps,
  setup (props) {
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
    const themeRef = useTheme(
      'Typography',
      '-label',
      style,
      typographyLight,
      props,
      mergedClsPrefixRef
    )
    const cssVarsRef = computed(() => {
      const {
        common: { cubicBezierEaseInOut },
        self: { labelTextColor }
      } = themeRef.value

      const variant = themeRef.value.self[createKey('fontLabel', props.variant)]
      return {
        '--z-bezier': cubicBezierEaseInOut,
        '--z-text-color': labelTextColor,
        '--z-font': variant
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('label', undefined, cssVarsRef, props)
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
      <label
        class={[`${this.mergedClsPrefix}-label`, this.themeClass]}
        style={this.cssVars as CSSProperties}
      >
        {this.$slots}
      </label>
    )
  }
})
