import { createInjectionKey } from '../../_utils'
import type { FilterInjection, FilterItemInjection } from './interface'

export const filterInjectionKey =
  createInjectionKey<FilterInjection>('z-filter')

export const filterItemInjectionKey =
  createInjectionKey<FilterItemInjection>('z-filter-item')
