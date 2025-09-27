# Radio

Use radio when you have a group of mutually exclusive choices and only one selection from the group is allowed.

```figma
https://www.figma.com/file/t4dWFndlBl46TnLIH2n1dJ/%F0%9F%94%AE-GDS-v2.11.0---Foundation-%2B-Components?type=design&node-id=23691-101207&mode=design&t=52DNjHkppCdyHd4q-0
```

<!--single-column-->

## Demos

```demo
basic.vue
size.vue
```

## Customization

```customization
group.vue
button-group.vue
segmented-radio.vue
```

## API

### Radio Props, RadioButton Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| model-value | `boolean` | `undefined` | Checked state. |
| default-model-value | `boolean` | `false` | Default checked state. |
| disabled | `boolean` | `false` | Disabled state. |
| label | `string` | `undefined` | Radio label. If not set, render default slot content, if both, use default slot content first. |
| name | `string` | `undefined` | The name attribute of the radio element. If not set, name of `radio-group` will be used. |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Size. |
| value | `string \| number \| boolean` | `'on'` | Checked value. |
| on-update:model-value | `(check: boolean) => void` | `undefined` | Callback method triggered when a selection change occurs. |

### RadioGroup Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| disabled | `boolean` | `false` | Disabled state. |
| name | `string` | `undefined` | The name attribute of the radio elements inside the group. |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Size. |
| model-value | `string \| number \| boolean \| null` | `null` | Checked value. |
| default-model-value | `string \| number \| boolean \| null` | `null` | Default checked value. |
| on-update:model-value | `(value: string \| number \| boolean) => void` | `undefined` | Callback method triggered when a selection change occurs. |
| bordered | `boolean` | `true` | Whether Radio group is bordered. |
