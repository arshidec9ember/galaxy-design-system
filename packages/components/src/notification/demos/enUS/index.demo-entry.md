# Notification
Toast serves as a feedback communication tool. They are used to inform users of quick feedback on their actions. It is triggered by the system on a user's action and appears with the highest z index over the interface. It can be used to show Information, Success, Warning, or an Error acknowledgment.

```figma
https://www.figma.com/file/t4dWFndlBl46TnLIH2n1dJ/%F0%9F%94%AE-GDS-v2.11.0---Foundation-%2B-Components?type=design&node-id=27352-99510&mode=design&t=52DNjHkppCdyHd4q-0
```

<z-space vertical size="large">
<z-alert title="Prerequisite" color="warning" :bordered="false">
  If you want to use notification, you need to wrap the component where you call related methods inside <z-text code>z-notification-provider</z-text> and use <z-text code>useNotification</z-text> to get the API.
</z-alert>

For example:

```html
<!-- App.vue -->
<z-notification-provider>
  <content />
</z-notification-provider>
```

```js
import { defineComponent } from 'vue'
import { useNotification } from '@zeta-gds/components'

// content
export default defineComponent({
  setup () {
    const notification = useNotification()
    return {
      warning () {
        notification.warning({
          content: '...'
        })
      }
    }
  }
})
```

</z-space>

```overview-html
notification/demos/enUS/index.html
```

## Demos

```demo
basic.vue
type.vue
pause.vue
action.vue
max.vue
```

## Customization

```customization
interactive.vue
change-content.vue
scrollable.vue
closable.vue
duration.vue
placement.vue
```

## API

### NotificationProvider Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| container-style | `string \| Object` | `undefined` | Style of notification container. |
| placement | `'top' \| 'bottom' \|'top-right' \| 'top-left' \| 'bottom-left' \| 'bottom-right'` | `bottom-right'` | Placement of all notifications. |
| max-items | `number` | `undefined` | Limit the number of notifications to display. |
| scrollable | `boolean` | `true` | Whether notification can be scroll. Unavailable when `placement` equals `'top'` or `'bottom'`. |
| to | `string \| HTMLElement` | `'body'` | Container node of notification container. |

### notification Injection Methods

| Name | Type | Description |
| --- | --- | --- |
| create | `(option: NotificationOption) => NotificationReactive` | Create a notification. |
| destroyAll | `() => void` | Destroy all popup notifications. |
| error | `(option: NotificationOption) => NotificationReactive` | Use `error` type notification. |
| info | `(option: NotificationOption) => NotificationReactive` | Use `info` type notification. |
| success | `(option: NotificationOption) => NotificationReactive` | Use `success` type notification. |
| warning | `(option: NotificationOption) => NotificationReactive` | Use `warning` type notification. |

### NotificationOption Properties

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| action | `string \| (() => VNodeChild)` | `undefined` | Content of the operation area can be a render function. |
| avatar | `() => VNodeChild` | `undefined` | Content of the `avatar`. |
| closable | `boolean` | `true` | Whether to show close icon. |
| content | `string \| (() => VNodeChild)` | `undefined` | Content can be a render function. |
| description | `string \| (() => VNodeChild)` | `undefined` | Content of the `description`, can be a render function. |
| duration | `number` | 4000 | Unit is millisecond. |
| progress | `boolean` | true | to show the progress bar. |
| keepAliveOnHover | `boolean` | `false` | Whether to keep the notification when mouse hover. |
| meta | `string \| (() => VNodeChild)` | `undefined` | Content of the `meta`, can be a render function. |
| title | `string \| (() => VNodeChild)` | `undefined` | Content of the `title`, can be a render function. |
| onAfterEnter | `Function` | `undefined` | Callback triggered after Transition's enter animation executed. |
| onAfterLeave | `Function` | `undefined` | Callback triggered after Transition's leave animation executed. |
| onClose | `() => boolean \| Promise<boolean>` | `undefined` | The callback of notification closing. Returning `false`, promise resolve `false` or promise reject will cancel this closing. |
| onLeave | `Function` | `undefined` | Callback triggered when Transition's leave animation executed. |

### NotificationReactive API

#### NotificationReactive Properties

Properties of NotificationReactive can be dynamically changed.

| Name | Type | Description |
| --- | --- | --- |
| action | `string \| (() => VNodeChild)` | Content of the operation area can be a render function. |
| avatar | `() => VNodeChild` | Content of the `avatar`, can be a render function. |
| closable | `boolean` | Whether to show close icon. |
| content | `string \| (() => VNodeChild)` | Content can be a render function. |
| description | `string \| (() => VNodeChild)` | Content of the `description`, can be a render function. |
| duration | `number` | Unit is millisecond. |
| meta | `string \| (() => VNodeChild)` | Content of the `meta`, can be a render function. |
| title | `string \| (() => VNodeChild)` | Content of the `title`, can be a render function. |
| onAfterEnter | `Function` | Callback triggered after Transition's enter animation executed. |
| onAfterLeave | `Function` | Callback triggered after Transition's leave animation executed. |
| onClose | `() => boolean \| Promise<boolean>` | The callback of notification closing. Returning `false`, promise resolve `false` or promise reject will cancel this closing. |
| onLeave | `Function` | Callback triggered when Transition's leave animation executed. |

#### NotificationReactive Methods

| Name    | Type | Description               |
| ------- | ---- | ------------------------- |
| destroy | `()` | Destroy the notification. |
