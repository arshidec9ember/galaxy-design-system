import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import commonVariables from './_common'
import { type Theme } from '../../_mixins'
import { changeColor } from 'seemly'

export const self = (vars: ThemeCommonVars) => {
  const {
    primaryColor,
    borderRadiusLarge,
    lineHeight,
    fontSize,
    cardColor,
    textColor2,
    textColor1,
    dividerColor,
    fontWeightStrong,
    closeIconColor,
    closeIconColorHover,
    closeIconColorPressed,
    closeColorHover,
    closeColorPressed,
    modalColor,
    boxShadow1,
    popoverColor,
    actionColor
  } = vars
  return {
    ...commonVariables,
    lineHeight,
    color: cardColor,
    colorModal: modalColor,
    colorPopover: popoverColor,
    colorTarget: primaryColor,
    colorEmbedded: actionColor,
    colorEmbeddedCheckbox: primaryColor,
    colorEmbeddedModal: actionColor,
    colorEmbeddedPopover: actionColor,
    colorActionArea: actionColor,
    textColor: textColor2,
    titleTextColor: textColor1,
    borderColor: dividerColor,
    actionColor,
    actionAreaColor: changeColor(actionColor, { alpha: 0.25 }),
    titleFontWeight: fontWeightStrong,
    closeColorHover,
    closeColorPressed,
    closeBorderRadius: borderRadiusLarge,
    closeIconColor,
    closeIconColorHover,
    closeIconColorPressed,
    fontSizeXSmall: fontSize,
    fontSizeSmall: fontSize,
    fontSizeMedium: fontSize,
    fontSizeLarge: fontSize,
    fontSizeXLarge: fontSize,
    boxShadow: boxShadow1,
    selectorBoxShadow: boxShadow1,
    borderRadius: borderRadiusLarge
  }
}

export type CardThemeVars = ReturnType<typeof self>

const cardLight: Theme<'Card', CardThemeVars> = {
  name: 'Card',
  common: commonLight,
  self
}

export default cardLight
export type CardTheme = typeof cardLight
