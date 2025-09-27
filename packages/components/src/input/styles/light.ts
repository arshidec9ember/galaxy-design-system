import commonVariables from './_common'
import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import type { Theme } from '../../_mixins'

const self = (vars: ThemeCommonVars) => {
  const {
    textColor2,
    textColor3,
    textColorDisabled,
    primaryColor,
    inputColor,
    inputColorDisabled,
    inputBackgroundColor,
    inputPrefixBackgroudColor,
    inputBorderColor,
    warningColor,
    warningColorHover,
    errorColor,
    errorColorHover,
    borderRadiusLarge,
    lineHeight,
    fontSizeXSmall,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    heightXSmall,
    heightSmall,
    heightMedium,
    heightLarge,
    actionColor,
    clearColor,
    clearColorHover,
    clearColorPressed,
    placeholderColor,
    placeholderColorDisabled,
    iconColor,
    iconColorDisabled,
    iconColorHover,
    iconColorPressed
  } = vars
  return {
    ...commonVariables,
    countTextColorDisabled: textColorDisabled,
    countTextColor: textColor3,
    heightXSmall,
    heightSmall,
    heightMedium,
    heightLarge,
    fontSizeXSmall,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    lineHeight,
    lineHeightTextarea: lineHeight,
    borderRadiusLarge,
    iconSize: '16px',
    groupLabelColor: actionColor,
    groupLabelTextColor: textColor2,
    textColor: textColor2,
    textColorDisabled,
    textDecorationColor: textColor2,
    caretColor: primaryColor,
    placeholderColor,
    placeholderColorDisabled,
    color: inputColor,
    colorDisabled: inputColorDisabled,
    colorFocus: inputColor,
    groupLabelBorder: `1px solid ${inputBorderColor}`,
    backgroundColor: inputBackgroundColor,
    inputPrefixBackgroudColor,
    border: `1px solid ${inputBorderColor}`,
    borderHover: '1px solid var(--gds-color-border-neutral-dark3)',
    borderDisabled: '',
    borderFocus: '1px solid var(--gds-color-border-primary)',
    boxShadowFocus: `0  ${primaryColor}`,
    loadingColor: primaryColor,
    // warning
    loadingColorWarning: warningColor,
    borderWarning: '1px solid var(--gds-color-border-warning-dark)',
    borderHoverWarning: `1px solid ${warningColorHover}`,
    colorFocusWarning: inputColor,
    borderFocusWarning: `1px solid ${warningColorHover}`,
    boxShadowFocusWarning: `0 ${warningColor}`,
    caretColorWarning: warningColor,
    // error
    loadingColorError: errorColor,
    borderError: '1px solid var(--gds-color-border-danger-dark)',
    borderHoverError: `1px solid ${errorColorHover}`,
    colorFocusError: inputColor,
    borderFocusError: `1px solid ${errorColorHover}`,
    boxShadowFocusError: `0 ${errorColor}`,
    caretColorError: errorColor,
    clearColor,
    clearColorHover,
    clearColorPressed,
    iconColor,
    iconColorDisabled,
    iconColorHover,
    iconColorPressed,
    suffixTextColor: textColor2
  }
}

export type InputThemeVars = ReturnType<typeof self>

const inputLight: Theme<'Input', InputThemeVars> = {
  name: 'Input',
  common: commonLight,
  self
}

export default inputLight
export type InputTheme = typeof inputLight
