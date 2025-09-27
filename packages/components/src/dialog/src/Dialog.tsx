import { h, defineComponent, computed, type CSSProperties } from 'vue'
import {
  InfoIcon,
  SuccessIcon,
  WarningIcon,
  ErrorIcon
} from '../../_internal/icons'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import {
  render,
  createKey,
  resolveWrappedSlot,
  resolveSlot
} from '../../_utils'
import { ZBaseIcon, ZBaseClose } from '../../_internal'
import { ZButton } from '../../button'
import { dialogLight } from '../styles'
import type { DialogTheme } from '../styles'
import { dialogProps } from './dialogProps'
import style from './styles/index.cssr'

const iconRenderMap = {
  neutral: () => <InfoIcon />,
  info: () => <InfoIcon />,
  success: () => <SuccessIcon />,
  warning: () => <WarningIcon />,
  error: () => <ErrorIcon />
}

export const ZDialog = defineComponent({
  name: 'Dialog',
  alias: [
    'NimbusConfirmCard', // deprecated
    'Confirm' // deprecated
  ],
  props: {
    ...(useTheme.props as ThemeProps<DialogTheme>),
    ...dialogProps
  },
  setup (props) {
    const { mergedComponentPropsRef, mergedClsPrefixRef, inlineThemeDisabled } =
      useConfig(props)
    const mergedIconPlacementRef = computed(() => {
      const { iconPlacement } = props
      return (
        iconPlacement ||
        mergedComponentPropsRef?.value?.Dialog?.iconPlacement ||
        'left'
      )
    })
    function handlePositiveClick (e: MouseEvent): void {
      const { onPositiveClick } = props
      if (onPositiveClick) onPositiveClick(e)
    }
    function handleNegativeClick (e: MouseEvent): void {
      const { onNegativeClick } = props
      if (onNegativeClick) onNegativeClick(e)
    }
    function handleCloseClick (): void {
      const { onClose } = props
      if (onClose) onClose()
    }
    const themeRef = useTheme(
      'Dialog',
      '-dialog',
      style,
      dialogLight,
      props,
      mergedClsPrefixRef
    )
    const cssVarsRef = computed(() => {
      const { color } = props
      const iconPlacement = mergedIconPlacementRef.value
      const {
        common: { cubicBezierEaseInOut },
        self: {
          fontSize,
          lineHeight,
          border,
          titleTextColor,
          textColor,
          color: _color,
          closeBorderRadius,
          closeColorHover,
          closeColorPressed,
          closeIconColor,
          closeIconColorHover,
          closeIconColorPressed,
          closeIconSize,
          borderRadius,
          titleFontWeight,
          titleFontSize,
          actionMargin,
          padding,
          actionSpace,
          contentMargin,
          closeSize,
          [iconPlacement === 'top' ? 'iconSizeTop' : 'iconSize']: iconSize,
          [iconPlacement === 'top' ? 'iconMarginIconTop' : 'iconMargin']:
            iconMargin,
          [iconPlacement === 'top' ? 'closeMarginIconTop' : 'closeMargin']:
            closeMargin,
          [createKey('iconColor', color)]: iconColor
        }
      } = themeRef.value
      return {
        '--z-font-size': fontSize,
        '--z-icon-color': iconColor,
        '--z-bezier': cubicBezierEaseInOut,
        '--z-close-margin': closeMargin,
        '--z-icon-margin': iconMargin,
        '--z-icon-size': iconSize,
        '--z-close-size': closeSize,
        '--z-close-icon-size': closeIconSize,
        '--z-close-border-radius': closeBorderRadius,
        '--z-close-color-hover': closeColorHover,
        '--z-close-color-pressed': closeColorPressed,
        '--z-close-icon-color': closeIconColor,
        '--z-close-icon-color-hover': closeIconColorHover,
        '--z-close-icon-color-pressed': closeIconColorPressed,
        '--z-color': _color,
        '--z-text-color': textColor,
        '--z-border-radius': borderRadius,
        '--z-padding': padding,
        '--z-line-height': lineHeight,
        '--z-border': border,
        '--z-content-margin': contentMargin,
        '--z-title-font-size': titleFontSize,
        '--z-title-font-weight': titleFontWeight,
        '--z-title-text-color': titleTextColor,
        '--z-action-margin': actionMargin,
        '--z-action-space': actionSpace
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'dialog',
        computed(() => `${props.color[0]}${mergedIconPlacementRef.value[0]}`),
        cssVarsRef,
        props
      )
      : undefined
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      mergedIconPlacement: mergedIconPlacementRef,
      mergedTheme: themeRef,
      handlePositiveClick,
      handleNegativeClick,
      handleCloseClick,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    const {
      bordered,
      mergedIconPlacement,
      cssVars,
      closable,
      showIcon,
      title,
      content,
      action,
      negativeText,
      positiveText,
      positiveButtonProps,
      negativeButtonProps,
      handlePositiveClick,
      handleNegativeClick,
      mergedTheme,
      loading,
      color,
      mergedClsPrefix
    } = this

    this.onRender?.()

    const icon = showIcon ? (
      <ZBaseIcon
        clsPrefix={mergedClsPrefix}
        class={`${mergedClsPrefix}-dialog__icon`}
      >
        {{
          default: () =>
            resolveWrappedSlot(
              this.$slots.icon,
              (children) =>
                children ||
                (this.icon ? render(this.icon) : iconRenderMap[this.color]())
            )
        }}
      </ZBaseIcon>
    ) : null

    const actionNode = resolveWrappedSlot(this.$slots.action, (children) =>
      children || positiveText || negativeText || action ? (
        <div class={`${mergedClsPrefix}-dialog__action`}>
          {children ||
            (action
              ? [render(action)]
              : [
                  this.positiveText && (
                    <ZButton
                      theme={mergedTheme.peers.Button}
                      themeOverrides={mergedTheme.peerOverrides.Button}
                      variant="filled"
                      size="medium"
                      color={color === 'neutral' ? 'primary' : color}
                      disabled={loading}
                      loading={loading}
                      onClick={handlePositiveClick}
                      {...positiveButtonProps}
                    >
                      {{
                        default: () => render(this.positiveText)
                      }}
                    </ZButton>
                  ),
                  this.negativeText && (
                    <ZButton
                      theme={mergedTheme.peers.Button}
                      themeOverrides={mergedTheme.peerOverrides.Button}
                      variant="outlined"
                      size="medium"
                      onClick={handleNegativeClick}
                      {...negativeButtonProps}
                    >
                      {{
                        default: () => render(this.negativeText)
                      }}
                    </ZButton>
                  )
                ])}
        </div>
      ) : null
    )

    return (
      <div
        class={[
          `${mergedClsPrefix}-dialog`,
          this.themeClass,
          this.closable && `${mergedClsPrefix}-dialog--closable`,
          `${mergedClsPrefix}-dialog--icon-${mergedIconPlacement}`,
          bordered && `${mergedClsPrefix}-dialog--bordered`
        ]}
        style={cssVars as CSSProperties}
        role="dialog"
      >
        {closable ? (
          <ZBaseClose
            clsPrefix={mergedClsPrefix}
            class={`${mergedClsPrefix}-dialog__close`}
            onClick={this.handleCloseClick}
          />
        ) : null}
        {showIcon && mergedIconPlacement === 'top' ? (
          <div class={`${mergedClsPrefix}-dialog-icon-container`}>{icon}</div>
        ) : null}
        <div class={`${mergedClsPrefix}-dialog__title`}>
          {showIcon && mergedIconPlacement === 'left' ? icon : null}
          {resolveSlot(this.$slots.header, () => [render(title)])}
        </div>
        <div
          class={[
            `${mergedClsPrefix}-dialog__content`,
            actionNode ? '' : `${mergedClsPrefix}-dialog__content--last`
          ]}
        >
          {resolveSlot(this.$slots.default, () => [render(content)])}
        </div>
        {actionNode}
      </div>
    )
  }
})
