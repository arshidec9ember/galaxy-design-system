# Tabs

Tabs are used to group information on the same page. They help in segregating similar information in separate buckets, and act as a navigation component to access such segregated information. Standard tabs are the one we all are familiar with and follow the same behaviour as of expected from the system generated tabs along with supporting navigational requirements in different layouts. These can be used on full page layouts or in components such as modals, cards, or sidesheets

```figma
https://www.figma.com/file/t4dWFndlBl46TnLIH2n1dJ/%F0%9F%94%AE-GDS-v2.11.0---Foundation-%2B-Components?type=design&node-id=16388-40600&mode=design&t=52DNjHkppCdyHd4q-0
```

```overview-html
tabs/demos/enUS/index.html
```

<z-alert color="warning" title="Note" :bordered="false">
  <z-text code>z-tabs</z-text> will extract default tab value from default slot, so there would be a vue slot warning. If you don't want to see the warning, you should give component a  <z-text code>default-model-value</z-text>.
</z-alert>

<!--single-column-->

## Demos

```demo
basic.vue
icon.vue
size.vue
```

## Customization

```customization
bar.vue
segment.vue
card.vue
flex-label.vue
customize-tabs.vue
start.vue
display-directive.vue
addable.vue
before-leave.vue
no-pane.vue
update-bar-manually.vue
bar-width.vue
trigger.vue
toggle.vue
placement.vue
```

## API

### Tabs Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| addable | `boolean \| { disabled?: boolean }` | `false` | Whether to allow add tag. Only works when the tag's `variant` is `card`. |
| animated | `boolean` | `false` | Whether to activate tab switching animation. It won't have effect if `placement` is `'left'` or `'right'`. |
| bar-width | `number` | `undefined` | The width of the tab bar. |
| closable | `boolean` | `false` | Whether to allow the tag to be closed. Only works when the tag's `variant` is `card`. |
| default-model-value | `string \| number` | `undefined` | Default value in uncontrolled mode. |
| justify-content | `'space-between' \| 'space-around' \| 'space-evenly' \| 'start' \| 'center' \| 'end'` | `undefined` | Justify-content value of `flex` layout. Only works with `'line'` or `'bar'` typed tabs. |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Size of tabs. |
| pane-class | `string` | `undefined` | Class of the pane. |
| pane-style | `string \| object` | `undefined` | Style of the pane. |
| pane-wrapper-class | `string` | `undefined` | Class of the pane warpper. |
| pane-wrapper-style | `string \| object` | `undefined` | Style of the pane warpper. |
| placement | `'left' \| 'right' \| 'top' \| 'bottom'` | `'top'` | Placement of tabs. It won't work with `z-tabs` whose `variant` is `'segment'`. |
| tab-style | `string \| object` | `undefined` | Style of the tab. |
| tabs-padding | `number` | `0` | Left & right `padding` of the group of tabs. |
| trigger | `'click' \| 'hover'` | `'click'` | Trigger of activating a tab |
| variant | `'bar' \| 'line' \| 'card' \| 'segment'` | `'bar'` | Tabs variant. |
| value | `string \| number` | `undefined` | Value in controlled mode. |
| on-add | `() => void` | `undefined` | Callback function triggered when add tag. |
| on-before-leave | `(activeName: string \| number, oldActiveName: string \| number \| null) => boolean \| Promise<boolean>` | `undefined` | Hook function before switching tab. Returning `false` or promise resolving `false` or promise rejection will prevent tab switching. |
| on-close | `(name: string \| number) => void` | `undefined` | Callback function triggered when close tag. |
| on-update:model-value | `(value: string \| number) => void` | `undefined` | Callback function triggered when the value changes. |

### TabPane Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| closable | `boolean` | `false` | Whether to allow the tag to be closed. Only works when the tag's `variant` is `card`. |
| disabled | `boolean` | `false` | Whether to disable the tabs. |
| display-directive | `'if' \| 'show' \| 'show:lazy'` | `'if'` | The directive to use in conditionally rendering. `if` will use `v-if` and `show` will use `v-show`. When use `show` directive, the status of tab won't be reset after tab changes. When use `show:lazy`, the display effect is the same as `show`, but the content will be lazily loaded. |
| name | `string \| number` | `undefined` | Required, the name of the tab. |
| tab | `string \| VNode \| () => VNodeChild` | `undefined` | Tab label. |
| tab-props | `Object` | `undefined` | DOM attributes of tab label. |

### Tab Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| closable | `boolean` | `false` | Whether to allow the tag to be closed. Only works when the tag's `variant` is `card`. |
| disabled | `boolean` | `false` | Whether to disable. |
| name | `string \| number` | `undefined` | Required, the name of the tab. |

### Tabs Slots

| Name    | Parameters | Description   |
| ------- | ---------- | ------------- |
| default | `()`       | Tabs content. |
| start   | `()`       | Tabs start.   |
| end     | `()`       | Tabs end.     |

### TabPane Slots

| Name    | Parameters | Description        |
| ------- | ---------- | ------------------ |
| default | `()`       | Tab pane content.  |
| tab     | `()`       | Tab label content. |

### Tab Slots

| Name    | Parameters | Description  |
| ------- | ---------- | ------------ |
| default | `()`       | Tab content. |

### Tabs Methods

| Name            | Type         | Description              |
| --------------- | ------------ | ------------------------ |
| syncBarPosition | `() => void` | Sync tab bar's position. |
