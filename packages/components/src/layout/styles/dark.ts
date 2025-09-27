import { commonDark } from '../../_styles/common'
import { scrollbarDark } from '../../_internal/scrollbar/styles'
import type { LayoutTheme } from './light'
import { composite } from 'seemly'

const layoutDark: LayoutTheme = {
  name: 'Layout',
  common: commonDark,
  peers: {
    Scrollbar: scrollbarDark
  },
  self (vars) {
    const {
      primaryColor,
      textColor2,
      bodyColor,
      popoverColor,
      cardColor,
      dividerColor,
      scrollbarColor,
      scrollbarColorHover,
      boxShadow0
    } = vars
    return {
      textColor: textColor2,
      textColorInverted: textColor2,
      color: bodyColor,
      colorEmbedded: bodyColor,
      headerColor: cardColor,
      headerColorInverted: cardColor,
      footerColor: cardColor,
      footerColorInverted: cardColor,
      headerBorderColor: dividerColor,
      headerBorderColorInverted: dividerColor,
      footerBorderColor: dividerColor,
      footerBorderColorInverted: dividerColor,
      siderBorderColor: dividerColor,
      siderBorderColorInverted: dividerColor,
      siderColor: cardColor,
      siderColorInverted: cardColor,
      siderToggleButtonBorder: '1px solid transparent',
      siderToggleButtonColor: popoverColor,
      siderToggleBarColor: composite(bodyColor, scrollbarColor),
      siderToggleBarColorHover: composite(bodyColor, scrollbarColorHover),
      siderOverlayShadow: boxShadow0,
      siderResizeBarColor: primaryColor,
      siderResizeIconColor: dividerColor,
      siderResizeBorderColor: dividerColor,
      siderResizeTriggerColor: textColor2,
      siderResizeTriggerHoverColor: textColor2,
      toggleButtonColor: 'white',
      invertToggleButtonColor: 'white',
      siderToggleButtonIconColorInverted: 'black',
      siderToggleButtonIconColor: 'black',
      __invertScrollbar: 'false'
    }
  }
}

export default layoutDark
