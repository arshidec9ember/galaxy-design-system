# Message
Message Component

### CautionAlert

<z-space vertical size="large">
<z-alert title="Prerequisite" color="warning" :bordered="false">
  If you want to use message, you need to wrap the component where you call related methods inside <z-text code>z-message-provider</z-text> and use <z-text code>useMessage</z-text> to get the API.
  <br/>
  If you want to use it outside setup, please refer to Q & A part at the bottom of the page.
</z-alert>
For example:

```html
<!-- App.vue -->
<z-message-provider>
  <content />
</z-message-provider>
```

```js
import { useMessage } from '@zeta-gds/components'
import { defineComponent } from 'vue'

// content
export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      warning () {
        message.warning('...')
      }
    }
  }
})
```

</z-space>

## Demos

```demo
basic.vue
icon.vue
timing.vue
closable.vue
modify-content.vue
manually-close.vue
max.vue
about-theme.vue
multiple-line.vue
placement.vue
customize-message.vue
no-icon.vue
```

## API

### MessageProvider Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| closable | `boolean` | `false` | Whether to show close icon on all messages. |
| container-style | `string \| CSSProperties` | `undefined` | Message container style. |
| duration | `number` | `3000` | Default duration of on all messages. |
| keep-alive-on-hover | `boolean` | `false` | Whether to destroy while hovering on all messages. |
| max-items | `number` | `undefined` | Limit the number of messages to display. |
| placement | `top \| top-left \| top-right \| bottom \| bottom-left \| bottom-right ` | `top` | Placement of all messages. |
| to | `string \| HTMLElement` | `'body'` | Container node of message container. |

### MessageProvider Injection API

#### MessageProvider Injection Methods

| Name | Type | Description |
| --- | --- | --- |
| destroyAll | `() => void` | Destroy all popup messages. |
| create | `(content: string \| (() => VNodeChild), option?: MessageOption) => MessageReactive` | Use create type message. |
| error | `(content: string \| (() => VNodeChild), option?: MessageOption) => MessageReactive` | Use error type message. |
| info | `(content: string \| (() => VNodeChild), option?: MessageOption) => MessageReactive` | Use info type message. |
| loading | `(content: string \| (() => VNodeChild), option?: MessageOption) => MessageReactive` | Use loading type message. |
| success | `(content: string \| (() => VNodeChild), option?: MessageOption) => MessageReactive` | Use success type message. |
| warning | `(content: string \| (() => VNodeChild), option?: MessageOption) => MessageReactive` | Use warning type message. |

#### MessageOption Properties

| Name | Type | Description |
| --- | --- | --- |
| closable | `boolean` | Whether to show close icon. |
| duration | `number` | The duration of the message. |
| icon | `() => VNodeChild` | Message icon. |
| keepAliveOnHover | `boolean` | Messages whether to destroy while hover. |
| render | `MessageRenderMessage` | Render function of the entire message. |
| showIcon | `boolean` | Whether to show icon. |
| color | `'info' \| 'success' \| 'warning' \| 'error' \| 'loading' \| 'default'` | Message type. |
| onAfterLeave | `() => void` | Callback after message disappeared. |
| onClose | `() => void` | Callback when close icon is clicked. |
| onLeave | `() => void` | Callback when message start to disappear. |

#### MessageRenderMessage Type

```ts
type MessageRenderMessage = (props: {
  content?: string | number | (() => VNodeChild)
  icon?: () => VNodeChild
  closable: boolean
  color: 'info' | 'success' | 'warning' | 'error' | 'loading'
  onClose?: () => void
}) => VNodeChild
```

#### MessageReactive Properties

| Name | Type | Description |
| --- | --- | --- |
| closable | `boolean` | Whether to show close icon. |
| content | `string \| (() => VNodeChild)` | Message content. |
| destroy | `() => void` | Message destroy method. |
| icon | `() => VNodeChild` | Message icon. |
| keepAliveOnHover | `boolean` | Messages whether to destroy while hover |
| showIcon | `boolean` | Whether to show icon. |
| color | `'info' \| 'success' \| 'warning' \| 'error' \| 'loading' \| 'default'` | Message type. |
| onAfterLeave | `() => void` | Callback after message disappeared. |
| onLeave | `() => void` | Callback when message start to disappear. |

#### MessageReactive Methods

| Name    | Type | Description             |
| ------- | ---- | ----------------------- |
| destroy | `()` | Message destroy method. |

## Q & A

### Use Message Outside Setup

<z-space vertical size="large">
<z-alert color="warning" :bordered="false">
  You need to mount the return value of <z-text code>useMessage</z-text> to the window in the top-level setup and then call it. Before calling it, you need to make sure that message has been mounted successfully.
</z-alert>

```html
<!-- App.vue -->
<z-message-provider>
  <content />
</z-message-provider>
```

```html
<!-- content.vue -->
<template>...</template>

<script>
  import { useMessage } from '@zeta-gds/components'
  import { defineComponent } from 'vue'

  // content
  export default defineComponent({
    setup() {
      window.$message = useMessage()
    }
  })
</script>
```

```js
// xxx.js
export const handler = () => {
  // You need to ensure that window.$message = message has been executed in setup
  window.$message.success(
    'Confronting change often yields opportunities for invaluable growth'
  )
}
```

</z-space>
