# Dialog

## CautionAlert

Before taking action, please confirm.

<z-alert title="Prerequisite" color="warning" :bordered="false">
  If you want to use dialog, you need to wrap the component where you call related methods inside <z-text code>z-dialog-provider</z-text> and use <z-text code>useDialog</z-text> to get the API.
</z-alert>

For example:

```html
<!-- App.vue -->
<z-dialog-provider>
  <content />
</z-dialog-provider>
```

```js
import { defineComponent } from 'vue'
import { useDialog } from '@zeta-gds/components'

// content
export default defineComponent({
  setup () {
    const dialog = useDialog()
    return {
      warning () {
        dialog.warning(options)
      }
    }
  }
})
```

## Demos

```demo
basic.vue
async.vue
use-component.vue
mask.vue
action.vue
use-dialog-reactive-list.vue
```

## API

### useDialog API

| Name | Type | Description |
| --- | --- | --- |
| destroyAll | `() => void` | Destroy all popup dialogs. |
| create | `(options: DialogOptions) => DialogReactive` | Create a dialog. |
| error | `(options: DialogOptions) => DialogReactive` | Use `error` color dialog. |
| info | `(options: DialogOptions) => DialogReactive` | Use `info` color dialog. |
| success | `(options: DialogOptions) => DialogReactive` | Use `success` color dialog. |
| warning | `(options: DialogOptions) => DialogReactive` | Use `warning` color dialog. |

### useDialogReactiveList API

`() => Ref<readonly DialogReactive[]>`

### DialogOptions Properties

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| action | `() => VNodeChild` | `undefined` | Content of the operation area, must be a `render` function. |
| autoFocus | `boolean` | `true` | Whether to focus the first focusable element inside modal. |
| blockScroll | `boolean` | `true` | Whether to disabled body scrolling when it's active. |
| bordered | `boolean` | `false` | Whether to show `border`. |
| class | `any` | `undefined` | Class name of the dialog. |
| closable | `boolean` | `true` | Whether to show `close` icon. |
| closeOnEsc | `boolean` | `true` | Whether to close the dialog when the Esc key is pressed |
| content | `string \| (() => VNodeChild)` | `undefined` | Content, can be a `render` function. |
| iconPlacement | `'left' \| 'top'` | `'left'` | Icon placement. |
| icon | `() => VNodeChild` | `undefined` | `Render` function of `icon`. |
| loading | `boolean` | `false` | Whether to display `loading` status. |
| maskClosable | `boolean` | `true` | Whether the dialog can be closed by clicking the `mask`. |
| negativeButtonProps | `ButtonProps` | `undefined` | Cancel button's DOM props |
| negativeText | `string` | `undefined` | Cancel button text. Corresponding button won't show if not set. |
| positiveButtonProps | `ButtonProps` | `undefined` | Confirm button's DOM props |
| positiveText | `string` | `undefined` | Confirm button text. Corresponding button won't show if not set. |
| showIcon | `boolean` | `true` | Whether to show `icon`. |
| style | `string \| Object` | Style of the dialog. |
| title | `string \| (() => VNodeChild)` | `undefined` | Title, can be a `render` function. |
| transformOrigin | `'mouse' \| 'center'` | `'mouse'` | The transform origin of the dialog's display animation. |
| color | `'error \| 'success' \| 'warning'` | `'warning'` | Dialog color. |
| onAfterEnter | `() => void` | `undefined` | Callback on enter animation ends. |
| onAfterLeave | `() => void` | `undefined` | Callback on leave animation ends. |
| onClose | `() => boolean \| Promise<boolean> \| any` | `undefined` | The default behavior is closing the confirm. Return `false` or resolve `false` or `Promise rejected` will prevent the default behavior. |
| onNegativeClick | `(e: MouseEvent) => boolean \| Promise<boolean> \| any` | `undefined` | The default behavior is closing the confirm. Return `false` or resolve `false` or `Promise rejected` will prevent the default behavior. |
| onPositiveClick | `(e: MouseEvent) => boolean \| Promise<boolean> \| any` | `undefined` | The default behavior is closing the confirm. Return `false` or resolve `false` or `Promise rejected` will prevent the default behavior. |
| onMaskClick | `() => void` | `undefined` | Callback triggered when click the mask. |

### DialogReactive API

#### DialogReactive Properties

All the properties can be modified dynamically.

| Name | Type | Description |
| --- | --- | --- |
| bordered | `boolean` | Whether to show `border`. |
| class | `any` | Class name of the dialog. |
| closable | `boolean` | Whether to show `close` icon. |
| closeOnEsc | `boolean` | Whether to close dialog on Esc is pressed. |
| content | `string \| (() => VNodeChild)` | Content, can be a `render` function. |
| iconPlacement | `'left' \| 'top'` | Icon placement. |
| icon | `() => VNodeChild` | `Render` function of `icon`. |
| loading | `boolean` | Whether to display `loading` status. |
| maskClosable | `boolean` | Whether the dialog can be closed by clicking the `mask`. |
| negativeButtonProps | `ButtonProps` | Cancel button's DOM props |
| negativeText | `string` | Corresponding button won't show if not set. |
| positiveButtonProps | `ButtonProps` | Confirm button's DOM props |
| positiveText | `string` | Corresponding button won't show if not set. |
| show-icon | `boolean` | Whether to show `icon`. |
| style | `string \| Object` | Style of the dialog. |
| title | `string \| (() => VNodeChild)` | Can be a `render` function. |
| transformOrigin | `'mouse' \| 'center'` | The transform origin of the dialog's display animation. |
| color | `'error \| 'success' \| 'warning'` | Dialog color. |
| onAfterEnter | `() => void \| undefined` | Callback on enter animation ends. |
| onAfterLeave | `() => void \| undefined` | Callback on leave animation ends. |
| onClose | `() => boolean \| Promise<boolean> \| any` | The default behavior is closing the confirm. Return `false` or `resolve false` or `Promise rejected` will prevent the default behavior. |
| onEsc | `() => void` | Callback fired when the escape key is pressed and focus is within dialog. |
| onNegativeClick | `(e: MouseEvent) => boolean \| Promise<boolean> \| any` | The default behavior is closing the confirm. Return `false` or `resolve false` or `Promise rejected` will prevent the default behavior. |
| onPositiveClick | `(e: MouseEvent) => boolean \| Promise<boolean> \| any` | The default behavior is closing the confirm. Return `false` or `resolve false` or `Promise rejected` will prevent the default behavior. |

#### DialogReactive Methods

| Name    | Type | Description     |
| ------- | ---- | --------------- |
| destroy | `()` | Close `dialog`. |

### Dialog Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| bordered | `boolean` | `false` | Whether to show `border`. |
| closable | `boolean` | `true` | Whether to show `close` icon. |
| content | `string \| (() => VNodeChild)` | `undefined` | Can be a `render` function. |
| icon-placement | `'left' \| 'top'` | `'left'` | Icon placement. |
| icon | `() => VNodeChild` | `undefined` | `Render` function of icon. |
| loading | `boolean` | `false` | Whether to display `loading` status. |
| negative-button-props | `ButtonProps` | `undefined` | Cancel button's DOM props |
| negative-text | `string` | `undefined` | Corresponding button won't show if not set. |
| positive-button-props | `ButtonProps` | `undefined` | Confirm button's DOM props |
| positive-text | `string` | `undefined` | Corresponding button won't show if not set. |
| show-icon | `boolean` | `true` | Whether to display the `icon`. |
| title | `string \| (() => VNodeChild)` | `undefined` | Title, can be a `render` function. |
| color | `'error \| 'success' \| 'warning' \| 'info'` | `'warning'` | Dialog color. |
| on-close | `() => void` | `undefined` | Calback on close button clicked. |
| on-negative-click | `(e: MouseEvent) => void` | `undefined` | Callback on positive button clicked. |
| on-positive-click | `(e: MouseEvent) => void` | `undefined` | Callback on negative button clicked. |

### Dialog Slots

| Name    | Parameters | Description       |
| ------- | ---------- | ----------------- |
| action  | `()`       | `Action` content. |
| default | `()`       | Dialog content.   |
| header  | `()`       | `Header` content. |
| icon    | `()`       | `Icon` content.   |
