import commonVariables from './_common'
import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import { type Theme } from '../../_mixins/use-theme'

const self = (vars: ThemeCommonVars) => {
  const {
    fontSize,
    fontSizeXLarge,
    fontWeightStrong,
    borderRadiusMini,
    borderColor
  } = vars
  return {
    ...commonVariables,
    fontSize,
    fontSizeXLarge,
    borderColor,
    fontWeightStrong,
    borderRadius: borderRadiusMini,
    lineNumberTextColor: '#5E658D',
    copyIconColor: '#7D83A6',
    chevronIconColor: '#7D83A6',
    backgroundColor: '#F6F7FA',
    lineNumberbackgroundColor: '#F1F2F8',
    bracketColor: '#020D4D',
    keyColor: '#812AF0',
    numberValueColor: '#A45B14',
    stringValueColor: '#036412',
    nullvalueColor: '#434B79',
    booleanValueColor: '#2A4FF0',
    undefinedValueColor: '#434B79',
    scrollbarColor: '#D4D7E6',
    commentColor: '#A45B14',
    optionColor: '#2A4FF0',
    backgroundColorDark: '#0F1B59',
    lineNumberbackgroundColorDark: '#10142E',
    borderColorDark: borderColor
  }
}

export type JsonViewerThemeVars = ReturnType<typeof self>

const jsonViewerLight: Theme<'JsonViewer', JsonViewerThemeVars> = {
  name: 'JsonViewer',
  common: commonLight,
  self
}

export default jsonViewerLight
export type JsonViewerTheme = typeof jsonViewerLight
