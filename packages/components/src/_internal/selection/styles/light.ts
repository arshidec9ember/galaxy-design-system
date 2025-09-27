import { changeColor } from 'seemly'
import { commonLight } from '../../../_styles/common'
import { popoverLight } from '../../../popover/styles'
import type { ThemeCommonVars } from '../../../_styles/common'
import commonVariables from './_common'
import { createTheme } from '../../../_mixins'

const self = (vars: ThemeCommonVars) => {
  const {
    borderRadiusLarge,
    textColor2,
    textColorDisabled,
    inputColor,
    inputColorDisabled,
    primaryColor,
    warningColor,
    errorColor,
    borderColor,
    iconColor,
    iconColorDisabled,
    clearColor,
    clearColorHover,
    clearColorPressed,
    placeholderColor,
    placeholderColorDisabled,
    fontSizeXSmall,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    heightXSmall,
    heightSmall,
    heightMedium,
    heightLarge
  } = vars
  return {
    ...commonVariables,
    fontSizeXSmall,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    heightXSmall,
    heightSmall,
    heightMedium,
    heightLarge,
    borderRadiusLarge,
    // default
    textColor: textColor2,
    textColorDisabled,
    placeholderColor,
    placeholderColorDisabled,
    color: inputColor,
    colorDisabled: inputColorDisabled,
    colorActive: inputColor,
    border: `1px solid ${borderColor}`,
    borderDisabled: `1px solid ${changeColor(borderColor, {
      alpha: 0.6
    })}`,
    borderHover: `1px solid ${primaryColor}`,
    borderActive: `1px solid ${primaryColor}`,
    borderFocus: `1px solid ${primaryColor}`,
    boxShadowHover: 'none',
    boxShadowActive: 'none',
    boxShadowFocus: 'none',
    caretColor: primaryColor,
    arrowColor: iconColor,
    arrowColorDisabled: iconColorDisabled,
    loadingColor: primaryColor,
    // warning
    borderWarning: `1px solid ${warningColor}`,
    borderWarningDisabled: `1px solid ${changeColor(warningColor, {
      alpha: 0.6
    })}`,
    borderHoverWarning: `1px solid ${warningColor}`,
    borderActiveWarning: `1px solid ${warningColor}`,
    borderFocusWarning: `1px solid ${warningColor}`,
    boxShadowHoverWarning: 'none',
    boxShadowActiveWarning: `0 ${warningColor}`,
    boxShadowFocusWarning: `0 ${warningColor}`,
    colorActiveWarning: inputColor,
    caretColorWarning: warningColor,
    // error
    borderError: `1px solid ${errorColor}`,
    borderErrorDisabled: `1px solid ${changeColor(errorColor, {
      alpha: 0.6
    })}`,
    borderHoverError: `1px solid ${errorColor}`,
    borderActiveError: `1px solid ${errorColor}`,
    borderFocusError: `1px solid ${errorColor}`,
    boxShadowHoverError: 'none',
    boxShadowActiveError: `0  ${errorColor}`,
    boxShadowFocusError: `0  ${errorColor}`,
    colorActiveError: inputColor,
    caretColorError: errorColor,
    clearColor,
    clearColorHover,
    clearColorPressed
  }
}

export type InternalSelectionThemeVars = ReturnType<typeof self>

const internalSelectionLight = createTheme({
  name: 'InternalSelection',
  common: commonLight,
  peers: {
    Popover: popoverLight
  },
  self
})

export default internalSelectionLight
export type InternalSelectionTheme = typeof internalSelectionLight
