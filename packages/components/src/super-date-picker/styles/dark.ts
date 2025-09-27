import { datePickerDark } from '../../date-picker/styles'
import { cardDark } from '../../card/styles'
import { buttonDark } from '../../button/styles'
import { dividerDark } from '../../divider/styles'
import { commonDark } from '../../_styles/common'
import { createTheme } from '../../_mixins'
import { self } from './light'

const superDatePickerDark = createTheme({
  name: 'SuperDatePicker',
  common: commonDark,
  peers: {
    DatePicker: datePickerDark,
    Card: cardDark,
    Button: buttonDark,
    Divider: dividerDark
  },
  self
})

export default superDatePickerDark
export type SuperDatePickerDarkTheme = typeof superDatePickerDark
