import commonVariables from './_common'
import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import { type Theme } from '../../_mixins/use-theme'
import { changeColor } from 'seemly'

const self = (vars: ThemeCommonVars) => {
  const {
    primaryColor,
    primaryColorHover,
    baseColor,
    inputColorDisabled,
    borderColor,
    borderRadius,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    lineHeight
  } = vars
  return {
    ...commonVariables,
    labelLineHeight: lineHeight,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    boxShadow: `inset 0 0 0 2px ${borderColor}`,
    boxShadowActive: `inset 0 0 0 2px ${primaryColor}`,
    boxShadowActiveHover: `inset 0 0 0 2px ${primaryColor}`,
    buttonBackgroundColorHoverActive: primaryColor,
    dotColorHoverActive: primaryColor,
    boxShadowFocus: `inset 0 0 0 2px ${primaryColor}, 0 0 0 2px ${changeColor(
      primaryColor,
      { alpha: 0.3 }
    )}`,
    boxShadowHover: `inset 0 0 0 2px ${primaryColorHover}`,
    boxShadowDisabled: `inset 0 0 0 2px ${borderColor}`,
    colorActive: baseColor,
    color: baseColor,
    colorDisabled: inputColorDisabled,
    textColor: primaryColor,
    dotColorActive: primaryColor,
    dotColorDisabled: borderColor,
    buttonTextColor: primaryColor,
    buttonBorderColor: primaryColor,
    buttonBorderColorActive: primaryColor,
    buttonBorderColorHover: borderColor,
    buttonBackgroundColorActive: primaryColor,
    buttonBackgroundColorHover: 'grey',
    buttonColor: baseColor,
    buttonColorActive: baseColor,
    buttonTextColorActive: baseColor,
    buttonTextColorHover: primaryColor,
    opacityDisabled: '40%',
    buttonBoxShadowFocus: `inset 0 0 0 2px ${primaryColor}`,
    buttonBoxShadowHover: 'inset 0 0 0 2px #0000',
    buttonBoxShadow: 'inset 0 0 0 2px #0000',
    buttonBorderRadius: borderRadius
  }
}

export type RadioThemeVars = ReturnType<typeof self>

const radioLight: Theme<'Radio', RadioThemeVars> = {
  name: 'Radio',
  common: commonLight,
  self
}

export default radioLight
export type RadioTheme = typeof radioLight
