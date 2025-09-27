import { commonLight } from '../../../_styles/common'
import type { ThemeCommonVars } from '../../../_styles/common'
import type { Theme } from '../../../_mixins'

export const self = (vars: ThemeCommonVars) => {
  const { scrollbarColor, scrollbarColorHover } = vars
  return {
    color: scrollbarColor,
    colorHover: scrollbarColorHover,
    scrollBoxShadowColor: 'rgba(2, 13, 75, 0.1)'
  }
}

export type ScrollbarThemeVars = ReturnType<typeof self>

const scrollbarLight: Theme<'Scrollbar', ScrollbarThemeVars> = {
  name: 'Scrollbar',
  common: commonLight,
  self
}

export default scrollbarLight
export type ScrollbarTheme = typeof scrollbarLight
