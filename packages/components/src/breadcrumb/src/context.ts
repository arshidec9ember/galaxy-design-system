import { createInjectionKey } from '../../_utils'
import { type Ref } from 'vue'

export type BreadcrumbSize = 'small' | 'medium' | 'large'
export type BreadcrumbWeight = 'regular' | 'medium'

export interface BreadcrumbInjection {
  separatorRef: Ref<string>
  mergedClsPrefixRef: Ref<string>
  expandedRef: Ref<boolean>
  sizeRef: Ref<BreadcrumbSize>
  weightRef: Ref<BreadcrumbWeight>
}

export const breadcrumbInjectionKey =
  createInjectionKey<BreadcrumbInjection>('z-breadcrumb')
