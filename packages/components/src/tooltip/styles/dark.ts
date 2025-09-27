import { commonDark } from '../../_styles/common'
import { popoverDark } from '../../popover/styles'
import commonVars from './_common'
import type { TooltipTheme } from './light'

const tooltipDark: TooltipTheme = {
  name: 'Tooltip',
  common: commonDark,
  peers: {
    Popover: popoverDark
  },
  self (vars) {
    const { borderRadius, boxShadow2, popoverColor, textColor2 } = vars
    return {
      ...commonVars,
      fontSize: '12px',
      borderRadius,
      boxShadow: boxShadow2,
      bgColor: popoverColor,
      textColor: textColor2,
      space: '0.375rem',
      spaceArrow: '0.75rem',
      arrowOffset: '0.75rem',
      arrowOffsetVertical: '0.75rem',
      arrowHeight: '0.5rem',
      padding: '0.25rem 0.5rem'
    }
  }
}

export default tooltipDark
