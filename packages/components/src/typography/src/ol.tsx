import { h, defineComponent, computed, type CSSProperties } from 'vue'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { typographyLight } from '../styles'
import type { TypographyTheme } from '../styles'
import type { ExtractPublicPropTypes } from '../../_utils'
import style from './styles/list.cssr'

export const olProps = {
  ...(useTheme.props as ThemeProps<TypographyTheme>),
  indent: Boolean
}

export type OlProps = ExtractPublicPropTypes<typeof olProps>

export default defineComponent({
  name: 'Ol',
  props: olProps,
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
      ? useThemeClass('ol', undefined, cssVarsRef, props)
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
      <ol
        class={[
          `${mergedClsPrefix}-ol`,
          this.themeClass,
          this.indent && `${mergedClsPrefix}-ol--indent`
        ]}
        style={this.cssVars as CSSProperties}
      >
        {this.$slots}
      </ol>
    )
  }
})
