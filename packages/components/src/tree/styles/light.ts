import { changeColor } from 'seemly'
import { checkboxLight } from '../../checkbox/styles'
import { emptyLight } from '../../empty/styles'
import { scrollbarLight } from '../../_internal/scrollbar/styles'
import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import { createTheme } from '../../_mixins/use-theme'
import commonVars from './_common'

export const self = (vars: ThemeCommonVars) => {
  const {
    borderRadiusSmall,
    hoverColor,
    pressedColor,
    primaryColor,
    textColor3,
    textColor1,
    textColorDisabled,
    fontSizeXSmall,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    fontSizeXLarge,
    dividerColor,
    selectedNodeHoverColor
  } = vars
  return {
    ...commonVars,
    nodeHeight: '30px',
    fontSizeXSmall,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    fontSizeXLarge,
    lineHeight: '1.5',
    nodeBorderRadius: borderRadiusSmall,
    nodeColorHover: hoverColor,
    nodeColorPressed: pressedColor,
    nodeColorActive: changeColor(primaryColor, { alpha: 0.1 }),
    arrowColor: textColor3,
    nodeTextColor: textColor1,
    nodeTextColorActive: primaryColor,
    nodeTextColorHover: textColor1,
    nodeTextColorDisabled: textColorDisabled,
    nodeHighlightBottomColor: textColorDisabled,
    loadingColor: primaryColor,
    dropMarkColor: primaryColor,
    borderWidth: '1px',
    dividerColor,
    selectedNodeHoverColor
  }
}

export type TreeThemeVars = ReturnType<typeof self>

const treeLight = createTheme({
  name: 'Tree',
  common: commonLight,
  peers: {
    Checkbox: checkboxLight,
    Scrollbar: scrollbarLight,
    Empty: emptyLight
  },
  self
})

export default treeLight
export type TreeTheme = typeof treeLight
