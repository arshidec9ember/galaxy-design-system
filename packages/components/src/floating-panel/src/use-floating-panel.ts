import { inject } from 'vue'
import { floatingPanelApiInjectionKey } from './FloatingPanelProvider'
import type { FloatingPanelApiInjection } from './FloatingPanelProvider'
import { throwError } from '../../_utils'

export function useFloatingPanel (): FloatingPanelApiInjection {
  const api = inject(floatingPanelApiInjectionKey, null)
  if (api === null) {
    throwError(
      'useFloatingPanel',
      'No outer `z-floating-panel-provider` found.'
    )
  }
  return api
}
