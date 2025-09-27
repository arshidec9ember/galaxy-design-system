import { createInjectionKey } from '../../_utils'
import { type DetailsViewInjection } from './interface'

export const detailsViewInjectionKey =
  createInjectionKey<DetailsViewInjection>('z-details-view')
