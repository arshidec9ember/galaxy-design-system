/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  h,
  defineComponent,
  computed,
  type PropType,
  toRef,
  watchEffect
} from 'vue'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { pageHeaderLight } from '../styles/light'
import type { PageHeaderTheme } from '../styles/light'
import style from './styles/index.cssr'
import { ArrowBackIcon } from '../../_internal/icons'
import { ZBaseIcon } from '../../_internal'
import { createKey, warnOnce, type ExtractPublicPropTypes } from '../../_utils'
import { useRtl } from '../../_mixins/use-rtl'

type Size = 'x-small' | 'small' | 'medium' | 'large' | 'x-large'

export const pageHeaderProps = {
  ...(useTheme.props as ThemeProps<PageHeaderTheme>),
  title: String,
  description: String,
  extra: String,
  inverted: {
    type: Boolean,
    default: false
  },
  size: {
    type: String as PropType<Size>,
    default: 'medium'
  },
  radius: {
    type: String as PropType<Size | 'none'>,
    default: 'none'
  },
  onBack: Function as PropType<() => void>
}

export type PageHeaderProps = ExtractPublicPropTypes<typeof pageHeaderProps>

export default defineComponent({
  name: 'PageHeader',
  props: pageHeaderProps,
  setup (props, { slots }) {
    const invertedRef = toRef(props, 'inverted')
    const { mergedClsPrefixRef, mergedRtlRef, inlineThemeDisabled } =
      useConfig(props)

    if (__DEV__) {
      watchEffect(() => {
        if (slots.header !== undefined) {
          warnOnce(
            'page-header',
            '`header-slot` is deprecated, please use `navigation-slot` instead.'
          )
        }
        if (slots.extra !== undefined) {
          warnOnce(
            'page-header',
            '`extra-slot` is deprecated, please use `actions-slot` instead.'
          )
        }

        if (props.extra !== undefined) {
          warnOnce(
            'page-header',
            '`extra` is deprecated, please use `actions-slot` instead.'
          )
        }
      })
    }
    const themeRef = useTheme(
      'PageHeader',
      '-page-header',
      style,
      pageHeaderLight,
      props,
      mergedClsPrefixRef
    )
    const rtlEnabledRef = useRtl('PageHeader', mergedRtlRef, mergedClsPrefixRef)
    const cssVarsRef = computed(() => {
      const { size, radius } = props
      const {
        self: {
          titleTextColor,
          descriptionTextColor,
          backColor,
          fontSize,
          backSize,
          titleFontWeight,
          backColorHover,
          backColorPressed,
          backColorHoverInverted,
          backColorInverted,
          backColorPressedInverted,
          descriptionTextColorInverted,
          titleTextColorInverted,
          [createKey('titleFontSize', size)]: titleFontSize,
          [createKey('descriptionFontSize', size)]: descriptionFontSize,
          [createKey('paddingSize', size)]: paddingSize,
          [createKey('radius', radius)]: radiusSize
        },
        common: { cubicBezierEaseInOut, invertedColor }
      } = themeRef.value
      const vars: Record<string, string> = {
        '--z-title-font-weight': titleFontWeight,
        '--z-font-size': fontSize,
        '--z-bezier': cubicBezierEaseInOut,
        '--z-back-size': backSize,
        '--z-page-header-wrapper-padding': paddingSize,
        '--z-title-font-size': titleFontSize,
        '--z-description-font-size': descriptionFontSize,
        '--z-page-header-wrapper-border-radius': radiusSize
      }
      if (invertedRef.value) {
        const invertedVars: any = {
          '--z-text-color': titleTextColorInverted,
          '--z-title-text-color': titleTextColorInverted,
          '--z-description-text-color': descriptionTextColorInverted,
          '--z-back-color': backColorInverted,
          '--z-back-color-hover': backColorHoverInverted,
          '--z-back-color-pressed': backColorPressedInverted,
          '--z-page-header-wrapper-background-color': invertedColor
        }
        return {
          ...vars,
          ...invertedVars
        }
      }
      return {
        ...vars,
        '--z-title-text-color': titleTextColor,
        '--z-title-font-size': titleFontSize,
        '--z-description-text-color': descriptionTextColor,
        '--z-back-color': backColor,
        '--z-back-color-hover': backColorHover,
        '--z-back-color-pressed': backColorPressed
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('page-header', undefined, cssVarsRef, props)
      : undefined
    return {
      rtlEnabled: rtlEnabledRef,
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    const {
      onBack,
      title,
      description,
      extra,
      mergedClsPrefix,
      cssVars,
      $slots
    } = this
    this.onRender?.()
    const {
      title: titleSlot,
      description: descriptionSlot,
      extra: extraSlot,
      actions: actionsSlot,
      default: defaultSlot,
      header: headerSlot,
      navigation: navigationSlot,
      avatar: avatarSlot,
      footer: footerSlot,
      back: backSlot,
      background: backgroundSlot
    } = $slots
    const showBack = onBack
    const showTitle = title || titleSlot
    const showdescription = description || descriptionSlot
    const showExtra = extra || extraSlot
    const showActions = actionsSlot
    const showBackground = backgroundSlot
    return (
      <div
        style={cssVars as any}
        class={[
          `${mergedClsPrefix}-page-header-wrapper`,
          this.themeClass,
          {
            [`${mergedClsPrefix}-page-header-wrapper--rtl`]: this.rtlEnabled,
            [`${mergedClsPrefix}-page-header-wrapper--cover`]: showBackground
          }
        ]}
      >
        {backgroundSlot ? (
          <div class={`${mergedClsPrefix}-page-header-cover`} key="cover">
            {backgroundSlot()}
          </div>
        ) : null}
        <div class={`${mergedClsPrefix}-page-header-actions-wrapper`}>
          {(showBack ||
            headerSlot ||
            navigationSlot ||
            backSlot ||
            avatarSlot ||
            showTitle ||
            showdescription ||
            showExtra) && (
            <div class={`${mergedClsPrefix}-page-header`} key="header">
              <div
                class={[
                  {
                    [`${mergedClsPrefix}-page-header-header`]:
                      showBack || headerSlot
                  }
                ]}
                key="header"
              >
                {showBack ? (
                  <div
                    class={`${mergedClsPrefix}-page-header-header__back`}
                    key="back"
                    onClick={onBack}
                  >
                    {backSlot ? (
                      backSlot()
                    ) : (
                      <ZBaseIcon clsPrefix={mergedClsPrefix}>
                        {{
                          default: () => <ArrowBackIcon />
                        }}
                      </ZBaseIcon>
                    )}
                  </div>
                ) : null}
                {navigationSlot ? (
                  <div
                    class={`${mergedClsPrefix}-page-header-header__head`}
                    key="breadcrumb"
                  >
                    {navigationSlot()}
                  </div>
                ) : headerSlot ? (
                  <div
                    class={`${mergedClsPrefix}-page-header-header__head`}
                    key="breadcrumb"
                  >
                    {headerSlot()}
                  </div>
                ) : null}
              </div>
              <div class={`${mergedClsPrefix}-page-header__main`} key="main">
                {avatarSlot ? (
                  <div class={`${mergedClsPrefix}-page-header__avatar`}>
                    {avatarSlot()}
                  </div>
                ) : null}
                <div
                  class={`${mergedClsPrefix}-page-header__title-wrapper`}
                  key="title-wrapper"
                >
                  {showTitle ? (
                    <div
                      class={`${mergedClsPrefix}-page-header__title`}
                      key="title"
                    >
                      {title || titleSlot!()}
                    </div>
                  ) : null}
                  {showdescription ? (
                    <div
                      class={`${mergedClsPrefix}-page-header__description`}
                      key="description"
                    >
                      {description || descriptionSlot!()}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          )}
          {showActions ? (
            <div class={`${mergedClsPrefix}-page-header__extra`}>
              {actionsSlot()}
            </div>
          ) : showExtra ? (
            <div class={`${mergedClsPrefix}-page-header__extra`}>
              {extra || extraSlot!()}
            </div>
          ) : null}
        </div>
        {defaultSlot ? (
          <div class={`${mergedClsPrefix}-page-header-content`} key="content">
            {defaultSlot()}
          </div>
        ) : null}
        {footerSlot ? (
          <div class={`${mergedClsPrefix}-page-header-footer`} key="footer">
            {footerSlot()}
          </div>
        ) : null}
      </div>
    )
  }
})
