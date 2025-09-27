# Dropdown

A dropdown menu displays a list of actions that allows the user to take an immediate action or navigate the user to another view. It can be used as overflow action menu items. The trigger point of the dropdown is always a button.

```figma
https://www.figma.com/file/t4dWFndlBl46TnLIH2n1dJ/%F0%9F%94%AE-GDS-v2.11.0---Foundation-%2B-Components?type=design&node-id=40415-112311&mode=design&t=52DNjHkppCdyHd4q-0
```

```overview-html
dropdown/demos/enUS/index.html
```

## Demos

```demo
basic.vue
icon.vue
trigger.vue
cascade.vue
placement.vue
size.vue
ellipsis.vue

```

## Customization

```customization
arrow.vue
batch-render.vue
manual-position.vue
render.vue
option-props.vue
render-option.vue

```

## API

### Dropdown Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| animated | `boolean` | `true` | Use an animation when showing options. |
| inverted | `boolean` | `false` | Use the inverted style. |
| children-field | `string` | `'children'` | Field name of children. |
| keyboard | `boolean` | `true` | Whether the component supports keyboard operation. (Be careful about the potential conflicts with other components keyboard operations) |
| key-field | `string` | `'key'` | Field name of key. |
| label-field | `string` | `'label'` | Field name of label. |
| node-props | `(option: DropdownOption \| DropdownGroupOption) => HTMLAttributes` | `undefined` | Option HTML attributes generator. |
| menu-props | `(option: DropdownOption \| undefined, options: (DropdownOption \| DropdownGroupOption)[]) => HTMLAttributes` | `undefined` | Menu HTML attributes generator. |
| options | `Array<DropdownOption \| DropdownGroupOption \| DropdownDividerOption \| DropdownRenderOption>` | `[]` | Dropdown options. |
| render-option-icon | `(option: DropdownOption) => VNodeChild` | `undefined` | Render function that renders option icons. |
| render-option-label | `(option: DropdownOption) => VNodeChild` | `undefined` | Render function that renders option labels. |
| render-option | `(props: { node: VNode, option: DropdownOption \| DropdownGroupOption }) => VNodeChild` | `undefined` | Render function that renders option itself. |
| size | `'small'\|'medium'\|'large'` | `'medium'` | Dropdown size. |
| on-clickoutside | `(e: MouseEvent) => void` | `undefined` | Callback function triggered when there is a click outside of the component. |
| on-select | `(key: string \| number, option: DropdownOption) => void` | `undefined` | Callback function for after an option is selected. |

For other props, for example `placement`, please see [Popover Props](popover#Popover-Props). Note that `raw` is not available.

#### DropdownOption Type

| Property | Type | Description |
| --- | --- | --- |
| children? | `Array<DropdownOption \| DropdownDividerOption \| DropdownGroupOption>` | Child options. |
| disabled? | `boolean` | Whether to disable the option. |
| icon? | `() => VNodeChild` | Custom render function of an option icon. |
| key? | `string \| number` | Option ID (should be unique). |
| label? | `string \| () => VNodeChild` | Displayed label value. |
| props? | `HTMLAttributes` | Customize option props. |
| show? | `boolean` | Whether to show the option. |

#### DropdownDividerOption Type

| Property | Type               | Description                            |
| -------- | ------------------ | -------------------------------------- |
| key?     | `string \| number` | Divider ID (should be unique).         |
| show?    | `boolean`          | Whether to show the option.            |
| type     | `'divider'`        | The type of the DropdownDividerOption. |

#### DropdownGroupOption Type

| Property | Type | Description |
| --- | --- | --- |
| children? | `Array<DropdownOption \| DropdownDividerOption>` | Children options of DropdownGroupOption. |
| icon? | `() => VNodeChild` | Custom rendering function of the group icon. |
| label? | `string` | Group label value. |
| key? | `string \| number` | Group ID (should be unique). |
| show? | `boolean` | Whether to show the option. |
| type | `'group'` | The type of the DropdownGroupOption. |

#### DropdownRenderOption Type

| Property | Type               | Description                            |
| -------- | ------------------ | -------------------------------------- |
| key?     | `string \| number` | Render option ID (should be unique).   |
| render?  | `() => VNodeChild` | Render function of the option content. |
| show?    | `boolean`          | Whether to show the option.            |
| type     | `'render'`         | The type of the DropdownRenderOption.  |
