import { computed, type ComputedRef } from 'vue'

export default function useCompitable<
  T extends object,
  U extends Array<keyof T>,
  V extends keyof T
> (reactive: T, keys: [...U, V]): ComputedRef<T[V]> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return computed(() => {
    for (const key of keys) {
      if (reactive[key] !== undefined) return reactive[key]
    }
    return reactive[keys[keys.length - 1]]
  })
}
