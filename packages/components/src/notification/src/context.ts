import { createInjectionKey } from '../../_utils'
import type { NotificationProviderInjection } from './NotificationProvider'

export const notificationProviderInjectionKey =
  createInjectionKey<NotificationProviderInjection>('z-notification-provider')
