import { createInjectionKey } from '../../_utils'
import type { DropdownInjection } from './Dropdown'
import type { ZDropdownMenuInjection } from './DropdownMenu'
import type { ZDropdownOptionInjection } from './DropdownOption'

export const dropdownMenuInjectionKey =
  createInjectionKey<ZDropdownMenuInjection>('z-dropdown-menu')

export const dropdownInjectionKey =
  createInjectionKey<DropdownInjection>('z-dropdown')

export const dropdownOptionInjectionKey =
  createInjectionKey<ZDropdownOptionInjection>('z-dropdown-option')
