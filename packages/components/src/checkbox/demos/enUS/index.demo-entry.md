# Checkbox

Use checkbox when you have a group of choices and multiple selection from the group is allowed.

```figma
https://www.figma.com/file/t4dWFndlBl46TnLIH2n1dJ/%F0%9F%94%AE-GDS-v2.11.0---Foundation-%2B-Components?type=design&node-id=16828-98273&mode=design&t=52DNjHkppCdyHd4q-0
```

```overview-html
checkbox/demos/enUS/index.html
```

<!--single-column-->

## Demos

```demo
basic.vue
indeterminate.vue
size.vue
event.vue

```

## Customization

```customization
group.vue
segmented-checkbox.vue
grid.vue
controlled.vue
customize-value.vue

```

## API

### Checkbox, CheckboxButton Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| model-value | `boolean` | `false` | Whether the checkbox is being checked manually. |
| default-model-value | `boolean` | `false` | Whether the checkbox is checked by default. |
| disabled | `boolean` | `false` | Whether the checkbox is disabled. |
| focusable | `boolean` | `true` | Whether the checkbox gains focus after being checked. |
| indeterminate | `boolean` | `false` | Whether the checkbox can have a third indeterminate state. |
| label | `string` | `undefined` | Checkbox label. |
| size | `'small' \| 'medium' \| 'large'`  | `'medium'`  | The size of the checkbox. |
| value | `string \| number` | `undefined` | The value of the checkbox to be used in a checkbox group. |
| on-update:checked | `(checked: boolean) => void` | `undefined` | Callback function triggered on a checked status change. |

### CheckboxGroup Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| disabled | `boolean` | `false` | Whether the checkbox group is disabled. |
| default-model-value | `Array<string \| number>` | `null` | Checkbox group's default selected value. |
| max-items | `number` | `undefined` | The maximum number of checkboxes that can be checked. |
| min-items | `number` | `undefined` | The minimum number of checkboxes that can be checked. |
| model-value | `Array<string \| number> \| null` | `undefined` | Manually set values of a checkbox group. |
| on-update:model-value | `(value: string \| number, meta: { actionType: 'check' \| 'uncheck', value: string \| number }) => void` | `undefined` | Callback when the checkbox group's value changes. |
| bordered | `boolean` | `true` | Whether checkbox group is bordered. |

### Checkbox Slots

| Name    | Parameters | Description              |
| ------- | ---------- | ------------------------ |
| default | `()`       | Content of the checkbox. |

### CheckboxGroup Slots

| Name    | Parameters | Description                    |
| ------- | ---------- | ------------------------------ |
| default | `()`       | Content of the checkbox group. |

### Checkbox Methods

| Name  | Type         | Description |
| ----- | ------------ | ----------- |
| focus | `() => void` | Focus.      |
| blur  | `() => void` | Blur.       |
