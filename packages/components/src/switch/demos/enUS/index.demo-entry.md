# Switch

A Switch displays two exclusive choices and enables the user to toggle the state of a single item to on (checked) and off (unchecked).

```figma
https://www.figma.com/file/t4dWFndlBl46TnLIH2n1dJ/%F0%9F%94%AE-GDS-v2.11.0---Foundation-%2B-Components?type=design&node-id=23691-101208&mode=design&t=52DNjHkppCdyHd4q-0
```

```overview-html
switch/demos/enUS/index.html
```

## Demos

```demo
basic.vue
size.vue
event.vue
switch-field.vue
disabled.vue

```

## Customization

```customization
content.vue
loading.vue
customize-value.vue
shape.vue
color.vue
icon.vue

```

## API

### Switch Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| checked-value | `string \| boolean \| number` | `true` | Value of checked state. |
| default-model-value | `boolean` | `false` | Default value. |
| disabled | `boolean` | `false` | Whether to disable the switch. |
| loading | `boolean` | `false` | Whether to show loading state. |
| rail-style | `(info: { focused: boolean, checked: boolean }) => (CSSProperties \| string)` | `undefined` | Rail style generator. |
| round | `boolean` | `true` | Whether the switch has rounded corners.   |
| rubber-band | `boolean` | `true` | Whether the switch button has rubber band effect. |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | The size of the switch. |
| unchecked-value | `string \| boolean \| number` | `false` | Value of checked state. |
| model-value | `string \| number \| boolean \| undefined` | `undefined` | Value when being set manually. |
| on-update:model-value | `(value: boolean) => void` | `undefined` | Callback when the component's value changes. |

### Switch Slots

| Name           | Parameters | Description                           |
| -------------- | ---------- | ------------------------------------- |
| checked        | `()`       | Content when the switch is checked.   |
| checked-icon   | `()`       | Icon of switch button when checked.   |
| icon           | `()`       | Icon of switch button.                |
| unchecked      | `()`       | Content when the switch is unchecked. |
| unchecked-icon | `()`       | Icon of switch button when unchecked. |
