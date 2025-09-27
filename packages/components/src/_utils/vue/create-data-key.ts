export function createDataKey (key: string | number): string {
  return typeof key === 'string' ? `str-${key}` : `num-${key}`
}
