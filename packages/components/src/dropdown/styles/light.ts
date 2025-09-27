import { changeColor } from 'seemly'
import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import { createTheme } from '../../_mixins/use-theme'
import commonVariables from './_common'
import { popoverLight } from '../../popover/styles'

export const self = (vars: ThemeCommonVars) => {
  const {
    primaryColor,
    textColor2,
    dividerColor,
    hoverColor,
    popoverColor,
    invertedColor,
    borderRadius,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    fontSizeXLarge,
    heightSmall,
    heightMedium,
    heightLarge,
    heightXLarge,
    textColor3,
    opacityDisabled
  } = vars
  return {
    ...commonVariables,
    optionHeightXSmall: '24px',
    optionHeightSmall: heightSmall,
    optionHeightMedium: heightMedium,
    optionHeightLarge: heightLarge,
    optionHeightXLarge: heightXLarge,
    borderRadius,
    fontSizeXSmall: fontSizeSmall,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    fontSizeXLarge,
    // non-inverted
    optionTextColor: textColor2,
    optionTextColorHover: textColor2,
    optionTextColorActive: primaryColor,
    optionTextColorChildActive: primaryColor,
    color: popoverColor,
    dividerColor,
    suffixColor: textColor2,
    prefixColor: textColor2,
    optionColorHover: hoverColor,
    optionColorActive: changeColor(primaryColor, { alpha: 0.1 }),
    groupHeaderTextColor: textColor3,
    // inverted
    optionTextColorInverted: '#BBB',
    optionTextColorHoverInverted: '#FFF',
    optionTextColorActiveInverted: '#FFF',
    optionTextColorChildActiveInverted: '#FFF',
    colorInverted: invertedColor,
    dividerColorInverted: '#BBB',
    suffixColorInverted: '#BBB',
    prefixColorInverted: '#BBB',
    optionColorHoverInverted: primaryColor,
    optionColorActiveInverted: primaryColor,
    groupHeaderTextColorInverted: '#AAA',
    optionOpacityDisabled: opacityDisabled,
    optionIconColor: '#7D83A6'
  }
}

export type DropdownThemeVars = ReturnType<typeof self>

const dropdownLight = createTheme({
  name: 'Dropdown',
  common: commonLight,
  peers: {
    Popover: popoverLight
  },
  self
})

export type DropdownTheme = typeof dropdownLight
export default dropdownLight
