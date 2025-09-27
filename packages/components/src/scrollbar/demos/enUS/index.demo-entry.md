# Scrollbar

It looks better but I'm sure it's not as reliable as native scrollbar.

```figma
https://www.figma.com/file/t4dWFndlBl46TnLIH2n1dJ/%F0%9F%94%AE-GDS-v2.11.0---Foundation-%2B-Components?type=design&node-id=16388-40594&mode=design&t=KDrhhL3KhKOZObYV-0
```

## Demos

```demo
basic.vue
x.vue
trigger.vue
```

## API

### Scrollbar Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| trigger | `'hover' \| 'none'` | `'hover'` | Trigger of show scrollbar. `'none'` means always show it. |
| x-scrollable | `boolean` | `false` | Whether it can scroll horizontally. |
| on-scroll | `(e: Event) => void` | `undefined` | Callback on scroll |
| size | `number` | `undefined` | Size of scrollbar. |

### Scrollbar Slots

| Name    | Parameters | Description     |
| ------- | ---------- | --------------- |
| default | `()`       | Scroll content. |

### Scrollbar Methods

| Name | Type | Description |
| --- | --- | --- |
| scrollBy | `(options: { left?: number, top?: number, behavior?: ScrollBehavior }): void & (x: number, y: number) => void` | Scroll content by specific distance. |
| scrollTo | `(options: { left?: number, top?: number, behavior?: ScrollBehavior }): void & (x: number, y: number) => void` | Scroll content. |
