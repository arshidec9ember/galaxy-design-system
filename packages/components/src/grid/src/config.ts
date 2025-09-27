import { createInjectionKey } from '../../_utils'
import type { ZGridInjection } from './Grid'

export const defaultSpan = 1
export const gridInjectionKey = createInjectionKey<ZGridInjection>('z-grid')
