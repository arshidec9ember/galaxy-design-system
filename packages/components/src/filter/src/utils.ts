import { isArray, isNil, isNumber, isString } from 'lodash-es'
import type { FilterState } from './interface'

export function isObject (value: any): boolean {
  return (
    typeof value === 'object' &&
    !Array.isArray(value) &&
    !(value instanceof Date)
  )
}

interface FilterOperatorInputField {
  label: string
  field: string
  required?: boolean
}

export function getFilteredList (data: any[], filterState: FilterState): any[] {
  return data.filter((item: any) => {
    if (!item.backendFiltering) {
      return Object.keys(filterState).every((field) => {
        if (item[field] && filterState[field]) {
          const { type, value } = filterState[field]
          if (type === 'by-date' && value) {
            if (Array.isArray(value) && value.length === 2) {
              const [start, end] = value
              if (start && end) {
                const date = new Date(item[field])
                if (date >= new Date(start) && date <= new Date(end)) {
                  return true
                }
              }
            } else {
              if (
                typeof value !== 'boolean' &&
                new Date(item[field]).toLocaleDateString() ===
                  new Date(value as string).toLocaleDateString()
              ) {
                return true
              }
            }
          } else if (type === 'by-value' && value) {
            if (Array.isArray(value)) {
              return value.findIndex((val) => val === item[field]) !== -1
            } else {
              if (item[field] === value) {
                return true
              }
            }
          }
          //  else if (type === 'by-condition') {
          //   if (
          //     condition &&
          //     (value || (Array.isArray(value) && value.length > 0)) &&
          //     typeof value !== 'boolean' &&
          //     typeof value !== 'object'
          //   ) {
          //     return (Array.isArray(value) && typeof value[0] === 'number') ||
          //       typeof value === 'number'
          //       ? NUMBER_OPERATORS[condition].validator(value, item[field])
          //       : TEXT_OPERATORS[condition].validator(value, item[field])
          //   }
          // }
          return false
        }
        return true
      })
    }
    return true
  })
}

export interface FilterOperatorOptions {
  label: string
  validator: (
    value: string | string[] | number,
    data: any,
    options?: {
      fields?: Record<string, string>
    } & Record<string, string>
  ) => boolean
  fields?: FilterOperatorInputField[]
}

export type FilterOperator = Record<string, FilterOperatorOptions>

export const TEXT_OPERATORS: FilterOperator = {
  TEXT_CONTAINS: {
    label: 'Text contains',
    validator (value, data, options) {
      const caseSensitive = options?.caseSensitive ?? false
      return (
        !isNil(value) &&
        isString(value) &&
        isString(data) &&
        (caseSensitive
          ? data.includes(value)
          : data.toLowerCase().includes(value.toLowerCase()))
      )
    }
  },
  TEXT_DOES_NOT_CONTAIN: {
    label: 'Text does not contain',
    validator (value, data, options) {
      const caseSensitive = options?.caseSensitive ?? false

      return (
        !isNil(value) &&
        isString(value) &&
        isString(data) &&
        !(caseSensitive
          ? data.includes(value)
          : data.toLowerCase().includes(value.toLowerCase()))
      )
    }
  },
  TEXT_STARTS_WITH: {
    label: 'Text starts with',
    validator (value, data, options) {
      const caseSensitive = options?.caseSensitive ?? false

      return (
        !isNil(value) &&
        isString(value) &&
        isString(data) &&
        (caseSensitive
          ? data.startsWith(value)
          : data.toLowerCase().startsWith(value.toLowerCase()))
      )
    }
  },
  TEXT_ENDS_WITH: {
    label: 'Text ends with',
    validator (value, data, options) {
      const caseSensitive = options?.caseSensitive ?? false

      return (
        !isNil(value) &&
        isString(value) &&
        isString(data) &&
        (caseSensitive
          ? data.endsWith(value)
          : data.toLowerCase().endsWith(value.toLowerCase()))
      )
    }
  },
  TEXT_IS_EXACTLY: {
    label: 'Text is exactly',
    validator (value, data) {
      return (
        !isNil(value) && isString(value) && isString(data) && data === value
      )
    }
  },
  TEXT_IS_NOT_EXACTLY: {
    label: 'Text is not exactly',
    validator (value, data) {
      return (
        !isNil(value) && isString(value) && isString(data) && data !== value
      )
    }
  }
}

export const NUMBER_OPERATORS: FilterOperator = {
  LESS_THAN: {
    label: 'Less than',
    validator (value, data) {
      return isNumber(value) && isNumber(data) && data < value
    }
  },
  GREATER_THAN: {
    label: 'Greater than',
    validator (value, data) {
      return isNumber(value) && isNumber(data) && data > value
    }
  },
  LESS_THAN_EQUAL_TO: {
    label: 'Less than equal to',
    validator (value, data) {
      return isNumber(value) && isNumber(data) && data <= value
    }
  },
  GREATER_THAN_EQUAL_TO: {
    label: 'Greater than equal to',
    validator (value, data) {
      return isNumber(value) && isNumber(data) && data >= value
    }
  },
  EQUAL_TO: {
    label: 'Equal to',
    validator (value, data) {
      return isNumber(value) && isNumber(data) && data === value
    }
  },
  NOT_EQUAL_TO: {
    label: 'Not equal to',
    validator (value, data) {
      return isNumber(value) && isNumber(data) && data !== value
    }
  },
  RANGE: {
    label: 'Range',
    validator (value, data) {
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

export function findValueType (value: any, selectedTab?: string): string {
  if (typeof value === 'string') {
    return 'text'
  } else if (selectedTab === 'by-date') {
    return 'daterange'
  } else if (typeof value === 'number') {
    return 'number'
  } else if (typeof value === 'boolean') {
    return 'boolean'
  } else if (Array.isArray(value)) {
    if (value.length > 0) {
      const firstValueType = findValueType(value[0])
      const allSameType = value.every(
        (item) => findValueType(item) === firstValueType
      )
      if (allSameType) {
        return `${firstValueType}[]`
      } else {
        return 'mixed[]'
      }
    } else {
      return 'unknown[]'
    }
  } else if (value === null) {
    return 'null'
  } else if (typeof value === 'object') {
    // handle for {start: number, end: number}
    if (Object.values(value).every((val) => typeof val === 'number')) {
      return 'number'
    }
    return 'object'
  } else {
    return 'unknown'
  }
}
