import {
  h,
  defineComponent,
  onBeforeUnmount,
  type PropType,
  toRef,
  watch
} from 'vue'
import { ZConfigProvider, configProviderProps } from '@zeta-gds/components'
import { merge } from 'lodash-es'
import { unconfigurableStyle } from './unconfigurable-style-light'
import { unconfigurableStyle as unconfigurableDarkStyle } from './unconfigurable-style-dark'

import { themeOverridesLight } from './theme-overrides-light'
import { themeOverridesDark } from './theme-overrides-dark'
import getTokens from './tokens'
import foundationLight from './foundations-light'
import foundationDark from './foundations-dark'
import type { CNode } from '@zeta-gds/components/lib/_utils/css-render'

const THEME_ID = 'zeta-gds/olympus-theme'

const olympusComponentOptions = {
  Pagination: {
    inputSize: 'medium'
  },
  DatePicker: {
    timePickerSize: 'medium'
  },
  Dialog: {
    iconPlacement: 'top'
  },
  DynamicInput: {
    buttonSize: 'small'
  }
} as const

export default defineComponent({
  name: 'ThemeConfigProvider',
  props: {
    themeName: {
      type: String as PropType<'light' | 'dark'>,
      default: 'light'
    },
    ...configProviderProps
  },
  setup (props: any) {
    let currentUnconfigurableStyle: CNode
    function mountLightTheme (shadowRoot?: ShadowRoot): void {
      currentUnconfigurableStyle = unconfigurableStyle
      unconfigurableStyle.mount({
        id: THEME_ID,
        parent: shadowRoot
      })
    }
    function mountDarkTheme (shadowRoot?: ShadowRoot): void {
      currentUnconfigurableStyle = unconfigurableDarkStyle
      unconfigurableDarkStyle.mount({
        id: THEME_ID,
        parent: shadowRoot
      })
    }
    function unmountTheme (shadowRoot?: ShadowRoot): void {
      if (currentUnconfigurableStyle) {
        currentUnconfigurableStyle.unmount({ parent: shadowRoot })
      }
    }

    watch(
      toRef(props, 'themeName'),
      (themeName) => {
        handleTheme(themeName)
      },
      {
        immediate: true
      }
    )

    function handleTheme (themeName: string, shadowRoot?: ShadowRoot): void {
      if (themeName === 'light') {
        unmountTheme(shadowRoot)
        mountLightTheme(shadowRoot)
      } else {
        unmountTheme(shadowRoot)
        mountDarkTheme(shadowRoot)
      }
    }

    onBeforeUnmount(() => {
      unmountTheme()
    })

    function handleShadowMode (found: boolean, shadowRoot?: ShadowRoot): void {
      found && handleTheme(props.themeName, shadowRoot)
    }

    return {
      handleShadowMode
    }
  },
  render () {
    const { $props, handleShadowMode } = this
    const { themeOverrides, componentOptions, themeName } = $props
    const olympusThemeOverrides =
      themeName === 'light' ? themeOverridesLight : themeOverridesDark
    const gdsTokens = getTokens(
      themeName === 'light' ? foundationLight : foundationDark
    )

    return (
      <ZConfigProvider
        {...$props}
        style={gdsTokens}
        gdsTokens={gdsTokens}
        class={`olympus-${String(themeName)}-theme`}
        themeOverrides={
          themeOverrides
            ? merge({}, olympusThemeOverrides, themeOverrides)
            : olympusThemeOverrides
        }
        componentOptions={
          componentOptions
            ? merge({}, olympusComponentOptions, componentOptions)
            : olympusComponentOptions
        }
        onShadowRootFound={handleShadowMode}
      >
        {this.$slots}
      </ZConfigProvider>
    )
  }
} as any)
