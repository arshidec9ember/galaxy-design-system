import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import commonVariables from './_common'
import { type Theme } from '../../_mixins'

export const self = (vars: ThemeCommonVars) => {
  const {
    borderRadius,
    lineHeight,
    fontSize,
    textColor2,
    textColor1,
    dividerColor,
    boxShadow1,
    bodyColor,
    textColor3
  } = vars
  return {
    ...commonVariables,
    detailsViewLabelColor: textColor2,
    detailsViewValueColor: textColor3,
    lineHeight,
    color: bodyColor,
    textColor: textColor2,
    titleTextColor: textColor1,
    dividerColor,
    fontSizeSmall: fontSize,
    fontSizeMedium: fontSize,
    fontSizeLarge: fontSize,
    fontSizeHuge: fontSize,
    boxShadow: boxShadow1,
    expandedBackgroundColor: '#F1F2F8',
    borderRadius
  }
}

export type DetailsViewThemeVars = ReturnType<typeof self>

const detailsViewLight: Theme<'DetailsView', DetailsViewThemeVars> = {
  name: 'DetailsView',
  common: commonLight,
  self
}

export default detailsViewLight
export type DetailsViewTheme = typeof detailsViewLight
