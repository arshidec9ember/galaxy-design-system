# Standard Card Template

The following card is a composition of the `<z-card />` and it's sub-component using slots.

```figma
https://www.figma.com/file/t4dWFndlBl46TnLIH2n1dJ/%F0%9F%94%AE-GDS-v2.11.0---Foundation-%2B-Components?type=design&node-id=16388-36346&mode=design&t=AD4DPN0ADkEF5BGp-0
```

## Demos

```demo
basic.vue
size.vue
media.vue
hoverable.vue
slots.vue
border.vue
segment.vue
closable.vue
no-title.vue
loading.vue
custom-style.vue
checkable.vue
selectable.vue
```

## API

### Card Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| bordered | `boolean` | `true` | Whether to show the card border. |
| closable | `boolean` | `false` | Is it allowed to close. |
| content-style | `Object \| string` | `undefined` | The style of the card content area. |
| footer-style | `Object \| string` | `undefined` | The style of the bottom area of the card. |
| header-style | `Object \| string` | `undefined` | The style of the card head area. |
| header-end-style | `Object \| string` | `undefined` | The style of the card head end area. |
| hoverable | `boolean` | `false` | Whether to show shadow when hovering on the card. |
| divider | `boolean \| { [part in 'content' \| 'footer' \| 'action']?: boolean \| 'inset' }` | `false` | Segment divider settings of the card. |
| size | `'small' \| 'medium' \| 'large' \| 'x-large'` | `'medium'` | Card size. |
| tag | `string` | `'div'` | What tag need the card be rendered as. |
| title | `string` | `undefined` | Card title. |
| value | `string \| number` | `undefined` | Use it with card selector to add a value to the card component. |
| disabled | `string \| number` | `undefined` | Use it with card selector to add a value to the card component. |
| on-close | `() => void` | `undefined` | Callback function triggered upon closing the card. |

### Card Slots

| Name       | Parameters | Description             |
| ---------- | ---------- | ----------------------- |
| media      | `()`       | Media content.          |
| header     | `()`       | Header content.         |
| header-end | `()`       | Header end content.     |
| default    | `()`       | Card content.           |
| footer     | `()`       | Footer content.         |
| action     | `()`       | Operating area content. |
