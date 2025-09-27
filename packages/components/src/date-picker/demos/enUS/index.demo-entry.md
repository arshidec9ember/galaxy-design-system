# Date Picker

Date pickers allow users to select past, present, or future dates.

```figma
https://www.figma.com/file/Q8HKejlBjStQ4i9iEGbtIT/Vue-Migration-Items?type=design&node-id=0-1&mode=design&t=rHGjpXyemLF7W338-0
```

```overview-html
date-picker/demos/enUS/index.html
```

## Demos

```demo
date.vue
datetime.vue
daterange.vue
datetimerange.vue
size.vue
disabled.vue
disabled-time.vue
actions.vue
format.vue
panel.vue
```

## Customization

```customization
default-time.vue
datetimeformat.vue
month.vue
monthrange.vue
year.vue
yearrange.vue
quarter.vue
quarterrange.vue
shortcuts.vue
events.vue
footerslot.vue
update-on-close.vue
focus.vue
status.vue
icon.vue
```

## API

### General Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| clearable | `boolean` | `false` | Whether the date picker is clearable. |
| default-model-value | `number \| [number, number] \| null` | `undefined` | Date picker's default value. |
| default-formatted-value | `string \| [string, string] \| null` | `undefined` | Date picker's default formatted value. |
| disabled | `boolean` | `false` | Whether the date picker is disabled. |
| first-day-of-week | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6` | `undefined` | The first day of a week on calendar, 0 means Monday. |
| input-readonly | `boolean` | `false` | Set the `readonly` attribute of the input (avoids virtual keyboard on touch devices). |
| panel | `boolean` | `false` | Whether to use date-picker as panel. |
| placement | `'top-start' \| 'top' \| 'top-end' \| 'right-start' \| 'right' \| 'right-end' \| 'bottom-start' \| 'bottom' \| 'bottom-end' \| 'left-start' \| 'left' \| 'left-end'` | `'bottom-start'` | Panel's placement. |
| show-shortcuts | `Boolean` | `false` | Enable shortcut for the panel. |
| shortcuts | `Record<string, number \| (() => number)> \| Record<string, [number, number] \| (() => [number, number])>` | `undefined` | Shortcut button customizations. |
| show | `boolean` | `undefined` | Whether to show panel. |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Date picker size. |
| status | `'success' \| 'warning' \| 'error'` | `undefined` | Validation status. |
| to | `string \| HTMLElement \| false` | `body` | Container node of the panel. `false` will keep it not detached. |
| type | `'date' \| 'datetime' \| 'daterange' \| 'datetimerange' \| 'month' \| 'monthrange' \| 'year' \| 'quarter'` | `'date'` | Date picker type. |
| model-value | `number \| [number, number] \| null` | `undefined` | Value of the date picker when being manually set. |
| value-format | `string` | Follow `format` prop | Format of the binding value. see [format](https://date-fns.org/v2.23.0/docs/format). |
| min-year | `number` | `undefined` | Date picker's min year value. |
| max-year | `number` | `undefined` | Date picker's max year value. |
| on-clear | `() => void` | `undefined` | On clear callback. |
| on-confirm | `(value: number \| [number, number] \| null, formattedValue: string \| [string, string] \| null) => void` | `undefined` | On confirm callback. |
| on-blur | `() => void` | `undefined` | On blur callback. |
| on-focus | `() => void` | `undefined` | On focus callback. |
| on-update:show | `(show: boolean) => void` | `undefined` | Callback when panel shows & hides. |

### Date Type Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| actions | `Array<'clear'> \| null` | `['clear' ]` | Operations supported for the `date` type date picker. |
| format | `string` | `'yyyy-MM-dd'` | Format of the input. For detail please see [format](https://date-fns.org/v2.23.0/docs/format). |
| is-date-disabled | `(current: number) => boolean` | `() => false` | Validator of the date. |
| placeholder | `string` | `'Select Date'` | Placeholder. |
| on-update:formatted-value | `(value: string \| null, timestampValue: number \| null) => void` | `undefined` | Date selected callback. |
| on-update:model-value | `(value: number \| null, formattedValue: string \| null) => void` | `undefined` | Date selected callback. |

### DateTime Type Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| actions | `Array<'clear' \| 'confirm'> \| null` | `['clear', 'confirm']` | Operations supported for the `datetime` type date picker. |
| default-time | `string` | `undefined` | Default time of the selected date. It's format is `HH:mm:ss`. |
| format | `string` | `'yyyy-MM-dd HH:mm:ss'` | Format of the input. For detail please see [format](https://date-fns.org/v2.23.0/docs/format). |
| is-date-disabled | `(current: number) => boolean` | `() => false` | Validator of the date. |
| is-time-disabled | `(current: number) => { isHourDisabled?: () => boolean, isMinuteDisabled?: () => boolean, isSecondDisabled?: () => boolean }` | `undefined` | Validator of the time. |
| placeholder | `string` | `'Select Date and Time'` | Placeholder. |
| time-picker-props | `TimePickerProps` | `undefined` | Time picker props in the panel. |
| update-value-on-close | `boolean` | `false` | Whether to update value on close. |
| on-update:formatted-value | `(value: string \| null, timestampValue: number \| null) => void` | `undefined` | Date selected callback. |
| on-update:model-value | `(value: number \| null, formattedValue: string \| null) => void` | `undefined` | Date selected callback. |

### DateRange Type Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| actions | `Array<'clear' \| 'confirm'> \| null` | `['clear', 'confirm']` | Operations supported for the `daterange` type date picker. |
| bind-calendar-months | `boolean` | `false` | Whether months in panel calendar are consecutive. |
| default-calendar-start-time | `number` | `undefined` | Default panel calendar start month timestamp. |
| default-calendar-end-time | `number` | `undefined` | Default panel calendar end month timestamp. |
| end-placeholder | `string` | `'End Date'` | Placeholder at end part of the input. |
| format | `string` | `'yyyy-MM-dd'` | Format of the input. For detail please see [format](https://date-fns.org/v2.23.0/docs/format). |
| is-date-disabled | `(current: number, phase: 'start' \| 'end', value: [number, number] \| null) => boolean` | `undefined` | Validator of the date. |
| is-time-disabled | `(current: number, phase: 'start' \| 'end', value: [number, number]) => { isHourDisabled?: (hour: number) => boolean, isMinuteDisabled?: (minute: number, hour: number \| null) => boolean, isSecondDisabled?: (second: number, minute: number \| null, hour: number \| null) => boolean }` | `undefined` | Validator of the time. `null` in validators means value of picker is empty. |
| close-on-select | `boolean` | `false` | Whether to close the panel after the user has selected a time range. |
| separator | `string` | `'to'` | The separator between the start input and the end input. |
| start-placeholder | `string` | `'Start Date'` | The prompt information at the beginning of the input. |
| update-value-on-close | `boolean` | `false` | Whether to update the value on close. |
| on-update:formatted-value | `(value: [string, string] \| null, timestampValue: [number, number] \| null) => void` | `undefined` | Formatted range changed callback. |
| on-update:model-value | `(value: [number, number] \| null, formattedValue: [string, string] \| null) => void` | `undefined` | Range changed callback. |

### DateTimeRange Type Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| actions | `Array<'clear' \| 'confirm'> \| null` | `['clear', 'confirm']` | Operations supported for the `datetimerange` type. |
| bind-calendar-months | `boolean` | `false` | Whether months in panel calendar are consecutive. |
| default-calendar-start-time | `number` | `undefined` | Default panel calendar start month timestamp. |
| default-calendar-end-time | `number` | `undefined` | Default panel calendar end month timestamp. |
| default-time | `string \| Array<string \| undefined>` | `undefined` | Default time of the selected date. It's format is `HH:mm:ss`. |
| end-placeholder | `string` | `'End Date and Time'` | Placeholder at end part of the input. |
| format | `string` | `'yyyy-MM-dd HH:mm:ss'` | Format of the input. For detail please see [format](https://date-fns.org/v2.23.0/docs/format). |
| is-date-disabled | `(current: number, phase: 'start' \| 'end', value: [number, number] \| null) => boolean` | `undefined` | Validator of the date. |
| is-time-disabled | `(current: number, phase: 'start' \| 'end', value: [number, number]) => { isHourDisabled?: (hour: number) => boolean, isMinuteDisabled?: (minute: number, hour: number \| null) => boolean, isSecondDisabled?: (second: number, minute: number \| null, hour: number \| null) => boolean }` | `undefined` | Validator of the time. `null` in validators means value of picker is empty. |
| separator | `string` | `'to'` | The separator between the start input and the end input. |
| start-placeholder | `string` | `'Start Date and Time'` | The prompt information at the beginning of the input. |
| time-picker-props | `TimePickerProps \| [TimePickerProps, TimePickerProps]` | `undefined` | Time picker props in the panel. |
| update-value-on-close | `boolean` | `false` | Whether to update value on close. |
| on-update:formatted-value | `(value: [string, string] \| null, timestampValue: [number, number] \| null) => void` | `undefined` | Formatted value changed callback. |
| on-update:model-value | `(value: [number, number] \| null, formattedValue: [string, string] \| null) => void` | `undefined` | Value changed callback. |

### Month Type Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| actions | `Array<'clear' \| 'confirm'> \| null` | `['clear']` | Operations supported for the `month` type date picker. |
| format | `string` | `'yyyy-MM'` | Format of the input. For detail please see [format](https://date-fns.org/v2.23.0/docs/format). |
| is-date-disabled | `(current: number) => boolean` | `() => false` | Validator of the month. |
| placeholder | `string` | `'Select Month'` | Placeholder. |
| on-update:formatted-value | `(value: string \| null, timestampValue: number \| null) => void` | `undefined` | Formatted value changed callback. |
| on-update:model-value | `(value: number \| null, formattedValue: string \| null) => void` | `undefined` | Value changed callback. |

### MonthRange, QuarterRange, YearRange Type Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| actions | `Array<'clear' \| 'confirm'> \| null` | `['clear', 'confirm']` | Operations supported for the `monthrange` type date picker. |
| end-placeholder | `string` | `'End Month'` | Placeholder at end part of the input. |
| format | `string` | `'yyyy-MM-dd'` | Format of the input. For detail please see [format](https://date-fns.org/v2.23.0/docs/format). |
| close-on-select | `boolean` | `false` | Whether to close the panel after the user has selected a time range. |
| separator | `string` | `'to'` | The separator between the start input and the end input. |
| start-placeholder | `string` | `'Start Month'` | The prompt information at the beginning of the input. |
| update-value-on-close | `boolean` | `false` | Whether to update the value on close. |
| on-update:formatted-value | `(value: [string, string] \| null, timestampValue: [number, number] \| null) => void` | `undefined` | Formatted range changed callback. |
| on-update:model-value | `(value: [number, number] \| null, formattedValue: [string, string] \| null) => void` | `undefined` | Range changed callback. |

### Year Type Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| actions | `Array<'clear'> \| null` | `['clear']` | Operations supported for the `year` type date picker. |
| format | `string` | `'yyyy'` | Format of the input. For detail please see [format](https://date-fns.org/v2.23.0/docs/format). |
| is-date-disabled | `(current: number) => boolean` | `() => false` | Validator of the year. |
| placeholder | `string` | `'Select Year'` | Placeholder. |
| on-update:formatted-value | `(value: string \| null, timestampValue: number \| null) => void` | `undefined` | Formatted value changed callback. |
| on-update:model-value | `(value: number \| null, formattedValue: string \| null) => void` | `undefined` | Value changed callback. |

### DatePicker Slots

| Name       | Parameters | Description                       |
| ---------- | ---------- | --------------------------------- |
| date-icon  | `()`       | Date icon of the input box.       |
| footer     | `()`       | Extra Footer.                     |
| next-month | `()`       | Next icon of the date panel.      |
| next-year  | `()`       | Fast next icon of the date panel. |
| prev-month | `()`       | Prev icon of the date panel.      |
| prev-year  | `()`       | Fast prev icon of the date panel. |
| separator  | `()`       | Separator of range picker.        |

### DatePicker Methods

| Name  | Type         | Description |
| ----- | ------------ | ----------- |
| focus | `() => void` | Focus.      |
| blur  | `() => void` | Blur.       |
