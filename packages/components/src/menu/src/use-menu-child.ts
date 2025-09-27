import type { Key } from 'treemate'
import { inject, computed, type ComputedRef, type Ref } from 'vue'
import type { FollowerPlacement } from '../../_external-dependencies/vueuc'
import type { MergedTheme } from '../../_mixins/use-theme'
import type { MenuTheme } from '../styles'
import type { OnUpdateModelValueImpl } from './interface'
import {
  menuInjectionKey,
  submenuInjectionKey,
  menuItemGroupInjectionKey
} from './context'
import type { MenuSetupProps } from './Menu'
import type { UseMenuChildProps } from './use-menu-child-props'

const ICON_MARGIN_RIGHT = 4
const ROOT_PADDING_LEFT = 8
const MENU_GROUP_PADDING_LEFT = 8
export interface MenuInjection {
  props: MenuSetupProps
  mergedCollapsedRef: Ref<boolean>
  invertedRef: Ref<boolean>
  isHorizontalRef: Ref<boolean>
  mergedClsPrefixRef: Ref<string>
  mergedValueRef: Ref<Key | null>
  mergedExpandedKeysRef: Ref<Key[]>
  activePathRef: Ref<Key[]>
  mergedThemeRef: Ref<MergedTheme<MenuTheme>>
  doSelect: OnUpdateModelValueImpl
  toggleExpand: (key: Key) => void
}

export interface SubmenuInjection {
  paddingLeftRef: Ref<number | undefined>
  mergedDisabledRef: Ref<boolean>
}

export interface MenuOptionGroupInjection {
  paddingLeftRef: Ref<number | undefined>
}

export interface UseMenuChild {
  dropdownPlacement: ComputedRef<FollowerPlacement>
  activeIconSize: ComputedRef<number>
  maxIconSize: ComputedRef<number>
  paddingLeft: ComputedRef<number | undefined>
  iconMarginRight: ComputedRef<number>
  ZMenu: MenuInjection
  ZSubmenu: SubmenuInjection | null
}

export function useMenuChild (props: UseMenuChildProps): UseMenuChild {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const ZMenu = inject(menuInjectionKey)!
  const { props: menuProps, mergedCollapsedRef } = ZMenu
  const ZSubmenu = inject(submenuInjectionKey, null)
  const NMenuOptionGroup = inject<MenuOptionGroupInjection | null>(
    menuItemGroupInjectionKey,
    null
  )
  const horizontalRef = computed(() => {
    return menuProps.mode === 'horizontal'
  })
  const dropdownPlacementRef = computed(() => {
    if (horizontalRef.value) {
      return menuProps.dropdownPlacement
    }
    if ('tmNodes' in props) return 'right-start'
    return 'right'
  })
  const maxIconSizeRef = computed(() => {
    return Math.max(
      menuProps.collapsedIconSize ?? menuProps.iconSize,
      menuProps.iconSize
    )
  })
  const activeIconSizeRef = computed(() => {
    if (!horizontalRef.value && props.root && mergedCollapsedRef.value) {
      return menuProps.collapsedIconSize ?? menuProps.iconSize
    } else {
      return menuProps.iconSize
    }
  })
  const paddingLeftRef = computed(() => {
    if (horizontalRef.value) return undefined
    const { indent } = menuProps
    const { root, isGroup } = props
    if (root) {
      return ROOT_PADDING_LEFT
    }
    if (NMenuOptionGroup) {
      return MENU_GROUP_PADDING_LEFT
    }
    if (ZSubmenu) {
      return (
        (isGroup ? indent / 2 : indent) +
        (ZSubmenu.paddingLeftRef.value as number)
      )
    }
    return undefined as never
  })
  const iconMarginRightRef = computed(() => {
    return ICON_MARGIN_RIGHT
  })
  return {
    dropdownPlacement: dropdownPlacementRef,
    activeIconSize: activeIconSizeRef,
    maxIconSize: maxIconSizeRef,
    paddingLeft: paddingLeftRef,
    iconMarginRight: iconMarginRightRef,
    ZMenu,
    ZSubmenu
  }
}
