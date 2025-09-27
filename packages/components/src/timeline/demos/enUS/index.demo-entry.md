# Timeline

Timeline component is a visual representation of events or milestones that occur over time. It is typically used to display a chronological sequence of events, such as transaction logs, change logs, progress indicator, etc.
The timeline component comes in both interactive and a static form. So, when using the timeline component it’s important to consider the context and the purpose of the timeline and choose accordingly.

```figma
https://www.figma.com/file/t4dWFndlBl46TnLIH2n1dJ/%F0%9F%94%AE-GDS-v2.11.0---Foundation-%2B-Components?type=design&node-id=16388-38597&mode=design&t=fa064HwDU4tLU19P-0
```

```overview-html
timeline/demos/enUS/index.html
```

## Demos

```demo
basic.vue
customize-icon.vue
```

## Customization

```customization
size.vue
item-placement.vue
horizontal.vue
```

## API

### Timeline Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| horizontal | `boolean` | `'false'` | Horizontal |
| icon-size | `number` | `undefined` | Size of icon part. |
| item-placement | `'start' \| 'end'` | `'start'` | Direction. |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Size. |

### TimelineItem Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| content | `string` | `undefined` | Item content. |
| line-type | `'default' \| 'dashed'` | `'default'` | Line type. |
| time | `string` | `undefined` | Item time. |
| title | `string` | `undefined` | Item title. |
| color | `'neutral' \| 'success' \| 'info' \| 'warning' \| 'error' \| string` | `'neutral'` | Item color. |

### Timeline Slots

| Name    | Parameters | Description       |
| ------- | ---------- | ----------------- |
| default | `()`       | Timeline Content. |

### TimelineItem Slots

| Name    | Parameters | Description                                    |
| ------- | ---------- | ---------------------------------------------- |
| default | `()`       | Timeline item content.                         |
| icon    | `()`       | Timeline item customize timeline icon.         |
| footer  | `()`       | Content at the bottom of the timeline options. |
| header  | `()`       | Content at the top of the timeline options.    |
