# Image

The image component is used to support image uploads for users on different aspect ratios.

```figma
https://www.figma.com/file/t4dWFndlBl46TnLIH2n1dJ/%F0%9F%94%AE-GDS-v2.11.0---Foundation-%2B-Components?node-id=16388%3A37333&mode=dev
```

```overview-html
image/demos/enUS/index.html
```

## Demos

```demo
basic.vue
error.vue
```

## Customization

```customization
preview-disabled.vue
toolbar-disabled.vue
group.vue
custom.vue
tooltip.vue
lazy.vue
previewed-img-props.vue
```

## API

### Image Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| alt | `string` | `undefined` | Image alt information. |
| fallback-src | `string` | `undefined` | URL to show when the image fails to load. |
| height | `string \| number` | `undefined` | Image height. |
| img-props | `object` | `undefined` | The props of the img element inside the component. |
| lazy | `boolean` | `false` | Load image after it enters viewport. When used alone, it will be assigned the property value of [HTMLImageElement.loading](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/loading). Alternatively, it can be used in conjunction with the `intersection-observer-options` configuration to achieve lazy loading. |
| intersection-observer-options | `{ root?: Element \| Document \| string \| null, rootMargin?: string, threshold?: number \| number[]; }` | `undefined` | Intersection observer's config to be applied when `lazy=true`. |
| object-fit | `'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'` | `fill` | Object-fit type of the image in the container. |
| preview-src | `string` | `undefined` | Source of preview image. |
| preview-disabled | `boolean` | `false` | Whether clicking image preview is disabled. |
| previewed-img-props | `object` | `undefined` | DOM attributes of img element in preview mode. |
| show-toolbar | `boolean` | `true` | Whether to show the bottom toolbar when the image enlarge. |
| show-toolbar-tooltip | `boolean` | `false` | Whether to show toolbar buttons' tooltip. |
| src | `string` | `undefined` | Image source. |
| width | `string \| number` | `undefined` | Image width. |
| on-error | `(e: Event) => void` | `undefined` | Callback executed when the image fails to load. |
| on-load | `(e: Event) => void` | `undefined` | Callback executed after the image is loaded. |

### ImageGroup Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| on-preview-prev | `() => void` | `undefined` | Click the callback from the previous slide |
| on-preview-next | `() => void` | `undefined` | Click the callback on the next slide |
| show-toolbar | `boolean` | `true` | Whether to show the bottom toolbar when the image enlarge. |
| show-toolbar-tooltip | `boolean` | `false` | Whether to show toolbar buttons' tooltip. |

### Image Slots

| Name        | Parameters | Description                                 |
| ----------- | ---------- | ------------------------------------------- |
| placeholder | `()`       | Placeholder shown when image is not loaded. |

### ImageGroup Slots

| Name    | Parameters | Description                             |
| ------- | ---------- | --------------------------------------- |
| default | `()`       | The default content of the image group. |
