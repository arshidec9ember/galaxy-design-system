# Typography

Galaxy Design Components provides some HTML text styling.

```figma
https://www.figma.com/file/t4dWFndlBl46TnLIH2n1dJ/branch/nOSTGriAxME9lsK9GywgLV/%F0%9F%94%AE-GDS-v2.11.0---Foundation-%2B-Components?type=design&node-id=27020-98562&mode=design&t=HdNWaJcJdVuJZmPa-0
```

<z-alert color="warning" title="Note" :bordered="false">
Header, Blockquote, List, HR are deprecated. 
Use Title for showing header.
Use List component for showing ordered and unoredrerd lists.
Use Divider component for showing horizontal rule.
</z-alert>

## Demos

```demo
title.vue
body.vue
p.vue
a.vue
label.vue
code.vue
header.vue
list.vue
blockquote.vue
hr.vue
```

<br/>
<z-alert color="warning" title="Note" :bordered="false">
Text Types and Text opacity are deprecated under Customization. Use Tags instead.
</z-alert>

## Customization

```customization
title-custom.vue
text-varient.vue
text-transform.vue
router-link.vue
text.vue
text-opacity.vue
```

## API

### Text Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| color | `'neutral' \| 'success' \| 'info' \| 'warning' \| 'error'` | `'neutral'` | Semantic types. |
| variant | `'1-r' \| '1-m' \| '2-r' \| '2-m' \| '3-r' \| '3-m'\| '4-r' \| '4-m' \| '5-m' \| '5-r'` | `'3-r'` | Varinat of font css to show. |
| strong | `boolean` | `false` | Strong. |
| italic | `boolean` | `false` | Italic. |
| underline | `boolean` | `false` | Underline. |
| delete | `boolean` | `false` | Use the `del` tag and strike-through style. |
| code | `boolean` | `false` | Use the `code` tag and style. |
| opacity | `subtle \| mild \| moderate \| strong \| intense \| 0 to 1` | `undefined` | Icon opacity. |
| tag | `string` | `undefined` | Tag to use. `code` or `delete` properties will override this. |
| transform | `'uppercase' \| 'lowercase' \| 'capitalize' \| 'none'` | `'none'` | Text Transform. |

### Title Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| variant | `'1-sb' \| '2-sb' \| '3-m' \| '4-r' \| '4-m' \| '5-m'\| '6-r' \| '6-m'` | `'1-sb'` | Varinat of font css to show. |
| strong | `boolean` | `false` | Strong. |
| italic | `boolean` | `false` | Italic. |
| underline | `boolean` | `false` | Underline. |
| delete | `boolean` | `false` | For strike-through style. |

### Paragraph Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| variant | `'1-r' \| '1-m' \| '2-r' \| '2-m' \| '3-r' \| '3-m'` | `'2-r'` | Varinat of font css to show. |

### Link Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| variant | `'1-r' \| '1-m' \| '2-r' \| '2-m' \| '3-m' \| '3-r'` | `2-r'` | Varinat of font css to show. |

### Label Props

| Name    | Type             | Default | Description                  |
| ------- | ---------------- | ------- | ---------------------------- |
| variant | `'1-r' \| '2-r'` | `'1-r'` | Varinat of font css to show. |

### Ul, Ol Props

| Name   | Type      | Default | Description     |
| ------ | --------- | ------- | --------------- |
| indent | `boolean` | `false` | Text alignment. |

### Blockquote Props

| Name   | Type      | Default | Description     |
| ------ | --------- | ------- | --------------- |
| indent | `boolean` | `false` | Text alignment. |

### All Typography Components Slots

| Name    | Parameters | Description                |
| ------- | ---------- | -------------------------- |
| default | `()`       | The content of typography. |
