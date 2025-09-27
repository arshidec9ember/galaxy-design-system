import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import type { Theme } from '../../_mixins'
import commonVariables from './_common'

export const self = (vars: ThemeCommonVars) => {
  const {
    heightSmall,
    heightMedium,
    heightLarge,
    successColor,
    errorColor,
    warningColor,
    lineHeight,
    textColor3
  } = vars
  return {
    ...commonVariables,
    blankHeightSmall: heightSmall,
    blankHeightMedium: heightMedium,
    blankHeightLarge: heightLarge,
    lineHeight,
    inputBackgroundColor: '#9DA2BF',
    labelTextColor: '#434B79',
    labelDescriptionTextColor: '#5E658D',
    helpIconColor: '#7D83A6',
    asteriskColor: errorColor,
    feedbackTextColorSuccess: successColor,
    feedbackTextColorNeutral: '#5e658d',
    feedbackTextColorError: errorColor,
    feedbackTextColorWarning: warningColor,
    feedbackIconColorNeutral: '#5e658d',
    feedbackIconColorWarning: warningColor,
    feedbackIconColorError: errorColor,
    feedbackIconColorSuccess: successColor,
    feedbackTextColor: textColor3
  }
}

export type FormThemeVars = ReturnType<typeof self>

const formLight: Theme<'Form', FormThemeVars> = {
  name: 'Form',
  common: commonLight,
  self
}

export default formLight
export type FormTheme = typeof formLight
