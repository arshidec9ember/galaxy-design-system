import { changeColor } from 'seemly'
import { buttonLight } from '../../button/styles'
import { progressLight } from '../../progress/styles'
import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import { createTheme } from '../../_mixins'

export const self = (vars: ThemeCommonVars) => {
  const {
    iconColor,
    primaryColor,
    errorColor,
    successColor,
    opacityDisabled,
    actionColor,
    hoverColor,
    lineHeight,
    uploaderBorderRadius,
    fontSize,
    uploaderBorderColor,
    uploaderTextColor,
    uploaderListBorderRadius
  } = vars
  return {
    fontSize,
    lineHeight,
    borderRadius: uploaderBorderRadius,
    draggerColor: actionColor,
    draggerBorder: `1px dashed ${uploaderBorderColor}`,
    draggerBorderHover: `1px dashed ${primaryColor}`,
    itemColorHover: hoverColor,
    itemColorHoverError: changeColor(errorColor, {
      alpha: 0.06
    }),
    itemTextColor: uploaderTextColor,
    itemTextColorError: errorColor,
    itemTextColorSuccess: successColor,
    itemIconColor: iconColor,
    itemDisabledOpacity: opacityDisabled,
    itemBorderImageCardError: `1px solid ${errorColor}`,
    itemBorderImageCard: `1px solid ${uploaderBorderColor}`,
    trashIconColor: errorColor,
    downloadTextColor: primaryColor,
    uploaderBorderColor,
    uploaderListBorderRadius
  }
}

export type UploadThemeVars = ReturnType<typeof self>

const uploadLight = createTheme({
  name: 'Upload',
  common: commonLight,
  peers: {
    Button: buttonLight,
    Progress: progressLight
  },
  self
})

export default uploadLight
export type UploadTheme = typeof uploadLight
