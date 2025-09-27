# Empty
Empty states are used when a list, table, chart or page itself has no items or data to show. This is an opportunity to provide explanation or guidance to help users progress. An empty state is a means to communicate with users. It should tell users what it's for, why they're seeing it and what they can do next

```figma
https://www.figma.com/file/t4dWFndlBl46TnLIH2n1dJ/%F0%9F%94%AE-GDS-v2.11.0---Foundation-%2B-Components?type=design&node-id=16503-868&mode=design&t=EmVtSGUUj2tExbEv-0
```

```overview-html
empty/demos/enUS/index.html
```

## Demos

```demo
basic.vue
icon.vue
size.vue
title.vue
```

## API

### Empty Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| title | `string` | `'No Content'` | Description of the empty. |
| description | `string` | `'The server has successfully processed the request and that there is no additional information to send back.'` | Description of the empty. |
| show-description | `boolean` | `true` | Whether to show description of empty. |
| show-title | `boolean` | `true` | Whether to show title of empty. |
| show-icon | `boolean` | `true` | Whether to show icon of empty. |
| size | `'small' \| 'medium' \| 'large' \| 'x-large'` | `'medium'` | Empty's size. |

### Empty Slots

| Name    | Parameters | Description                  |
| ------- | ---------- | ---------------------------- |
| default | `()`       | In place of description prop |
| actions | `()`       | actions content.             |
| icon    | `()`       | Custom icon.                 |
