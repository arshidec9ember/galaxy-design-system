import { scrollbarLight } from '../../_internal/scrollbar/styles'
import { dialogLight } from '../../dialog/styles'
import { cardStandardLight } from '../../card-standard/styles'
import { commonLight, type ThemeCommonVars } from '../../_styles/common'
import { createTheme } from '../../_mixins'

export const self = (vars: ThemeCommonVars) => {
  const { modalColor, textColor2, boxShadow3 } = vars
  return {
    color: modalColor,
    textColor: textColor2,
    boxShadow: boxShadow3
  }
}

export type ModalThemeVars = ReturnType<typeof self>

const modalLight = createTheme({
  name: 'Modal',
  common: commonLight,
  peers: {
    Scrollbar: scrollbarLight,
    Dialog: dialogLight,
    CardStandard: cardStandardLight
  },
  self
})

export default modalLight
export type ModalTheme = typeof modalLight
