import { changeColor, composite } from 'seemly'
import { scrollbarLight } from '../../_internal/scrollbar/styles'
import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import { createTheme } from '../../_mixins'
import commonVars from './_common'

export const self = (vars: ThemeCommonVars) => {
  const {
    textColor2,
    successColor,
    infoColor,
    warningColor,
    errorColor,
    popoverColor,
    closeIconColor,
    closeIconColorHover,
    closeIconColorPressed,
    closeColorHover,
    closeColorPressed,
    textColor1,
    textColor3,
    borderRadius,
    fontWeightStrong,
    boxShadow0,
    lineHeight,
    baseColor,
    fontSize
  } = vars
  return {
    ...commonVars,
    borderRadius,
    lineHeight,
    fontSize,
    headerFontWeight: fontWeightStrong,
    iconColor: textColor2,
    iconColorSuccess: successColor,
    iconColorInfo: infoColor,
    iconColorWarning: warningColor,
    color: popoverColor,
    colorSuccess: composite(
      baseColor,
      changeColor(successColor, { alpha: 0.08 })
    ),
    colorInfo: composite(baseColor, changeColor(infoColor, { alpha: 0.08 })),
    colorWarning: composite(
      baseColor,
      changeColor(warningColor, { alpha: 0.08 })
    ),
    colorError: composite(baseColor, changeColor(errorColor, { alpha: 0.08 })),
    iconColorError: errorColor,
    textColor: textColor2,
    closeIconColor,
    closeIconColorHover,
    closeIconColorPressed,
    closeBorderRadius: borderRadius,
    closeColorHover,
    closeColorPressed,
    headerTextColor: textColor1,
    descriptionTextColor: textColor3,
    actionTextColor: textColor2,
    boxShadow: boxShadow0
  }
}

export type NotificationThemeVars = ReturnType<typeof self>

const notificationLight = createTheme({
  name: 'Notification',
  common: commonLight,
  peers: {
    Scrollbar: scrollbarLight
  },
  self
})

export default notificationLight
export type NotificationTheme = typeof notificationLight
