import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import type { Theme } from '../../_mixins'

export const self = (vars: ThemeCommonVars) => {
  const { textColor1, textColor5, fontWeight, fontSize } = vars
  return {
    fontSize,
    titleTextColor: textColor1,
    textColor: textColor5,
    titleFontWeight: fontWeight
  }
}

export type FacadeThemeVars = ReturnType<typeof self>

const facadeLight: Theme<'Facade', FacadeThemeVars> = {
  name: 'Facade',
  common: commonLight,
  self
}

export default facadeLight
export type FacadeTheme = typeof facadeLight
