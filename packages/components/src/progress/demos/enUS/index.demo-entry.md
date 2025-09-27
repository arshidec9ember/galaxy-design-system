# Progress

```figma
https://www.figma.com/file/t4dWFndlBl46TnLIH2n1dJ/%F0%9F%94%AE-GDS-v2.11.0---Foundation-%2B-Components?type=design&mode=design&t=JjZdVhQkytSNVCIR-0
```

Progress is a graphical control element used to visualize the progression of an extended computer operation.

## Demos

```demo
basic.vue
indeterminant.vue
```

## Customization

```customization
circle.vue
no-indicator.vue
custom-indicator.vue
line.vue
circle-offset.vue
dashboard.vue
color.vue
height.vue
multiple-circle.vue
processing.vue
```

## API

### Progress Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| border-radius | `number \| string` | `undefined` | `'line'` variant progress's border-radius. Keep half of default height if not passed. |
| circle-gap | `number` | `1` | The gap between circles when variant is `'multiple-circle'`, suppose `viewbox` size is `100`. |
| color | `{ color: string \| string[], railColor: string \| string[], indicatorTextColor: string }` | `{}` | Progress color. |
| fill-border-radius | `number \| string` | `undefined` | `'line'` variant progress's fill's border-radius. Keep `border-radius` if not passed. |
| gap-degree | `number` | `75` | The gap degree of half circle, 0 ~ 360. |
| gap-offset-degree | `number` | `0` | The gap offset degree. |
| height | `number` | `undefined` | `'line'` variant progress's height. Keep default height if not passed. |
| indeterminant | `boolean` | `false` | Indeterminant state in Line variant only. |
| indicator-placement | `'inside' \| 'outside'` | `'outside'` | Indicator placement. |
| offset-degress | `number` | `0` | Offset degree of circular progress, only works with `circle` variant progress. |
| percentage | `number \| number[]` | `0` | Percentage value. |
| processing | `boolean` | `false` | Processing status. |
| rail-style | `string \| CSS \| Array<string \| CSS>` | `undefined` | Rail style. |
| show-indicator | `boolean` | `true` | Whether to display indicators. |
| status | `'primary' \| 'success' \| 'error' \| 'warning' \| 'info'` | `'primary'` | Progress status. |
| stroke-width | `number` | `7` | Progress width. |
| variant | `'line' \| 'circle' \| 'multiple-circle' \| 'dashboard'` | `line` | Progress variant. |
| unit | `string` | `%` | Progress unit. |

### Progress Slots

| Name    | Parameters | Description                                     |
| ------- | ---------- | ----------------------------------------------- |
| default | `()`       | Content will replace default indicator content. |
