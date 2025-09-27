import commonVars from './_common'
import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import type { Theme } from '../../_mixins'

export const self = (vars: ThemeCommonVars) => {
  const {
    iconColor,
    textColor2,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    fontSizeXLarge
  } = vars
  return {
    ...commonVars,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    fontSizeXLarge,
    titleTextColor: textColor2,
    textColor: textColor2,
    iconColor,
    actionsTextColor: textColor2
  }
}

export type EmptyThemeVars = ReturnType<typeof self>

const emptyLight: Theme<'Empty', EmptyThemeVars> = {
  name: 'Empty',
  common: commonLight,
  self
}

export default emptyLight
export type EmptyTheme = typeof emptyLight
