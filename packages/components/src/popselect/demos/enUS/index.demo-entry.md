# Popselect

```figma
https://www.figma.com/file/t4dWFndlBl46TnLIH2n1dJ/%F0%9F%94%AE-GDS-v2.11.0---Foundation-%2B-Components?type=design&node-id=40415-112312&mode=design&t=gF19rtZiLJ6f3z06-0
```

If you want to select some options you can use popselect and can customize trigger.

## Demos

```demo
basic.vue
```

## Customization

```customization
scrollable.vue
size.vue
deselect.vue
customize-option.vue
group.vue
multiple.vue
slot.vue
render-people.vue
custom-field.vue
expand-collapse.vue
```

## API

### Popselect Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| multiple | `boolean` | `false` | Whether to select multiple values. |
| tooltip | `boolean` | `true` | Tooltip will be displayed for the ellipsed content. |
| mandatory | `boolean` | `true` | Atleast select an item from an item at time if single select. |
| node-props | `(option: SelectOption \| SelectGroupOption) => object` | `undefined` | Option's DOM attrs generator. |
| options | `Array<SelectOption \| SelectGroupOption>` | `[]` | For details of configuration options, see [Select](select#SelectOption-Properties) |
| children-field | `string` | `'children'` | Field name of group option children. |
| value-field | `string` | `'value'` | Field name of option value. |
| label-field | `string` | `'label'` | Field name of option label. |
| render-option-label | `(option: SelectOption \| SelectGroupOption) => VNodeChild` | `undefined` | Render function of all the options. |
| scrollable | `boolean` | `false` | Whether the select menu is scrollable. |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Size of the Popselect. |
| model-value | `string \| number \| Array<string \| number> \| null` | `null` | Value in controlled mode. |
| virtual-scroll | `boolean` | `false` | Whether to enable virtual scrolling. |
| on-update:model-value | `(value: string \| number \| Array<string \| number> \| null, option: SelectBaseOption \| null \| Array<SelectBaseOption>) => void` | `undefined` | Callback of value updating. |

For SelectOption & SelectGroupOption, see [Select](select#SelectOption-Properties)

For other props, see [Popover](popover#Popover-Props)

### Popselect Slots

| Name | Parameters | Description |
| --- | --- | --- |
| action | `()` | Options menu slot. |
| empty | `()` | Empty state slot for the options menu. |
| default | `(value: string \| number \| Array<string \| number> \| null, option: SelectBaseOption \| null \| Array<SelectBaseOption>)` | Trigger slot. |
