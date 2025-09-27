# Result

```figma
https://www.figma.com/file/t4dWFndlBl46TnLIH2n1dJ/%F0%9F%94%AE-GDS-v2.11.0---Foundation-%2B-Components?type=design&node-id=16503-868&mode=design&t=EmVtSGUUj2tExbEv-0
```

Result is for showing result.

## Demos

```demo
s-200.vue
s-404.vue
s-403.vue
s-500.vue
s-503.vue
s-401.vue
s-418.vue
s-419.vue
alignment.vue
info.vue
success.vue
warning.vue
error.vue
size.vue
custom.vue
default.vue
```

## API

### Result Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| title | `string` | `undefined` | Title. |
| description | `string` | `undefined` | Description. |
| status | `'info' \| 'success' \| 'warning' \| 'error' \| '404' \| '403' \| '500' \| '2xx' \| '3xx' \| '4xx' \| '5xx'` | `'info'` | Status. |
| size | `'small' \| 'medium' \| 'large' \| 'x-large'` | `'medium'` | Size. |
| variant | `'icon' \| 'image'` | `'icon'` | variant of the image. |
| align | `'left' \| 'center' \| 'right'` | alignment for the content. |

### Result Slots

| Name    | Parameters | Description                                    |
| ------- | ---------- | ---------------------------------------------- |
| default | `()`       | Results page content information.              |
| icon    | `()`       | Custom icon content area.                      |
| actions | `()`       | Information at the bottom of the results page. |
