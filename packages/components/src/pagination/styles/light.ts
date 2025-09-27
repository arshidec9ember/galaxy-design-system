import { popselectLight } from '../../popselect/styles'
import { selectLight } from '../../select/styles'
import { inputLight } from '../../input/styles'
import { commonLight, type ThemeCommonVars } from '../../_styles/common'
import commonVariables from './_common'
import { createTheme } from '../../_mixins'

export const self = (vars: ThemeCommonVars) => {
  const {
    primaryColor,
    inputColorDisabled,
    textColorDisabled,
    borderColor,
    borderRadius,
    // item font size
    fontSizeXSmall,
    fontSizeSmall,
    fontSizeMedium,
    // item size
    heightXSmall,
    heightSmall,
    heightMedium,
    clearColor,
    clearColorHover,
    clearColorPressed
  } = vars

  return {
    ...commonVariables,
    buttonColor: '#0000',
    buttonColorHover: 'rgb(28 39 95 / 6%)',
    buttonColorPressed: borderColor,
    buttonBorder: `1px solid ${borderColor}`,
    buttonBorderHover: `1px solid ${borderColor}`,
    buttonBorderPressed: `1px solid ${borderColor}`,
    buttonIconColor: '#020D4D',
    buttonIconColorHover: '#020D4D',
    buttonIconColorPressed: '#020D4D',
    itemTextColor: '#020D4D',
    itemTextColorHover: '#020D4D',
    itemTextColorPressed: '#020D4D',
    itemTextColorActive: '#020D4D',
    itemTextColorDisabled: textColorDisabled,
    itemColor: '#0000',
    itemColorHover: borderColor,
    itemColorPressed: borderColor,
    itemColorActive: borderColor,
    itemColorActiveHover: borderColor,
    itemColorDisabled: inputColorDisabled,
    itemBorder: '1px solid #0000',
    itemBorderHover: '1px solid #0000',
    itemBorderPressed: '1px solid #0000',
    itemBorderActive: `1px solid ${primaryColor}`,
    itemBorderDisabled: `1px solid ${borderColor}`,
    itemBorderRadius: borderRadius,
    itemSizeSmall: heightXSmall,
    itemSizeMedium: heightSmall,
    itemSizeLarge: heightMedium,
    itemFontSizeSmall: fontSizeXSmall,
    itemFontSizeMedium: fontSizeSmall,
    itemFontSizeLarge: fontSizeMedium,
    jumperFontSizeSmall: fontSizeXSmall,
    jumperFontSizeMedium: fontSizeSmall,
    jumperFontSizeLarge: fontSizeMedium,
    jumperTextColor: 'var(--gds-color-text-neutral)',
    jumperTextColorDisabled: textColorDisabled,
    clearColor,
    clearColorHover,
    clearColorPressed,
    arrowColor: '#7d83a6',
    // shadow mode variables
    shadowBoxShadow:
      '0px 2px 5px 0px rgba(2, 13, 75, 0.1), 0px -2px 5px 0px rgba(2, 13, 75, 0.1)',
    shadowPadding: '0.75rem'
  }
}

export type PaginationThemeVars = ReturnType<typeof self>

const paginationLight = createTheme({
  name: 'Pagination',
  common: commonLight,
  peers: {
    Select: selectLight,
    Input: inputLight,
    Popselect: popselectLight
  },
  self
})

export default paginationLight
export type PaginationTheme = typeof paginationLight
