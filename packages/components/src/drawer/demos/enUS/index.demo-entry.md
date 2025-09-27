# Drawer

The Drawer component is a panel that slides out from the edge of the screen. It can be useful when you need users to complete a task or view some details without leaving the current page.

```figma
https://www.figma.com/file/t4dWFndlBl46TnLIH2n1dJ/%F0%9F%94%AE-GDS-v2.11.0---Foundation-%2B-Components?type=design&node-id=23082-87178&mode=design&t=FwcdQs4poYYjxSfT-0
```

<z-alert title="Caveat" color="warning" :bordered="false">
  If you need to use <z-text code>z-drawer-content</z-text>, you should keep <z-text code>z-drawer</z-text>'s <z-text code>native-scrollbar</z-text> prop as <z-text code>true</z-text>.
</z-alert>

```overview-html
drawer/demos/enUS/index.html
```

## Demos

```demo
basic.vue
closable.vue
slot.vue
scroll.vue

```

## Customization

```customization
target.vue
multiple.vue
resizable.vue

```

## API

### Drawer Props

| Name | Parameters | Default | Description |
| --- | --- | --- | --- |
| auto-focus | `boolean` | `true` | Whether to focus the first focusable element inside drawer. |
| block-scroll | `boolean` | `true` | Whether to disabled body scrolling when it's active. |
| close-on-esc | `boolean` | `true` | Whether to close drawer on Esc is pressed. |
| content-style | `string \| Object` | `undefined` | Style of drawer's scrollable content node. |
| default-width | `number \| string` | `251` | Default width of the drawer, works when placement is `left` and `right`. |
| default-height | `number \| string` | `251` | Default height of the drawer, works when placement is `top` and `bottom`. |
| display-directive | `'if' \| 'show'` | `'if'` | The display directive to use when `z-drawer` is rendered. `'if'` corresponds to `v-if` and `'show'` corresponds to `v-show`. |
| height | `number \| string` | `undefined` | Works when placement is `top` and `bottom`. |
| native-scrollbar | `boolean` | `true` | Whether to use native scrollbar on drawer. |
| mask-closable | `boolean` | `true` | Whether to emit `hide` event when click mask. |
| max-width | `number` | `undefined` | Max width of draggable drawer. |
| max-height | `number` | `undefined` | Max height of draggable drawer. |
| min-width | `number` | `undefined` | Min width of draggable drawer. |
| min-height | `number` | `undefined` | Max height of draggable drawer. |
| placement | `'top' \| 'right' \| 'bottom' \| 'left'` | `'right'` | Drawer placement. |
| resizable | `boolean` | `false` | Whether to resize the width / height of drawer. |
| scrollbar-props | `object` | `undefined` | [Scrollbar props](scrollbar#Scrollbar-Props) |
| show | `boolean` | `false` | Whether to show drawer. |
| show-mask | `boolean` | `true` | Whether to show mask. If set to `'transparent'`, transparent mask would be shown. If set to false, `trap-focus` will be disabled. |
| drawer-style | `string \| Object` | `undefined` | Style of the drawer. |
| drawer-class | `string` | `undefined` | Class of the drawer. |
| to | `string \| HTMLElement` | `'body'` | Container node of the drawer. |
| trap-focus | `boolean` | `true` | Whether to trap focus inside drawer. |
| width | `number \| string` | `undefined` | Works when placement is `left` and `right`. |
| z-index | `number` | `undefined` | Z index of the drawer. |
| on-after-enter | `() => void` | `undefined` | Callback after drawer is opened. |
| on-after-leave | `() => void` | `undefined` | Callback after drawer is closed. |
| on-esc | `() => void` | `undefined` | Callback fired when the escape key is pressed and focus is within drawer. |
| on-mask-click | `(e: MouseEvent) => void` | `undefined` | Callback triggered on mask clicked. |
| on-update:height | `(height: number) => void` | `undefined` | Callback trigger on drawer height change. |
| on-update:show | `(show: boolean) => void` | `undefined` | Callback triggered on drawer display status would change. |
| on-update:width | `(width: number) => void` | `undefined` | Callback trigger on drawer width change. |

### DrawerContent Props

| Name | Parameters | Default | Description |
| --- | --- | --- | --- |
| body-style | `string \| Object` | `undefined` | Drawer content's body style. |
| body-content-style | `string \| Object` | `undefined` | Style of body's scrollable content node. |
| closable | `boolean` | `false` | Whether the drawer content is closable. |
| footer-style | `string \| Object` | `undefined` | Drawer content's footer style. |
| header-style | `string \| Object` | `undefined` | Drawer content's header style. |
| native-scrollbar | `boolean` | `true` | Whether to use native scrollbar on body part. |
| title | `string` | `undefined` | Drawer content title. |
| description | `string` | `undefined` | Drawer content description. |
| scrollbar-props | `object` | `undefined` | See [Scrollbar props](scrollbar#Scrollbar-Props) |

### Drawer Slots

| Name    | Parameters | Description                |
| ------- | ---------- | -------------------------- |
| default | `()`       | The content of the drawer. |

### DrawerContent Slots

| Name | Parameters | Description |
| --- | --- | --- |
| default | `()` | The content of the drawer content. |
| footer | `()` | The footer of the drawer content. |
| header | `()` | The header of the drawer content. |
| title | `()` | The content of the title section where title is to be displayed with any other element if required. |
| description | `()` | The content of the description section which is displayed below the title section. |
| header-left | `()` | The content of the section which is displayed on the extreme left of header |
| header-right | `()` | The content of the section which is displayed on the extreme right of header |
