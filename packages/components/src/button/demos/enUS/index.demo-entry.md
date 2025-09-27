# Button

Button is used to trigger some actions.

<!--single-column-->

```figma
https://www.figma.com/file/t4dWFndlBl46TnLIH2n1dJ/%F0%9F%94%AE-GDS-v2.11.0---Foundation-%2B-Components?type=design&node-id=16385-351&mode=design
```

```overview-html
button/demos/enUS/index.html
```

## Demos

```demo
basic.vue
filled.vue
outlined.vue
subtle.vue
light.vue
text.vue
size.vue
link.vue
elevation.vue
disabled.vue
icon.vue
events.vue
loading.vue
overflow.vue
popover.vue
```

## Customization

```customization
shape.vue
full-width.vue
sections-position.vue
dashed.vue
color.vue
group.vue
icon-button.vue

```

## API

### Button Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| label | `string` | `undefined` | Label for the button. |
| type | `'button' \| 'submit' \| 'reset'` | `'button'` | The `type` attribute of the button's DOM. |
| full-width | `boolean` | `false` | Whether the button is displayed as full width button or not. |
| circle | `boolean` | `false` | Whether the button is round. |
| color | `string \| 'primary' \| 'success' \| 'info' \| 'warning' \| 'error' \| 'neutral' \| {color: string, textColor: string, iconColor: string}` | `neutral` | Specify the button color using formats such as #FFF, #FFFFFF, yellow, or rgb(0, 0, 0). Similarly, define the button text color with supported formats like #FFF, #FFFFFF, yellow, or rgb(0, 0, 0). Additionally, semantic values such as 'primary', 'success', 'info', 'warning', 'error', or 'neutral' can be used. |
| disabled | `boolean` | `false` | Whether the button is disabled. |
| focusable | `boolean` | `false` | Whether the button is focusable. |
| native-focus-behavior | `boolean` | Browser is not Safari | Whether to follow button's native focus behavior. Since safari's button can't be focused by click, @zeta-gds/components uses some tricks to make it focusable on safari. If you don't need the behavior or need the button to be draggable, you can enable the prop. |
| icon-placement | `'start' \| 'end'` | `'start'` | The position of the icon in the button. |
| loading-type | `'inline' \| 'overlay'` | `'overlay'` | Whether the loader shown in the button will be of a inline type or an overlay |
| keyboard | `boolean` | `true` | Whether is supports keyboard operation. |
| loading | `boolean` | `false` | Whether the button shows the loading status. |
| render-icon | `() => VNodeChild` | `undefined` | Render function that renders button icon. |
| render-start | `() => VNodeChild` | `undefined` | Render function that renders left item. |
| render-end | `() => VNodeChild` | `undefined` | Render function that renders right item. |
| round | `boolean` | `false` | Whether the button shows rounded corners. |
| size | `'x-small' \| 'small' \| 'medium' \| 'large' \| 'x-large'` | `'medium'` | Button size. |
| strong | `boolean` | `false` | Whether to use strong text in the button. |
| text | `boolean` | `false` | Whether to display as a text button. |
| justify | `'center' \| 'space-between' \| 'space-evenly'` | `center` | This sets the justify content of the inner element |
| elevation | `0 \| 1 \| 2 \| 3 \| 4` | `0` | Elevation of the button |
| variant | `'default' \| 'filled' \| 'outlined' \| 'subtle' \| 'light' \| 'text' \| 'link'` | `'default'` | Button variants |
| border-style | `'dotted' \| 'dashed'` | `undefined` | Determines the border style |
| href | `string` | `undefined` | The URL of the page to open. If no URL is specified, a new blank window/tab is opened. |
| target | `'_blank' \| '_self' \| '_top' \| '_parent'` | `'_blank'` | The target attribute or the name of the window. |

### ButtonOverflow Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| size | `'x-small' \| 'small' \| 'medium' \| 'large' \| 'x-large'` | `medium` | The buttons' size in button group. If set, the button's size prop inner group won't work. |
| max-items | `number` | 3 | Maximum Buttons to be displayed post which remaining ones will be shown as a list inside a popover |

### ButtonGroup Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| size | `'x-small' \| 'small' \| 'medium' \| 'large' \| 'x-large'` | `medium` | The buttons' size in button group. If set, the button's size prop inner group won't work. |
| vertical | `boolean` | `false` | Directions of buttons in the group. |

### Button Slots

| Name | Parameters | Description |
| --- | --- | --- |
| default | `()` | The default content of the button. |
| icon | `()` | The icon of the button. |
| start | `()` | The left section of the button. This slot will be active if the icon slot is empty. |
| end | `()` | The right section of the button. This slot will be active if the icon slot is empty. |
| loader | `()` | The icon to be shown when button is in loading state. |

### ButtonOverflow Slots

| Name    | Parameters | Description                               |
| ------- | ---------- | ----------------------------------------- |
| default | `()`       | The button overflow is filled by default. |

### ButtonGroup Slots

| Name    | Parameters | Description                            |
| ------- | ---------- | -------------------------------------- |
| default | `()`       | The button group is filled by default. |
