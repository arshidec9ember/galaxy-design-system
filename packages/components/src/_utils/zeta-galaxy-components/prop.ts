export function largerSize (
  size: 'x-small' | 'small' | 'medium' | 'large'
): 'small' | 'medium' | 'large' | 'x-large' {
  switch (size) {
    case 'x-small':
      return 'small'
    case 'small':
      return 'medium'
    case 'medium':
      return 'large'
    case 'large':
      return 'x-large'
  }
}

interface SmallerSizeMap {
  ['x-small']: 'x-x-small'
  small: 'x-small'
  medium: 'small'
  large: 'medium'
  ['x-large']: 'large'
}

type SmallerSize<T extends keyof SmallerSizeMap> = SmallerSizeMap[T]

export function smallerSize<T extends keyof SmallerSizeMap> (
  size: T
): SmallerSize<T> {
  switch (size) {
    case 'x-small':
      return 'x-x-small' as any
    case 'small':
      return 'x-small' as any
    case 'medium':
      return 'small' as any
    case 'large':
      return 'medium' as any
    case 'x-large':
      return 'large' as any
  }
  throw Error(`${size} has no smaller size.`)
}
