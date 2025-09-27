import { changeColor } from 'seemly'
import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import commonVariables from './_common'
import type { Theme } from '../../_mixins'

export const self = (vars: ThemeCommonVars) => {
  const borderColor = '#9DA2BF'
  const {
    baseColor,
    inputColorDisabled,
    cardColor,
    modalColor,
    popoverColor,
    textColorDisabled,
    primaryColor,
    primaryColorHover,
    textColor2,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    borderRadiusSmall,
    lineHeight,
    borderRadius
  } = vars
  return {
    ...commonVariables,
    labelLineHeight: lineHeight,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    borderRadius: borderRadiusSmall,
    color: baseColor,
    colorChecked: primaryColor,
    colorCheckedHover: primaryColorHover,
    colorDisabled: inputColorDisabled,
    colorDisabledChecked: inputColorDisabled,
    colorTableHeader: cardColor,
    colorTableHeaderModal: modalColor,
    colorTableHeaderPopover: popoverColor,
    checkMarkColor: baseColor,
    checkMarkColorDisabled: textColorDisabled,
    checkMarkColorDisabledChecked: textColorDisabled,
    border: `2px solid ${borderColor}`,
    borderDisabled: `2px solid ${borderColor}`,
    borderDisabledChecked: `2px solid ${borderColor}`,
    borderHover: '2px solid #7D83A6',
    borderFocus: `2px solid ${primaryColor}`,
    boxShadowFocus: `0 0 0 2px ${changeColor(primaryColor, { alpha: 0.3 })}`,
    textColor: textColor2,
    opacityDisabled: '40%',
    textColorDisabled,
    buttonTextColor: primaryColor,
    buttonBorderColor: primaryColor,
    buttonBorderColorActive: primaryColor,
    buttonBorderColorHover: borderColor,
    buttonBackgroundColorActive: primaryColor,
    buttonBackgroundColorHoverActive: primaryColor,
    buttonBackgroundColorHover: 'grey',
    buttonColor: baseColor,
    buttonColorActive: baseColor,
    buttonTextColorActive: baseColor,
    buttonTextColorHover: primaryColor,
    buttonBoxShadowFocus: `inset 0 0 0 2px ${primaryColor}`,
    buttonBoxShadowHover: 'inset 0 0 0 2px #0000',
    buttonBoxShadow: 'inset 0 0 0 2px #0000',
    buttonBorderRadius: borderRadius
  }
}

export type CheckboxThemeVars = ReturnType<typeof self>

const checkboxLight: Theme<'Checkbox', CheckboxThemeVars> = {
  name: 'Checkbox',
  common: commonLight,
  self
}

export default checkboxLight
export type CheckboxTheme = typeof checkboxLight
