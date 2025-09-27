import commonVars from './_common'
import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import type { Theme } from '../../_mixins'

export const self = (vars: ThemeCommonVars) => {
  const {
    primaryColor,
    textColor2,
    borderColor,
    lineHeight,
    fontSize,
    borderRadiusSmall,
    dividerColor,
    fontWeightStrong,
    textColor1,
    textColor3,
    infoColor,
    warningColor,
    errorColor,
    successColor,
    codeColor,
    opacity1,
    opacity2,
    opacity3,
    opacity4,
    opacity5
  } = vars
  return {
    ...commonVars,
    aTextColor: primaryColor,
    fontLink: '',
    fontParagraph: '',
    fontBody: '',
    fontCode1R: '',
    fontLabel: '',
    fontTitle: '',
    fontHeading: '',
    letterSpacingHeading: '',
    blockquoteTextColor: textColor2,
    blockquotePrefixColor: borderColor,
    blockquoteLineHeight: lineHeight,
    blockquoteFontSize: fontSize,
    codeBorderRadius: borderRadiusSmall,
    liTextColor: textColor2,
    liLineHeight: lineHeight,
    liFontSize: fontSize,
    hrColor: dividerColor,
    headerFontWeight: fontWeightStrong,
    headerTextColor: textColor1,
    pTextColor: textColor2,
    pTextColor1Depth: textColor1,
    pTextColor2Depth: textColor2,
    pTextColor3Depth: textColor3,
    labelTextColor: '',
    titleTextColor: '',
    pLineHeight: lineHeight,
    pFontSize: fontSize,
    headingBarColor: primaryColor,
    headingBarColorPrimary: primaryColor,
    headingBarColorInfo: infoColor,
    headingBarColorError: errorColor,
    headingBarColorWarning: warningColor,
    headingBarColorSuccess: successColor,
    textColor: textColor2,
    textColor1Depth: textColor1,
    textColor2Depth: textColor2,
    textColor3Depth: textColor3,
    textColorPrimary: primaryColor,
    textColorInfo: infoColor,
    textColorSuccess: successColor,
    textColorWarning: warningColor,
    textColorError: errorColor,
    codeTextColor: textColor2,
    codeColor,
    opacity1,
    opacity2,
    opacity3,
    opacity4,
    opacity5,
    codeBorder: '1px solid #0000'
  }
}

export type TypographyThemeVars = ReturnType<typeof self>

const typographyLight: Theme<'Typography', TypographyThemeVars> = {
  name: 'Typography',
  common: commonLight,
  self
}

export default typographyLight
export type TypographyTheme = typeof typographyLight
