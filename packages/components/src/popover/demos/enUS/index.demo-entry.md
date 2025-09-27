# Popover

A Popover can be used to display some content on top of another.

If you just want to display some basic text message, you can use [Tooltip](tooltip) instead.

```figma
https://www.figma.com/file/t4dWFndlBl46TnLIH2n1dJ/%F0%9F%94%AE-GDS-v2.11.0---Foundation-%2B-Components?type=design&node-id=16388-39982&mode=design&t=AbwfzriP0VgimpcH-0
```

## Demos

```demo
basic.vue
trigger.vue
placement.vue
no-arrow.vue
event.vue
with-custom-content.vue

```

## Customization

```customization
style.vue
trigger-width.vue
delay.vue
raw-content.vue
manual-position.vue
slots.vue

```

## API

### Popover Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| animated | `boolean` | `true` | Use animation when popping up. |
| arrow-point-to-center | `boolean` | `false` | Whether the arrow points to center of the trigger element. |
| arrow-style | `Object \| string` | `undefined` | Arrow style of the popover. |
| content-style | `Object \| string` | `undefined` | Content style of the popover. |
| delay | `number` | `100` | Popover showing delay when trigger is `hover`. |
| disabled | `boolean` | `false` | Whether the popover can't be activated. |
| display-directive | `'if' \| 'show'` | `'if'` | The conditionally render directive to show popover content. `if` means using `v-if` to render content, `show` means using `v-show` to render content. |
| duration | `number` | `100` | Popover vanish delay when trigger is `hover`. |
| flip | `boolean` | `true` | Whether to flip the popover when there is no space for current placement. |
| footer-style | `Object \| string` | `undefined` | Footer style of the popover. |
| header-style | `Object \| string` | `undefined` | Header style of the popover. |
| keep-alive-on-hover | `boolean` | `true` | Whether to keep popover shown when hover on popover itself with `trigger="hover"`. |
| overlap | `boolean` | `false` | Overlap trigger element. |
| placement | `'top-start' \| 'top' \| 'top-end' \| 'right-start' \| 'right' \| 'right-end' \| 'bottom-start' \| 'bottom' \| 'bottom-end' \| 'left-start' \| 'left' \| 'left-end' \| ` | `'top'` | Popover placement. |
| raw | `boolean` | `false` | Whether to use no default styles. |
| scrollable | `boolean` | `false` | Whether the popover's content is scrollable. |
| show-arrow | `boolean` | `true` | Whether to show arrow if set. |
| show | `boolean` | `undefined` | Whether to show popover. |
| title | `string` | `undefined` | Popover title. |
| to | `string \| HTMLElement \| false` | `'body'` | Container node of the popover content. `false` will keep it at trigger container. |
| trigger | `'hover' \| 'click' \| 'focus' \| 'manual'` | `'hover'` | The popover trigger type. |
| width | `number \| 'trigger'` | `undefined` | `'trigger'` means popover's width will follow its trigger's width. |
| x | `number` | `undefined` | The CSS `left` pixel value when popover manually positioned (x, y need to be set together). |
| y | `number` | `undefined` | The CSS `top` pixel value when popover manually positioned (x, y need to be set together). |
| z-index | `number` | `undefined` | The z-index of the popover. |
| on-clickoutside | `(e: MouseEvent) => void` | `undefined` | Callback function triggered when clickoutside. |
| on-update:show | `(value: boolean) => void` | `undefined` | Callback on show status changes. |

### Popover Slots

| Name    | Parameters | Description                                     |
| ------- | ---------- | ----------------------------------------------- |
| trigger | `()`       | The element or component that triggers popover. |
| footer  | `()`       | The footer content of the popover.              |
| header  | `()`       | The header content of the popover.              |
| default | `()`       | The content inside popover.                     |

### Popover Methods

| Name         | Parameters        | Description                           |
| ------------ | ----------------- | ------------------------------------- |
| setShow      | `(show: boolean)` | Set show status in uncontrolled mode. |
| syncPosition | `()`              | Sync popover position.                |
