# Menu

Sidebar is the navigation component used for web based applications. The user can easily navigate using the various Sidebar items. Hierarchically this vertical navigation is placed at the side of a page and the position is depends upon the type of sidebar used. A highly composable component that supports the nested views and helps us in navigation.

<!--single-column-->

```figma
https://www.figma.com/file/Q8HKejlBjStQ4i9iEGbtIT/Vue-Migration-Items?type=design&node-id=643-11682&mode=design&t=DuGsCHhQBePCIjlm-0
```

```overview-html
menu/demos/enUS/index.html
```

## Demos

```demo
default.vue
horizontal.vue
collapse.vue
inverted.vue
long-label.vue
```

## Customization

```customization
select.vue
render-label.vue
render-extra.vue
default-expanded-keys.vue
indent.vue
accordion.vue
router-link.vue
customize-field.vue
expand-selected-option.vue
show.vue
watch-props.vue
viewmore.vue
search.vue
```

## API

### Menu Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| accordion | `boolean` | `false` | Whether to use accordion mode. |
| children-field | `string` | `'children'` | Field name of children. |
| collapsed-icon-size | `number` | `24` | The icon size when menu is collapsed. If not set, menu will use `icon-size` in place of it. |
| collapsed | `boolean` | `false` | The collapsed status of menu, only works when menu is vertical. |
| default-expand-all | `boolean` | `false` | Whether to expand all menus. When options is set asynchronously, you can set `watch-props` to `['defaultExpandedKeys']` to make it work. |
| default-expanded-keys | `Array<string>` | `[]` | The default expanded submenu keys of menu in uncontrolled manner. |
| default-model-value | `string \| null` | `null` | Whether selected by default in uncontrolled mode. |
| disabled-field | `string` | `'disabled'` | Field name of disabled. |
| dropdown-placement | `'top-start' \| 'top' \| 'top-end' \| 'right-start' \| 'right' \| 'right-end' \| 'bottom-start' \| 'bottom' \| 'bottom-end' \| 'left-start' \| 'left' \| 'left-end' \| ` | `'top'` | Only effective in horizontal mode. |
| dropdown-props | `DropdownProps` | `undefined` | The dropdown's props when menu is collapsed or horizontal mode，please see [Dropdown Props](dropdown#Dropdown-Props) |
| expanded-keys | `Array<string>` | `undefined` | The expanded submenu keys. If set, menu will work in controlled manner and `default-expanded-names` won't work. |
| expand-icon | `(option: MenuOption) => VNodeChild` | `undefined` | Render function that renders all expand icon. |
| icon-size | `number` | `20` | The icon size when menu is not collapsed. |
| indent | `number` | `32` | The indent of menu. |
| inverted | `boolean` | `false` | Use inverted style. |
| key-field | `string` | `'key'` | Field name of key. |
| label-field | `string` | `'label'` | Field name of label. |
| options | `Array<MenuOption \| MenuDividerOption \| MenuGroupOption>` | `[]` | Items data of menu. |
| node-props | `(option: MenuOption \| MenuGroupOption) => object` | `undefined` | Node's DOM attrs generator. |
| mode | `'vertical' \| 'horizontal'` | `'vertical'` | Menu layout. |
| render-end | `(option: MenuOption \| MenuGroupOption) => VNodeChild` | `undefined` | Render function that renders all items in the end. |
| render-icon | `(option: MenuOption) => VNodeChild` | `undefined` | Render function that renders all icons. |
| render-label | `(option: MenuOption \| MenuGroupOption) => VNodeChild` | `undefined` | Render function that renders all labels. |
| responsive | `boolean` | `false` | Whether to collapsed menu items that overflows menu. Only work for menu with mode='horizontal'. |
| root-indent | `number` | `undefined` | The indent of menu's first level children. If not set, menu will use `indent` in place of it. |
| model-value | `string \| null` | `undefined` | The selected item key of the menu. |
| watch-props | `Array<'defaultModelValue' \| 'defaultExpandedKeys'>` | `undefined` | Default prop names that needed to be watched. Components will be updated after the prop is changed. Note: the `watch-props` itself is not reactive. |
| on-update:expanded-keys | `(keys: string[]) => void` | `undefined` | `keys` is the array of expanded menu options' `key`. |
| on-update:model-value | `(key: string, item: MenuOption) => void` | `undefined` | Callback when select a menu item. `key` is the `key` of the selected menu item. `item` is then original data of the menu item. |

### MenuOption Properties

| Name | Type | Description |
| --- | --- | --- |
| children? | `Array<MenuOption \| MenuGroupOption>` | Child menu options. |
| disabled? | `boolean` | Whether to disable the menu item. |
| end? | `string \| (() => VNodeChild)` | The parts of the menu item rendered towards the end. |
| icon? | `() => VNodeChild` | The icon for the menu item. |
| key | `string` | The indentifier of the menu item. |
| label | `string \| (() => VNodeChild)` | The label of the menu item. |
| show? | `boolean` | Whether to show the menu item. |

### MenuGroupOption Properties

| Name | Type | Description |
| --- | --- | --- |
| children | `Array<MenuOption \| MenuGroupOption>` | Group items, **required!** |
| key | `string` | The indentifier of the menu group. |
| label | `string \| (() => VNodeChild)` | The label of the menu item. |
| show? | `boolean` | Whether to show the menu item. |
| type | `'group'` | The type of the menu item, **required!** |

### MenuDividerOption Properties

| Name  | Type             | Description                              |
| ----- | ---------------- | ---------------------------------------- |
| key   | `string`         | The indentifier of the menu group.       |
| props | `HTMLAttributes` | Attributes of the divider.               |
| show? | `boolean`        | Whether to show the menu item.           |
| type  | `'divider'`      | The type of the menu item, **required!** |

### Menu Methods

| Name | Type | Description |
| --- | --- | --- |
| showOption | `(key: string \| number) => void` | Expand menu to show option with specified `key`. If `key` is not specified, selected option will be displayed. |
