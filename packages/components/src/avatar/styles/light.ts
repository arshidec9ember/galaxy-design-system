import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import type { Theme } from '../../_mixins'
import { composite } from 'seemly'

export const self = (vars: ThemeCommonVars) => {
  const { borderRadius, avatarColor, cardColor, fontSize } = vars
  return {
    borderRadius,
    fontSize,
    border: `2px solid ${cardColor}`,
    heightXSmall: '1rem', // 16px
    heightSmall: '1.5rem', // 24px
    heightMedium: '2rem', // 32px
    heightLarge: '2.5rem', // 40px
    heightXLarge: '3.5rem', // 56px
    iconColor: '#fff',
    textColor: '#fff',
    color: composite(cardColor, avatarColor)
  }
}

export type AvatarThemeVars = ReturnType<typeof self>

const avatarLight: Theme<'Avatar', AvatarThemeVars> = {
  name: 'Avatar',
  common: commonLight,
  self
}

export default avatarLight
export type AvatarTheme = typeof avatarLight
export type AvatarGroupTheme = typeof avatarLight
