import { computed, unref } from 'vue'
import type { Ref, UnwrapRef, WritableComputedRef } from 'vue'
import { call as callBack } from '../_utils'
import { upperFirst, clone } from 'lodash-es'

export type Fn<T> = (...args: T[]) => T

export interface UseVModelOptions<T> {
  /**
   * Defining default value for return ref when no value is passed.
   *
   * @default undefined
   */
  defaultModelValue?: T
}

/**
 * Shorthand for v-model binding, props + call -> ref
 *
 * @param props
 * @param key (default 'modelValue' in Vue 3)
 * @param call
 */
export function useProxyModel<P extends object, K extends keyof P, Fn> (
  props: P,
  key: K = 'modelValue' as K,
  call?: (fn: Fn, ...args: any[]) => void,
  options: UseVModelOptions<P[K]> = {}
): WritableComputedRef<P[K]> | Ref<UnwrapRef<P[K]>> {
  const { defaultModelValue } = options

  const _call = call || callBack

  if (typeof key === 'string' && key.includes(' ')) {
    throw new Error(`useProxyModel: key cannot have spaces in it, got '${key}'`)
  }

  const cb = `onUpdate:${key.toString()}` as keyof P
  const cbJSX = `onUpdate${upperFirst(key as string).toString()}` as keyof P

  const onUpdate = props[cb]
  const _onUpdate = props[cbJSX]

  const getValue = (): P[K] | undefined => {
    const propValue = props[key]
    if (unref(propValue) !== null) {
      return clone(propValue)
    } else {
      return defaultModelValue
    }
  }

  const triggerCall = (value: P[K]): void => {
    if (onUpdate) {
      _call(onUpdate as Fn & (() => void), value)
    }
    if (_onUpdate) {
      _call(_onUpdate as Fn & (() => void), value)
    }
  }

  return computed<P[K]>({
    get () {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return getValue()!
    },
    set (value) {
      triggerCall(value)
    }
  })
}
