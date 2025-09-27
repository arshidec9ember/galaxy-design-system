import { h, defineComponent, computed, type CSSProperties } from 'vue'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { typographyLight } from '../styles'
import type { TypographyTheme } from '../styles'
import style from './styles/list.cssr'
import type { ExtractPublicPropTypes } from '../../_utils'

export const ulProps = {
  ...(useTheme.props as ThemeProps<TypographyTheme>),
  indent: Boolean
} as const

export type UlProps = ExtractPublicPropTypes<typeof ulProps>

export default defineComponent({
  name: 'Ul',
  props: ulProps,
  setup (props) {
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
    const themeRef = useTheme(
      'Typography',
      '-xl',
      style,
      typographyLight,
      props,
      mergedClsPrefixRef
    )
    const cssVarsRef = computed(() => {
      const {
        common: { cubicBezierEaseInOut },
        self: {
          olPadding,
          ulPadding,
          liMargin,
          liTextColor,
          liLineHeight,
          liFontSize
        }
      } = themeRef.value
      return {
        '--z-bezier': cubicBezierEaseInOut,
        '--z-font-size': liFontSize,
        '--z-line-height': liLineHeight,
        '--z-text-color': liTextColor,
        '--z-li-margin': liMargin,
        '--z-ol-padding': olPadding,
        '--z-ul-padding': ulPadding
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('ul', undefined, cssVarsRef, props)
      : undefined
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    const { mergedClsPrefix } = this
    this.onRender?.()
    return (
      <ul
        class={[
          `${mergedClsPrefix}-ul`,
          this.themeClass,
          this.indent && `${mergedClsPrefix}-ul--indent`
        ]}
        style={this.cssVars as CSSProperties}
      >
        {this.$slots}
      </ul>
    )
  }
})
