import sizeVariables from './_common'
import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import { type Theme } from '../../_mixins'

export const self = (vars: ThemeCommonVars) => {
  const {
    textColor2,
    primaryColor,
    textColorDisabled,
    closeIconColor,
    closeIconColorHover,
    closeIconColorPressed,
    closeColorHover,
    closeColorPressed,
    tabColor,
    baseColor,
    dividerColor,
    fontWeight,
    textColor1,
    borderRadius,
    fontSize,
    fontWeightStrong
  } = vars
  return {
    ...sizeVariables,
    colorSegment: tabColor,
    tabFontSizeCard: fontSize,
    tabIconColor: 'var(--gds-color-icon-primary)',
    // Line
    tabTextColorLine: textColor1,
    tabTextColorActiveLine: primaryColor,
    tabTextColorHoverLine: primaryColor,
    tabTextColorDisabledLine: textColorDisabled,
    // Segment
    tabTextColorSegment: textColor1,
    tabTextColorActiveSegment: textColor2,
    tabTextColorHoverSegment: textColor2,
    tabTextColorDisabledSegment: textColorDisabled,
    // Bar
    tabTextColorBar: textColor1,
    tabTextColorActiveBar: primaryColor,
    tabTextColorHoverBar: primaryColor,
    tabTextColorDisabledBar: textColorDisabled,
    // Card
    tabTextColorCard: textColor1,
    tabTextColorHoverCard: textColor1,
    tabTextColorActiveCard: primaryColor,
    tabTextColorDisabledCard: textColorDisabled,
    barColor: primaryColor,
    closeIconColor,
    closeIconColorHover,
    closeIconColorPressed,
    closeColorHover,
    closeColorPressed,
    closeBorderRadius: borderRadius,
    tabColor,
    tabColorSegment: baseColor,
    tabBorderColor: dividerColor,
    tabFontWeightActive: fontWeightStrong,
    tabFontWeight: fontWeight,
    tabBorderRadius: borderRadius,
    paneTextColor: textColor2,
    fontWeightStrong
  }
}

export type TabsThemeVars = ReturnType<typeof self>

const tabsLight: Theme<'Tabs', TabsThemeVars> = {
  name: 'Tabs',
  common: commonLight,
  self
}

export default tabsLight
export type TabsTheme = typeof tabsLight
