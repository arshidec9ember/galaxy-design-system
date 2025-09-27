# Alert
Alerts serve as a communication component that is used to display important messages, such as system alerts. They are used to catch the user’s attention and prompt them to take any action when required.


```figma
https://www.figma.com/file/t4dWFndlBl46TnLIH2n1dJ/%F0%9F%94%AE-GDS-v2.11.0---Foundation-%2B-Components?type=design&node-id=16388-39986&mode=design&t=52DNjHkppCdyHd4q-0
```

```overview-html
alert/demos/enUS/index.html
```
<!--single-column-->

## Demos

```demo
basic.vue
closable.vue
action.vue
```

## Customization

```customization
bordered.vue
slot.vue
no-icon.vue
event.vue
```

## API

### Alert Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| bordered | `boolean` | `true` | Whether the alert can show border. |
| closable | `boolean` | `false` | Whether the alert can be closed. |
| show-icon | `boolean` | `true` | Whether to show the icon of alert. |
| title | `string` | `undefined` | Title of the alert. |
| color | `'neutral' \| 'info' \| 'success' \| 'warning' \| 'error'` | `'neutral'` | Alert color. |
| action-placement | `'right' \| 'bottom'` | 'bottom' | action to be displayed in right or at bottom of the content. |
| on-after-leave | `Function` | `undefined` | Callback function executed when the alert disappears. |
| on-close | `() => boolean \| Promise<boolean> \| any` | `() => true` | The callback function executed when the close icon is clicked. |

### Alert Slots

| Name    | Parameters | Description                             |
| ------- | ---------- | --------------------------------------- |
| default | `()`       | The content of the alert.               |
| header  | `()`       | The content placed in the alert header. |
| icon    | `()`       | Icon displayed in the alert.            |
| action  | `()`       | Action in the alert                     |
