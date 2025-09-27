import { h, defineComponent, computed } from 'vue'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { layoutLight } from '../styles'
import type { LayoutTheme } from '../styles'
import { positionProp } from './interface'
import style from './styles/layout-header.cssr'
import type { ExtractPublicPropTypes } from '../../_utils'

export const headerProps = {
  position: positionProp,
  inverted: Boolean,
  bordered: {
    type: Boolean,
    default: false
  }
} as const

export type LayoutHeaderProps = ExtractPublicPropTypes<typeof headerProps>

export default defineComponent({
  name: 'LayoutHeader',
  props: {
    ...(useTheme.props as ThemeProps<LayoutTheme>),
    ...headerProps
  },
  setup (props) {
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
    const themeRef = useTheme(
      'Layout',
      '-layout-header',
      style,
      layoutLight,
      props,
      mergedClsPrefixRef
    )
    const cssVarsRef = computed(() => {
      const {
        common: { cubicBezierEaseInOut },
        self
      } = themeRef.value
      const vars: any = {
        '--z-bezier': cubicBezierEaseInOut
      }
      if (props.inverted) {
        vars['--z-color'] = self.headerColorInverted
        vars['--z-text-color'] = self.textColorInverted
        vars['--z-border-color'] = self.headerBorderColorInverted
      } else {
        vars['--z-color'] = self.headerColor
        vars['--z-text-color'] = self.textColor
        vars['--z-border-color'] = self.headerBorderColor
      }
      return vars
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'layout-header',
        computed(() => (props.inverted ? 'a' : 'b')),
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
    const { mergedClsPrefix } = this
    this.onRender?.()
    return (
      <div
        class={[
          `${mergedClsPrefix}-layout-header`,
          this.themeClass,
          this.position &&
            `${mergedClsPrefix}-layout-header--${this.position}-positioned`,
          this.bordered && `${mergedClsPrefix}-layout-header--bordered`
        ]}
        style={this.cssVars as any}
      >
        {this.$slots}
      </div>
    )
  }
})
