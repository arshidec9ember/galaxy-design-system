import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import type { Theme } from '../../_mixins/use-theme'

export const self = (vars: ThemeCommonVars) => {
  const {
    fontWeight,
    fontWeightStrong,
    dividerColor,
    fontSizeXLarge,
    fontSize,
    textColor1,
    textColor2
  } = vars
  return {
    fontSize,
    titleFontSize: fontSizeXLarge,
    activeTitleFontWeight: fontWeightStrong,
    titleFontWeight: fontWeight,
    dividerColor,
    textColor: textColor2,
    contentColor: textColor1,
    arrowColor: textColor2,
    itemMargin: '0 0 0 16px',
    contentMargin: '8px',
    boxedPadding: `${'var(--gds-space-4)'} ${'var(--gds-space-5)'}`,
    boxedContentPadding: `${'var(--gds-space-5)'}`,
    padding: `${'var(--gds-space-3)'}`,
    contentPadding: `${'var(--gds-space-4)'}`,
    borderRadius: `${'var(--gds-border-radius-m)'}`,
    arrowActiveColor: 'transparent',
    boxedBgColor: 'transparent',
    arrowBgColor: 'transparent',
    hoverColor: 'transparent',
    activeColor: 'transparent',
    disabledOpacity: '0.4'
  }
}

export type AccordionThemeVars = ReturnType<typeof self>

const accordionLight: Theme<'Accordion', AccordionThemeVars> = {
  name: 'Accordion',
  common: commonLight,
  self
}

export default accordionLight
export type AccordionTheme = typeof accordionLight
