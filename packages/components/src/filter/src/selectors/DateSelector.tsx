import {
  format as formatDate,
  isAfter,
  isBefore,
  isDate,
  isEqual,
  parse
} from 'date-fns'
import { get, toString } from 'lodash-es'
import {
  defineComponent,
  inject,
  toRef,
  type PropType,
  h,
  watchEffect
} from 'vue'
import { ZDatePicker } from '../../../date-picker'
import type { DatePickerType } from '../../../date-picker/src/config'
import type {
  Value as DatePickerValue,
  Shortcuts
} from '../../../date-picker/src/interface'
import type { FilterModel } from '../interface'
import { filterItemInjectionKey } from '../keys'
import { useLocale } from '../../../_mixins'
import { DATE_TIME_PICKER_TYPES } from '../constants'
import { type FilterFunction } from '../createFilterInput'

export const dateBasedFilterFn: FilterFunction = (
  field,
  model,
  rowData,
  options
) => {
  const value = get(rowData, field)

  if (!value) {
    return false
  }

  if (Array.isArray(model.value) && model.value.length === 2) {
    const [start, end] = model.value

    const isInputAfterStartDate = isBefore(new Date(start), new Date(value))
    const isInputBeforeEndDate = isAfter(new Date(end), new Date(value))

    return isInputAfterStartDate && isInputBeforeEndDate
  }

  return (
    isDate(value) &&
    isDate(model.value) &&
    isEqual(new Date(value), new Date(model.value as number))
  )
}

const getFormat = (type: string): string => {
  const { localeRef } = useLocale('DatePicker')

  switch (type) {
    case DATE_TIME_PICKER_TYPES.DATE:
    case DATE_TIME_PICKER_TYPES.DATE_RANGE:
      return localeRef.value.dateFormat
    case DATE_TIME_PICKER_TYPES.DATE_TIME:
    case DATE_TIME_PICKER_TYPES.DATE_TIME_RANGE:
      return localeRef.value.dateTimeFormat
    case DATE_TIME_PICKER_TYPES.YEAR:
    case DATE_TIME_PICKER_TYPES.YEAR_RANGE:
      return localeRef.value.yearTypeFormat
    case DATE_TIME_PICKER_TYPES.MONTH:
    case DATE_TIME_PICKER_TYPES.MONTH_RANGE:
      return localeRef.value.monthTypeFormat
    case DATE_TIME_PICKER_TYPES.QUARTER:
    case DATE_TIME_PICKER_TYPES.QUARTER_RANGE:
      return localeRef.value.quarterFormat
    default:
      return localeRef.value.dateTimeFormat
  }
}

export const dateBasedRenderFilterValue = (
  field: string,
  model: FilterModel,
  config: { format?: string }
): string => {
  const format = config?.format ?? getFormat(model.type)
  if (Array.isArray(model.value) && model.value.length === 2) {
    const [start, end] = model.value

    return (
      formatDate(new Date(start), format) +
      ' - ' +
      formatDate(new Date(end), format)
    )
  }

  return formatDate(new Date(model.value as string), format)
}

export default defineComponent({
  name: 'DateSelector',
  props: {
    type: {
      type: String as PropType<DatePickerType>,
      default: 'datetime'
    },
    format: {
      type: String as PropType<string>,
      default: null
    },
    value: {
      type: [Number, Array] as PropType<DatePickerValue | null>,
      default: null
    },
    showShortcuts: {
      type: Boolean,
      default: false
    },
    shortcuts: {
      type: Object as PropType<Shortcuts>
    }
  },
  setup (props) {
    const parseDate = (dateEpoch: number): number => {
      const format = typeof dateEpoch === 'number' ? 'T' : props.format

      return parse(toString(dateEpoch), format, new Date()).getTime()
    }

    const parsedValue =
      props.format && props.value
        ? Array.isArray(props.value)
          ? props.value.length === 2
            ? (props.value.map((v) => parseDate(v)) as [number, number])
            : parseDate(props.value[0])
          : parseDate(props.value)
        : props.value

    const dateTimeValueRef = toRef(parsedValue)
    const FilterItem = inject(filterItemInjectionKey, null)
    const doUpdateValue = (val: DatePickerValue): void => {
      dateTimeValueRef.value = val
    }

    watchEffect(() => {
      FilterItem?.updateValue(dateTimeValueRef.value)
    })

    return {
      type: toRef(props.type),
      dateTimeValue: dateTimeValueRef,
      doUpdateValue
    }
  },
  render () {
    const { dateTimeValue } = this
    return (
      <ZDatePicker
        panel
        format={this.format}
        type={this.type}
        modelValue={dateTimeValue}
        onUpdateModelValue={this.doUpdateValue as any}
        actions={null}
        showShortcuts={this.showShortcuts}
        shortcuts={this.shortcuts}
      ></ZDatePicker>
    )
  }
})
