import commonVariables from './_common'
import { commonDark } from '../../_styles/common'
import type { JsonViewerTheme } from './light'

const jsonViewerDark: JsonViewerTheme = {
  name: 'JsonViewer',
  common: commonDark,
  self (vars) {
    const { borderRadiusMini, fontWeightStrong, fontSize, fontSizeXLarge } =
      vars
    return {
      ...commonVariables,
      fontSize,
      fontSizeXLarge,
      fontWeightStrong,
      borderRadius: borderRadiusMini,
      lineNumberTextColor: '#D4D7E6',
      copyIconColor: '#FFFFFF',
      chevronIconColor: '#FFFFFF',
      backgroundColor: '#2D353D',
      lineNumberbackgroundColor: '#454F59',
      bracketColor: '#FFFFFF',
      keyColor: '#B27AFF',
      numberValueColor: '#F09948',
      booleanValueColor: '#7E99FF',
      undefinedValueColor: '#9DA2BF',
      stringValueColor: '#49CF55',
      nullvalueColor: '#9DA2BF',
      scrollbarColor: '#D4D7E6',
      commentColor: '#F09948',
      optionColor: '#2A4FF0',
      backgroundColorDark: '#2D353D',
      lineNumberbackgroundColorDark: '#454F59',
      borderColor: '',
      borderColorDark: ''
    }
  }
}

export default jsonViewerDark
