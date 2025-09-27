import { h, defineComponent, computed } from 'vue'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { createKey, type ExtractPublicPropTypes } from '../../_utils'
import { typographyLight } from '../styles'
import type { TypographyTheme } from '../styles'
import style from './styles/header.cssr'

export const headerProps = {
  ...(useTheme.props as ThemeProps<TypographyTheme>)
} as const

export type HeaderProps = ExtractPublicPropTypes<typeof headerProps>

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default (level: '1' | '2' | '3' | '4' | '5' | '6') =>
  defineComponent({
    name: `H${level}`,
    props: headerProps,
    setup (props) {
      const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
      const themeRef = useTheme(
        'Typography',
        '-h',
        style,
        typographyLight,
        props,
        mergedClsPrefixRef
      )
      const cssVarsRef = computed(() => {
        const {
          common: { cubicBezierEaseInOut },
          self: {
            headerFontWeight,
            headerTextColor,

            [createKey('headingFontSize', level)]: fontSize,
            [createKey('headingMargin', level)]: margin,

            headingLineHeight
          }
        } = themeRef.value
        return {
          '--z-bezier': cubicBezierEaseInOut,
          '--z-font-size': fontSize,
          '--z-line-height': headingLineHeight,
          '--z-margin': margin,
          '--z-font-weight': headerFontWeight,
          '--z-text-color': headerTextColor
        }
      })
      const themeClassHandle = inlineThemeDisabled
        ? useThemeClass(`h${level}`, undefined, cssVarsRef, props)
        : undefined
      return {
        mergedClsPrefix: mergedClsPrefixRef,
        cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
        themeClass: themeClassHandle?.themeClass,
        onRender: themeClassHandle?.onRender
      }
    },
    render () {
      const { mergedClsPrefix, cssVars, $slots } = this
      this.onRender?.()
      return h(
        `h${level}`,
        {
          class: [
            `${mergedClsPrefix}-h`,
            `${mergedClsPrefix}-h${level}`,
            this.themeClass
          ],
          style: cssVars
        },
        $slots
      )
    }
  })
