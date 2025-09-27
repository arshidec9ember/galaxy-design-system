import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import type { Theme } from '../../_mixins'

const self = (vars: ThemeCommonVars) => {
  const {
    primaryColor,
    primaryColorHover,
    primaryColorPressed,
    primaryColorSuppl,
    primaryColorFocus,
    fontFamily,
    opacityDisabled,
    lineHeight,
    fontWeight
  } = vars

  return {
    color: primaryColor,
    colorActive: primaryColorPressed,
    colorVisited: primaryColorSuppl,
    colorHover: primaryColorHover,
    colorFocus: primaryColorFocus,
    fontSize: '14px',
    fontFamily,
    opacityDisabled,
    lineHeight,
    fontWeight
  }
}

export type LinkThemeVars = ReturnType<typeof self>

const linkLight: Theme<'Link', LinkThemeVars> = {
  name: 'Link',
  common: commonLight,
  self
}

export default linkLight
export type LinkTheme = typeof linkLight
