# Filter

Filters are a powerful tool for refining and customizing content. They enable users to manipulate a displayed dataset by selectively filtering the items based on predefined attributes. Filters can be implemented across a range of data display components, including tables, cards, and more.

```figma
https://www.figma.com/file/XAJidG2LfMDZzBKdfXpjdc/GDS---Filter?node-id=1%3A265&mode=dev
```

```overview-html
filter/demos/enUS/index.html
```

<!--single-column-->

## Demos

```demo

basic.vue
basic-with-data.vue
value-selector.vue
date-selector.vue
condition-selector.vue
```

## Customization

```customization

reactive.vue
custom-label.vue
custom-selector.vue

```

## API

### Filter Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| data | `Array<object>` | `[]` | data on which filtering has to happen. this is the same data which is taken as a prop in the `data-table`. |
| filters | `FilterItem[]` | `[]` | list of all filters and their corresponding data. |
| model-value | `FilterModel` | `{}` | selected filters. |
| on-update:data | `(data: Array<object>) => void` | `undefined` | On data filter change callback. |
| on-update:model-value | `(value: FilterModel) => void` | `undefined` | On model value change callback. |
| on-reset | `() => void` | `undefined` | On reset action callback. |

### FilterItem Properties

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| data-filtering | `boolean` | `true` | whether data filtering will be enabled or not. if not enabled, static filtering will be applied. |
| field | `string ` | `` | field on which filter needs to be applied on. **required!** |
| fixed | `boolean` | `false` | whether the non-closable filter will be shown by default or not. |
| label | `string \| () => VNodeChild` | `` | label to be shown of the filter item ( as prefix ). |
| selectors | `FilterValueSelector` | `` | selectors which will determine where the filter item will be of a value, conditional or date type. **required!** |
| triggerRenderType | `'tag' \| 'button'` | `tag` | trigger type of the filter. |
| type | `'text' \| 'number' \|'date'` | `text` | data-type of the values. **required!** |
| on-apply | `(value: FilterModel) => void` | `undefined` | On apply action callback. |
| on-reset | `() => void` | `undefined` | On reset action callback. |
| on-cancel | `() => void` | `undefined` | On cancel action callback. |

### FilterValueSelector Properties

| Name | Type | Description |
| --- | --- | --- |
| by-condition | `Object<ByCondition>` | config which renders condition list filters. |
| by-date | `Object<ByDate>` | config which renders date time picker as filters. |
| by-value | `Object<ByValue>` | config which renders single and multi-select list filters. |

### Value Selector Properties

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| actions | `array<'apply' \| 'cancel' \| 'clear' \| 'reset'>` | `['apply', 'cancel']` | To determine which actions will be displayed. |
| case-sensitive | `boolean` | `false` | Whether the search query is case sensitive |
| multiple | `boolean` | `true` | allows user to select one or more values. |
| options | `Option[]` | `` | list of values rendered as filter options. |
| searchable | `boolean` | `true` | enables the search and filters the values. |
| show-indicator | `boolean` | `false` | Whether to show indicator for single/multiselect. |
| value | `'string' \| 'string[]'` | `` | selected filter options having unique value of list options. |
| valueTransformer | `(value, field) => string \| boolean \| number` | `` | selected filter options having unique value of list options. |

### Condition Selector Properties

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| actions | `array<'apply' \| 'cancel' \| 'clear' \| 'reset'>` | `['apply', 'cancel']` | To determine which actions will be displayed. |
| condition | `string` | `` | unique value of the conditional list. |
| type | `'text' \| 'number'` | `text` | type of conditional filter. |
| value | `string' \| 'string[]' \| 'number' \| 'number[]'` | `` | selected value of the conditional filter. |

### Date Selector Properties

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| actions | `array<'apply' \| 'cancel' \| 'clear' \| 'reset'>` | `['apply', 'cancel']` | To determine which actions will be displayed. |
| type | `'date' \| 'datetime' \| 'daterange' \| 'datetimerange' \| 'month' \| 'monthrange' \| 'year' \| 'quarter'` | `datetime` | types of date picker variation supported. |
| value | `number \| [number, number] \| null` | `` | selected value of the date. |
| show-shortcuts | `Boolean` | `false` | Enable shortcut for the panel. |
| shortcuts | `Record<string, number \| (() => number)> \| Record<string, [number, number] \| (() => [number, number])>` | `undefined` | Shortcut button customizations. |

### FilterModel Properties

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| type | `'by-value' \| 'by-condition' \| 'by-date'` | `` | types of filter selector. |
| value | `string' \| 'string[]' \| 'number' \| 'number[]'` | `` | value of the filter selector. |
| selector | `string` | `` | value of the the filter item selector key |

### Option Properties

| Name  | Type                   | Description                       |
| ----- | ---------------------- | --------------------------------- |
| label | `string \| VNodeChild` | label of the list option.         |
| value | `string`               | unique value for the list option. |

### Number Condition Operator

```ts
const NUMBER_OPERATORS: FilterOperator = {
  LESS_THAN: {
    label: 'Less than',
    validator(value, data) {
      return isNumber(value) && isNumber(data) && data < value
    }
  },
  GREATER_THAN: {
    label: 'Greater than',
    validator(value, data) {
      return isNumber(value) && isNumber(data) && data > value
    }
  },
  LESS_THAN_EQUAL_TO: {
    label: 'Less than equal to',
    validator(value, data) {
      return isNumber(value) && isNumber(data) && data <= value
    }
  },
  GREATER_THAN_EQUAL_TO: {
    label: 'Greater than equal to',
    validator(value, data) {
      return isNumber(value) && isNumber(data) && data >= value
    }
  },
  EQUAL_TO: {
    label: 'Equal to',
    validator(value, data) {
      return isNumber(value) && isNumber(data) && data === value
    }
  },
  NOT_EQUAL_TO: {
    label: 'Not equal to',
    validator(value, data) {
      return isNumber(value) && isNumber(data) && data !== value
    }
  },
  RANGE: {
    label: 'Range',
    validator(value, data) {
      return (
        isArray(value) &&
        isNumber(value[0]) &&
        isNumber(value[1]) &&
        isNumber(data) &&
        data >= value[0] &&
        data <= value[1]
      )
    },
    fields: [
      {
        label: 'Start',
        field: 'start',
        required: true
      },
      {
        label: 'End',
        field: 'end',
        required: true
      }
    ]
  }
}
```

### Text Condition Operator

```ts
const TEXT_OPERATORS: FilterOperator = {
  TEXT_CONTAINS: {
    label: 'Text contains',
    validator(value, data) {
      return (
        !isNil(value) &&
        isString(value) &&
        isString(data) &&
        data.includes(value)
      )
    }
  },
  TEXT_DOES_NOT_CONTAIN: {
    label: 'Text does not contain',
    validator(value, data) {
      return (
        !isNil(value) &&
        isString(value) &&
        isString(data) &&
        !data.includes(value)
      )
    }
  },
  TEXT_STARTS_WITH: {
    label: 'Text starts with',
    validator(value, data) {
      return (
        !isNil(value) &&
        isString(value) &&
        isString(data) &&
        data.startsWith(value)
      )
    }
  },
  TEXT_ENDS_WITH: {
    label: 'Text ends with',
    validator(value, data) {
      return (
        !isNil(value) &&
        isString(value) &&
        isString(data) &&
        data.endsWith(value)
      )
    }
  },
  TEXT_IS_EXACTLY: {
    label: 'Text is exactly',
    validator(value, data) {
      return (
        !isNil(value) && isString(value) && isString(data) && data === value
      )
    }
  },
  TEXT_IS_NOT_EXACTLY: {
    label: 'Text is not exactly',
    validator(value, data) {
      return (
        !isNil(value) && isString(value) && isString(data) && data !== value
      )
    }
  }
}
```
