import { type ComputedRef, computed, inject } from 'vue'
import { configProviderInjectionKey } from '../../config-provider/src/context'

export function useRootNode (defaults?: {
  to?: any
}): ComputedRef<ShadowRoot | HTMLElement> {
  const ZConfigProvider = inject(configProviderInjectionKey, null)

  return computed(() => {
    if (
      ZConfigProvider?.shadowMode &&
      ZConfigProvider?.shadowRootNodeRef.value
    ) {
      return ZConfigProvider.shadowRootNodeRef.value
    }

    return defaults?.to ?? document.body
  })
}
