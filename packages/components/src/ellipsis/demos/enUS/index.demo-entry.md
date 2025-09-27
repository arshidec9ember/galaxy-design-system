# Ellipsis

Component that truncates a single line of text with ellipsis (...) as necessary. Full text is displayed in a tooltip on hover/click/touch/focus.

## Demos

```demo
basic.vue
line-clamp.vue
custom-tooltip.vue

```

## Customization

```customization
expand-trigger.vue

```

## API

### Ellipsis Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| expand-trigger | `'click'` | `undefined` | Abbreviated content trigger event to expand to the full text. |
| line-clamp | `number \| string` | `undefined` | Maximum lines. |
| tooltip | `boolean \| TooltipProps` | `true` | Tooltip properties. |

### Ellipsis Slots

| Name    | Parameters | Description                           |
| ------- | ---------- | ------------------------------------- |
| default | `()`       | The content of the ellipsis.          |
| tooltip | `()`       | The content of the ellipsis' tooltip. |
