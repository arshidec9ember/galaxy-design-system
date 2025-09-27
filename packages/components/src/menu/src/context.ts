import { createInjectionKey } from '../../_utils'
import type {
  MenuInjection,
  MenuOptionGroupInjection,
  SubmenuInjection
} from './use-menu-child'

export const menuInjectionKey = createInjectionKey<MenuInjection>('z-menu')

export const submenuInjectionKey = createInjectionKey<SubmenuInjection | null>(
  'z-submenu'
)

export const menuItemGroupInjectionKey =
  createInjectionKey<MenuOptionGroupInjection | null>('z-menu-item-group')
