import commonVariables from './_common'
import { commonDark } from '../../_styles/common'
import type { RadioTheme } from './light'
import { changeColor } from 'seemly'

const radioDark: RadioTheme = {
  name: 'Radio',
  common: commonDark,
  self (vars) {
    const {
      primaryColor,
      primaryColorHover,
      baseColor,
      textColorDisabled,
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
      color: baseColor,
      colorActive: baseColor,
      colorDisabled: inputColorDisabled,
      textColorDisabled,
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
      buttonBoxShadowFocus: `inset 0 0 0 2px ${primaryColor}, 0 0 0 2px ${primaryColor}`,
      buttonBoxShadowHover: 'inset 0 0 0 2px #0000',
      buttonBoxShadow: 'inset 0 0 0 2px #0000',
      buttonBorderRadius: borderRadius
    }
  }
}

export default radioDark
