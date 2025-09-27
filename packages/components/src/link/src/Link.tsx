import {
  h,
  computed,
  type PropType,
  defineComponent,
  type CSSProperties
} from 'vue'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import type { ExtractPublicPropTypes } from '../../_utils'
import { linkLight } from '../styles'
import type { LinkTheme } from '../styles'
import style from './styles/index.cssr'
import { OpenNewTab } from '../../_internal/icons'
import { ZBaseIcon } from '../../_internal'
import { ZA } from '../../typography'

export const linkProps = {
  ...(useTheme.props as ThemeProps<LinkTheme>),
  href: String,
  disabled: Boolean as PropType<boolean>,
  type: {
    type: String as PropType<'active' | 'default'>,
    default: 'default'
  },
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: 'medium'
  },
  isInline: {
    type: Boolean,
    default: false
  },
  isBold: {
    type: Boolean,
    default: false
  },
  showExternalLinkIcon: {
    type: Boolean,
    default: true
  }
} as const

export type LinkProps = ExtractPublicPropTypes<typeof linkProps>

export default defineComponent({
  name: 'Link',
  props: linkProps,
  setup (props, { attrs }) {
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
    const themeRef = useTheme(
      'Link',
      '-link',
      style,
      linkLight,
      props,
      mergedClsPrefixRef
    )
    const textVariant = computed(() => {
      if (props.isBold) {
        return props.size === 'small'
          ? '3-m'
          : props.size === 'large'
            ? '1-m'
            : '2-m'
      }
      return props.size === 'small'
        ? '3-r'
        : props.size === 'large'
          ? '1-r'
          : '2-r'
    })
    const cssVarsRef = computed(() => {
      const {
        common: { cubicBezierEaseInOut, cubicBezierEaseOut },
        self: {
          fontFamily,
          fontSize,
          colorActive,
          colorHover,
          colorVisited,
          colorFocus,
          color,
          opacityDisabled,
          lineHeight,
          fontWeight
        }
      } = themeRef.value

      return {
        '--z-font-size': fontSize,
        '--z-font-family': fontFamily,
        // FIXME: check why the inherited color is coming black
        '--z-color': color,
        '--z-ripple-color': color,
        '--z-bezier': cubicBezierEaseInOut,
        '--z-ripple-bezier': cubicBezierEaseOut,
        '--z-link-text-color-default': color,
        '--z-link-text-color-visited': colorVisited,
        '--z-link-text-color-hover': colorHover,
        '--z-link-text-color-pressed': colorActive,
        '--z-link-text-color-focus': colorFocus,
        '--z-link-opacity': opacityDisabled,
        '--z-font-weight': fontWeight,
        '--z-line-height': lineHeight
      }
    })

    const isExternalLink = computed(() => {
      // write condition to check if url starts with http
      if ((props.href as string)?.startsWith('http')) {
        return true
      }

      if (attrs?.target === '_blank') {
        return true
      }
      return false
    })

    return {
      isExternalLink,
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      textVariant
    }
  },
  render () {
    const { mergedClsPrefix, $slots, $attrs, isExternalLink, $props } = this
    const children = $slots.default?.()
    const prefix = $slots.prefix?.()
    return (
      <ZA
        variant={this.textVariant}
        {...$attrs}
        class={[
          `${mergedClsPrefix}-link`,
          `${mergedClsPrefix}-${$props.size}-link`,
          {
            [`${mergedClsPrefix}-link--disabled`]: $props.disabled,
            [`${mergedClsPrefix}-link--active`]: $props.type === 'active',
            [`${mergedClsPrefix}-inline-link`]: $props.isInline
          }
        ]}
        rel={isExternalLink ? 'noopener noreferrer' : undefined}
        target={isExternalLink && !$props.disabled ? '_blank' : undefined}
        style={this.cssVars as CSSProperties}
        href={$props.disabled ? undefined : $props.href}
      >
        {prefix && <span>{prefix}</span>}
        {children}
        {isExternalLink && $props.showExternalLinkIcon && !$props.isInline && (
          <ZBaseIcon clsPrefix={mergedClsPrefix}>
            {{ default: () => <OpenNewTab /> }}
          </ZBaseIcon>
        )}
      </ZA>
    )
  }
})
