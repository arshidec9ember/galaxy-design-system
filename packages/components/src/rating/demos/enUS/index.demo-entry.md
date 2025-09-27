# Rating

## CautionAlert

## Demos

```demo
basic.vue
size.vue
color.vue
icon.vue
allow-half.vue
readonly.vue
clearable.vue
```

## API

### Rating Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| allow-half | `boolean` | `false` | Allow activating half of the icon. |
| clearable | `boolean` | `false` | Whether the rate is clearable. Value will be set to `null` if you click on current value's corresponding icon. |
| color | `string` | `undefined` | Activated icon color. This supports the formats: `#FFF`, `#FFFFFF`, `yellow`, `rgb(0, 0, 0)`. |
| count | `number` | `5` | Number of icons (max rating). |
| default-model-value | `number \| null` | `null` | Default value of activated icons. |
| readonly | `boolean` | `false` | Readonly state. |
| size | `'small' \| 'medium' \| 'large' \| number` | `'medium'` | Icon size. |
| model-value | `number \| null` | `undefined` | Value of activated icons. |
| on-clear | `() => void` | `undefined` | Callback on value is cleared. |
| on-update:model-value | `(value: number) => void` | `undefined` | Callback on the value (rating) is changed. |

### Rating Slots

| Name    | Parameters                  | Description             |
| ------- | --------------------------- | ----------------------- |
| default | `(info: { index: number })` | The icon of the rating. |
