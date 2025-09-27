import { changeColor } from 'seemly'
import { tooltipLight } from '../../tooltip/styles'
import { dropdownLight } from '../../dropdown/styles'
import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import { createTheme } from '../../_mixins/use-theme'

export function createHorizontalVars (
  color: string,
  activeTextColor: string,
  vars: ThemeCommonVars
) {
  return {
    itemHorizontalHeight: '32px',
    borderColorHorizontal: '#0000',
    // for inverted
    arrowColorInverted: '#D4D7E6',
    arrowColorHoverInverted: '#D4D7E6',
    arrowColorActiveInverted: '#D4D7E6',
    arrowColorActiveHoverInverted: '#D4D7E6',
    arrowColorChildActiveHoverInverted: '#D4D7E6',
    arrowColorChildActiveInverted: '#D4D7E6',
    itemTextColorHorizontalInverted: color,
    itemTextColorHoverHorizontalInverted: activeTextColor,
    itemTextColorChildActiveHorizontalInverted: activeTextColor,
    itemTextColorChildActiveHoverHorizontalInverted: activeTextColor,
    itemTextColorActiveHorizontalInverted: activeTextColor,
    itemTextColorActiveHoverHorizontalInverted: activeTextColor,
    itemIconColorHorizontalInverted: color,
    itemIconColorHoverHorizontalInverted: activeTextColor,
    itemIconColorActiveHorizontalInverted: activeTextColor,
    itemIconColorActiveHoverHorizontalInverted: activeTextColor,
    itemIconColorChildActiveHorizontalInverted: activeTextColor,
    itemIconColorChildActiveHoverHorizontalInverted: activeTextColor,
    itemHoverHorizontalInverted: '#1c275f0f',
    itemSelectedHorizontalInverted: '#F2F5FF',
    itemHoverActiveHorizontalInverted: '#1c275f1a',
    // for non-inverted
    arrowColor: '#7D83A6',
    arrowColorHover: '#7D83A6',
    arrowColorActive: '#7D83A6',
    arrowColorActiveHover: '#7D83A6',
    arrowColorChildActiveHover: '#7D83A6',
    arrowColorChildActive: '#7D83A6',
    itemTextColorHorizontal: vars.textColor2,
    itemTextColorHoverHorizontal: vars.primaryColorHover,
    itemTextColorActiveHorizontal: vars.primaryColor,
    itemTextColorActiveHoverHorizontal: vars.primaryColor,
    itemTextColorChildActiveHorizontal: vars.primaryColor,
    itemTextColorChildActiveHoverHorizontal: vars.primaryColor,
    itemIconColorHorizontal: vars.textColor1,
    itemIconColorHoverHorizontal: vars.primaryColorHover,
    itemIconColorActiveHorizontal: vars.primaryColor,
    itemIconColorActiveHoverHorizontal: vars.primaryColor,
    itemIconColorChildActiveHorizontal: vars.primaryColor,
    itemIconColorChildActiveHoverHorizontal: vars.primaryColor,
    itemHoverHorizontal: '#1c275f0f',
    itemSelectedHorizontal: '#F2F5FF',
    itemHoverActiveHorizontal: '#1c275f1a'
  }
}

export function createPartialInvertedVars (
  color: string,
  activeItemColor: string,
  activeTextColor: string,
  groupTextColor: string
) {
  return {
    itemColorHoverInverted: '#0000',
    itemColorActiveInverted: activeItemColor,
    itemColorActiveHoverInverted: activeItemColor,
    itemColorActiveCollapsedInverted: activeItemColor,
    itemTextColorInverted: color,
    itemTextColorHoverInverted: activeTextColor,
    itemTextColorChildActiveInverted: activeTextColor,
    itemTextColorChildActiveHoverInverted: activeTextColor,
    itemTextColorActiveInverted: activeTextColor,
    itemTextColorActiveHoverInverted: activeTextColor,
    itemIconColorInverted: color,
    itemIconColorHoverInverted: activeTextColor,
    itemIconColorActiveInverted: activeTextColor,
    itemIconColorActiveHoverInverted: activeTextColor,
    itemIconColorChildActiveInverted: activeTextColor,
    itemIconColorChildActiveHoverInverted: activeTextColor,
    itemIconColorCollapsedInverted: color,
    arrowColorInverted: color,
    arrowColorHoverInverted: activeTextColor,
    arrowColorActiveInverted: activeTextColor,
    arrowColorActiveHoverInverted: activeTextColor,
    arrowColorChildActiveInverted: activeTextColor,
    arrowColorChildActiveHoverInverted: activeTextColor,
    groupTextColorInverted: groupTextColor,
    dividerColorInverted: '#FFFFFF'
  }
}

export const self = (vars: ThemeCommonVars) => {
  const {
    borderRadius,
    textColor3,
    primaryColor,
    textColor2,
    textColor1,
    fontSize,
    dividerColor,
    hoverColor
  } = vars
  return {
    borderRadius,
    color: '#0000',
    groupTextColor: textColor3,
    itemColorHover: hoverColor,
    itemColorActive: changeColor(primaryColor, { alpha: 0.1 }),
    itemColorActiveHover: changeColor(primaryColor, { alpha: 0.1 }),
    itemColorActiveCollapsed: changeColor(primaryColor, { alpha: 0.1 }),
    itemTextColor: textColor2,
    itemTextColorHover: textColor2,
    itemTextColorActive: primaryColor,
    itemTextColorActiveHover: primaryColor,
    itemTextColorChildActive: primaryColor,
    itemTextColorChildActiveHover: primaryColor,
    itemIconColor: textColor1,
    itemIconColorHover: textColor1,
    itemIconColorActive: primaryColor,
    itemIconColorActiveHover: primaryColor,
    itemIconColorChildActive: primaryColor,
    itemIconColorChildActiveHover: primaryColor,
    itemIconColorCollapsed: textColor1,
    itemHeight: '40px',
    colorInverted: '#0000',
    fontSize,
    dividerColor,
    ...createHorizontalVars('#BBB', '#FFF', vars),
    ...createPartialInvertedVars('#BBB', primaryColor, '#FFF', '#AAA')
  }
}

export type MenuThemeVars = ReturnType<typeof self>

const menuLight = createTheme({
  name: 'Menu',
  common: commonLight,
  peers: {
    Tooltip: tooltipLight,
    Dropdown: dropdownLight
  },
  self
})

export default menuLight
export type MenuTheme = typeof menuLight
