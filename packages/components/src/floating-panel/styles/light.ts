import { scrollbarLight } from '../../_internal/scrollbar/styles'
import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import { createTheme } from '../../_mixins'
import commonVars from './_common'
import { dropdownLight } from '../../dropdown/styles'

export const self = (vars: ThemeCommonVars) => {
  const {
    textColor2,
    popoverColor,
    newTabColorHover,
    newTabColorPressed,
    newTabIconColor,
    newTabIconColorHover,
    newTabIconColorPressed,
    toggleIconColor,
    toggleIconColorHover,
    toggleIconColorPressed,
    toggleColorHover,
    toggleColorPressed,
    boxShadow2,
    primaryColorSuppl,
    textColor1,
    borderRadiusLarge,
    borderRadius,
    fontWeightStrong,
    boxShadow0,
    lineHeight,
    fontSize,
    dividerColor,
    primaryColor
  } = vars
  return {
    ...commonVars,
    borderRadius: borderRadiusLarge,
    lineHeight,
    fontSize,
    headerFontWeight: fontWeightStrong,
    iconColor: textColor2,
    color: popoverColor,
    panelDividerColor: dividerColor,
    descriptionFontSize: fontSize,
    textColor: textColor2,
    closeBorderRadius: borderRadius,
    closeIconColor: newTabIconColor,
    closeIconColorHover: newTabIconColorHover,
    closeIconColorPressed: newTabIconColorPressed,
    closeColorHover: newTabColorHover,
    closeColorPressed: newTabColorPressed,
    toggleBorderRadius: borderRadius,
    toggleColorHover,
    toggleColorPressed,
    toggleIconColor,
    toggleIconColorHover,
    toggleIconColorPressed,
    newTabBorderRadius: borderRadius,
    newTabColorHover,
    newTabColorPressed,
    newTabIconColor,
    newTabIconColorHover,
    newTabIconColorPressed,
    toolbarBackgroundColor: primaryColor,
    toolbarBackgroundColorHover: primaryColorSuppl,
    headerTextColor: textColor1,
    actionTextColor: textColor2,
    boxShadow: boxShadow0,
    boxShadowDraggable: boxShadow2
  }
}

export type FloatingPanelThemeVars = ReturnType<typeof self>

const floatingPanelLight = createTheme({
  name: 'FloatingPanel',
  common: commonLight,
  peers: {
    Scrollbar: scrollbarLight,
    Dropdown: dropdownLight
  },
  self
})

export default floatingPanelLight
export type FloatingPanelTheme = typeof floatingPanelLight
