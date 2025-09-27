import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import { scrollbarLight } from '../../_internal/scrollbar/styles'
import { createTheme } from '../../_mixins'

export const self = (vars: ThemeCommonVars) => {
  const {
    modalColor,
    textColor2,
    boxShadow3,
    lineHeight,
    fontWeightStrong,
    dividerColor,
    closeColorHover,
    closeColorPressed,
    closeIconColorHover,
    closeIconColorPressed,
    borderRadius,
    primaryColorHover
  } = vars
  return {
    bodyPadding: '16px 24px',
    headerPadding: '16px 24px',
    footerPadding: '24px 24px',
    color: modalColor,
    textColor: textColor2,
    closeIconColor: '#7D83A6',
    titleTextColor: '#020D4D',
    descriptionTextColor: '#434B79',
    titleFontSize: '20px',
    titleFontWeight: fontWeightStrong,
    boxShadow: boxShadow3,
    lineHeight,
    headerBorderBottom: `1px solid ${dividerColor}`,
    footerBorderTop: `1px solid ${dividerColor}`,
    closeIconColorHover,
    closeIconColorPressed,
    closeSize: '36px',
    closeIconSize: '20px',
    closeColorHover,
    closeColorPressed,
    closeBorderRadius: borderRadius,
    resizableTriggerColorHover: primaryColorHover
  }
}

export type DrawerThemeVars = ReturnType<typeof self>

const drawerLight = createTheme({
  name: 'Drawer',
  common: commonLight,
  peers: {
    Scrollbar: scrollbarLight
  },
  self
})

export default drawerLight
export type DrawerTheme = typeof drawerLight
