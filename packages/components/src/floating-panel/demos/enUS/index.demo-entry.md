# Floating Panel

```figma
https://www.figma.com/design/1GTgJvPixqafNCJ8vMvtTl/Compose-Box?t=qAszF4POj6SO3ioH-0
```

For example:

```html
<!-- App.vue -->
<z-floating-panel-provider>
  <content />
</z-floating-panel-provider>
```

```js
import { defineComponent } from 'vue'
import { useFloatingPanel } from '@zeta-gds/components'

// content
export default defineComponent({
  setup () {
    const floatingPanel = useFloatingPanel()
    return {
      warning () {
        floatingPanel.create({
          content: '...'
        })
      }
    }
  }
})
```

## Demos

```demo
basic.vue
action.vue
max.vue
```

## Customization

```customization
programatic.vue
interactive.vue
draggable.vue
change-content.vue
scrollable.vue
closable.vue
close-all.vue
```

## API

### FloatingPanelProvider Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| container-style | `string \| Object` | `undefined` | Style of floatingPanel container. |
| max-items | `number` | `undefined` | Limit the number of floatingPanels to display. |
| scrollable | `boolean` | `true` | Whether floatingPanel can be scroll. Unavailable when `placement` equals `'top'` or `'bottom'`. |
| to | `string \| HTMLElement` | `'body'` | Container node of floatingPanel container. |

### floatingPanel Injection Methods

| Name | Type | Description |
| --- | --- | --- |
| create | `(option: FloatingPanelOption) => FloatingPanelReactive` | Create a floatingPanel. |
| destroyAll | `() => void` | close all popup floatingPanels. |

### FloatingPanelOption Properties

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| action | `string \| (() => VNodeChild)` | `undefined` | Content of the operation area can be a render function. |
| closable | `boolean` | `true` | Whether to show close icon. |
| draggable | `boolean` | `true` | Whether to floating panel can be draggable. |
| minimizable | `boolean` | `true` | Whether to show maximize/minimize icon. |
| containerElement | `HTMLElement \| SVGElement \| null \| undefined` | `()=> document.body` | we can decide the container where dragging will be happened |
| isFullScreen | `boolean` | `false` | enable whether it is full screen view or just compose box view |
| expandable | `boolean` | `true` | Whether to show expand icon. |
| content | `string \| (() => VNodeChild)` | `undefined` | Content can be a render function. |
| footer | `string \| (() => VNodeChild)` | `undefined` | Container of the `footer`, can be a render function. |
| title | `string \| (() => VNodeChild)` | `undefined` | Content of the `title`, can be a render function. |
| onAfterEnter | `Function` | `undefined` | Callback triggered after Transition's enter animation executed. |
| onAfterLeave | `Function` | `undefined` | Callback triggered after Transition's leave animation executed. |
| onClickOpenInNewTab | `Function` | `undefined` | Callback triggered on click open in new tab |
| dragDelay | `Number` | `100` | delay for on long press of header for enabling the drag out |
| onClose | `() => boolean \| Promise<boolean>` | `undefined` | The callback of floatingPanel closing. Returning `false`, promise resolve `false` or promise reject will cancel this closing. |
| onLeave | `Function` | `undefined` | Callback triggered when Transition's leave animation executed. |

### FloatingPanelReactive API

#### FloatingPanelReactive Properties

Properties of FloatingPanelReactive can be dynamically changed.

| Name | Type | Description |
| --- | --- | --- |
| action | `string \| (() => VNodeChild)` | Content of the operation area can be a render function. |
| closable | `boolean` | Whether to show close icon. |
| content | `string \| (() => VNodeChild)` | Content can be a render function. |
| footer | `string \| (() => VNodeChild)` | Content of the `footer`, can be a render function. |
| title | `string \| (() => VNodeChild)` | Content of the `title`, can be a render function. |
| onAfterEnter | `Function` | Callback triggered after Transition's enter animation executed. |
| onAfterLeave | `Function` | Callback triggered after Transition's leave animation executed. |
| onClose | `() => boolean \| Promise<boolean>` | The callback of floatingPanel closing. Returning `false`, promise resolve `false` or promise reject will cancel this closing. |
| onLeave | `Function` | Callback triggered when Transition's leave animation executed. |

#### FloatingPanelReactive Methods

| Name          | Type | Description                                    |
| ------------- | ---- | ---------------------------------------------- |
| close         | `()` | close the floatingPanel.                       |
| hide          | `()` | move to dropdown.                              |
| togglePanel   | `()` | toggle between minimize and open floating view |
| minimizePanel | `()` | toggle between minimize floating view          |
| maximizePanel | `()` | toggle between open or maximise floating view  |
