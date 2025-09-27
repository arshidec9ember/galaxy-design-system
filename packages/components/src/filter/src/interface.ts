// import type { DatePickerType } from '../../date-picker/src/config'
import type { Shortcuts } from '../../date-picker/src/interface'
import type { VNodeChild } from 'vue'
// interface ConditionConfig {
//   options?: Option[]
//   value?: ConditionalValue
// }

type FilterItemValueTypes = 'text' | 'number' | 'date'

type ActionsType = 'apply' | 'cancel' | 'reset' | 'clear'

export type FilterValueSelector = Record<string, FilterItemUISelectorModel>

export type FilterItemUISelectorModel = Pick<FilterModel, 'type' | 'value'> & {
  condition?: string
  enable?: boolean
  hideFooter?: boolean
  multiple?: boolean
  searchable?: boolean
  actions?: ActionsType[]
  options?: Option[]
  valueTransformer?: (
    value: any,
    field: string,
    config: any
  ) => string | boolean | number
  renderIcon?: VNodeChild
  showShortcuts?: boolean
  shortCuts?: Shortcuts
}

export interface LabelValueMap {
  prefix: string | VNodeChild
  suffix?: string | VNodeChild
}

export interface DataFilterItemConfig {
  field: string
  outputFlatKeys?: boolean
  type?: FilterItemValueTypes
  label?: string | (() => VNodeChild)
  selectors: FilterValueSelector
  fixed?: boolean
  _state: 'init' | 'applied' | 'removed'
  _index?: number
  popoverActive?: boolean
  popoverStyle?: object
  dataFiltering?: boolean
  onReset?: () => void
  onApply?: (filterModel: FilterModel) => void
  onCancel?: () => void
}

// interface DataFilterItemConfigExtended extends DataFilterItemConfig {}

// interface DatePickerConfig {
//   type?: DatePickerType
//   value?: number | [number, number] | null
// }

// interface ValueConfig {
//   searchable?: boolean
//   multiple?: boolean
//   options?: Option[]
//   value?: string[] | string | null
// }

export interface Option {
  label: string
  value: string
}

// interface ConditionalValue {
//   type: string
//   condition?: string
//   value?: string | number
// }

export type FilterModel<T = any> = {
  type: 'text' | 'number' | 'date'
  value: FilterValue
  selector?: string
} & T

export type FilterState = Record<string, FilterModel>

export type FilterValue =
  | string[]
  | string
  | number
  | number[]
  | boolean
  | null
  | object
  | Record<string, any>

export type ConditionalInputValue = string | [string, string] | null | undefined

export type OnUpdateValue = (value: FilterState | null) => void

export type OnUpdateData = (data: []) => void

// type DynamicObject = Record<
//   string,
//   string | number | boolean | string[] | number[] | null
// >
// type onFilterDataUpdate = (
//   filterState: FilterState,
//   data: DynamicObject[]
// ) => DynamicObject[]

export interface FilterInjection {
  updateFilterState: (field: string, value: FilterModel | null) => void
  applyFilterValues: (field: string, selectedTab: string, value: any) => void
  removeAppliedFilter: (field: string) => void
  resetFilter: (field: string) => void
  // registerFilterFn: (
  //   field: string,
  //   filterFn: (item: unknown, data: unknown[]) => boolean
  // ) => void
}

export interface FilterItemInjection extends Partial<FilterInjection> {
  updateValue: (value?: FilterValue, attrs?: Record<string, any>) => void
  forceClosePopover: () => void
}

// interface ConditionalOption {
//   label: string
//   value: string
//   validator: (fieldValue: string | null, input?: string) => boolean
//   input?: [
//     {
//       label: string
//       field: string
//     }
//   ]
// }
