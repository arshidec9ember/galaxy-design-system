export enum FILTER_ITEM_ACTIONS {
  APPLY = 'Apply',
  CANCEL = 'Cancel',
  RESET = 'Reset',
  CLEAR = 'Clear'
}

export enum DATE_TIME_PICKER_TYPES {
  DATE = 'date',
  DATE_RANGE = 'daterange',
  DATE_TIME = 'datetime',
  DATE_TIME_RANGE = 'datetimerange',
  YEAR = 'year',
  YEAR_RANGE = 'yearrange',
  MONTH = 'month',
  MONTH_RANGE = 'monthrange',
  QUARTER = 'quarter',
  QUARTER_RANGE = 'quarterrange'
}

export const FILTER_TEXT = 'Filter'
export const RESET_TEXT = 'Reset'

export const DEFAULT_TEXT_CONDITIONAL_VALUE = 'TEXT_CONTAINS'

export const DEFAULT_NUMBER_CONDITIONAL_VALUE = 'LESS_THAN'

export enum CONDITIONAL_SELECTOR_CONSTANTS {
  RANGE = 'RANGE',
  START = 'Start',
  END = 'End',
  VALUE = 'Value',
  CONDITION = 'Condition'
}

export enum SELECTOR_TYPES {
  DATE = 'by-date',
  LIST = 'by-value',
  CONDITION = 'by-condition'
}
