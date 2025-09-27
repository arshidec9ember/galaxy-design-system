# Back To Top

<!--single-column-->

It helps you back to where you were. However, time never goes back.

## Demos

Scroll down to see demos work.

```demo
basic.vue
visibility-height.vue
change-position.vue
target-container-selector.vue
```

## API

### BackToTop Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| bottom | `number \| string` | `40` | The height of BackToTop from the bottom of the page |
| listen-to | `string \| HTMLElement` | `undefined` | The element to be listened to scroll event. If it is `undefined` back top will listen to the nearest scrollable parent. |
| right | `number \| string` | `40` | The width of BackToTop from the right side of the page |
| show | `boolean` | `undefined` | Whether to show BackToTop |
| to | `string \| HTMLElement` | `'body'` | Container node to show BackToTop |
| visibility-height | `number` | `180` | BackToTop's trigger scroll top. |
| on-update:show | `(value: boolean) => void` | `undefined` | Callback is triggered when back-to-top display changes. |
