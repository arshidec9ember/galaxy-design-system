# Details View

View Content is a container based data display component used on pages to display a group of information. It holds key-value pairs in the detail view screen. The values are not just text, it can be badge, image, link etc. The container can also hold other components such as vertical tabs, Json viewer, Image preview, cards etc.

<!--single-column-->

```figma
https://www.figma.com/file/t4dWFndlBl46TnLIH2n1dJ/%F0%9F%94%AE-GDS-v2.11.0---Foundation-%2B-Components?type=design&node-id=59207-206773&mode=design&t=nvXb7tKY0lBXpViU-0
```

```overview-html
detail-view/demos/enUS/index.html
```

## Demos

```demo
basic.vue
row-col-span.vue
tooltip.vue
render-label.vue
render-value.vue
accordion.vue
override.vue
sections.vue
customization.vue
right-aligned.vue
```

## API

### DetailsView Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| data | `DetailsViewRoot` |  | Whether to show shadow when hovering on the DetailsView. |
| render-label | () => VNode | `undefined` | render label for all the level. if this will be applied `overrides` will not work |
| render-prefix-label | () => VNode | `undefined` | render prefix of the label. |
| render-suffix-label | () => VNode | `undefined` | render suffix of the label. |
| render-value | () => VNode | `undefined` | render value for all the level. if this will be applied `overrides` will not work |
| render-prefix-value | () => VNode | `undefined` | render prefix of the value. |
| render-suffix-value | () => VNode | `undefined` | render suffix of the value. |
| render-node | () => VNode | `undefined` | render value for all the level. if this will be applied `overrides` will not work |
| render-prefix-node | () => VNode | `undefined` | render prefix of the node. |
| render-suffix-node | () => VNode | `undefined` | render suffix of the node. |
| label-class | string | `undefined` | list of classes for label |
| label-styles | Record<string, string> | `undefined` | list of styles for label |
| value-class | string | list of classes for value |
| value-styles | Record<string, string> | `undefined` | list of styles for value |
| node-class | string | list of classes for node |
| node-styles | Record<string, string> | `undefined` | list of styles for node |
| divider | boolean | `false` | whether to show divider between items |
| overrides | `Record<string, ViewRendererOptions>` | `undefined` | `key` is either path or pattern were we need to overrides |
| options | `DetailsViewOptions` | `{}` | configuration for changing details view |

### DetailsView Slots

| Name   | Parameters | Description                                      |
| ------ | ---------- | ------------------------------------------------ |
| header | `()`       | Represents header information, containing title. |

### Interfaces

```ts
interface ViewRendererOptions {
  formatLabel?: (label: string | number) => string
  formatValue?: <T>(value: T) => T
  prefixValue?: string | RenderValue
  prefixLabel?: string | RenderLabel
  suffixValue?: string | RenderValue
  suffixLabel?: string | RenderLabel
  prefixNode?: string | RenderNode
  suffixNode?: string | RenderNode
  nodeStyles?: Record<string, string>
  labelStyles?: Record<string, string>
  valueStyles?: Record<string, string>
  nodeClass?: string
  labelClass?: string
  valueClass?: string
  divider?: boolean
  keyOrder?: string[] | FunctionType<string[]>
  hideNilValues?: boolean | FunctionType<boolean>
  defaultValue?: boolean | FunctionType<boolean>
  options?: Partial<{
    tooltip?: string | (label: string) => string
    gridSize: number
    labelSpan: number
    valueSpan: number
    arrayDirection: 'vertical' | 'horizontal'
    accordionProps: AccordionProps
    renderType: 'accordion' | undefined
    levelToShowAccordion: number
  }>
}

export interface DetailsViewOptions {
  gridSize: number
  labelSpan: number
  valueSpan: number
  arrayDirection: 'vertical' | 'horizontal'
  accordionProps: AccordionProps
  renderType: 'accordion' | undefined
  levelToShowAccordion: number
}
```
