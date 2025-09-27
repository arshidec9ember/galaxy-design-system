import { type TreeNode } from 'treemate'
import { type VNodeChild, type HTMLAttributes } from 'vue'

export type Key = string | number

export interface MenuOptionSharedPart {
  key?: Key
  disabled?: boolean
  icon?: () => VNodeChild
  children?: Array<MenuOption | MenuGroupOption | MenuDividerOption>
  end?: string | (() => VNodeChild)
  props?: HTMLAttributes
  show?: boolean
  [key: string]: unknown
  /** @deprecated */
  titleEnd?: string | (() => VNodeChild)
}

/**
 * @private
 */
export type MenuIgnoredOption = MenuDividerOption | MenuRenderOption

export interface MenuDividerOption {
  type: 'divider'
  key?: Key
  props?: HTMLAttributes
  [key: string]: unknown
}

export interface MenuRenderOption {
  type: 'render'
  key?: Key
  props?: HTMLAttributes
  render?: () => VNodeChild
  [key: string]: unknown
}

export interface MenuGroupOptionBase extends MenuOptionSharedPart {
  type: 'group'
  children: Array<MenuOption | MenuDividerOption>
}

export type MenuOption =
  | (MenuOptionSharedPart & {
    /** @deprecated */
    title?: string | (() => VNodeChild)
  })
  | (MenuOptionSharedPart & { label?: string | (() => VNodeChild) })

export type MenuGroupOption =
  | (MenuGroupOptionBase & {
    itemsToShow: number
    showSearch: boolean
    /** @deprecated */
    title?: string | (() => VNodeChild)
  })
  | (MenuGroupOptionBase & { label?: string | (() => VNodeChild) })

export type MenuMixedOption = MenuDividerOption | MenuOption | MenuGroupOption

export type TmNode = TreeNode<MenuOption, MenuGroupOption, MenuIgnoredOption>

export type OnUpdateModelValue = (
  value: string & number & (string | number),
  item: MenuOption
) => void

export type OnUpdateKeys = (
  keys: string[] & number[] & Array<string | number>
) => void

export type OnUpdateModelValueImpl = (
  value: string | number | (string | number),
  item: MenuOption
) => void

export type OnUpdateKeysImpl = (
  keys: string[] | number[] | Array<string | number>
) => void

export type MenuNodeProps = (
  option: MenuOption | MenuGroupOption
) => HTMLAttributes & Record<string, string | number | undefined>

export interface MenuInst {
  showOption: (key?: Key) => void
  deriveResponsiveState: () => void
}
