# Badge
Badges are labels that hold small amounts of information. We use badges for showing a small amount of categorized data. Use Badges to label, categorize, or organize items using keywords that describe them.

### CautionAlert

```overview-html
badge/demos/enUS/index.html
```

## Demos

```demo
basic.vue
color.vue
processing.vue
show-zero.vue
overflow.vue
manual.vue
custom-content.vue
customize-color.vue
raw.vue
offset.vue
```

## API

### Badge Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| color | `'primary' \| 'success' \| 'error' \| 'warning' \| 'info' \| 'string'` | `'error'` | Badge color. |
| dot | `boolean` | `false` | Show badge as dot. |
| max | `number` | `undefined` | The maximum number of the badge when its value overflows. |
| offset | `[string \| number, string \| number]` | `undefined` | Offset of the badge from the left and top of the default position. |
| processing | `boolean` | `false` | Show processing status. |
| show-zero | `boolean` | `false` | Whether to display the badge, even if provided value equals 0. |
| show | `boolean` | `true` | Whether the badge should be shown altogether. |
| value | `string \| number` | `undefined` | Badge's value. |

### Badge Slots

| Name    | Parameters | Description      |
| ------- | ---------- | ---------------- |
| default | `()`       | Badge's content. |
