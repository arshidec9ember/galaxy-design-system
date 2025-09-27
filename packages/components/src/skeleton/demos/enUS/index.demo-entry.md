# Skeleton

The skeleton component is a wrapper around `vue-content-loader` more examples can be found in the following [link](https://skeletonreact.com) with stylings based on theme, color props are set by gds.

```figma
https://www.figma.com/file/t4dWFndlBl46TnLIH2n1dJ/%F0%9F%94%AE-GDS-v2.11.0---Foundation-%2B-Components?type=design&node-id=16390-189&mode=design&t=52DNjHkppCdyHd4q-0
```

```overview-html
skeleton/demos/enUS/index.html
```

## Demos

```demo
basic.vue
table.vue
card.vue
dashboard.vue
fintech-home.vue
data-table.vue
wizard.vue
```

## Customization

```customization
animate.vue
speed.vue
```

## API

### Skeleton Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| width | `number \| string` |  | SVG width in pixels without unit |
| height | `number \| string` |  | SVG height in pixels without unit |
| viewBox | `string` | `'0 0 ${width ?? 400} ${height ?? 130}'` | See [SVG viewBox](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox) attribute |
| preserveAspectRatio | `string` | `'xMidYMid meet'` | See [SVG preserveAspectRatio](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/preserveAspectRatio) attribute |
| speed | `number` | `2` | Animation speed |
| uniqueKey | `string` | `randomId()` | Unique ID, you need to make it consistent for SSR |
| animate | `boolean` | `true` |  |
| baseUrl | `string` | empty string | Required if you're using `<base url="/" />` in your `<head />`. Defaults to an empty string. This prop is common used as: `<z-skeleton :base-url="$route.fullPath" />` which will fill the SVG attribute with the relative path. Related [#14](https://github.com/egoist/vue-content-loader/issues/14). |
