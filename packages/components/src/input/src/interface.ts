import type { Ref, UnwrapRef } from 'vue'
import { createInjectionKey } from '../../_utils'

export type Size = 'x-small' | 'small' | 'medium' | 'large'

export type OnUpdateModelValue = (
  value: string & [string, string] & number
) => void
export type OnUpdateModelValueImpl = (
  value: string | [string, string] | number
) => void

export interface InputWrappedRef {
  wrapperElRef: Ref<HTMLElement | null>
  textareaElRef: Ref<HTMLTextAreaElement | null>
  inputElRef: Ref<HTMLInputElement | null>
  isCompositing: Ref<boolean>
  blur: () => void
  focus: () => void
  select: () => void
  activate: () => void
  deactivate: () => void
  scrollTo: (options: ScrollToOptions) => void
}

export type InputInst = UnwrapRef<InputWrappedRef>

export const inputInjectionKey = createInjectionKey<{
  countGraphemesRef: Ref<((input: string) => number) | undefined>
  mergedValueRef: Ref<string | [string, string] | number | null>
  maxlengthRef: Ref<number | undefined>
  mergedClsPrefixRef: Ref<string>
}>('z-input')
