import { h, defineComponent, computed, type CSSProperties } from 'vue'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { typographyLight } from '../styles'
import type { TypographyTheme } from '../styles'
import style from './styles/title.cssr'
import type { ExtractPublicPropTypes } from '../../_utils'

import { createKey } from '../../_utils'
export const titleProps = {
  variant: {
    type: String,
    default: '1-sb'
  },
  delete: Boolean,
  strong: Boolean,
  italic: Boolean,
  underline: Boolean,
  ...(useTheme.props as ThemeProps<TypographyTheme>)
}

export type TitleProps = ExtractPublicPropTypes<typeof titleProps>

export default defineComponent({
  name: 'Title',
  props: titleProps,
  setup (props) {
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
    const themeRef = useTheme(
      'Typography',
      '-title',
      style,
      typographyLight,
      props,
      mergedClsPrefixRef
    )
    const cssVarsRef = computed(() => {
      const {
        common: { cubicBezierEaseInOut },
        self: { titleTextColor }
      } = themeRef.value

      const variant =
        themeRef.value.self[createKey('fontHeading', props.variant)]
      const letterSpacing =
        themeRef.value.self[createKey('letterSpacingHeading', props.variant)]
      return {
        '--z-bezier': cubicBezierEaseInOut,
        '--z-text-color': titleTextColor,
        '--z-font': variant,
        '--z-letter-spacing': letterSpacing
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('title', undefined, cssVarsRef, props)
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
    const titleClass = [
      `${mergedClsPrefix}-title`,
      this.themeClass,
      {
        [`${mergedClsPrefix}-title--delete`]: this.delete,
        [`${mergedClsPrefix}-title--strong`]: this.strong,
        [`${mergedClsPrefix}-title--italic`]: this.italic,
        [`${mergedClsPrefix}-title--underline`]: this.underline
      }
    ]

    return (
      <div
        role="heading"
        class={titleClass}
        style={this.cssVars as CSSProperties}
      >
        {this.$slots}
      </div>
    )
  }
})
