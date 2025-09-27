# Card Action Area

Just put something in it. Wraps card media(background) and has applies animation on a particular area.

<z-alert color="warning" title="Caveat" :bordered="false">
  <z-ul align-text>
    <li>
      This will mostly behave as a relative parent wrapper for card media with background prop.
    </li>
    <li>
      You can target particular area of card for animation.
    </li>
  </z-ul>
</z-alert>

## Demos

```demo
media-n-action-area.vue
action-area.vue
```

## API

### Card Action Area Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| style | `Object \| string` | `undefined` | The style of the card head area. |  |
| tag | `string` | `'div'` | What tag need the card be rendered as. |  |
| animation | `shine \| hover` | `'false'` | What is the animation behaviour. |  |

### Card Action Area Slots

| Name    | Parameters | Description               |
| ------- | ---------- | ------------------------- |
| default | `()`       | Card Action Area content. |

### Sub Components

See the documentation below for a complete reference to all of the props and classes available to the components mentioned here.

- [`<z-card />`](/en-US/light/components/card)
- [`<z-card-action />`](/en-US/light/components/card/card-action)
- [`<z-card-action-area />`](/en-US/light/components/card/action-area)
- [`<z-card-content />`](/en-US/light/components/card/card-content)
- [`<z-card-footer />`](/en-US/light/components/card/card-footer)
- [`<z-card-header />`](/en-US/light/components/card/card-header)
- [`<z-card-media />`](/en-US/light/components/card/card-media)
- [`<z-card-selector />`](/en-US/light/components/card/card-selector)
