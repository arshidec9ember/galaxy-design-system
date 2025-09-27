# Breadcrumb

Breadcrumb is a navigational component that is used to inform the users of their current location in a flow and also allow them to jump to the previous locations.

```figma
https://www.figma.com/file/t4dWFndlBl46TnLIH2n1dJ/%F0%9F%94%AE-GDS-v2.11.0---Foundation-%2B-Components?type=design&node-id=16388-40599&mode=design&t=P2rEd7fGzv0GIiuC-0
```

```overview-html
breadcrumb/demos/enUS/index.html
```

## Demos

```demo
basic.vue
separator.vue
overflow-menu.vue
size.vue
```

## Customization

```customization
icon.vue
custom.vue
separator-per-item.vue
last-item.vue
expand.vue
```

## API

### Breadcrumb Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| separator | `string` | `'/'` | Breadcrumb separator. |
| size | `'small' \| 'medium' \| 'large'` | Size of the breadcrumb. Affects text and spacing. |
| weight | `'regular' \| 'medium'` | Font Weight of the breadcrumb. |
| show-overflow-menu | `boolean` | `false` | to show the hidden item in the dropdown. |
| overflow-menu-trigger | `'hover' \| 'click' ` | `'hover'` | The dropdown trigger type. Always use with show-overflow-menu. |
| items-after-collapse | `integer` | `1` | If max items is exceeded, the number of items to show after the ellipsis. |
| items-before-collapse | `integer` | `1` | If max items is exceeded, the number of items to show before the ellipsis. |
| max-items | `integer` | `undefined` | Specifies the maximum number of breadcrumbs to display. When there are more than the maximum number, only the first `itemsBeforeCollapse` and last `itemsAfterCollapse` will be shown, with an ellipsis in between. |

### BreadcrumbItem Props

| Name      | Type      | Default     | Description               |
| --------- | --------- | ----------- | ------------------------- |
| clickable | `boolean` | `true`      | Whether it's clickable.   |
| separator | `string`  | `undefined` | BreadcrumbItem separator. |
| href      | `string`  | `undefined` | BreadcrumbItem link.      |

### Breadcrumb Slots

| Name    | Parameters | Description              |
| ------- | ---------- | ------------------------ |
| default | `()`       | Breadcrumb default slot. |

### Breadcrumb Item Slots

| Name      | Parameters | Description                         |
| --------- | ---------- | ----------------------------------- |
| default   | `()`       | BreadcrumbItem default slot.        |
| start     | `()`       | BreadcrumbItem start slot for icon. |
| end       | `()`       | BreadcrumbItem end slot for icon.   |
| separator | `()`       | BreadcrumbItem separator slot.      |
