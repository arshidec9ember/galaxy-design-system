import commonVariables from './_common'
import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import type { Theme } from '../../_mixins'

export const self = (vars: ThemeCommonVars) => {
  const {
    fontWeightStrong,
    baseColor,
    textColorDisabled,
    primaryColor,
    textColor1,
    textColor2,
    successColor
  } = vars
  // TODO: remove hardcoded colors
  return {
    ...commonVariables,
    stepHeaderFontWeightProcess: fontWeightStrong,
    stepHeaderFontWeightWait: 'unset',
    stepHeaderFontWeightFinish: 'unset',
    stepHeaderFontWeightError: 'unset',
    indicatorIconColorProcess: textColor1,
    indicatorIconColorWait: '#5E658D',
    indicatorIconColorFinish: successColor,
    indicatorIconColorError: '#F04F6D',
    indicatorTextColorProcess: '#fff',
    indicatorTextColorWait: '#5E658D',
    indicatorTextColorFinish: successColor,
    indicatorTextColorError: '#F04F6D',
    indicatorBorderColorProcess: '#000',
    indicatorBorderColorWait: '#fff',
    indicatorBorderColorFinish: successColor,
    indicatorBorderColorError: '#F04F6D',
    hoverIndicatorBorderColorProcess: '#000',
    hoverIndicatorBorderColorWait: '#000',
    hoverIndicatorBorderColorFinish: primaryColor,
    hoverIndicatorBorderColorError: '#F04F6D',
    indicatorColorProcess: '#000',
    indicatorColorWait: baseColor,
    indicatorColorFinish: '#0000',
    indicatorColorError: '#0000',
    splitorColorProcess: textColorDisabled,
    splitorColorWait: textColorDisabled,
    splitorColorFinish: successColor,
    splitorColorError: textColorDisabled,
    hoverTextColorProcess: '#000',
    hoverTextColorWait: '#000',
    hoverTextColorFinish: '#000',
    hoverTextColorError: '#F04F6D',
    hoverDescriptionColorProcess: '#000',
    hoverDescriptionColorWait: '#000',
    hoverDescriptionColorFinish: '#000',
    hoverDescriptionColorError: '#F04F6D',
    hoverIndicatorColorProcess: baseColor,
    hoverIndicatorColorWait: '#000',
    hoverIndicatorColorFinish: primaryColor,
    hoverIndicatorColorError: '#F04F6D',
    splitorBorderStyleProcess: 'dashed',
    splitorBorderStyleWait: 'dashed',
    splitorBorderStyleFinish: 'solid',
    splitorBorderStyleError: 'dashed',
    headerTextColorProcess: textColor1,
    headerTextColorWait: '#5E658D',
    headerTextColorFinish: '#020D4D',
    headerTextColorError: textColor1,
    descriptionTextColorProcess: textColor2,
    descriptionTextColorWait: '#5E658D',
    descriptionTextColorFinish: '#020D4D',
    descriptionTextColorError: textColor2
  }
}

export type StepperThemeVars = ReturnType<typeof self>

const stepperLight: Theme<'Stepper', StepperThemeVars> = {
  name: 'Stepper',
  common: commonLight,
  self
}

export default stepperLight
export type StepperTheme = typeof stepperLight
