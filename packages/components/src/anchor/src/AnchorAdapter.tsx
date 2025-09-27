import { h, defineComponent, computed, ref, type CSSProperties } from 'vue'
import { ZAffix } from '../../affix'
import { affixProps, affixPropKeys } from '../../affix/src/Affix'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import type { ExtractPublicPropTypes } from '../../_utils'
import { keep } from '../../_utils'
import { anchorLight } from '../styles'
import type { AnchorTheme } from '../styles'
import style from './styles/index.cssr'
import ZBaseAnchor, { baseAnchorProps, baseAnchorPropKeys } from './BaseAnchor'
import type { BaseAnchorInst } from './BaseAnchor'

export interface AnchorInst {
  scrollTo: (href: string) => void
}

export const anchorProps = {
  ...(useTheme.props as ThemeProps<AnchorTheme>),
  affix: Boolean,
  ...affixProps,
  ...baseAnchorProps
} as const

export type AnchorProps = ExtractPublicPropTypes<typeof anchorProps>

export default defineComponent({
  name: 'Anchor',
  props: anchorProps,
  setup (props, { slots }) {
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
    const themeRef = useTheme(
      'Anchor',
      '-anchor',
      style,
      anchorLight,
      props,
      mergedClsPrefixRef
    )
    const anchorRef = ref<BaseAnchorInst | null>(null)
    const cssVarsRef = computed(() => {
      const {
        self: {
          railColor,
          linkColor,
          railColorActive,
          linkTextColor,
          linkTextColorHover,
          linkTextColorActive,
          linkFontSize,
          railWidth,
          railBarWidth,
          linkPadding,
          linkTitlePadding,
          linkCellHeight, // Added cell height token
          borderRadius
        },
        common: { cubicBezierEaseInOut }
      } = themeRef.value
      return {
        '--z-link-border-radius': borderRadius,
        '--z-link-color': props.showBackground ? linkColor : '',
        '--z-link-font-size': linkFontSize,
        '--z-link-text-color': linkTextColor,
        '--z-link-text-color-hover': linkTextColorHover,
        '--z-link-text-color-active': linkTextColorActive,
        '--z-link-padding': linkPadding,
        '--z-link-title-padding': linkTitlePadding,
        '--z-link-cell-height': linkCellHeight,
        '--z-bezier': cubicBezierEaseInOut,
        '--z-rail-color': railColor,
        '--z-rail-color-active': railColorActive,
        '--z-rail-width': railWidth,
        '--z-rail-bar-width': railBarWidth
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('anchor', undefined, cssVarsRef, props)
      : undefined
    return {
      scrollTo (href: string) {
        anchorRef.value?.setActiveHref(href)
      },
      renderAnchor: () => {
        themeClassHandle?.onRender()
        return (
          <ZBaseAnchor
            ref={anchorRef}
            style={
              inlineThemeDisabled
                ? undefined
                : (cssVarsRef.value as CSSProperties)
            }
            class={themeClassHandle?.themeClass.value}
            {...keep(props, baseAnchorPropKeys)}
            mergedClsPrefix={mergedClsPrefixRef.value}
          >
            {slots}
          </ZBaseAnchor>
        )
      }
    }
  },
  render () {
    return !this.affix ? (
      this.renderAnchor()
    ) : (
      <ZAffix {...keep(this, affixPropKeys)}>
        {{ default: this.renderAnchor }}
      </ZAffix>
    )
  }
})
