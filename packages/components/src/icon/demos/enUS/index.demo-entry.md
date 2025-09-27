# Icon

It is recommend to use [zeta-icons](https://zeta-icons-docs0zetaapps.mum1-pp.zetaapps.in/#/) as your icon library and [icones](https://icones.js.org/collection/mdi) for 3rd party icons.

## Demos

```demo
basic.vue
custom-icon.vue
opacity.vue
icon-wrapper.vue
```

## API

### Icon Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| color | `string` | `undefined` | Icon color. |
| opacity | `subtle \| mild \| moderate \| strong \| intense \| 0 to 1` | `undefined` | Icon opacity. |
| size | `number \| string` | `undefined` | Icon size (when the unit is not specified the default unit is `px`). |
| component | `Component` | `undefined` | Icon component to display. |

### IconWrapper Props

| Name          | Type     | Default     | Description    |
| ------------- | -------- | ----------- | -------------- |
| border-radius | `number` | `6`         | Border radius. |
| color         | `string` | `undefined` | Color.         |
| icon-color    | `string` | `undefined` | Icon color.    |
| size          | `number` | `24`        | Size.          |

### Icon Slots

| Name    | Parameters | Description              |
| ------- | ---------- | ------------------------ |
| default | `()`       | The content of the icon. |
