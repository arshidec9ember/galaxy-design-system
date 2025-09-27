# Accordion
An accordion is a user interface component used to toggle the visibility of content sections in an application. It is comprised of a list of clickable headers or titles that trigger the expansion or collapse of a corresponding content section. This control element enables users to selectively view and hide content within an interface, promoting a more organized and efficient user experience.

```figma
https://www.figma.com/file/t4dWFndlBl46TnLIH2n1dJ/%F0%9F%94%AE-GDS-v2.11.0---Foundation-%2B-Components?type=design&node-id=16388-38598&mode=design&t=52DNjHkppCdyHd4q-0
```

```overview-html
accordion/demos/enUS/index.html
```

<!--single-column-->

## Demos

```demo
basic.vue
single-collapse.vue
item-header-click.vue
inline.vue
disabled.vue
header-end.vue
```

## Customization

```customization
arrow-placement.vue
customize-icon.vue
display-directive.vue
default-expanded.vue
```

## API

### Accordion Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| multiple | `boolean` | `true` | Allow multiple accordion-item to be open at a time |
| bordered | `boolean` | `false` | Border around the accordion component |
| arrow-placement | `'start' \| 'end'` | `'start'` | Arrow placement side of text. |
| default-expanded-names | `string \| number \| Array<string \| number> \| null` | `null` | Pre-expanded panels that can still be collapsed. If `accordion` mode is set, it should be a non-array value. |
| display-directive | `'if' \| 'show'` | `'if'` | The display directive to use when `z-accordion-item` renders content. `'if'` corresponds to `v-if` and `'show'` corresponds to `v-show`. |
| expanded-names | `string \| number \| Array<string \| number> \| null` | `undefined` | Expanded panels that cannot be collapsed. If `accordion` mode is set, it should be a non-array value. |
| on-update:expanded-names | `(expandedNames: Array<string \| number> \| string \| number \| null) => void` | `undefined` | Callback function triggered when the expanded-names array is changed. |
| on-item-header-click | `(data: { name: string \| number, expanded: boolean, event: MouseEvent }) => void` | `undefined` | Callback function triggered when the title is clicked. |

### AccordionItem Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| disabled | `boolean` | `false` | Whether the item is disabled. |
| display-directive | `'if' \| 'show'` | `undefined` | The display directive to use when it is rendering its content. `'if'` corresponds to `v-if` and `'show'` corresponds to `v-show`. When it is set to `undefined` the value will follow its outer `z-accordion`. |
| name | `string \| number` | random string | Item identifier (should be unique). |
| title | `string` | `undefined` | Title. |

### Accordion Slots

| Name | Parameters | Description |
| --- | --- | --- |
| default | `()` | The contents of the collapsible panel. |
| arrow | `(props: { collapsed: boolean })` | Custom icons for folding panels. |

### AccordionItem Slots

| Name | Parameters | Description |
| --- | --- | --- |
| default | `()` | The contents of the collapsible panel node. |
| header | `(props: { collapsed: boolean })` | The content of the header of the collapsed panel node. |
| header-end | `(props: { collapsed: boolean })` | The extra content of the header of the collapsed panel node. |
| arrow | `(props: { collapsed: boolean })` | The custom icon of the node header of the collapsible panel. |
