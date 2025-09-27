# List

List is one of the most commonly used components, one major example is the popover. It is a combination of items, used to display a group of related items as a list. Like, a group of actions to perform an action or a group of values to select from. Another example is list inside a section container.

```figma
https://www.figma.com/file/t4dWFndlBl46TnLIH2n1dJ/🔮-GDS-v2.11.0---Foundation-%2B-Components?node-id=40705%3A121883&mode=dev
```

```overview-html
list/demos/enUS/index.html
```

<!--single-column-->

## Demos

```demo

selection.vue
multi-select.vue
navigation.vue
```

## customization

```customization
facade.vue
hoverable.vue
border.vue
```

## API

### List Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| bordered | `boolean` | `false` | Whether to show the border. |
| clickable | `boolean` | `false` | Whether item has clickable style. |
| hoverable | `boolean` | `false` | Whether item has hoverable style. |
| selectable | `boolean` | `false` | Whether items are selectable style. |
| multiple | `boolean` | `false` | Whether allow multiple item selection. |
| show-divider | `boolean` | `true` | Whether to show item divider. |
| show-indicator | `boolean` | `false` | Whether to show indicator for single/multiselect |
| default-model-value | `string \| string[] \| null` | `undefined` | Default value when not manually set. |
| model-value | `string \| string[]` | `undefined` | v-model for the z-list-item--selected model-value |
| on-update:model-value | `(value: string \| string[]) => void` | `undefined` | Callback triggered when the input value changes. |

### List Slots

| Name    | Parameters | Description                           |
| ------- | ---------- | ------------------------------------- |
| default | `()`       | The contents of the list.             |
| footer  | `()`       | Content at the bottom of the list.    |
| header  | `()`       | The contents of the head of the list. |

### ListItem Slots

| Name    | Parameters | Description                         |
| ------- | ---------- | ----------------------------------- |
| default | `()`       | The contents of the list item.      |
| prefix  | `()`       | The first content of the list item. |
| suffix  | `()`       | The end of the list item.           |
