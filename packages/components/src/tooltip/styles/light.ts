import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import { popoverLight } from '../../popover/styles'
import commonVars from './_common'
import { createTheme } from '../../_mixins/use-theme'
import { composite } from 'seemly'

const self = (vars: ThemeCommonVars) => {
  const { borderRadius, baseColor } = vars
  return {
    ...commonVars,
    fontSize: '0.75rem',
    borderRadius,
    boxShadow: '0 0.125rem 0.5rem 0 rgba(0, 0, 0, 0.15)',
    bgColor: composite(baseColor, 'rgba(0, 0, 0, .85)'),
    textColor: baseColor,
    space: '0.375rem',
    spaceArrow: '0.75rem',
    arrowOffset: '0.75rem',
    arrowOffsetVertical: '0.75rem',
    arrowHeight: '0.5rem',
    padding: '0.25rem 0.5rem'
  }
}

export type TooltipThemeVars = ReturnType<typeof self>

const tooltipLight = createTheme({
  name: 'Tooltip',
  common: commonLight,
  peers: {
    Popover: popoverLight
  },
  self
})

export default tooltipLight
export type TooltipTheme = typeof tooltipLight
