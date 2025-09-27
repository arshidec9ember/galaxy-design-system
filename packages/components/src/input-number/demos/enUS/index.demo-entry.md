# Input Number

If you just want a number, this is for you.

## Demos

```demo
basic.vue
disabled.vue
parse.vue
precision.vue
event.vue
icon.vue
button-placement.vue
loading.vue
min-max.vue
size.vue
step.vue
validator.vue
show-button.vue
disable-keyboard.vue
change-timing.vue
status.vue
custom-icon.vue
```

## API

### InputNumber Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| autofocus | `boolean` | `false` | Whether to autofocus. |
| bordered | `boolean` | `true` | Whether to show a border. |
| button-placement | `'both' \| 'end'` | `'end'` | Placement of add & minus button. |
| clearable | `boolean` | `false` | Whether the input is clearable. |
| default-model-value | `number \| null` | `null` | Default value when not manually set. |
| disabled | `boolean` | `false` | Whether to disable the input. |
| format | `(value: number \| null) => string` | `undefined` | Method to format value. If it's set, `update-value-on-input` will be disabled. |
| keyboard | `{ ArrowUp?: boolean, ArrowDown?: boolean }` | `{}` | Control the keyboard behavior. If you set corresponding to false, the keyboard behavior will be disabled. |
| loading | `boolean` | `undefined` | Set loading state. If set (true/false), the element will always take up enough space for the loading indicator. |
| max | `number` | `undefined` | The max value. |
| min | `number` | `undefined` | The min value. |
| parse | `(input: string) => number \| null` | `undefined` | Methof to parse input string. If it's set, `update-value-on-input` will be disabled. |
| placeholder | `string` | `'Please Input'` | Placeholder. |
| precision | `number` | `undefined` | Precision of input value. If it's set, `update-value-on-input` will be disabled. |
| readonly | `boolean` | `false` | Whether it's readonly. |
| show-button | `boolean` | `true` | Whether to show increase/decrease buttons. |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | The size of input box. |
| status | `'success' \| 'warning' \| 'error'` | `undefined` | Validation status. |
| step | `number` | `1` | The number which the current value is increased or decreased on key or button press. It can be an integer or a decimal. |
| update-value-on-input | `boolean` | `true` | Whether to change the value on input if the input value is valid. |
| validator | `(value) => boolean` | `undefined` | Setup custom validation. |
| model-value | `number \| null` | `undefined` | Manually set the input value. |
| on-blur | `(event: FocusEvent) => void` | `undefined` | Callback triggered when the input is blurred. |
| on-clear | `() => void` | `undefined` | Callback triggered when the input is cleared. |
| on-focus | `(event: FocusEvent) => void` | `undefined` | Callback triggered when the input is focussed on. |
| on-update:model-value | `(value: number \| null) => void` | `undefined` | Callback triggered when the input value changes. |

### InputNumber Slots

| Name       | Parameters | Description               |
| ---------- | ---------- | ------------------------- |
| add-icon   | `()`       | icon of the add button.   |
| minus-icon | `()`       | icon of the minus button. |
| prefix     | `()`       | Prefix content slot.      |
| suffix     | `()`       | Suffix content slot.      |

### InputNumber Methods

| Name  | Type         | Description             |
| ----- | ------------ | ----------------------- |
| blur  | `() => void` | Blur the input number.  |
| focus | `() => void` | Focus the input number. |
