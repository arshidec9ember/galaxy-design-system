import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import { type Theme } from '../../_mixins'

const self = (vars: ThemeCommonVars) => {
  const { heightSmall, heightMedium, heightLarge, borderRadius } = vars
  return {
    color: '#eee',
    colorEnd: '#ddd',
    colorOpacity: 1,
    colorEndOpacity: 1,
    borderRadius,
    heightSmall,
    heightMedium,
    heightLarge
  }
}

export type SkeletonThemeVars = ReturnType<typeof self>

export const skeletonLight: Theme<'Skeleton', SkeletonThemeVars> = {
  name: 'Skeleton',
  common: commonLight,
  self
}

export type SkeletonTheme = typeof skeletonLight
