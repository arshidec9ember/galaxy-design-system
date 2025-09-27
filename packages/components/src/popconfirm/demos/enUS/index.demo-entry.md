# Popconfirm

A dialog to confirm an action.

## Demos

```demo
basic.vue
no-icon.vue
actions.vue
```

## Customization

```customization
custom-action.vue
custom-icon.vue
event.vue
```

## API

### Popconfirm Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| negative-button-props | `ButtonProps` | `undefined` | Cancel button's DOM props |
| negative-text | `string \| null` | `'Cancel'` | Cancel button text. |
| positive-button-props | `ButtonProps` | `undefined` | Confirm button's DOM props |
| positive-text | `string \| null` | `'Confirm'` | Confirm button text. |
| show-icon | `boolean` | `true` | Whether to show icon. |
| on-positive-click | `() => boolean \| Promise<boolean> \| any` | `undefined` | Callback of confirmation. |
| on-negative-click | `() => boolean \| Promise<boolean> \| any` | `undefined` | Callback of cancel. |

For more props, see [popover](popover#Popover-Props).

### Popconfirm Slots

| Name    | Parameters | Description         |
| ------- | ---------- | ------------------- |
| action  | `()`       | Custom action.      |
| default | `()`       | Popconfirm content. |
| icon    | `()`       | Popconfirm icon.    |

### Popconfirm Methods

See [popover](popover#Popover-Methods).
