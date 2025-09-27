import {
  h,
  defineComponent,
  computed,
  type PropType,
  type CSSProperties
} from 'vue'
import { useCompitable } from '../../_external-dependencies/vooks'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { warn, createKey } from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'
import { typographyLight } from '../styles'
import type { TypographyTheme } from '../styles'
import style from './styles/text.cssr'

export type Opacity = 'subtle' | 'mild' | 'moderate' | 'strong' | 'intense'

export const textProps = {
  ...(useTheme.props as ThemeProps<TypographyTheme>),
  code: Boolean,
  color: {
    type: String as PropType<
    'neutral' | 'success' | 'info' | 'warning' | 'error' | string
    >,
    default: 'neutral'
  },
  variant: {
    type: String,
    default: '3-r'
  },
  delete: Boolean,
  strong: Boolean,
  italic: Boolean,
  underline: Boolean,
  opacity: {
    type: [Number, String] as PropType<Opacity | number>,
    required: false,
    default: 1,
    validator: (value: number | string) => {
      if (typeof value === 'string') {
        return ['subtle', 'mild', 'moderate', 'strong', 'intense'].includes(
          value
        )
      } else {
        return value >= 0 && value <= 1
      }
    }
  },
  transform: {
    type: String as PropType<'uppercase' | 'lowercase' | 'capitalize' | 'none'>,
    default: 'none'
  },
  tag: String,
  // deprecated
  as: {
    type: String,
    validator: () => {
      if (__DEV__) {
        warn('text', '`as` is deprecated, please use `tag` instead.')
      }
      return true
    },
    default: undefined
  }
} as const

export type TextProps = ExtractPublicPropTypes<typeof textProps>

export default defineComponent({
  name: 'Text',
  props: textProps,
  setup (props) {
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
    const themeRef = useTheme(
      'Typography',
      '-text',
      style,
      typographyLight,
      props,
      mergedClsPrefixRef
    )
    const cssVarsRef = computed(() => {
      const { opacity, transform, color } = props
      const textColorKey =
        color === 'neutral' ? 'textColor' : createKey('textColor', color)
      const {
        common: { fontWeightStrong, fontFamilyMono, cubicBezierEaseInOut },
        self: {
          codeTextColor,
          codeBorderRadius,
          codeColor,
          codeBorder,
          opacity1,
          opacity2,
          opacity3,
          opacity4,
          opacity5,
          [textColorKey as 'textColor']: textColor
        }
      } = themeRef.value

      const opacitySemanticMap: Record<Opacity, string> = {
        subtle: opacity5,
        mild: opacity4,
        moderate: opacity3,
        strong: opacity2,
        intense: opacity1
      }
      const derivedOpacity = opacitySemanticMap[opacity as Opacity] || opacity

      const variant = props.code
        ? themeRef.value.self.fontCode1R
        : themeRef.value.self[createKey('fontBody', props.variant)]
      return {
        '--z-bezier': cubicBezierEaseInOut,
        '--z-text-color': !color.match('neutral|success|info|warning|error')
          ? color
          : textColor,
        '--z-font-weight-strong': fontWeightStrong,
        '--z-font-family-mono': fontFamilyMono,
        '--z-code-border-radius': codeBorderRadius,
        '--z-code-text-color': codeTextColor,
        '--z-code-color': codeColor,
        '--z-code-border': codeBorder,
        '--z-text-opacity': String(derivedOpacity),
        '--z-text-transform': transform || 'none',
        '--z-font': variant
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'text',
        computed(() => `${props.color[0]}`),
        cssVarsRef,
        props
      )
      : undefined
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      compitableTag: useCompitable(props, ['as', 'tag']),
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    const { mergedClsPrefix } = this
    this.onRender?.()
    const textClass = [
      `${mergedClsPrefix}-text`,
      this.themeClass,
      {
        [`${mergedClsPrefix}-text--${this.tag || ''}`]: this.tag,
        [`${mergedClsPrefix}-text--no-tag`]: !this.tag,
        [`${mergedClsPrefix}-text--code`]: this.code,
        [`${mergedClsPrefix}-text--delete`]: this.delete,
        [`${mergedClsPrefix}-text--strong`]: this.strong,
        [`${mergedClsPrefix}-text--italic`]: this.italic,
        [`${mergedClsPrefix}-text--underline`]: this.underline
      }
    ]
    const children = this.$slots.default?.()
    return this.code ? (
      <code class={textClass} style={this.cssVars as CSSProperties}>
        {this.delete ? <del>{children}</del> : children}
      </code>
    ) : this.delete ? (
      <del class={textClass} style={this.cssVars as CSSProperties}>
        {children}
      </del>
    ) : (
      h(
        this.compitableTag || 'span',
        { class: textClass, style: this.cssVars },
        children
      )
    )
  }
})
