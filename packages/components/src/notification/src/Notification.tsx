import {
  h,
  defineComponent,
  computed,
  inject,
  type PropType,
  type VNodeChild,
  type CSSProperties
} from 'vue'
import { getPadding } from 'seemly'
import {
  InfoIcon,
  SuccessIcon,
  WarningIcon,
  ErrorIcon
} from '../../_internal/icons'
import { createKey, keysOf, render } from '../../_utils'
import { ZBaseIcon, ZBaseClose } from '../../_internal'
import { useConfig, useThemeClass, useRtl } from '../../_mixins'
import { notificationProviderInjectionKey } from './context'
import { ZProgress } from '../../progress'

import { ZTitle, ZP } from '../../typography'

const iconRenderMap = {
  info: () => <InfoIcon />,
  success: () => <SuccessIcon />,
  warning: () => <WarningIcon />,
  error: () => <ErrorIcon />,
  default: () => null
}

export const notificationProps = {
  closable: {
    type: Boolean,
    default: true
  },
  type: {
    type: String as PropType<
    'info' | 'success' | 'warning' | 'error' | 'default'
    >,
    default: 'default'
  },
  avatar: Function as PropType<() => VNodeChild>,
  title: [String, Function] as PropType<string | (() => VNodeChild)>,
  description: [String, Function] as PropType<string | (() => VNodeChild)>,
  content: [String, Function] as PropType<string | (() => VNodeChild)>,
  meta: [String, Function] as PropType<string | (() => VNodeChild)>,
  action: [String, Function] as PropType<string | (() => VNodeChild)>,
  progress: {
    type: Boolean,
    default: true
  },
  onClose: {
    type: Function as PropType<() => void>,
    required: true
  },
  progressPercentage: {
    type: Number,
    default: 100 // Set a default value if needed
  },
  keepAliveOnHover: Boolean,
  onMouseenter: Function as PropType<(e: MouseEvent) => void>,
  onMouseleave: Function as PropType<(e: MouseEvent) => void>
} as const

export const notificationPropKeys = keysOf(notificationProps)

export const Notification = defineComponent({
  name: 'Notification',
  props: notificationProps,
  setup (props) {
    const {
      mergedClsPrefixRef,
      mergedThemeRef,
      props: providerProps
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = inject(notificationProviderInjectionKey)!
    const { inlineThemeDisabled, mergedRtlRef, mergedGDSTokenRef } = useConfig()
    const rtlEnabledRef = useRtl(
      'Notification',
      mergedRtlRef,
      mergedClsPrefixRef
    )
    const cssVarsRef = computed(() => {
      const { type } = props
      const {
        self: {
          textColor,
          closeIconColor,
          closeIconColorHover,
          closeIconColorPressed,
          headerTextColor,
          descriptionTextColor,
          actionTextColor,
          borderRadius,
          headerFontWeight,
          boxShadow,
          lineHeight,
          fontSize,
          closeMargin,
          closeSize,
          width,
          padding,
          closeIconSize,
          closeBorderRadius,
          closeColorHover,
          closeColorPressed,
          titleFontSize,
          metaFontSize,
          descriptionFontSize,
          [createKey('iconColor', type)]: iconColor,
          [createKey('color', type)]: color
        },
        common: { cubicBezierEaseOut, cubicBezierEaseIn, cubicBezierEaseInOut }
      } = mergedThemeRef.value
      const { left, right, top, bottom } = getPadding(padding)
      const cssVars = {
        '--z-color': color,
        '--z-font-size': fontSize,
        '--z-text-color': textColor,
        '--z-description-text-color': descriptionTextColor,
        '--z-action-text-color': actionTextColor,
        '--z-title-text-color': headerTextColor,
        '--z-title-font-weight': headerFontWeight,
        '--z-bezier': cubicBezierEaseInOut,
        '--z-bezier-ease-out': cubicBezierEaseOut,
        '--z-bezier-ease-in': cubicBezierEaseIn,
        '--z-border-radius': borderRadius,
        '--z-box-shadow': boxShadow,
        '--z-close-border-radius': closeBorderRadius,
        '--z-close-color-hover': closeColorHover,
        '--z-close-color-pressed': closeColorPressed,
        '--z-close-icon-color': closeIconColor,
        '--z-close-icon-color-hover': closeIconColorHover,
        '--z-close-icon-color-pressed': closeIconColorPressed,
        '--z-line-height': lineHeight,
        '--z-icon-color': iconColor,
        '--z-close-margin': closeMargin,
        '--z-close-size': closeSize,
        '--z-close-icon-size': closeIconSize,
        '--z-width': width,
        '--z-padding-left': left,
        '--z-padding-right': right,
        '--z-padding-top': top,
        '--z-padding-bottom': bottom,
        '--z-title-font-size': titleFontSize,
        '--z-meta-font-size': metaFontSize,
        '--z-description-font-size': descriptionFontSize
      }
      if (mergedGDSTokenRef?.value) {
        Object.assign(cssVars, {
          ...mergedGDSTokenRef.value
        })
      }
      return cssVars
    })

    const statusRef = computed(() => {
      if (props.type === 'default') return 'primary'
      return props.type
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'notification',
        computed(() => props.type[0]),
        cssVarsRef,
        providerProps
      )
      : undefined
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      showAvatar: computed(() => {
        return props.avatar || props.type !== 'default'
      }),
      handleCloseClick () {
        props.onClose()
      },
      statusRef,
      rtlEnabled: rtlEnabledRef,
      gdsToken: mergedGDSTokenRef,
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
        class={[`${mergedClsPrefix}-notification-wrapper`, this.themeClass]}
        onMouseenter={this.onMouseenter}
        onMouseleave={this.onMouseleave}
        style={this.cssVars as CSSProperties}
      >
        <div
          class={[
            `${mergedClsPrefix}-notification`,
            this.rtlEnabled && `${mergedClsPrefix}-notification--rtl`,
            this.themeClass,
            {
              [`${mergedClsPrefix}-notification--closable`]: this.closable,
              [`${mergedClsPrefix}-notification--show-avatar`]: this.showAvatar
            }
          ]}
          style={this.cssVars as CSSProperties}
        >
          <div class={`${mergedClsPrefix}-notification-content-container`}>
            {this.showAvatar ? (
              <div class={`${mergedClsPrefix}-notification__avatar`}>
                {this.avatar ? (
                  render(this.avatar)
                ) : this.type !== 'default' ? (
                  <ZBaseIcon clsPrefix={mergedClsPrefix}>
                    {{ default: () => iconRenderMap[this.type]() }}
                  </ZBaseIcon>
                ) : null}
              </div>
            ) : null}
            {this.closable ? (
              <ZBaseClose
                clsPrefix={mergedClsPrefix}
                class={`${mergedClsPrefix}-notification__close`}
                onClick={this.handleCloseClick}
              />
            ) : null}
            <div ref="bodyRef" class={`${mergedClsPrefix}-notification-main`}>
              {this.title ? (
                <ZTitle
                  variant="5-m"
                  class={`${mergedClsPrefix}-notification-main__header`}
                >
                  {render(this.title)}
                </ZTitle>
              ) : null}
              {this.description ? (
                <ZP>
                  <div
                    class={`${mergedClsPrefix}-notification-main__description`}
                  >
                    {render(this.description)}
                  </div>
                </ZP>
              ) : null}
              {this.content ? (
                <ZP>
                  <div class={`${mergedClsPrefix}-notification-main__content`}>
                    {render(this.content)}
                  </div>
                </ZP>
              ) : null}
              {this.meta || this.action ? (
                <div class={`${mergedClsPrefix}-notification-main-footer`}>
                  {this.meta ? (
                    <div
                      class={`${mergedClsPrefix}-notification-main-footer__meta`}
                    >
                      {render(this.meta)}
                    </div>
                  ) : null}
                  {this.action ? (
                    <div
                      class={`${mergedClsPrefix}-notification-main-footer__action`}
                    >
                      {render(this.action)}
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
          {this.progress ? (
            <ZProgress
              show-indicator={false}
              status={this.statusRef}
              class={`${mergedClsPrefix}-notification__progress`}
              percentage={this.progressPercentage}
            />
          ) : null}
        </div>
      </div>
    )
  }
})
