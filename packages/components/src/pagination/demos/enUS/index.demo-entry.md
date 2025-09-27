# Pagination

<!--single-column-->

Pagination breaks down a lot of content into smaller sections across pages. Users can easily navigate through these pages and jump to specific ones, making it more manageable and user-friendly.

```figma
https://www.figma.com/file/t4dWFndlBl46TnLIH2n1dJ/%F0%9F%94%AE-GDS-v2.11.0---Foundation-%2B-Components?type=design&node-id=16503-1444&mode=design&t=XCr3xp2pKWaGjB3T-0
```

## Demos

```demo
basic.vue
without-item-count.vue
page-size-option.vue
size-picker.vue
show-quick-jumper.vue
item-count.vue
shadow-mode.vue
```

## Customization

```customization
customization.vue
size.vue
disabled.vue
prev.vue
prefix.vue
```

## API

### Pagination Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| default-page | `number` | `1` | Current page in uncontrolled mode. |
| default-page-size | `number` | `10` | Page size in uncontrolled mode. |
| disabled | `boolean` | `false` | Whether to disable the pagination. |
| goto | `() => VNodeChild` | `undefined` | Fast jump content render function. |
| item-count | `number` | `undefined` | Total number. |
| hasNext | `boolean` | `false` | To enable/disable next button when item count is absent |
| label | `PaginationRenderLabel` | `undefined` | Item content. |
| next | `(info: PaginationInfo) => VNodeChild` | `undefined` | Next page. |
| prev | `(info: PaginationInfo) => VNodeChild` | `undefined` | Previous page. |
| page-count | `number` | `1` | Total pages. |
| page-sizes | `Array<number \| PaginationSizeOption>` | `[10]` | Number of items per page, can be customize. |
| page-size | `number` | `undefined` | Page size in controlled mode. |
| page | `number` | `undefined` | Current page in controlled mode. |
| prefix | `(info: PaginationInfo) => VNodeChild` | `undefined` | Paging prefix. |
| select-props | `SelectProps` | `undefined` | Page size select's props. |
| show-shadow | `boolean` | `false` | Whether to show shadow mode with elevated styling. |
| show-quick-jumper | `boolean` | `true` | Whether to show fast jump. |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | size of page item. |
| suffix | `(info: PaginationInfo) => VNodeChild` | `undefined` | Page suffix. |
| show-size-picker | `boolean` | `false` | Whether to show the selector of the number of items per page. |
| to | `string \| HTMLElement \| false` | `body` | Container node of the pop menu. `false` will keep it not detached. |
| on-update:page | `(page: number) => void` | `undefined` | Callback function when the current page changes. |
| on-update:page-size | `(pageSize: number) => void` | `undefined` | Callback function when the current page size changes. |

#### PaginationRenderLabel Type

```ts
type PaginationRenderLabel = (
  info:
    | {
        type: 'fast-backward' | 'fast-forward'
        node: VNode
        active: boolean
      }
    | {
        type: 'page'
        node: number
        active: boolean
      }
) => VNodeChild
```

#### PaginationInfo Type

```ts
interface PaginationInfo {
  startIndex: number
  endIndex: number
  page: number
  pageSize: number
  pageCount: number
  itemCount: number | undefined
}
```

### Pagination Slots

| Name | Parameters | Description |
| --- | --- | --- |
| goto | `()` | Fast jump text before quick jumper. |
| label | The same as `PaginationRenderLabel`'s parameters | Item content. |
| next | `(info: PaginationInfo)` | Next page. |
| prev | `(info: PaginationInfo)` | Previous page. |
| prefix | `(info: PaginationInfo)` | Page prefix. |
| suffix | `(info: PaginationInfo)` | Page suffix. |
