import {
  computed,
  h,
  defineComponent,
  inject,
  type VNodeChild,
  type CSSProperties,
  type PropType
} from 'vue'
import {
  InfoIcon,
  SuccessIcon,
  WarningIcon,
  ErrorIcon
} from '../../_internal/icons'
import {
  ZIconSwitchTransition,
  ZBaseLoading,
  ZBaseIcon,
  ZBaseClose
} from '../../_internal'
import { render, createKey } from '../../_utils'
import { useConfig, useTheme, useThemeClass, useRtl } from '../../_mixins'
import { messageLight } from '../styles'
import { messageProps } from './message-props'
import type { MessageType, MessageRenderMessage } from './types'
import { messageProviderInjectionKey } from './context'
import style from './styles/index.cssr'

const iconRenderMap = {
  info: () => <InfoIcon />,
  success: () => <SuccessIcon />,
  warning: () => <WarningIcon />,
  error: () => <ErrorIcon />,
  neutral: () => null
}

export default defineComponent({
  name: 'Message',
  props: {
    ...messageProps,
    render: Function as PropType<MessageRenderMessage>
  },
  setup (props) {
    const { inlineThemeDisabled, mergedRtlRef } = useConfig(props)
    const {
      props: messageProviderProps,
      mergedClsPrefixRef
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = inject(messageProviderInjectionKey)!
    const rtlEnabledRef = useRtl('Message', mergedRtlRef, mergedClsPrefixRef)
    const themeRef = useTheme(
      'Message',
      '-message',
      style,
      messageLight,
      messageProviderProps,
      mergedClsPrefixRef
    )
    const cssVarsRef = computed(() => {
      const { color: _color } = props
      const {
        common: { cubicBezierEaseInOut },
        self: {
          padding,
          margin,
          maxWidth,
          iconMargin,
          closeMargin,
          closeSize,
          iconSize,
          fontSize,
          lineHeight,
          borderRadius,
          iconColorInfo,
          iconColorSuccess,
          iconColorWarning,
          iconColorError,
          iconColorLoading,
          closeIconSize,
          closeBorderRadius,
          [createKey('textColor', _color)]: textColor,
          [createKey('boxShadow', _color)]: boxShadow,
          [createKey('color', _color)]: color,
          [createKey('closeColorHover', _color)]: closeColorHover,
          [createKey('closeColorPressed', _color)]: closeColorPressed,
          [createKey('closeIconColor', _color)]: closeIconColor,
          [createKey('closeIconColorPressed', _color)]: closeIconColorPressed,
          [createKey('closeIconColorHover', _color)]: closeIconColorHover
        }
      } = themeRef.value
      return {
        '--z-bezier': cubicBezierEaseInOut,
        '--z-margin': margin,
        '--z-padding': padding,
        '--z-max-width': maxWidth,
        '--z-font-size': fontSize,
        '--z-icon-margin': iconMargin,
        '--z-icon-size': iconSize,
        '--z-close-icon-size': closeIconSize,
        '--z-close-border-radius': closeBorderRadius,
        '--z-close-size': closeSize,
        '--z-close-margin': closeMargin,
        '--z-text-color': textColor,
        '--z-color': color,
        '--z-box-shadow': boxShadow,
        '--z-icon-color-info': iconColorInfo,
        '--z-icon-color-success': iconColorSuccess,
        '--z-icon-color-warning': iconColorWarning,
        '--z-icon-color-error': iconColorError,
        '--z-icon-color-loading': iconColorLoading,
        '--z-close-color-hover': closeColorHover,
        '--z-close-color-pressed': closeColorPressed,
        '--z-close-icon-color': closeIconColor,
        '--z-close-icon-color-pressed': closeIconColorPressed,
        '--z-close-icon-color-hover': closeIconColorHover,
        '--z-line-height': lineHeight,
        '--z-border-radius': borderRadius
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'message',
        computed(() => props.color[0]),
        cssVarsRef,
        {}
      )
      : undefined
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      rtlEnabled: rtlEnabledRef,
      messageProviderProps,
      handleClose () {
        props.onClose?.()
      },
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender,
      placement: messageProviderProps.placement
    }
  },
  render () {
    const {
      render: renderMessage,
      color,
      closable,
      content,
      mergedClsPrefix,
      cssVars,
      themeClass,
      onRender,
      icon,
      handleClose,
      showIcon
    } = this
    onRender?.()
    let iconNode: VNodeChild
    return (
      <div
        class={[`${mergedClsPrefix}-message-wrapper`, themeClass]}
        onMouseenter={this.onMouseenter}
        onMouseleave={this.onMouseleave}
        style={[
          {
            alignItems: this.placement.startsWith('top')
              ? 'flex-start'
              : 'flex-end'
          },
          cssVars as CSSProperties
        ]}
      >
        {renderMessage ? (
          renderMessage(this.$props)
        ) : (
          <div
            class={[
              `${mergedClsPrefix}-message ${mergedClsPrefix}-message--${color}-type`,
              this.rtlEnabled && `${mergedClsPrefix}-message--rtl`
            ]}
          >
            {(iconNode = createIconVNode(icon, color, mergedClsPrefix)) &&
            showIcon ? (
              <div
                class={`${mergedClsPrefix}-message__icon ${mergedClsPrefix}-message__icon--${color}-type`}
              >
                <ZIconSwitchTransition>
                  {{
                    default: () => iconNode
                  }}
                </ZIconSwitchTransition>
              </div>
                ) : null}
            <div class={`${mergedClsPrefix}-message__content`}>
              {render(content)}
            </div>
            {closable ? (
              <ZBaseClose
                clsPrefix={mergedClsPrefix}
                class={`${mergedClsPrefix}-message__close`}
                onClick={handleClose}
                absolute
              />
            ) : null}
          </div>
        )}
      </div>
    )
  }
})

function createIconVNode (
  icon: undefined | (() => VNodeChild),
  type: MessageType,
  clsPrefix: string
): VNodeChild {
  if (typeof icon === 'function') {
    return icon()
  } else {
    const innerIcon =
      type === 'loading' ? (
        <ZBaseLoading clsPrefix={clsPrefix} strokeWidth={24} scale={0.85} />
      ) : (
        iconRenderMap[type]()
      )
    if (!innerIcon) return null
    return (
      <ZBaseIcon clsPrefix={clsPrefix} key={type}>
        {{
          default: () => innerIcon
        }}
      </ZBaseIcon>
    )
  }
}
