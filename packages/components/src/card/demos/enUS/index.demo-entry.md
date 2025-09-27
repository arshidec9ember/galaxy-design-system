# Card

Cards contain content and actions about a single subject. Cards are surfaces that display content and actions on a single topic. They should be easy to scan for relevant and actionable information. Elements, like text and images, should be placed on them in a way that clearly indicates hierarchy.

```figma
https://www.figma.com/file/t4dWFndlBl46TnLIH2n1dJ/%F0%9F%94%AE-GDS-v2.11.0---Foundation-%2B-Components?type=design&node-id=16388-36346&mode=design&t=AD4DPN0ADkEF5BGp-0
```

```overview-html
card/demos/enUS/index.html
```

## Demos

```demo
basic.vue
size.vue
media.vue
hoverable.vue
border.vue
segment.vue
closable.vue
no-title.vue
loading.vue
custom-style.vue
checkable.vue
selectable.vue
selector.vue
stripe.vue
modifications.vue
action-area.vue
media-n-action-area.vue
image.vue
video.vue
background.vue
gradient-media.vue
horizontal-header.vue
vertical.vue
illustration.vue
```

## API

### Sub Component API

See the documentation below for a complete reference to all of the props and classes available to the components mentioned here.

- [`<z-card />`](/en-US/light/components/card)
- [`<z-card-action />`](/en-US/light/components/card/card-action)
- [`<z-card-action-area />`](/en-US/light/components/card/action-area)
- [`<z-card-content />`](/en-US/light/components/card/card-content)
- [`<z-card-footer />`](/en-US/light/components/card/card-footer)
- [`<z-card-header />`](/en-US/light/components/card/card-header)
- [`<z-card-media />`](/en-US/light/components/card/card-media)
- [`<z-card-selector />`](/en-US/light/components/card/card-selector)

### Card Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| bordered | `boolean` | `true` | Whether to show the card border. |
| closable | `boolean` | `false` | Is it allowed to close. |
| hoverable | `boolean` | `false` | Whether to show shadow when hovering on the card. |
| divider | `boolean \| { [part in 'content' \| 'footer' \| 'action']?: boolean \| 'inset' }` | `false` | Segment divider settings of the card. |
| size | `'small' \| 'medium' \| 'large' \| 'x-large'` | `'medium'` | Card size. |
| tag | `string` | `'div'` | What tag need the card be rendered as. |
| value | `string \| number` | `undefined` | Use it with card selector to add a value to the card component. |
| disabled | `string \| number` | `undefined` | Use it with card selector to add a value to the card component. |

### Card Slots

Card slots are **not available** by default you can check a slots based implementation of the card in [`<z-card-standard />`](/en-US/light/components/card-standard).
