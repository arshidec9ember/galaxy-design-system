import { type VNodeChild } from 'vue'
import { type FilterModel } from './interface'

export type RenderFilterValue = (
  field: string,
  model: FilterModel,
  config?: any
) => string | VNodeChild

export type FilterFunction<T = any> = (
  field: string,
  model: FilterModel<T>,
  rowData: any,
  selectorOptions: any
) => boolean
export interface FilterItemsMap<T = any> {
  key: string
  label: string
  component: any
  async?: boolean
  filterFn?: FilterFunction<T>
  renderFilterValue?: RenderFilterValue
}

const filterItemsMap = new Map<string, FilterItemsMap>()

export const createFilterItemSelector = (
  key: string,
  options: Omit<FilterItemsMap, 'key'>
): void => {
  if (filterItemsMap.has(key)) {
    throw new Error(`FilterItemSelector with key "${key}" already exists.`)
  }

  filterItemsMap.set(key, { key, ...options })
}

export const getFilterItemSelector = (key: string): FilterItemsMap | null => {
  return filterItemsMap.get(key) || null
}
