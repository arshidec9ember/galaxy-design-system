# Grid

### CautionAlert

<!--single-column-->

Based on CSS Grid. Responsive. Keep away from IE.

<z-alert color="warning" title="Caveats" :bordered="false">
Due to technical limitation, <z-text code>z-grid-item</z-text> can't be encapsulated in another component.
</z-alert>

## Demos

```demo
basic.vue
gap.vue
offset.vue
responsive.vue
responsive-item.vue
collapse.vue
layout-shift-disabled.vue
```

## API

### Grid Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| cols | `number \| ResponsiveDescription` | `24` | Number of grids displayed. |
| collapsed | `boolean` | `false` | Whether to fold by default. |
| collapsed-rows | `number` | `1` | The number of rows displayed by default. |
| layout-shift-disabled | `boolean` | `false` | By default, `z-grid` will compute grid content based on window size and container size. This would cause 2 side effects: Content may shift in SSR mode; Render items has layout shift and it would influence performance slightly. If you don't need any responsive functionality, you can use `layout-shift-disabled` to get rid of side effects of it. Please note that set `layout-shift-disabled` will disabled all responsive functionality of `z-grid` and `suffix`, `offset` of `z-grid-item`. |
| responsive | `'self' \| 'screen'` | `'screen'` | `'self'` triggers responsive layout by its own width. `'screen'` triggers responsive layout by viewport's witdh. |
| item-responsive | `boolean` | `false` | Whether the grid item is responsive. |
| x-gap | `number \| ResponsiveDescription` | `0` | Horizontal gap. |
| y-gap | `number \| ResponsiveDescription` | `0` | Vertical gap. |

### GridItem Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| offset | `number \| ResponsiveDescription` | `0` | The number of intervals to the left of the grid. |
| span | `number \| ResponsiveDescription` | `1` | The number of columns occupied by the grid. The grid item would be hidden if it's 0. |
| suffix | `boolean` | `false` | Grid suffix. |

### Grid Slots

| Name    | Parameters | Description   |
| ------- | ---------- | ------------- |
| default | `()`       | Grid content. |

### GridItem Slots

| Name    | Parameters                | Description        |
| ------- | ------------------------- | ------------------ |
| default | `({ overflow: boolean })` | Grid item content. |
