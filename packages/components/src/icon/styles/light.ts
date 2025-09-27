import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import type { Theme } from '../../_mixins'

export const self = (vars: ThemeCommonVars) => {
  const { textColorBase, opacity1, opacity2, opacity3, opacity4, opacity5 } =
    vars
  return {
    color: textColorBase,
    opacity1,
    opacity2,
    opacity3,
    opacity4,
    opacity5
  }
}

export type IconThemeVars = ReturnType<typeof self>

const iconLight: Theme<'Icon', IconThemeVars> = {
  name: 'Icon',
  common: commonLight,
  self
}

export default iconLight
export type IconTheme = typeof iconLight
