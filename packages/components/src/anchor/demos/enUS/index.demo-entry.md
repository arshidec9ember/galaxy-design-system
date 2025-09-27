# Anchor

An anchor navigation will take you instantly to a specific part of the page.

```figma
https://www.figma.com/file/t4dWFndlBl46TnLIH2n1dJ/%F0%9F%94%AE-GDS-v2.11.0---Foundation-%2B-Components?type=design&node-id=60136-206715&mode=design&t=lVakn86L7Pc4mrTd-0
```

```overview-html
anchor/demos/enUS/index.html
```

<!--single-column-->

## Demos

```demo
basic.vue
ignore-gap.vue
affix.vue
scrollto.vue
```

## API

### Anchor Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| affix | `boolean` | `false` | If it works like an affix. If set to `true`, it will receive props from [affix](affix#Affix-Props). |
| bound | `number` | `12` | The height of the border when scrolling. |
| show-ellipsis | `boolean` | `true` | If set to `true`, it will be displaying tooltip over ellipsed text. |
| ignore-gap | `boolean` | `false` | If set to `true`, it will be displayed on the exact href. |
| internal-scrollable | `boolean` | `false` | Whether the anchor is used in an internal scrollable container. |
| offset-target | `string \| HTMLElement \| Window \| Document \| (() => HTMLElement)` | `document` | The element or selector used to calc offset of link elements. If you are not scrolling the entire document but only a part of it, you may need to set this. |
| show-rail | `boolean` | `true` | Whether to show the sider rail. |
| show-background | `boolean` | `false` | Whether to show background of links. |
| top | `number` | `0` | The top offset when calculating anchor positions. |
| variant | `'rail' \| 'block'` | `'rail'` | The variant to use. |

### Anchor Link Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| title | `string` | `undefined` | The title of the anchor item |
| href | `string` | `undefined` | The element based on which anchor item will be in active state |
| header-style | `string` | `undefined` | Setting custom styles to the anchor item which behaves as a header. |
| is-header | `boolean` | `false` | Whether the anchor link should be styled as a header (uses Title variant 6-m). |
| is-sub-title | `boolean` | `false` | Whether the anchor link should be styled as a sub heading (uses Text variant 4-r). |

### Anchor Methods

| Name | Type | Description |
| --- | --- | --- |
| scrollTo | `(href: string) => void` | Manually scroll to the specific position. |
