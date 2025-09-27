import { composite } from 'seemly'
import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import { scrollbarLight } from '../../_internal/scrollbar/styles'
import { createTheme } from '../../_mixins'

export const self = (vars: ThemeCommonVars) => {
  const {
    baseColor,
    textColor2,
    bodyColor,
    cardColor,
    dividerColor,
    actionColor,
    scrollbarColor,
    scrollbarColorHover,
    invertedColor,
    boxShadow0,
    primaryColor
  } = vars
  return {
    textColor: textColor2,
    textColorInverted: '#FFF',
    color: bodyColor,
    colorEmbedded: actionColor,
    headerColor: cardColor,
    headerColorInverted: invertedColor,
    footerColor: actionColor,
    footerColorInverted: invertedColor,
    headerBorderColor: dividerColor,
    headerBorderColorInverted: invertedColor,
    footerBorderColor: dividerColor,
    footerBorderColorInverted: invertedColor,
    siderBorderColor: dividerColor,
    siderBorderColorInverted: invertedColor,
    siderColor: cardColor,
    siderColorInverted: invertedColor,
    siderToggleButtonBorder: `1px solid ${dividerColor}`,
    siderToggleButtonColor: baseColor,
    siderToggleBarColor: composite(bodyColor, scrollbarColor),
    siderToggleBarColorHover: composite(bodyColor, scrollbarColorHover),
    siderOverlayShadow: boxShadow0,
    siderResizeBarColor: primaryColor,
    siderResizeIconColor: dividerColor,
    siderResizeBorderColor: dividerColor,
    siderResizeTriggerColor: '#FFF',
    siderResizeTriggerHoverColor: '#F1F2F8',
    toggleButtonColor: 'white',
    invertToggleButtonColor: 'white',
    siderToggleButtonIconColorInverted: 'black',
    siderToggleButtonIconColor: 'black',
    // hack for inverted background
    __invertScrollbar: 'true'
  }
}

export type LayoutThemeVars = ReturnType<typeof self>

const layoutLight = createTheme({
  name: 'Layout',
  common: commonLight,
  peers: {
    Scrollbar: scrollbarLight
  },
  self
})

export default layoutLight
export type LayoutTheme = typeof layoutLight
