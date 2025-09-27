import type { Ref } from 'vue'

export type OnUpdateModelValue = (value: string | string[]) => void

export interface ListInjection {
  showDividerRef: Ref<boolean>
  mergedClsPrefixRef: Ref<string>
  modelValue: Ref<string | number | Array<string | number> | null | undefined>
  doUpdateValue: (val: string) => void
  selectableRef: Ref<boolean>
  multipleRef: Ref<boolean>
  showIndicatorRef: Ref<boolean>
}
