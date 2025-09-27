# Link

Link anatomy consists of Text label whose purpose is to Communicate what is being linked to and a support icon for showing if link directs to external page or window.

```figma
https://www.figma.com/file/t4dWFndlBl46TnLIH2n1dJ/%F0%9F%94%AE-GDS-v2.11.0---Foundation-%2B-Components?type=design&node-id=16385-960&mode=design&t=zxxp9i57BHpgmrFF-0
```

```overview-html
link/demos/enUS/index.html
```

## Demos

```demo
basic.vue
inline.vue
showExternalLinkIcon.vue
icon.vue
disabled.vue
extending-routerlink.vue
size.vue
```

## API

### Link Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| href | `string` | `undefined` | The URL that the hyperlink points to. Links are not restricted to HTTP-based URLs. |
| size | `'small' \| 'medium' \| 'large'` | `medium` | Size of link |
| isBold | `boolean` | `false` | bold or not |
| isInline | `boolean` | `false` | is inline or not |
| showExternalLinkIcon | `boolean` | `true` | show external link icon or not |

### Link Slots

| Name    | Parameters | Description        |
| ------- | ---------- | ------------------ |
| prefix  | `()`       | Link's prefix icon |
| default | `()`       | Link's content.    |

### Attribute Props

All the [other attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a) props can be mapped automatically to `<a>` tag.
