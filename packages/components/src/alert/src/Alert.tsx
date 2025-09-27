import {
  h,
  ref,
  computed,
  defineComponent,
  type PropType,
  mergeProps,
  type HTMLAttributes
} from 'vue'
import { getMargin } from 'seemly'
import {
  InfoIcon,
  SuccessIcon,
  WarningIcon,
  ErrorIcon
} from '../../_internal/icons'
import { ZFadeInExpandTransition, ZBaseClose, ZBaseIcon } from '../../_internal'
import { useRtl } from '../../_mixins/use-rtl'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { createKey, resolveSlot, resolveWrappedSlot } from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'
import { alertLight } from '../styles'
import type { AlertTheme } from '../styles'
import style from './styles/index.cssr'
import { ZTitle, ZP } from '../../typography'

export const alertProps = {
  ...(useTheme.props as ThemeProps<AlertTheme>),
  title: String,
  showIcon: {
    type: Boolean,
    default: true
  },
  color: {
    type: String as PropType<
    'info' | 'warning' | 'error' | 'success' | 'neutral'
    >,
    default: 'neutral'
  },
  bordered: {
    type: Boolean,
    default: true
  },
  actionPlacement: {
    type: String as PropType<'bottom' | 'right'>,
    default: 'bottom'
  },
  closable: Boolean,
  onClose: Function,
  onAfterLeave: Function
}

export type AlertProps = ExtractPublicPropTypes<typeof alertProps>

export default defineComponent({
  name: 'Alert',
  inheritAttrs: false,
  props: alertProps,
  setup (props) {
    const {
      mergedClsPrefixRef,
      mergedBorderedRef,
      inlineThemeDisabled,
      mergedRtlRef
    } = useConfig(props)
    const themeRef = useTheme(
      'Alert',
      '-alert',
      style,
      alertLight,
      props,
      mergedClsPrefixRef
    )
    const rtlEnabledRef = useRtl('Alert', mergedRtlRef, mergedClsPrefixRef)
    const cssVarsRef = computed(() => {
      const {
        common: { cubicBezierEaseInOut },
        self
      } = themeRef.value
      const {
        fontSize,
        borderRadius,
        titleFontWeight,
        lineHeight,
        iconSize,
        iconMargin,
        iconMarginRtl,
        closeIconSize,
        closeBorderRadius,
        closeSize,
        closeMargin,
        closeMarginRtl,
        contentPaddingX,
        padding
      } = self
      const { color } = props
      const { left, right } = getMargin(iconMargin)
      return {
        '--z-bezier': cubicBezierEaseInOut,
        '--z-color': self[createKey('color', color)],
        '--z-close-icon-size': closeIconSize,
        '--z-close-border-radius': closeBorderRadius,
        '--z-close-color-hover': self[createKey('closeColorHover', color)],
        '--z-close-color-pressed': self[createKey('closeColorPressed', color)],
        '--z-close-icon-color': self[createKey('closeIconColor', color)],
        '--z-close-icon-color-hover':
          self[createKey('closeIconColorHover', color)],
        '--z-close-icon-color-pressed':
          self[createKey('closeIconColorPressed', color)],
        '--z-icon-color': self[createKey('iconColor', color)],
        '--z-border': self[createKey('border', color)],
        '--z-title-text-color': self[createKey('titleTextColor', color)],
        '--z-content-text-color': self[createKey('contentTextColor', color)],
        '--z-line-height': lineHeight,
        '--z-border-radius': borderRadius,
        '--z-font-size': fontSize,
        '--z-title-font-weight': titleFontWeight,
        '--z-icon-size': iconSize,
        '--z-icon-margin': iconMargin,
        '--z-icon-margin-rtl': iconMarginRtl,
        '--z-close-size': closeSize,
        '--z-close-margin': closeMargin,
        '--z-close-margin-rtl': closeMarginRtl,
        '--z-padding': padding,
        '--z-content-padding-x': contentPaddingX,
        '--z-icon-margin-left': left,
        '--z-icon-margin-right': right
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'alert',
        computed(() => {
          return props.color[0]
        }),
        cssVarsRef,
        props
      )
      : undefined
    const visibleRef = ref(true)
    const doAfterLeave = (): void => {
      const { onAfterLeave } = props
      if (onAfterLeave) onAfterLeave()
    }
    const handleCloseClick = (): void => {
      void Promise.resolve(props.onClose?.()).then((result) => {
        if (result === false) return
        visibleRef.value = false
      })
    }
    const handleAfterLeave = (): void => {
      doAfterLeave()
    }

    const isActionBottomRef = computed(() => props.actionPlacement === 'bottom')

    return {
      rtlEnabled: rtlEnabledRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedBordered: mergedBorderedRef,
      visible: visibleRef,
      handleCloseClick,
      handleAfterLeave,
      mergedTheme: themeRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender,
      isActionBottom: isActionBottomRef
    }
  },
  render () {
    this.onRender?.()
    return (
      <ZFadeInExpandTransition onAfterLeave={this.handleAfterLeave}>
        {{
          default: () => {
            const { mergedClsPrefix, $slots } = this
            const attrs: HTMLAttributes = {
              class: [
                `${mergedClsPrefix}-alert`,
                this.themeClass,
                this.closable && `${mergedClsPrefix}-alert--closable`,
                this.showIcon && `${mergedClsPrefix}-alert--show-icon`,
                !this.title &&
                  this.closable &&
                  `${mergedClsPrefix}-alert--right-adjust`,
                this.rtlEnabled && `${mergedClsPrefix}-alert--rtl`,
                this.isActionBottom
                  ? `${mergedClsPrefix}-alert--action-bottom`
                  : `${mergedClsPrefix}-alert--action-right`
              ],
              style: this.cssVars as any,
              role: 'alert'
            }
            return this.visible ? (
              <div {...mergeProps(this.$attrs, attrs as any)}>
                {this.closable && (
                  <ZBaseClose
                    clsPrefix={mergedClsPrefix}
                    class={`${mergedClsPrefix}-alert__close`}
                    onClick={this.handleCloseClick}
                  />
                )}
                {this.bordered && (
                  <div class={`${mergedClsPrefix}-alert__border`} />
                )}
                {this.showIcon && (
                  <div
                    class={`${mergedClsPrefix}-alert__icon`}
                    aria-hidden="true"
                  >
                    {resolveSlot($slots.icon, () => [
                      <ZBaseIcon clsPrefix={mergedClsPrefix}>
                        {{
                          default: () => {
                            switch (this.color) {
                              case 'success':
                                return <SuccessIcon />
                              case 'info':
                                return <InfoIcon />
                              case 'warning':
                                return <WarningIcon />
                              case 'error':
                                return <ErrorIcon />
                              default:
                                return null
                            }
                          }
                        }}
                      </ZBaseIcon>
                    ])}
                  </div>
                )}
                <div
                  class={[
                    `${mergedClsPrefix}-alert-body`,
                    this.mergedBordered &&
                      `${mergedClsPrefix}-alert-body--bordered`
                  ]}
                >
                  {resolveWrappedSlot($slots.header, (children) => {
                    const mergedChildren = children || this.title
                    return mergedChildren ? (
                      <ZTitle
                        variant="5-m"
                        class={`${mergedClsPrefix}-alert-body__title`}
                      >
                        {mergedChildren}
                      </ZTitle>
                    ) : null
                  })}
                  {$slots.default && (
                    <ZP class={`${mergedClsPrefix}-alert-body__content`}>
                      {$slots}
                    </ZP>
                  )}
                </div>
                {resolveWrappedSlot(
                  $slots.action,
                  (children) =>
                    children && (
                      <div
                        class={`${mergedClsPrefix}-alert-action`}
                        role="none"
                      >
                        {children}
                      </div>
                    )
                )}
              </div>
            ) : null
          }
        }}
      </ZFadeInExpandTransition>
    )
  }
})
