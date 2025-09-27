import { commonDark } from '../../_styles/common'
import type { LinkTheme } from './light'

const linkDark: LinkTheme = {
  name: 'Link',
  common: commonDark,
  self (vars) {
    const {
      primaryColor,
      primaryColorHover,
      primaryColorPressed,
      primaryColorSuppl,
      primaryColorFocus,
      fontFamily,
      opacityDisabled,
      lineHeight,
      fontWeight
    } = vars
    return {
      color: primaryColor,
      colorActive: primaryColorPressed,
      colorVisited: primaryColorSuppl,
      colorHover: primaryColorHover,
      colorFocus: primaryColorFocus,
      fontSize: '14px',
      fontFamily,
      opacityDisabled,
      lineHeight,
      fontWeight
    }
  }
}

export default linkDark
