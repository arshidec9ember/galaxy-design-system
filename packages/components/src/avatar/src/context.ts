import { createInjectionKey } from '../../_utils'
import type { AvatarGroupInjection } from '../../avatar-group/src/AvatarGroup'

export const avatarGroupInjectionKey =
  createInjectionKey<AvatarGroupInjection>('z-avatar-group')
