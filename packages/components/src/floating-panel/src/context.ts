import { createInjectionKey } from '../../_utils'
import type { FloatingPanelProviderInjection } from './FloatingPanelProvider'

// TODO: the symbol should be defined as a prop so that it can be configured for business components
export const floatingPanelProviderInjectionKey =
  createInjectionKey<FloatingPanelProviderInjection>('z-floatingPanel-provider')
