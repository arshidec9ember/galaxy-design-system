### CautionAlert

# Tree Select

TreeSelect is similar to Select, but the values are provided in a tree like structure. Any data whose entries are defined in a hierarchical manner is fit to use this control. Examples of such case may include a corporate hierarchy, a directory structure, and so on.

## Demos

```demo
basic.vue
custom-field.vue
multiple.vue
checkbox.vue
check-strategy.vue
filterable.vue
action.vue
async.vue
status.vue
debug.vue
```

## API

### TreeSelect Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| allow-checking-not-loaded | `boolean` | `false` | Whether to allow cascade checking on not loaded nodes. If you want to use this, you should know the `value` may be incomplete. Also, you should aware about the consistency bewteen zeta-gds's checking logic and your backend's checking logic, especially when there are disabled nodes. |
| cascade | `boolean` | `false` | Whether to link the selection of parent and child nodes. |
| checkable | `boolean` | `false` | Whether to use a checkbox to select values. |
| check-strategy | `string` | `'all'` | How to display selected nodes when parents and children are selected. |
| children-field | `string` | `'children'` | The children property to use for `TreeSelectOption`'s. |
| clearable | `boolean` | `false` | Whether the selection is clearable. |
| clear-filter-after-select | `boolean` | `true` | When multiple and filter is true, whether to clear filter keyword after select an option. |
| consistent-menu-width | `boolean` | `true` | Force the widths of selection input and menu to be equal. \*This will disable virtual scrolling. |
| default-model-value | `string \| number \| Array<string \| number> \| null` | `null` | Selected key (or keys when `multiple`) by default. |
| default-expand-all | `boolean` | `false` | Expand all nodes by default. |
| default-expanded-keys | `Array<string \| number>` | `[]` | Expand specific keys by default. |
| disabled | `boolean` | `false` | Disabled state. |
| expanded-keys | `Array<string \| number>` | `undefined` | Collection of expanded keys. |
| indeterminate-keys | `Array<string \| number>` | `undefined` | Indeterminate keys of the tree. |
| filterable | `boolean` | `false` | Whether to show a filter. |
| filter | `(pattern: string, option: TreeSelectOption) => boolean` | - | Filter function. |
| key-field | `string` | `'key'` | The key field used for `TreeSelectOption`. |
| label-field | `string` | `'label'` | The label field used for `TreeSelectOption`. |
| disabled-field | `string` | `'disabled'` | The disabled field used for `TreeSelectOption`. |
| loading | `boolean` | `false` | Whether it's loading. |
| max-tag-count | `number \| 'responsive'` | `undefined` | Maximum number of selected options to show before the list is truncated. `'responsive'` will keep all of the selected options in one row. |
| menu-props | `HTMLAttributes` | `undefined` | The menu's dom props. |
| multiple | `boolean` | `false` | Allow selecting multiple options. |
| node-props | `(info: { option: TreeSelectOption }) => HTMLAttributes` | `undefined` | HTML attributes of node. |
| options | `TreeSelectOption[]` | `[]` | Options. |
| placeholder | `string` | `'Please Select'` | Placeholder. |
| placement | `'top-start' \| 'top' \| 'top-end' \| 'right-start' \| 'right' \| 'right-end' \| 'bottom-start' \| 'bottom' \| 'bottom-end' \| 'left-start' \| 'left' \| 'left-end'` | `'bottom-start'` | Tree select menu's placement. |
| render-option-label | `(info: { option: TreeSelectOption, checked: boolean, selected: boolean }) => VNodeChild` | `undefined` | Render function of all the options' label. |
| render-option-start | `(info: { option: TreeSelectOption, checked: boolean, selected: boolean }) => VNodeChild` | `undefined` | Render function of all the options' prefix. |
| render-option-end | `(info: { option: TreeSelectOption, checked: boolean, selected: boolean }) => VNodeChild` | `undefined` | Render function of all the options' suffix. |
| render-option-expand-icon | `() => VNodeChild` | `undefined` | Render function of option switcher icon. |
| render-option-tag | `(props: { option: TreeSelectOption, handleClose: () => void }) => VNodeChild` | `undefined` | Render function for each option tag. |
| separator | `string` | `' / '` | Option value separator. |
| show-path | `boolean` | `false` | Whether to also show the hierarchy of selected nodes in the label. |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Component size. |
| status | `'success' \| 'warning' \| 'error'` | `undefined` | Validation status. |
| to | `string \| HTMLElement \| false` | `body` | Container node of the menu. `false` will keep it not detached. |
| model-value | `string \| number \| Array<string \| number> \| null>` | `undefined` | Selected key (or keys when multiple). |
| virtual-scroll | `boolean` | `true` | Whether to enable virtual scrolling. |
| on-blur | `(e: FocusEvent) => void` | `undefined` | Callback on blur. |
| on-focus | `(e: FocusEvent) => void` | `undefined` | Callback on focus. |
| on-load | `(node: TreeSelectOption) => Promise<void>` | `undefined` | Callback function for asynchronously loading data. |
| on-update:expanded-keys | `(value: Array<string \| number>, meta: { node: TreeOption \| null, action: 'expand' \| 'collapse' \| 'filter' }) => void` | `undefined` | Callback on expanded keys updated. |
| on-update:indeterminate-keys | `(keys: Array<string \| number>) => void` | `undefined` | Callback function on indeterminate options changing. |
| on-update:model-value | `(value: string \| number \| Array<string \| number> \| null, option: TreeSelectOption \| null \| Array<TreeSelectOption \| null>, meta: { node: TreeOption \| null, action: 'select' \| 'unselect' \| 'delete' \| 'clear' }) => void) => void` | `undefined` | Callback on value updated. |

### TreeSelectOption Properties

| Name | Type | Description |
| --- | --- | --- |
| key | `string \| number` | Unique option key. The field used can be set using `key-field`. |
| label | `string` | Displayed content of the option. The field used can be set using `label-field`. |
| children? | `TreeSelectOption[]` | Child options of the option. The field used can be set using `children-field` |
| disabled? | `boolean` | Option disabled state. |
| isLeaf? | `boolean` | Whether the node is leaf. Required in async mode. |

### TreeSelect Slots

| Name   | Parameters | Description                            |
| ------ | ---------- | -------------------------------------- |
| action | `()`       | Options menu slot.                     |
| arrow  | `()`       | Arrow icon of trigger.                 |
| empty  | `()`       | Empty state slot for the options menu. |

### TreeSelect Methods

| Name | Type | Description |
| --- | --- | --- |
| blur | `() => void` | Blur. |
| blurInput | `() => void` | Input blur. |
| focus | `() => void` | Focus. |
| focusInput | `() => void` | Input focus. |
| getCheckedData | `() => { keys: Array<string \| number>, options: Array<TreeOption \| null> }` | Get checked data. |
| getIndeterminateData | `() => { keys: Array<string \| number>, options: Array<TreeOption \| null> }` | Get indeterminate data. |
