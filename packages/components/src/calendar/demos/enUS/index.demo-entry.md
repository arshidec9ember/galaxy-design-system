<!--single-column-->

### CautionAlert

# Calendar

The Calendar Component is used as a visual representation of a date providing the necessary mechanisms to navigate day, month and year part of it.

## Demos

```demo
basic.vue
```

## API

### Calendar Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| default-model-value | `number` | `null` | Default selected date's timestamp. |
| is-date-disabled | `(timestamp: number) => boolean` | `undefined` | Validator of the date. |
| model-value | `number \| null` | `undefined` | Selected date's timestamp. |
| on-panel-change | `(info: { year: number, month: number })` | `undefined` | Callback on panel content is changed. |
| on-update:model-value | `(timestamp: number, info: { year: number, month: number, date: number }) => void` | `undefined` | Callback on date is selected. `month` starts from 1. |

## Calendar Slots

| Name | Parameters | Description |
| --- | --- | --- |
| default | `({ year: number, month: number, date: number })` | Content to be rendered in each date. |
| header | `(props: { year: number, month: number })` | Header of the calendar. `month` starts from 1. |
