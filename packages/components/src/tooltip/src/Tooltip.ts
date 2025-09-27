// Tooltip: popover wearing waistcoat
import { h, defineComponent, ref, computed } from 'vue'
import { ZPopover } from '../../popover'
import { popoverBaseProps } from '../../popover/src/Popover'
import type { PopoverInst } from '../../popover'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { tooltipLight } from '../styles'
import type { TooltipTheme } from '../styles'
import type { ExtractPublicPropTypes } from '../../_utils'
import style from './styles/index.cssr'

export type TooltipInst = PopoverInst

export const tooltipProps = {
  ...popoverBaseProps,
  showArrow: {
    type: Boolean,
    default: true
  },
  textVariant: {
    type: String,
    default: '4-r'
  },
  renderZText: {
    type: Boolean,
    default: true
  },
  ...(useTheme.props as ThemeProps<TooltipTheme>)
}

export type TooltipProps = ExtractPublicPropTypes<typeof tooltipProps>

export default defineComponent({
  name: 'Tooltip',
  props: tooltipProps,
  __popover__: true,
  setup (props) {
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
    const themeRef = useTheme(
      'Tooltip',
      '-tooltip',
      style,
      tooltipLight,
      props,
      mergedClsPrefixRef
    )
    const popoverRef = ref<PopoverInst | null>(null)
    const tooltipExposedMethod: TooltipInst = {
      syncPosition () {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        popoverRef.value!.syncPosition()
      },
      setShow (show: boolean) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        popoverRef.value!.setShow(show)
      }
    }
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('tooltip', undefined, undefined, props)
      : undefined
    return {
      ...tooltipExposedMethod,
      popoverRef,
      mergedTheme: themeRef,
      popoverThemeOverrides: computed(() => {
        return themeRef.value.self
      }),
      cssVars: inlineThemeDisabled ? undefined : undefined,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    const { mergedTheme, internalExtraClass, themeClass, onRender } = this
    onRender?.()
    return h(
      ZPopover,
      {
        ...this.$props,
        theme: mergedTheme.peers.Popover,
        themeOverrides: mergedTheme.peerOverrides.Popover,
        builtinThemeOverrides: this.popoverThemeOverrides,
        internalExtraClass: internalExtraClass
          .concat('tooltip')
          .concat(themeClass || ''),
        ref: 'popoverRef'
      },
      this.$slots
    )
  }
})
