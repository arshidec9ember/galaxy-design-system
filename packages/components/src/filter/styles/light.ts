import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import { type Theme } from '../../_mixins'
import commonVariables from './_common'

export const self = (vars: ThemeCommonVars) => {
  const { primaryColor, baseColor, textColor3, textColor4, textColor2 } = vars
  return {
    ...commonVariables,
    textColor: textColor2,
    valueTextColor: primaryColor,
    tagBackgroundColor: baseColor,
    labelTextColor: textColor3,
    actionTextColor: textColor3,
    actionBorderColor: textColor4,
    resetTextColor: textColor4,
    tagHoverColor: '#F1F2F8',
    tagActiveColor: '#E6E7F2',
    resetColor: '#7D83A6',
    resetColorHover: textColor4,
    resetColorActive: textColor3
  }
}

export type FilterThemeVars = ReturnType<typeof self>

const filterLight: Theme<'Filter', FilterThemeVars> = {
  name: 'Filter',
  common: commonLight,
  self
}

export default filterLight
export type FilterTheme = typeof filterLight
