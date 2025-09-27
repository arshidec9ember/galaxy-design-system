# Facade

A frequently used micro layout inside a component. Very commonly used in article, banners, feeds and many more.

### CautionAlert

## Demos

```demo
basic.vue
```

## API

### Facade Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| content-indented | `boolean` | `false` | Whether to enable content indentation. |
| content | `string` | `undefined` | Content area. |
| content-style | `string \| Object` | `undefined` | Content area style. |
| description | `string` | `undefined` | Description information. |
| description-style | `string \| Object` | `undefined` | Description area style. |
| title | `string` | `undefined` | Title information. |

### Facade Slots

| Name        | Parameters | Description         |
| ----------- | ---------- | ------------------- |
| action      | `()`       | Action's slot.      |
| avatar      | `()`       | Avatar's slot.      |
| default     | `()`       | Content's slot.     |
| description | `()`       | Description's slot. |
| footer      | `()`       | Footer's slot.      |
| header-end  | `()`       | Header end's slot.  |
| header      | `()`       | Header's slot.      |
