import type { Ref } from 'vue'
import { createInjectionKey } from '../../_utils'
import type {
  LoadingBarApiInjection,
  LoadingBarProviderSetupProps
} from './LoadingBarProvider'

export const loadingBarProviderInjectionKey = createInjectionKey<{
  props: LoadingBarProviderSetupProps
  mergedClsPrefixRef: Ref<string>
}>('z-loading-bar')

export const loadingBarApiInjectionKey =
  createInjectionKey<LoadingBarApiInjection>('z-loading-bar-api')
