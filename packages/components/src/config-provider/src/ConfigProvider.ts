import {
  h,
  inject,
  computed,
  defineComponent,
  type PropType,
  provide,
  ref,
  type ComputedRef,
  markRaw,
  type ExtractPropTypes
} from 'vue'
import { useMemo } from '../../_external-dependencies/vooks'
import { merge } from 'lodash-es'
import { hash } from './../../_utils/css-render'
import { warn } from '../../_utils'
import { defaultClsPrefix, type Hljs } from '../../_mixins'
import type { ZDateLocale, ZLocale } from '../../locales'
import type {
  GlobalTheme,
  GlobalThemeOverrides,
  GlobalComponentConfig,
  GlobalIconConfig
} from './interface'
import type {
  RtlProp,
  RtlEnabledState,
  Breakpoints
} from './internal-interface'
import { configProviderInjectionKey } from './context'
import type { Katex } from './katex'

export const configProviderProps = {
  // expose shadowMode prop. Business & Angelos components will pass this prop as true to ensure the library is rendered in custom element
  shadowMode: Boolean,
  onShadowRootFound: Function as PropType<
  (found: boolean, rootNode?: ShadowRoot) => void
  >,
  abstract: Boolean,
  bordered: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  clsPrefix: { type: String, default: defaultClsPrefix },
  locale: Object as PropType<ZLocale | null>,
  dateLocale: Object as PropType<ZDateLocale | null>,
  namespace: String,
  gdsTokens: Object as PropType<Record<string, string> | string | null>,
  rtl: Array as PropType<RtlProp>,
  tag: {
    type: String,
    default: 'div'
  },
  hljs: Object as PropType<Hljs>,
  katex: Object as PropType<Katex>,
  theme: Object as PropType<GlobalTheme | null>,
  themeOverrides: Object as PropType<GlobalThemeOverrides | null>,
  componentOptions: Object as PropType<GlobalComponentConfig>,
  icons: Object as PropType<GlobalIconConfig>,
  breakpoints: Object as PropType<Breakpoints>,
  preflightStyleDisabled: Boolean,
  inlineThemeDisabled: {
    type: Boolean,
    default: undefined
  },
  // deprecated
  as: {
    type: String as PropType<string | undefined>,
    validator: () => {
      warn('config-provider', '`as` is deprecated, please use `tag` instead.')
      return true
    },
    default: undefined
  }
} as const

export type ConfigProviderProps = Partial<
ExtractPropTypes<typeof configProviderProps>
>

export default defineComponent({
  name: 'ConfigProvider',
  alias: ['App'],
  props: configProviderProps,
  setup (props) {
    const rootRef = ref<HTMLElement | null>(null)
    const { shadowMode = false } = props
    const ZConfigProvider = inject(configProviderInjectionKey, null)
    const mergedThemeRef = computed(() => {
      const { theme } = props
      if (theme === null) return undefined
      const inheritedTheme = ZConfigProvider?.mergedThemeRef.value
      return theme === undefined
        ? inheritedTheme
        : inheritedTheme === undefined
          ? theme
          : Object.assign({}, inheritedTheme, theme)
    })
    const mergedThemeOverridesRef = computed(() => {
      const { themeOverrides } = props
      // stop inheriting themeOverrides
      if (themeOverrides === null) return undefined
      // use inherited themeOverrides
      if (themeOverrides === undefined) {
        return ZConfigProvider?.mergedThemeOverridesRef.value
      } else {
        const inheritedThemeOverrides =
          ZConfigProvider?.mergedThemeOverridesRef.value
        if (inheritedThemeOverrides === undefined) {
          // no inherited, use self overrides
          return themeOverrides
        } else {
          // merge overrides
          return merge({}, inheritedThemeOverrides, themeOverrides)
        }
      }
    })
    const mergedNamespaceRef = useMemo(() => {
      const { namespace } = props
      return namespace === undefined
        ? ZConfigProvider?.mergedNamespaceRef.value
        : namespace
    })
    const mergedGDSTokenRef = useMemo(() => {
      const { gdsTokens } = props
      return gdsTokens === undefined
        ? ZConfigProvider?.mergedGDSTokenRef.value
        : gdsTokens
    })
    const mergedBorderedRef = useMemo(() => {
      const { bordered } = props
      return bordered === undefined
        ? ZConfigProvider?.mergedBorderedRef.value
        : bordered
    })
    const mergedIconsRef = computed(() => {
      const { icons } = props
      return icons === undefined ? ZConfigProvider?.mergedIconsRef.value : icons
    })
    const mergedComponentPropsRef = computed(() => {
      const { componentOptions } = props
      if (componentOptions !== undefined) return componentOptions
      return ZConfigProvider?.mergedComponentPropsRef.value
    })
    const mergedClsPrefixRef = computed(() => {
      const { clsPrefix } = props
      if (clsPrefix !== undefined) return clsPrefix
      if (ZConfigProvider) return ZConfigProvider.mergedClsPrefixRef.value
      return defaultClsPrefix
    })
    const mergedRtlRef: ComputedRef<RtlEnabledState | undefined> = computed(
      () => {
        const { rtl } = props
        if (rtl === undefined) {
          return ZConfigProvider?.mergedRtlRef.value
        }
        const rtlEnabledState: RtlEnabledState = {}
        for (const rtlInfo of rtl) {
          rtlEnabledState[rtlInfo.name] = markRaw(rtlInfo)
          rtlInfo.peers?.forEach((peerRtlInfo) => {
            if (!(peerRtlInfo.name in rtlEnabledState)) {
              rtlEnabledState[peerRtlInfo.name] = markRaw(peerRtlInfo)
            }
          })
        }
        return rtlEnabledState
      }
    )
    const mergedBreakpointsRef = computed(() => {
      return props.breakpoints || ZConfigProvider?.mergedBreakpointsRef.value
    })
    const inlineThemeDisabled =
      props.inlineThemeDisabled || ZConfigProvider?.inlineThemeDisabled
    const preflightStyleDisabled =
      props.preflightStyleDisabled || ZConfigProvider?.preflightStyleDisabled
    const mergedThemeHashRef = computed(() => {
      const { value: theme } = mergedThemeRef
      const { value: mergedThemeOverrides } = mergedThemeOverridesRef
      const hasThemeOverrides =
        mergedThemeOverrides && Object.keys(mergedThemeOverrides).length !== 0
      const themeName = theme?.name
      if (themeName) {
        if (hasThemeOverrides) {
          return `${themeName}-${hash(
            JSON.stringify(mergedThemeOverridesRef.value)
          )}`
        }
        return themeName
      } else {
        if (hasThemeOverrides) {
          return hash(JSON.stringify(mergedThemeOverridesRef.value))
        }
        return ''
      }
    })
    provide(configProviderInjectionKey, {
      mergedThemeHashRef,
      mergedBreakpointsRef,
      mergedRtlRef,
      mergedIconsRef,
      mergedComponentPropsRef,
      mergedBorderedRef,
      mergedNamespaceRef,
      mergedGDSTokenRef,
      mergedClsPrefixRef,
      mergedLocaleRef: computed(() => {
        const { locale } = props
        if (locale === null) return undefined
        return locale === undefined
          ? ZConfigProvider?.mergedLocaleRef.value
          : locale
      }),
      mergedDateLocaleRef: computed(() => {
        const { dateLocale } = props
        if (dateLocale === null) return undefined
        return dateLocale === undefined
          ? ZConfigProvider?.mergedDateLocaleRef.value
          : dateLocale
      }),
      mergedHljsRef: computed(() => {
        const { hljs } = props
        return hljs === undefined ? ZConfigProvider?.mergedHljsRef.value : hljs
      }),
      mergedKatexRef: computed(() => {
        const { katex } = props
        return katex === undefined
          ? ZConfigProvider?.mergedKatexRef.value
          : katex
      }),
      shadowMode,
      shadowRootNodeRef: computed(handleShadowMode),
      mergedThemeRef,
      mergedThemeOverridesRef,
      inlineThemeDisabled: inlineThemeDisabled || false,
      preflightStyleDisabled: preflightStyleDisabled || false
    })

    function handleShadowMode (): null | ShadowRoot {
      if (!shadowMode) {
        return null
      }

      if (!rootRef.value) {
        return null
      }

      /* https://developer.mozilla.org/en-US/docs/Web/API/Node/getRootNode
          The getRootNode() method of the Node interface returns the context
          object's root, which optionally includes the shadow root if it is available. */

      const rootNode = rootRef?.value?.getRootNode()
      if (rootNode && rootNode instanceof ShadowRoot) {
        props.onShadowRootFound?.(true, rootNode)
        return rootNode
      }

      const errorMessage =
        '[@zeta-gds/components/ConfigProvider] not able to find ShadowRoot'
      if (process.env.NODE_ENV !== 'production') {
        throw new Error(errorMessage)
      } else console.warn(errorMessage)

      props.onShadowRootFound?.(false)
      return null
    }

    return {
      rootRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedBordered: mergedBorderedRef,
      mergedNamespace: mergedNamespaceRef,
      mergedGDSToken: mergedGDSTokenRef,
      mergedTheme: mergedThemeRef,
      mergedThemeOverrides: mergedThemeOverridesRef
    }
  },
  render () {
    return !this.abstract
      ? h(
        this.as || this.tag,
        {
          ref: 'rootRef',
          class: `${this.mergedClsPrefix || defaultClsPrefix}-config-provider`
        },
        this.$slots.default?.()
      )
      : this.$slots.default?.()
  }
})
