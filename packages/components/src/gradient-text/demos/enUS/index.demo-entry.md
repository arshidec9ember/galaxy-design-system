# Gradient Text

A UI component that allows you to display text with a gradient effect

## Demos

```demo
basic.vue
size.vue
gradient.vue
```

## API

### GradientText Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| gradient | `string \| { from: string, to: string, deg: number \| string }` | `undefined` | Text gradient color parameters. |
| size | `number \| string` | `undefined` | Text size (when the unit is not specified the default unit will be `px`). |
| type | `'primary' \| 'info' \| 'success' \| 'warning' \| 'error'` | `'primary'` | Semantic type of text. |

### GradientText Slots

| Name    | Parameters | Description                       |
| ------- | ---------- | --------------------------------- |
| default | `()`       | The content of the gradient text. |
