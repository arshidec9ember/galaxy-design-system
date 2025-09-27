import { scrollbarDark } from '../../_internal/scrollbar/styles'
import { dropdownDark } from '../../dropdown/styles'
import { commonDark } from '../../_styles/common'
import type { FloatingPanelTheme } from './light'
import { self } from './light'

const floatingPanelDark: FloatingPanelTheme = {
  name: 'FloatingPanel',
  common: commonDark,
  peers: {
    Scrollbar: scrollbarDark,
    Dropdown: dropdownDark
  },
  self (vars) {
    const commonSelf = self(vars)
    return commonSelf
  }
}

export default floatingPanelDark
