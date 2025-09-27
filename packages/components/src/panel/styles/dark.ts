import { commonDark } from '../../_styles/common'
import type { PanelTheme } from './light'

const panelDark: PanelTheme = {
  name: 'Panel',
  common: commonDark,
  self (vars) {
    const { textColor2, textColor3, baseColor } = vars
    return {
      textColor: textColor2,
      dividerColor: textColor2,
      headerTextColor: textColor2,
      paginationTextColor: textColor3, // Using textColor3 for pagination consistency
      baseColor
    }
  }
}

export default panelDark
