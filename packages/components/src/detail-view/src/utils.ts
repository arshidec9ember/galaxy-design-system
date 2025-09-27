import { lowerCase, startCase } from 'lodash-es'
import { type DetailsViewData } from './interface'

export const toTitleCase = (text: string): string => {
  return startCase(lowerCase(text))
}

export const resolvePath = (
  parent: string | number,
  current: string | number
): string => {
  return `${parent}.${current}`
}

export function isHeterogeneousArray (array: DetailsViewData[]): boolean {
  if (array.length <= 1) {
    return false
  }

  const firstRow = array[0]

  const firstObjectType = typeof firstRow === 'object' ? Object : null
  if (!firstObjectType) return false

  const firstRowKeys = Object.keys(firstRow)

  for (const currentObject of array) {
    if (typeof currentObject !== 'object') return false

    const currentKeys = Object.keys(currentObject)
    if (
      currentKeys.length !== firstRowKeys.length ||
      !currentKeys.every((key) => firstRowKeys.includes(key))
    ) {
      return true
    }
  }

  return false
}

export function isPrimitiveValue (element: DetailsViewData): boolean {
  return (
    typeof element === 'number' ||
    typeof element === 'string' ||
    typeof element === 'boolean' ||
    element instanceof Date ||
    element === null ||
    element === undefined
  )
}

export function isPrimitiveArray (array: DetailsViewData[]): boolean {
  return array.every(isPrimitiveValue)
}
