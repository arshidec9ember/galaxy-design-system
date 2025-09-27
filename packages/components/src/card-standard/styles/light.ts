import { type ThemeCommonVars, commonLight } from '../../_styles/common'
import commonVariables from './_common'
import { type Theme } from '../../_mixins'

export const self = (vars: ThemeCommonVars) => {
  return commonVariables
}

export type CardStandardThemeVars = ReturnType<typeof self>

const cardStandardLight: Theme<'CardStandard', CardStandardThemeVars> = {
  name: 'CardStandard',
  common: commonLight,
  self
}

export default cardStandardLight
export type CardStandardTheme = typeof cardStandardLight
