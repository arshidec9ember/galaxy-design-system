import { type Theme } from '../../_mixins'
import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'

export const self = (vars: ThemeCommonVars) => {
  const {
    primaryColor,
    baseColor,
    heightXSmall,
    heightSmall,
    heightMedium,
    heightLarge,
    heightXLarge,
    fontSize
  } = vars
  return {
    fontSize,
    invertedTextColor: primaryColor,
    invertedColor: primaryColor,
    invertedSecondaryColor: primaryColor,
    textColor: baseColor,
    color: baseColor,
    secondaryColor: baseColor,
    scrimColor: 'rgba(2, 13, 77, 0.4)',
    sizeXSmall: heightXSmall,
    sizeSmall: heightSmall,
    sizeMedium: heightMedium,
    sizeLarge: heightLarge,
    sizeXLarge: heightXLarge,
    opacitySpinning: '0.4'
  }
}

export type SpinnerThemeVars = ReturnType<typeof self>

const spinnerLight: Theme<'Spinner', SpinnerThemeVars> = {
  name: 'Spinner',
  common: commonLight,
  self
}

export default spinnerLight
export type SpinnerTheme = typeof spinnerLight
