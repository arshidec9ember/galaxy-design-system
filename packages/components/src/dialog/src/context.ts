import { createInjectionKey } from '../../_utils'
import type {
  DialogApiInjection,
  DialogProviderInjection,
  DialogReactiveListInjection
} from './DialogProvider'

export const dialogProviderInjectionKey =
  createInjectionKey<DialogProviderInjection>('z-dialog-provider')

export const dialogApiInjectionKey =
  createInjectionKey<DialogApiInjection>('z-dialog-api')

export const dialogReactiveListInjectionKey =
  createInjectionKey<DialogReactiveListInjection>('z-dialog-reactive-list')
