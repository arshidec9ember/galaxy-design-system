import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import type { Theme } from '../../_mixins'

const self = (vars: ThemeCommonVars) => {
  const { textColor1, textColor2, textColor3, dividerColor, baseColor } = vars
  return {
    textColor: textColor2,
    dividerColor,
    headerTextColor: textColor1,
    paginationTextColor: textColor3, // Using textColor3 for pagination as per Figma specification
    baseColor
  }
}

export type PanelThemeVars = ReturnType<typeof self>

const panelLight: Theme<'Panel', PanelThemeVars> = {
  name: 'Panel',
  common: commonLight,
  self
}

export default panelLight
export type PanelTheme = typeof panelLight
