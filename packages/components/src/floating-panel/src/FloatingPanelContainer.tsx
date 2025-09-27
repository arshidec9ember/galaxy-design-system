/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  h,
  defineComponent,
  inject,
  type PropType,
  type VNode,
  type CSSProperties,
  type ComputedRef,
  ref,
  Fragment,
  computed
} from 'vue'
import { ZScrollbar } from '../../_internal'
import { floatingPanelProviderInjectionKey } from './context'
import type { FloatingPanelPlacement } from './FloatingPanelProvider'
import { type ThemeProps, useTheme } from '../../_mixins'
import { floatingPanelContinerStyle as style } from './styles/index.cssr'
import { type FloatingPanelTheme, floatingPanelLight } from '../styles'

// All Props shall be required here
const floatingPanelContainerProps = {
  ...(useTheme.props as ThemeProps<FloatingPanelTheme>),
  scrollable: {
    type: Boolean,
    required: true
  },
  placement: {
    type: String as PropType<FloatingPanelPlacement>,
    required: true
  }
}

export const FloatingPanelContainer = defineComponent({
  name: 'FloatingPanelContainer',
  props: floatingPanelContainerProps,
  setup (props) {
    const { mergedThemeRef, mergedClsPrefixRef } = inject(
      floatingPanelProviderInjectionKey
    )!
    const selfRef = ref<HTMLElement | null>(null)

    const themeRef = useTheme(
      'FloatingPanelContainer',
      '-floating-panel-container',
      style,
      floatingPanelLight,
      props,
      mergedClsPrefixRef
    )
    const cssVarsRef: ComputedRef<CSSProperties> = computed(() => {
      const {
        self: {
          toolbarBackgroundColor,
          toolbarBackgroundColorHover,
          color,
          fontSize,
          textColor,
          width,
          height,
          gap,
          actionTextColor,
          headerTextColor,
          headerFontWeight,
          borderRadius,
          boxShadow
        }
      } = themeRef.value
      return {
        '--z-toolbar-background-color': toolbarBackgroundColor,
        '--z-toolbar-background-color-hover': toolbarBackgroundColorHover,
        '--z-color': color,
        '--z-border-radius': borderRadius,
        '--z-font-size': fontSize,
        '--z-text-color': textColor,
        '--z-action-text-color': actionTextColor,
        '--z-title-text-color': headerTextColor,
        '--z-title-font-weight': headerFontWeight,
        '--z-box-shadow': boxShadow,
        '--z-width': width,
        '--z-height': height,
        '--z-gap': gap
      }
    })

    return {
      selfRef,
      mergedTheme: mergedThemeRef,
      cssVars: cssVarsRef,
      mergedClsPrefix: mergedClsPrefixRef
    }
  },
  render () {
    const { $slots, scrollable, mergedClsPrefix, mergedTheme, placement } = this

    const FloatBox = (): VNode => (
      <Fragment>
        {$slots.extra?.()}
        {$slots.default?.()}
      </Fragment>
    )

    return (
      <div
        ref="selfRef"
        style={this.cssVars}
        class={[
          `${mergedClsPrefix}-floating-panel-container`,
          scrollable &&
            `${mergedClsPrefix}-floating-panel-container--scrollable`,
          `${mergedClsPrefix}-floating-panel-container--${
            placement as FloatingPanelPlacement
          }`
        ]}
      >
        {scrollable ? (
          <ZScrollbar
            theme={mergedTheme.peers.Scrollbar}
            themeOverrides={mergedTheme.peerOverrides.Scrollbar}
            xScrollable={true}
          >
            {{
              default: FloatBox
            }}
          </ZScrollbar>
        ) : (
          <FloatBox />
        )}
      </div>
    )
  }
})
