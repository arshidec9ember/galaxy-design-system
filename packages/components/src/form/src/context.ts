import { createInjectionKey } from '../../_utils'
import type { FormInjection } from './interface'

export const formInjectionKey = createInjectionKey<FormInjection>('z-form')
export const formItemInstsInjectionKey =
  createInjectionKey<unknown>('z-form-item-insts')
