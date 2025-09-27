# Super Date Picker

Super Date Picker is an enhanced date selection component that provides quick range options, custom date selection, and multiple tab views (Absolute, Relative, Now).

## Demos

```demo
basic.vue
value.vue
placeholder.vue
disabled.vue
clearable.vue
format.vue
bordered.vue
show-tabs.vue
round-to-day.vue
events.vue
```

## API

### Super Date Picker Props

| Name | Type | Default | Description | Example |
| --- | --- | --- | --- | --- |
| value | `number \| [number, number] \| null` | `undefined` | The value of the date picker. Can be a single timestamp or date range. |
| placeholder | `string` | `undefined` | Placeholder text for the input field. Uses locale default if not provided. |
| disabled | `boolean` | `false` | Whether the date picker is disabled. |
| clearable | `boolean` | `true` | Whether the date picker can be cleared. |
| format | `string` | `'yyyy-MM-dd'` | Date format for internal value handling. |
| display-format | `string` | `'MMM dd, yyyy'` | Date format for display in the input field. |
| type | `'date' \| 'daterange' \| 'datetime' \| 'datetimerange'` | `'daterange'` | Type of date selection. |
| bordered | `boolean` | `true` | Whether the input has a border. |
| show-absolute | `boolean` | `true` | Whether to show the Absolute tab. |
| show-relative | `boolean` | `true` | Whether to show the Relative tab. |
| show-now | `boolean` | `true` | Whether to show the Now tab. |
| default-tab | `'absolute' \| 'relative' \| 'now'` | `'absolute'` | The default active tab when the picker opens. |
| round-to-day | `boolean` | `false` | Whether to enable rounding functionality for relative dates. |
| on-update:value | `(value: number \| [number, number] \| null) => void` | `undefined` | Callback when the value changes. |
| on-change | `(value: number \| [number, number] \| null) => void` | `undefined` | Callback when the value changes (alias for on-update:value). |

### Super Date Picker Slots

| Name    | Parameters | Description                                 | Version |
| ------- | ---------- | ------------------------------------------- | ------- |
| trigger | `()`       | Custom trigger element for the date picker. |         |

### Super Date Picker Events

| Name | Parameters | Description | Version |
| --- | --- | --- | --- |
| update:value | `(value: number \| [number, number] \| null)` | Emitted when the date picker value changes. |  |
| change | `(value: number \| [number, number] \| null)` | Emitted when the date picker value changes. |  |
