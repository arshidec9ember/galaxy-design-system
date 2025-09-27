# Tree

A tree component is a graphical user interface element used to display hierarchical data with parent-child relationships. It consists of nodes organized in a hierarchy, where parent nodes can be expanded or collapsed to reveal or hide child nodes. Nodes display labels or icons to represent the data they contain.

```overview-html
tree/demos/enUS/index.html
```

## Demos

```demo
basic.vue
custom-field.vue
multiple.vue
cascade.vue
filter.vue
drag-drop.vue
virtual.vue
async.vue
disabled.vue
prefix-and-suffix.vue
batch-render.vue
switcher-icon.vue
file-tree.vue
node-props.vue
show-line.vue
checkbox-placement.vue
ellipses.vue
```

## API

### Tree Props

| Name | Type | default | Description |
| --- | --- | --- | --- |
| accordion | `boolean` | `false` | Whether to use accrodion expand mode. |
| allow-checking-not-loaded | `boolean` | `false` | Whether to allow cascade checking on not loaded nodes. If you want to use this, you should know the `check-keys` may be incomplete. Also, you should aware about the consistency bewteen zeta-gds's checking logic and your backend's checking logic, especially when there are disabled nodes. |
| allow-drop | `(info: { dropPosition: DropPosition, node: TreeOption, phase: 'drag' \| 'drop' }) => boolean` | A function that prohibit dropping inside leaf node. | Whether to allow dropping. |
| animated | `boolean` | `true` | Whether to show expand animation. |
| block-line | `boolean` | `false` | Nodes spread out the whole row. |
| block-node | `boolean` | `false` | The node name is spread out in the whole row. |
| cancelable | `boolean` | `true` | Whether node's select status can be cancelled. |
| cascade | `boolean` | `false` | Whether to cascade checkboxes. |
| check-strategy | `string` | `'all'` | The strategy of setting checked callback's keys argument. `all` means setting all checked node. `parent` means setting all checked parent node of whom all child node are checked. `child` means setting all child node. |
| checkable | `boolean` | `false` | Whether to display the selection box. |
| checkbox-placement | `'left' \| 'right'` | `'left'` | Checkbox's placement. |
| children-field | `string` | `'children'` | The children field in `TreeOption`. |
| checked-keys | `Array<string \| number>` | `undefined` | Checked keys of the tree. |
| check-on-click | `boolean \| ((node: TreeOption) => boolean)` | `false` | Allow node clicking to trigger check when `checkable` is `true`. |
| data | `Array<TreeOption>` | `[]` | The node data of the tree. Reset `data` will cause clearing of some uncontrolled status. If you need to modify data, you'd better make tree work in a controlled manner. |
| default-checked-keys | `Array<string \| number>` | `[]` | Multiple options selected by default. |
| default-expand-all | `boolean` | `false` | Expand all options. |
| default-expanded-keys | `Array<string \| number>` | `[]` | Expanded items by default. |
| default-selected-keys | `Array<string \| number>` | `[]` | Nodes selected by default. |
| draggable | `boolean` | `false` | Whether it can be dragged. |
| expand-on-dragenter | `boolean` | `true` | Whether to expand nodes after dragenter. |
| expand-on-click | `boolean` | `false` | Whether to expand or collapse nodes after click. |
| expanded-keys | `Array<string \| number>` | `undefined` | If set, expanded status will work in controlled manner. |
| filter | `(pattern: string, node: TreeOption) => boolean` | A simple string based filter. | The function that filter tree nodes based on pattern. |
| get-children | `(option: any) => unknown` | `undefined` | Get children of the option. |
| indeterminate-keys | `Array<string \| number>` | `undefined` | Indeterminate keys of the tree. |
| keyboard | `boolean` | `true` | Whether to support keyboard operation. |
| key-field | `string` | `'key'` | The key field in `TreeOption`. |
| label-field | `string` | `'label'` | The label field in `TreeOption`. |
| disabled-field | `string` | `'disabled'` | The disabled field in `TreeOption`. |
| node-props | `(info: { option: TreeOption }) => HTMLAttributes` | `undefined` | HTML attributes of node. |
| multiple | `boolean` | `false` | Whether to allow multiple selection of nodes. |
| on-load | `(node: TreeOption) => Promise<void>` | `undefined` | Callback function for asynchronously loading data. If not data is loaded, you should make promise resolve `false` or be rejected, nor the loading animation won't end. |
| pattern | `string` | `''` | What to search by default. |
| render-option-label | `(info: { option: TreeOption, checked: boolean, selected: boolean }) => VNodeChild` | `undefined` | Render function of all the options' label. |
| render-option-start | `(info: { option: TreeOption, checked: boolean, selected: boolean }) => VNodeChild` | `undefined` | Render function of all the options' prefix. |
| render-option-end | `(info: { option: TreeOption, checked: boolean, selected: boolean }) => VNodeChild` | `undefined` | Render function of all the options' suffix. |
| render-option-expand-icon | `(props: { option: TreeOption, expanded: boolean, selected: boolean }) => VNodeChild` | `undefined` | Render function of option expand icon. |
| scrollbar-props | `object` | `undefined` | See [Scrollbar props](scrollbar#Scrollbar-Props) |
| selectable | `boolean` | `true` | Whether the node can be selected. |
| selected-keys | `Array<string \| number>` | `undefined` | If set, selected status will work in controlled manner. |
| show-irrelevant-nodes | `boolean` | `true` | Whether to filter unmached nodes when tree is in filter mode. |
| show-line | `boolean` | `false` | Whether to display the connection line. |
| virtual-scroll | `boolean` | `false` | Whether to enable virtual scroll. You need to set proper style height of the tree in advance. |
| watch-props | `Array<'defaultCheckedKeys' \| 'defaultSelectedKeys' \|'defaultExpandedKeys'>` | `undefined` | Default prop names that needed to be watched. Components will be updated after the prop is changed. Note: the `watch-props` itself is not reactive. |
| on-dragend | `(data: { node: TreeOption, event: DragEvent }) => void` | `undefined` | The callback function after the node completes the dragging action. |
| on-dragenter | `(data: { node: TreeOption, event: DragEvent }) => void` | `undefined` | Callback function in node drag and drop. |
| on-dragleave | `(data: { node: TreeOption, event: DragEvent }) => void` | `undefined` | Drag a node, the callback function after the node leaves other nodes. |
| on-dragstart | `(data: { node: TreeOption, event: DragEvent }) => void` | `undefined` | Callback function to start dragging a certain node. |
| on-drop | `(data: { node: TreeOption, dragNode: TreeOption, dropPosition: 'before' \| 'inside' \| 'after', event: DragEvent }) => void` | `undefined` | The callback function after the node completes the dragging action. |
| on-update:checked-keys | `(keys: Array<string \| number>, option: Array<TreeOption \| null>), meta: { node: TreeOption \| null, action: 'check' \| 'uncheck' }) => void` | `undefined` | Callback function when node checked options change. |
| on-update:indeterminate-keys | `(keys: Array<string \| number>, option: Array<TreeOption \| null>) => void` | `undefined` | Callback function when node indeterminate options change. |
| on-update:expanded-keys | `(keys: Array<string \| number>, option: Array<TreeOption \| null>), meta: { node: TreeOption \| null, action: 'expand' \| 'collapse' \| 'filter' }) => void` | `undefined` | The callback function when the node expansion item changes. |
| on-update:selected-keys | `(keys: Array<string \| number>, option: Array<TreeOption \| null>), meta: { node: TreeOption, action: 'select' \| 'unselect' }) => void` | `undefined` | The callback function when the selected item of the node changes. |

### TreeOption Properties

| Name | Type | Description |
| --- | --- | --- |
| key | `string \| number` | Key of the node, should be unique. You can use `key-field` to customize the field name. |
| label | `string` | Label of the node. You can use `label-field` to customize the field name. |
| checkboxDisabled? | `boolean` | Whether the checkbox is disabled. |
| children? | `TreeOption[]` | Child nodes of the node. |
| disabled? | `boolean` | Whether the node is disabled. |
| isLeaf? | `boolean` | Whether the node is leaf. Required in async expanding mode. |
| prefix? | `string \| (() => VNodeChild)` | Prefix of the node. |
| suffix? | `string \| (() => VNodeChild)` | Suffix of the node. |

## Methods

### Tree Methods

| Name | Paramaters | Description |
| --- | --- | --- |
| scrollTo | `(options: { key: string \| number })` | Scroll to some node in virtual scroll mode. |
| getCheckedData | `() => { keys: Array<string \| number>, options: Array<TreeOption \| null> }` | Get checked data. |
| getIndeterminateData | `() => { keys: Array<string \| number>, options: Array<TreeOption \| null> }` | Get indeterminate data. |
