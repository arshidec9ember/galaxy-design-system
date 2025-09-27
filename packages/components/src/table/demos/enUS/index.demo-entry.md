# Table

```figma
https://www.figma.com/file/t4dWFndlBl46TnLIH2n1dJ/%F0%9F%94%AE-GDS-v2.11.0---Foundation-%2B-Components?type=design&node-id=16501-42652&mode=design&t=tH3F8OLeW1RdDusS-0
```

<!--single-column-->

For basic tables, we can use Table component. If you want to render structured data, see [Data Table](data-table).

## Demos

```demo
basic.vue
bordered.vue
size.vue
row-column-separator.vue
striped.vue
```

## Components

You can use `z-table`, `z-thead`, `z-tbody`, `z-tr`, `z-th` and `z-td`. At most time you won't need the components after `z-table`. They can be used to reduce the granularity of dependency collecting.

## API

### Table Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| bottom-bordered | `boolean` | `true` | The bottom border of the table, this prop is invalid when `bordered` is `true`. |
| bordered | `boolean` | `true` | Whether to show table border. |
| row-separator | `boolean` | `true` | Whether rows are not divided. If the prop is `true`, table cell has no `border-bottom`. |
| column-separator | `boolean` | `false` | Whether columns are not divided. If the prop is `true`, table cell has no `border-right`. |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Table size. |
| striped | `boolean` | `false` | Whether to show zebra stripes on rows. |
