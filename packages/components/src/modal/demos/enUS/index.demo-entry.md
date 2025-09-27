# Modal

Modal is a UI shell focusing the user's attention exclusively on specific piece of information via a window that sits on top of the page content. The component inform users about a specific task and may contain critical information, require decisions, or involve multiple tasks.

```figma
https://www.figma.com/file/t4dWFndlBl46TnLIH2n1dJ/%F0%9F%94%AE-GDS-v2.11.0---Foundation-%2B-Components?type=design&node-id=16388-39985&mode=design&t=52DNjHkppCdyHd4q-0
```

```overview-html
modal/demos/enUS/index.html
```

## Demos

```demo
basic.vue
result.vue
custom-template.vue
```

## Customization

```customization
banner.vue
controlled.vue
mask-closable.vue
custom-position.vue
preset-card.vue
preset-confirm.vue
preset-confirm-slot.vue
transform-origin.vue
```

## API

### Modal Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| auto-focus | `boolean` | `true` | Whether to focus the first focusable element inside modal. |
| block-scroll | `boolean` | `true` | Whether to disabled body scrolling when it's active. |
| close-on-esc | `boolean` | `true` | Whether to close modal on Esc is pressed. |
| display-directive | `'if' \| 'show'` | `'if'` | Use which directive to control the rendering of modal body. |
| mask-closable | `boolean` | `true` | Whether to emit `hide` event when click mask. |
| preset | `'dialog' \| 'card'` | `undefined` | The preset of `z-modal`. |
| show | `boolean` | `false` | Whether to show modal. |
| to | `string \| HTMLElement` | `body` | Container node of the modal content. |
| transform-origin | `'mouse' \| 'center'` | `'mouse'` | The transform origin of the modal's display animation. |
| trap-focus | `boolean` | `true` | Whether to trap focus inside modal. |
| z-index | `number` | `undefined` | Z index of the modal. |
| on-after-enter | `() => void` | `undefined` | Callback after modal is opened. |
| on-after-leave | `() => void` | `undefined` | Callback after modal is closed. |
| on-esc | `() => void` | `undefined` | Callback fired when the escape key is pressed and focus is within modal. |
| on-mask-click | `() => void` | `undefined` | Callback on mask is clicked. |
| on-update:show | `(value: boolean) => void` | `undefined` | Callback when modal's display status is changed. |

### Modal without Preset Slots

| Name    | Parameters | Description               |
| ------- | ---------- | ------------------------- |
| default | `()`       | The content of the modal. |

### Modal with Preset Card Slots

See [Card slots](card#Card-Slots)

### Modal with Preset Dialog Slots

See [Dialog slots](dialog#Dialog-Slots)
