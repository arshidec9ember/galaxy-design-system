import { inject, computed, type Ref } from 'vue'
import { enUS, dateEnUS } from '../locales'
import type { ZLocale } from '../locales/common/enUS'
import type { ZDateLocale } from '../locales/date/enUS'
import { configProviderInjectionKey } from '../config-provider/src/context'

export default function useLocale<T extends keyof ZLocale> (
  ns: T
): {
    localeRef: Ref<ZLocale[T]>
    dateLocaleRef: Ref<ZDateLocale>
  } {
  const { mergedLocaleRef, mergedDateLocaleRef } =
    inject(configProviderInjectionKey, null) || {}
  const localeRef = computed(() => {
    return mergedLocaleRef?.value?.[ns] ?? enUS[ns]
  })
  const dateLocaleRef = computed(() => {
    return mergedDateLocaleRef?.value ?? dateEnUS
  })
  return {
    dateLocaleRef,
    localeRef
  }
}
