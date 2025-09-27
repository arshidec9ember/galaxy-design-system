# Spinner
Progress bars and loaders are used to represent system feedback for various activities. They inform the users that the system is not ideal and an activity such as downloading, processing and uploading of data and files is being performed. They also help in reducing the perception of time by engaging the users with the animated movements.

It can be used to show the loading state.

```figma
https://www.figma.com/file/t4dWFndlBl46TnLIH2n1dJ/%F0%9F%94%AE-GDS-v2.11.0---Foundation-%2B-Components?type=design&node-id=16390-189&mode=design&t=NLSPT9qEcGu5JPcP-0
```

```overview-html
spinner/demos/enUS/index.html
```

## Demos

```demo
basic.vue
wrap.vue
description.vue
```

## Customization

```customization
customize-icon.vue
delay.vue
```

## API

### Spinner Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| description | `string` | `undefined` | Description of the spinner. |
| rotate | `boolean` | `true` | Specify whether icon rotates, only working for custom icon. |
| inverted | `boolean` | `true` | Specify whether spinner color will be of inverted color or not |
| size | `'small' \| 'medium' \| 'large' \| number` | `'medium'` | Size of the spinner. |
| show | `boolean` | `true` | Specify whether spinner is active when spinner has content inside. It won't work if you just use spinner itself. |
| stroke-width | `number` | `undefined` | Relative width of spinner's stroke, assuming the outer radius of spinner is 100. |
| color | `string` | `undefined` | Color of the spinner. |
| delay | `number` | `undefined` | Specifies a delay in milliseconds for loading state (prevent flush). |

### Spinner Slots

| Name        | Parameters | Description                            |
| ----------- | ---------- | -------------------------------------- |
| default     | `()`       | If set, spinner will wrap the content. |
| description | `()`       | Description of the spinner.            |
| icon        | `()`       | Customize the spinner icon.            |
