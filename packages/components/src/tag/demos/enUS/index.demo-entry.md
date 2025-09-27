# Tag

Status indicators is an important tool for communicating status-level information. Different shapes and semantic colors enable users to quickly assess and identify the status. These visual cues are intended to attract the user’s attention to a piece of content or UI element that is dynamic in nature.

```figma
https://www.figma.com/file/t4dWFndlBl46TnLIH2n1dJ/%F0%9F%94%AE-GDS-v2.11.0---Foundation-%2B-Components?type=design&node-id=39577-111707&mode=design&t=52DNjHkppCdyHd4q-0
```

```overview-html
tag/demos/enUS/index.html
```

## Demos

```demo
basic.vue
tagKey.vue
status.vue
differential.vue
padding.vue
size.vue
dropdown.vue
```

## Customization

```customization
states.vue
disabled.vue
selectable.vue
combobox.vue
bordered.vue
color.vue
closable.vue
icon.vue
avatar.vue
checkable.vue
```

## API

### Tag Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| bordered | `boolean` | `true` | Whether the tag has bgit order. |
| checkable | `boolean` | `false` | Whether the tag is checkable. |
| checked | `boolean` | `false` | Whether the tag is checked. Note: used with `checkable`. |
| closable | `boolean` | `false` | Whether the tag shows a close button. |
| color | `'neutral' \| 'primary' \| 'info' \| 'success' \| 'warning' \| 'error' \| { color?: string, borderColor?: string, textColor?: string, iconColor?: string }` | `neutral` | Color of the tag. Note: this will override the type property's color. |
| disabled | `boolean` | `false` | Whether the tag is disabled. |
| round | `boolean` | `false` | Whether the tag has rounded corners. |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Size of the tag. |
| strong | `boolean` | `false` | Whether to use strong text |
| trigger-click-on-close | `boolean` | `false` | Whether the tag triggers click on close. |
| on-close | `(e: MouseEvent) => void` | `undefined` | Close checked callback. |
| on-update:checked | `(value: boolean) => void` | `undefined` | Checked status change callback. |

### Tag Slots

| Name    | Parameters | Description    |
| ------- | ---------- | -------------- |
| avatar  | `()`       | Tag's avatar.  |
| default | `()`       | Tag's content. |
| label   | `()`       | Tag's Label.   |
| icon    | `()`       | Tag's icon.    |
