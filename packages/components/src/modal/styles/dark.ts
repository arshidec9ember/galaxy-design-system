import { scrollbarDark } from '../../_internal/scrollbar/styles'
import { dialogDark } from '../../dialog/styles'
import { cardStandardDark } from '../../card-standard/styles'
import { commonDark } from '../../_styles/common'
import { self, type ModalTheme } from './light'

const modalDark: ModalTheme = {
  name: 'Modal',
  common: commonDark,
  peers: {
    Scrollbar: scrollbarDark,
    Dialog: dialogDark,
    CardStandard: cardStandardDark
  },
  self
}

export default modalDark
