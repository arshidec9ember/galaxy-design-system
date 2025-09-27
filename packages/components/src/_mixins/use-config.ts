import { inject, computed, type ComputedRef, type Ref, shallowRef } from 'vue'
import type {
  RtlEnabledState,
  GlobalComponentConfig,
  Breakpoints
} from '../config-provider/src/internal-interface'
import { configProviderInjectionKey } from '../config-provider/src/context'

type UseConfigProps = Readonly<{
  bordered?: boolean
  [key: string]: unknown
}>

export const defaultClsPrefix = 'z'

export default function useConfig (
  props: UseConfigProps = {},
  options: {
    defaultBordered?: boolean
  } = {
    defaultBordered: true
  }
): {
    inlineThemeDisabled: boolean | undefined
    mergedRtlRef: Ref<RtlEnabledState | undefined> | undefined
    mergedBorderedRef: ComputedRef<boolean>
    mergedClsPrefixRef: Ref<string>
    mergedBreakpointsRef: Ref<Breakpoints> | undefined
    mergedComponentPropsRef: Ref<GlobalComponentConfig | undefined> | undefined
    mergedGDSTokenRef: Ref<any> | undefined
    namespaceRef: ComputedRef<string | undefined>
  } {
  const ZConfigProvider = inject(configProviderInjectionKey, null)
  return {
    // ZConfigProvider,
    inlineThemeDisabled: ZConfigProvider?.inlineThemeDisabled,
    mergedRtlRef: ZConfigProvider?.mergedRtlRef,
    mergedComponentPropsRef: ZConfigProvider?.mergedComponentPropsRef,
    mergedBreakpointsRef: ZConfigProvider?.mergedBreakpointsRef,
    mergedBorderedRef: computed(() => {
      const { bordered } = props
      if (bordered !== undefined) return bordered
      return (
        ZConfigProvider?.mergedBorderedRef.value ??
        options.defaultBordered ??
        true
      )
    }),
    mergedClsPrefixRef: ZConfigProvider
      ? ZConfigProvider.mergedClsPrefixRef
      : shallowRef(defaultClsPrefix),
    namespaceRef: computed(() => ZConfigProvider?.mergedNamespaceRef.value),
    mergedGDSTokenRef: computed(() => ZConfigProvider?.mergedGDSTokenRef.value)
  }
}

export function useMergedClsPrefix (): Ref<string> {
  const ZConfigProvider = inject(configProviderInjectionKey, null)
  return ZConfigProvider
    ? ZConfigProvider.mergedClsPrefixRef
    : shallowRef(defaultClsPrefix)
}
