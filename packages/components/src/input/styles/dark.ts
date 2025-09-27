import commonVariables from './_common'
import { changeColor } from 'seemly'
import { commonDark } from '../../_styles/common'
import type { InputTheme } from './light'

const inputDark: InputTheme = {
  name: 'Input',
  common: commonDark,
  self (vars) {
    const {
      textColor2,
      textColor3,
      textColorDisabled,
      primaryColor,
      primaryColorHover,
      inputColor,
      inputColorDisabled,
      warningColor,
      warningColorHover,
      errorColor,
      errorColorHover,
      borderRadius,
      lineHeight,
      fontSizeXSmall,
      fontSizeSmall,
      fontSizeMedium,
      fontSizeLarge,
      heightXSmall,
      heightSmall,
      heightMedium,
      heightLarge,
      clearColor,
      clearColorHover,
      clearColorPressed,
      placeholderColor,
      placeholderColorDisabled,
      iconColor,
      iconColorDisabled,
      iconColorHover,
      iconColorPressed
    } = vars
    return {
      ...commonVariables,
      countTextColorDisabled: textColorDisabled,
      countTextColor: textColor3,
      heightXSmall,
      heightSmall,
      heightMedium,
      heightLarge,
      fontSizeXSmall,
      fontSizeSmall,
      fontSizeMedium,
      fontSizeLarge,
      lineHeight,
      lineHeightTextarea: lineHeight,
      borderRadius,
      iconSize: '16px',
      groupLabelColor: inputColor,
      textColor: textColor2,
      textColorDisabled,
      textDecorationColor: textColor2,
      groupLabelTextColor: textColor2,
      caretColor: primaryColor,
      placeholderColor,
      placeholderColorDisabled,
      color: inputColor,
      colorDisabled: inputColorDisabled,
      colorFocus: changeColor(primaryColor, { alpha: 0.1 }),
      groupLabelBorder: '1px solid #0000',
      border: '1px solid #0000',
      borderHover: `1px solid ${primaryColorHover}`,
      borderDisabled: '1px solid #0000',
      borderFocus: `1px solid ${primaryColorHover}`,
      boxShadowFocus: `0 0 8px 0 ${changeColor(primaryColor, { alpha: 0.3 })}`,
      loadingColor: primaryColor,
      // warning
      loadingColorWarning: warningColor,
      borderWarning: `1px solid ${warningColor}`,
      borderHoverWarning: `1px solid ${warningColorHover}`,
      colorFocusWarning: changeColor(warningColor, { alpha: 0.1 }),
      borderFocusWarning: `1px solid ${warningColorHover}`,
      boxShadowFocusWarning: `0 0 8px 0 ${changeColor(warningColor, {
        alpha: 0.3
      })}`,
      caretColorWarning: warningColor,
      // error
      loadingColorError: errorColor,
      borderError: `1px solid ${errorColor}`,
      borderHoverError: `1px solid ${errorColorHover}`,
      colorFocusError: changeColor(errorColor, { alpha: 0.1 }),
      borderFocusError: `1px solid ${errorColorHover}`,
      boxShadowFocusError: `0 0 8px 0 ${changeColor(errorColor, {
        alpha: 0.3
      })}`,
      caretColorError: errorColor,
      clearColor,
      clearColorHover,
      clearColorPressed,
      iconColor,
      iconColorDisabled,
      iconColorHover,
      iconColorPressed,
      suffixTextColor: textColor2,
      inputPrefixBackgroudColor: '#E6E7F2',
      backgroundColor: '#F6F7FA',
      borderRadiusLarge: '8px'
    }
  }
}

export default inputDark
