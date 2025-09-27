import { datePickerLight } from '../../date-picker/styles'
import { cardLight } from '../../card/styles'
import { buttonLight } from '../../button/styles'
import { dividerLight } from '../../divider/styles'
import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import { createTheme } from '../../_mixins'
import commonVars from './_common'

export const self = (vars: ThemeCommonVars) => {
  const {
    popoverColor,
    textColor1,
    borderRadius,
    boxShadow2,
    dividerColor,
    fontWeightStrong
  } = vars

  return {
    ...commonVars,
    // Panel styling using theme tokens
    panelColor: popoverColor,
    panelBorderRadius: borderRadius,
    panelBoxShadow: boxShadow2,

    // Typography using theme tokens
    titleTextColor: textColor1,
    titleFontWeight: fontWeightStrong,

    // Divider styling using theme tokens
    dividerColor
  }
}

export type SuperDatePickerThemeVars = ReturnType<typeof self>

const superDatePickerLight = createTheme({
  name: 'SuperDatePicker',
  common: commonLight,
  peers: {
    DatePicker: datePickerLight,
    Card: cardLight,
    Button: buttonLight,
    Divider: dividerLight
  },
  self
})

export default superDatePickerLight
export type SuperDatePickerTheme = typeof superDatePickerLight
