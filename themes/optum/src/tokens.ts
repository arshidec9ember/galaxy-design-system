import { type Foundation } from './interface'

export default function getTokens (
  foundations: Foundation
): Record<string, string> {
  return {
    // color tokens
    '--gds-color-icon-primary-dark': foundations.colors.iconPrimaryDark,
    '--gds-color-bg-success-light4': foundations.colors.bgSuccessLight4,
    '--gds-color-bg-success-light3': foundations.colors.bgSuccessLight3,
    '--gds-color-bg-primary-light3': foundations.colors.bgPrimaryLight3,
    '--gds-color-bg-primary-light2': foundations.colors.bgPrimaryLight2,
    '--gds-color-bg-primary-light1': foundations.colors.bgPrimaryLight1,
    '--gds-color-bg-primary': foundations.colors.bgPrimary,
    '--gds-color-bg-primary-dark1': foundations.colors.bgPrimaryDark1,
    '--gds-color-bg-primary-dark2': foundations.colors.bgPrimaryDark2,
    '--gds-color-bg-neutral-light': foundations.colors.bgNeutralLight,
    '--gds-color-bg-neutral': foundations.colors.bgNeutral,
    '--gds-color-bg-neutral-dark1': foundations.colors.bgNeutralDark1,
    '--gds-color-bg-neutral-dark2': foundations.colors.bgNeutralDark2,
    '--gds-color-bg-success-light2': foundations.colors.bgSuccessLight2,
    '--gds-color-bg-success-light1': foundations.colors.bgSuccessLight1,
    '--gds-color-bg-success-dark1': foundations.colors.bgSuccessDark1,
    '--gds-color-bg-success-dark2': foundations.colors.bgSuccessDark2,
    '--gds-color-bg-success': foundations.colors.bgSuccess,
    '--gds-color-bg-danger-light3': foundations.colors.bgDangerLight3,
    '--gds-color-bg-danger-light2': foundations.colors.bgDangerLight2,
    '--gds-color-bg-danger-light1': foundations.colors.bgDangerLight1,
    '--gds-color-bg-danger': foundations.colors.bgDanger,
    '--gds-color-bg-danger-dark1': foundations.colors.bgDangerDark1,
    '--gds-color-bg-danger-dark2': foundations.colors.bgDangerDark2,
    '--gds-color-bg-warning-light2': foundations.colors.bgWarningLight2,
    '--gds-color-bg-warning': foundations.colors.bgWarning,
    '--gds-color-bg-info-light2': foundations.colors.bgInfoLight2,
    '--gds-color-bg-info': foundations.colors.bgInfo,
    '--gds-color-bg-info-dark1': foundations.colors.bgInfoDark1,
    '--gds-color-bg-light': foundations.colors.bgLight,
    '--gds-color-bg-dark': foundations.colors.bgDark,
    '--gds-color-bg-nav-light': foundations.colors.bgNavLight,
    '--gds-color-bg-nav-neutral': foundations.colors.bgNavNeutral,
    '--gds-color-bg-nav-dark': foundations.colors.bgNavDark,
    '--gds-color-bg-nav-dark-selected': foundations.colors.bgNavDarkSelected,
    '--gds-color-bg-button-primary': foundations.colors.bgButtonPrimary,
    '--gds-color-bg-button-primary-dark1':
      foundations.colors.bgButtonPrimaryDark1,
    '--gds-color-bg-button-primary-dark2':
      foundations.colors.bgButtonPrimaryDark2,
    '--gds-color-bg-button-secondary': foundations.colors.bgButtonSecondary,
    '--gds-color-bg-button-secondary-dark1':
      foundations.colors.bgButtonSecondaryDark1,
    '--gds-color-bg-button-tertiary-dark1':
      foundations.colors.bgButtonTertiaryDark1,
    '--gds-color-bg-button-tertiary-dark2':
      foundations.colors.bgButtonTertiaryDark2,
    '--gds-color-bg-button-danger-primary':
      foundations.colors.bgButtonDangerPrimary,
    '--gds-color-bg-button-danger-primary-dark1':
      foundations.colors.bgButtonDangerPrimaryDark1,
    '--gds-color-bg-button-danger-primary-dark2':
      foundations.colors.bgButtonDangerPrimaryDark2,
    '--gds-color-bg-button-danger-secondary':
      foundations.colors.bgButtonDangerSecondary,
    '--gds-color-bg-button-danger-secondary-dark1':
      foundations.colors.bgButtonDangerSecondaryDark1,
    '--gds-color-bg-button-danger-secondary-dark2':
      foundations.colors.bgButtonDangerSecondaryDark2,
    '--gds-color-bg-button-danger-tertiary':
      foundations.colors.bgButtonDangerTertiary,
    '--gds-color-bg-button-danger-tertiary-dark1':
      foundations.colors.bgButtonDangerTertiaryDark1,
    '--gds-color-bg-button-danger-tertiary-dark2':
      foundations.colors.bgButtonDangerTertiaryDark2,
    '--gds-color-bg-support-cyan-light3':
      foundations.colors.bgSupportCyanLight3,
    '--gds-color-bg-support-cyan-light2':
      foundations.colors.bgSupportCyanLight2,
    '--gds-color-bg-support-cyan-light1':
      foundations.colors.bgSupportCyanLight1,
    '--gds-color-bg-support-cyan': foundations.colors.bgSupportCyan,
    '--gds-color-bg-support-cyan-dark1': foundations.colors.bgSupportCyanDark1,
    '--gds-color-bg-support-cyan-dark2': foundations.colors.bgSupportCyanDark2,
    '--gds-color-bg-support-pink-light3':
      foundations.colors.bgSupportPinkLight3,
    '--gds-color-bg-support-pink-light2':
      foundations.colors.bgSupportPinkLight2,
    '--gds-color-bg-support-pink-light1':
      foundations.colors.bgSupportPinkLight1,
    '--gds-color-bg-support-pink': foundations.colors.bgSupportPink,
    '--gds-color-bg-support-pink-dark1': foundations.colors.bgSupportPinkDark1,
    '--gds-color-bg-support-pink-dark2': foundations.colors.bgSupportPinkDark2,
    '--gds-color-bg-support-violet-light3':
      foundations.colors.bgSupportVioletLight3,
    '--gds-color-bg-support-violet-light2':
      foundations.colors.bgSupportVioletLight2,
    '--gds-color-bg-support-violet-light1':
      foundations.colors.bgSupportVioletLight1,
    '--gds-color-bg-support-violet': foundations.colors.bgSupportViolet,
    '--gds-color-bg-support-violet-dark1':
      foundations.colors.bgSupportVioletDark1,
    '--gds-color-bg-support-violet-dark2':
      foundations.colors.bgSupportVioletDark2,
    '--gds-color-bg-support-indigo-light2':
      foundations.colors.bgSupportIndigoLight2,
    '--gds-color-bg-support-indigo-light1':
      foundations.colors.bgSupportIndigoLight1,
    '--gds-color-bg-support-indigo': foundations.colors.bgSupportIndigo,
    '--gds-color-bg-support-indigo-dark1':
      foundations.colors.bgSupportIndigoDark1,
    '--gds-color-bg-support-indigo-dark2':
      foundations.colors.bgSupportIndigoDark2,
    '--gds-color-bg-support-grape-light2':
      foundations.colors.bgSupportGrapeLight2,
    '--gds-color-bg-support-grape-light1':
      foundations.colors.bgSupportGrapeLight1,
    '--gds-color-bg-support-grape': foundations.colors.bgSupportGrape,
    '--gds-color-bg-support-grape-dark1':
      foundations.colors.bgSupportGrapeDark1,
    '--gds-color-bg-support-grape-dark2':
      foundations.colors.bgSupportGrapeDark2,
    '--gds-color-bg-support-lime-light2':
      foundations.colors.bgSupportLimeLight2,
    '--gds-color-bg-support-lime-light1':
      foundations.colors.bgSupportLimeLight1,
    '--gds-color-bg-support-lime': foundations.colors.bgSupportLime,
    '--gds-color-bg-support-lime-dark1': foundations.colors.bgSupportLimeDark1,
    '--gds-color-bg-support-lime-dark2': foundations.colors.bgSupportLimeDark2,
    '--gds-color-bg-support-yellow-light3':
      foundations.colors.bgSupportYellowLight3,
    '--gds-color-bg-support-yellow-light2':
      foundations.colors.bgSupportYellowLight2,
    '--gds-color-bg-support-yellow-light1':
      foundations.colors.bgSupportYellowLight1,
    '--gds-color-bg-support-yellow': foundations.colors.bgSupportYellow,
    '--gds-color-bg-support-yellow-dark1':
      foundations.colors.bgSupportYellowDark1,
    '--gds-color-bg-support-yellow-dark2':
      foundations.colors.bgSupportYellowDark2,
    '--gds-color-bg-accent1-light': foundations.colors.bgAccent1Light,
    '--gds-color-bg-accent1': foundations.colors.bgAccent1,
    '--gds-color-bg-accent1-dark': foundations.colors.bgAccent1Dark,
    '--gds-color-bg-accent2-light': foundations.colors.bgAccent2Light,
    '--gds-color-bg-accent2': foundations.colors.bgAccent2,
    '--gds-color-bg-accent2-dark': foundations.colors.bgAccent2Dark,
    '--gds-color-text-primary': foundations.colors.textPrimary,
    '--gds-color-text-primary-dark1': foundations.colors.textPrimaryDark1,
    '--gds-color-text-success': foundations.colors.textSuccess,
    '--gds-color-text-danger': foundations.colors.textDanger,
    '--gds-color-text-warning': foundations.colors.textWarning,
    '--gds-color-text-info': foundations.colors.textInfo,
    '--gds-color-text-neutral-light3': foundations.colors.textNeutralLight3,
    '--gds-color-text-neutral-light2': foundations.colors.textNeutralLight2,
    '--gds-color-text-neutral-light1': foundations.colors.textNeutralLight1,
    '--gds-color-text-neutral': foundations.colors.textNeutral,
    '--gds-color-text-support-violet-light':
      foundations.colors.textSupportVioletLight,
    '--gds-color-text-button-primary': foundations.colors.textButtonPrimary,
    '--gds-color-text-button-secondary': foundations.colors.textButtonSecondary,
    '--gds-color-text-button-tertiary': foundations.colors.textButtonTertiary,
    '--gds-color-text-button-danger-primary':
      foundations.colors.textButtonDangerPrimary,
    '--gds-color-text-button-danger-secondary':
      foundations.colors.textButtonDangerSecondary,
    '--gds-color-text-button-danger-tertiary':
      foundations.colors.textButtonDangerTertiary,
    '--gds-color-text-light': foundations.colors.textLight,
    '--gds-color-text-inverse': foundations.colors.textInverse,
    '--gds-color-border-primary-light': foundations.colors.borderPrimaryLight,
    '--gds-color-border-primary': foundations.colors.borderPrimary,
    '--gds-color-border-neutral-light1': foundations.colors.borderNeutralLight1,
    '--gds-color-border-neutral': foundations.colors.borderNeutral,
    '--gds-color-border-neutral-dark1': foundations.colors.borderNeutralDark1,
    '--gds-color-border-success': foundations.colors.borderSuccess,
    '--gds-color-border-danger': foundations.colors.borderDanger,
    '--gds-color-border-warning': foundations.colors.borderWarning,
    '--gds-color-border-info': foundations.colors.borderInfo,
    '--gds-color-border-support-cyan': foundations.colors.borderSupportCyan,
    '--gds-color-border-support-violet': foundations.colors.borderSupportViolet,
    '--gds-color-border-support-pink': foundations.colors.borderSupportPink,
    '--gds-color-border-inverse': foundations.colors.borderInverse,
    '--gds-color-border-button-secondary':
      foundations.colors.borderButtonSecondary,
    '--gds-color-border-button-secondary-dark1':
      foundations.colors.borderButtonSecondaryDark1,
    '--gds-color-border-button-secondary-dark2':
      foundations.colors.borderButtonSecondaryDark2,
    '--gds-color-border-accent1': foundations.colors.borderAccent1,
    '--gds-color-border-accent2': foundations.colors.borderAccent2,
    '--gds-color-icon-primary': foundations.colors.iconPrimary,
    '--gds-color-bg-tab-primary': foundations.colors.bgTabPrimary,
    '--gds-color-icon-secondary': foundations.colors.iconSecondary,
    '--gds-color-icon-neutral-light': foundations.colors.iconNeutralLight,
    '--gds-color-icon-neutral': foundations.colors.iconNeutral,
    '--gds-color-icon-neutral-dark1': foundations.colors.iconNeutralDark1,
    '--gds-color-icon-inverse': foundations.colors.iconInverse,
    '--gds-color-icon-inverse-dark': foundations.colors.iconInverseDark,
    '--gds-color-icon-success': foundations.colors.iconSuccess,
    '--gds-color-icon-danger': foundations.colors.iconDanger,
    '--gds-color-icon-warning': foundations.colors.iconWarning,
    '--gds-color-icon-info': foundations.colors.iconInfo,
    '--gds-color-bg-base': foundations.colors.bgBase,
    '--gds-color-border-button-danger-secondary':
      foundations.colors.borderButtonDangerSecondary,
    '--gds-color-bg-button-secondary-dark2':
      foundations.colors.bgButtonSecondaryDark2,
    '--gds-color-text-primary-dark2': foundations.colors.textPrimaryDark2,
    '--gds-color-text-support-cyan': foundations.colors.textSupportCyan,
    '--gds-color-text-support-pink': foundations.colors.textSupportPink,
    '--gds-color-text-support-violet': foundations.colors.textSupportViolet,
    '--gds-color-border-nav-dark': foundations.colors.borderNavDark,
    '--gds-color-icon-support-violet': foundations.colors.iconSupportViolet,
    '--gds-color-border-neutral-dark2': foundations.colors.borderNeutralDark2,
    '--gds-color-border-neutral-dark3': foundations.colors.borderNeutralDark3,
    '--gds-color-bg-neutral-dark3': foundations.colors.bgNeutralDark3,
    '--gds-color-border-neutral-light2': foundations.colors.borderNeutralLight2,
    '--gds-color-border-danger-dark': foundations.colors.borderDangerDark,
    '--gds-color-border-info-dark1': foundations.colors.borderInfoDark1,
    '--gds-color-border-success-dark': foundations.colors.borderSuccessDark,
    '--gds-color-border-warning-dark': foundations.colors.borderWarningDark,
    '--gds-color-text-info-dark1': foundations.colors.textInfoDark1,
    '--gds-color-text-info-dark2': foundations.colors.textInfoDark2,
    '--gds-color-icon-info-dark1': foundations.colors.iconInfoDark1,
    '--gds-color-icon-info-dark2': foundations.colors.iconInfoDark2,
    '--gds-color-icon-info-dark3': foundations.colors.iconInfoDark3,
    '--gds-color-bg-button-static-primary':
      foundations.colors.bgButtonStaticPrimary,
    '--gds-color-bg-button-static-primary-dark1':
      foundations.colors.bgButtonStaticPrimaryDark1,
    '--gds-color-bg-button-static-primary-dark2':
      foundations.colors.bgButtonStaticPrimaryDark2,
    '--gds-color-text-button-static-primary':
      foundations.colors.textButtonStaticPrimary,
    '--gds-color-bg-button-static-secondary-dark1':
      foundations.colors.bgButtonStaticSecondaryDark1,
    '--gds-color-bg-button-static-secondary-dark2':
      foundations.colors.bgButtonStaticSecondaryDark2,
    '--gds-color-bg-button-static-tertiary-dark1':
      foundations.colors.bgButtonStaticTertiaryDark1,
    '--gds-color-bg-button-static-tertiary-dark2':
      foundations.colors.bgButtonStaticTertiaryDark2,
    '--gds-color-border-button-static-secondary':
      foundations.colors.borderButtonStaticSecondary,
    '--gds-color-text-button-static-secondary':
      foundations.colors.textButtonStaticSecondary,
    '--gds-color-text-button-static-tertiary':
      foundations.colors.textButtonStaticTertiary,
    '--gds-color-bg-neutral-dark5': foundations.colors.bgNeutralDark5,
    '--gds-color-bg-warning-light1': foundations.colors.bgWarningLight1,
    '--gds-color-bg-warning-dark1': foundations.colors.bgWarningDark1,
    '--gds-color-bg-warning-dark2': foundations.colors.bgWarningDark2,
    '--gds-color-bg-info-light1': foundations.colors.bgInfoLight1,
    '--gds-color-bg-info-dark2': foundations.colors.bgInfoDark2,
    '--gds-color-bg-neutral-dark4': foundations.colors.bgNeutralDark4,
    '--gds-color-border-info-dark2': foundations.colors.borderInfoDark2,
    '--gds-color-bg-nav-dark-light1': foundations.colors.bgNavDarkLight1,
    '--gds-color-bg-nav-dark-light2': foundations.colors.bgNavDarkLight2,
    '--gds-color-icon-neutral-dark2': foundations.colors.iconNeutralDark2,
    // dark theme in light mode
    '--gds-color-text-neutral-dark': foundations.colors.textNeutralDark,
    '--gds-color-icon-neutral-dark': foundations.colors.iconNeutralDark,
    '--gds-color-icon-neutral-light-dark1':
      foundations.colors.iconNeutralLightDark1,
    '--gds-color-bg-neutral-light-dark': foundations.colors.bgNeutralLightDark,
    '--gds-color-border-neutral-dark': foundations.colors.borderNeutralDark,
    '--gds-color-text-violet-dark': foundations.colors.textVioletDark,
    '--gds-color-text-success-dark': foundations.colors.textSuccessDark,
    '--gds-color-text-warning-dark': foundations.colors.textWarningDark,
    '--gds-color-text-info-dark': foundations.colors.textInfoDark,

    // otherTokens
    '--gds-font-size-11': foundations.typography.fontSize[11],
    '--gds-font-size-12': foundations.typography.fontSize[12],
    '--gds-font-size-14': foundations.typography.fontSize[14],
    '--gds-font-size-16': foundations.typography.fontSize[16],
    '--gds-font-size-18': foundations.typography.fontSize[18],
    '--gds-font-size-20': foundations.typography.fontSize[20],
    '--gds-font-size-24': foundations.typography.fontSize[24],
    '--gds-font-size-28': foundations.typography.fontSize[28],
    '--gds-font-size-32': foundations.typography.fontSize[32],
    '--gds-font-size-36': foundations.typography.fontSize[36],
    '--gds-font-size-42': foundations.typography.fontSize[42],
    '--gds-letter-spacing-0': foundations.typography.space[0],
    '--gds-letter-spacing-1': foundations.typography.space[1],
    '--gds-letter-spacing-2': foundations.typography.space[2],

    '--gds-line-height-16': foundations.typography.lineHeight[16],
    '--gds-line-height-18': foundations.typography.lineHeight[18],
    '--gds-line-height-20': foundations.typography.lineHeight[20],
    '--gds-line-height-24': foundations.typography.lineHeight[24],
    '--gds-line-height-28': foundations.typography.lineHeight[28],
    '--gds-line-height-30': foundations.typography.lineHeight[30],
    '--gds-line-height-32': foundations.typography.lineHeight[32],
    '--gds-line-height-36': foundations.typography.lineHeight[36],
    '--gds-line-height-40': foundations.typography.lineHeight[40],

    '--gds-space-0': foundations.typography.space[0],
    '--gds-space-1': foundations.typography.space[1],
    '--gds-space-2': foundations.typography.space[2],
    '--gds-space-3': foundations.typography.space[3],
    '--gds-space-4': foundations.typography.space[4],
    '--gds-space-5': foundations.typography.space[5],
    '--gds-space-6': foundations.typography.space[6],
    '--gds-space-7': foundations.typography.space[7],
    '--gds-space-8': foundations.typography.space[8],
    '--gds-space-9': foundations.typography.space[9],
    '--gds-space-10': foundations.typography.space[10],
    '--gds-space-11': foundations.typography.space[11],
    '--gds-space-12': foundations.typography.space[12],
    '--gds-space-13': foundations.typography.space[13],
    '--gds-space-14': foundations.typography.space[14],
    '--gds-space-15': foundations.typography.space[15],

    '--gds-opacity-0': foundations.typography.opacity[0],
    '--gds-opacity-10': foundations.typography.opacity[10],
    '--gds-opacity-20': foundations.typography.opacity[20],
    '--gds-opacity-40': foundations.typography.opacity[40],
    '--gds-opacity-60': foundations.typography.opacity[60],
    '--gds-opacity-80': foundations.typography.opacity[80],
    '--gds-opacity-100': foundations.typography.opacity[100],
    '--gds-border-radius-xxs': foundations.typography.borderRadius.xxs,
    '--gds-border-radius-xs': foundations.typography.borderRadius.xs,
    '--gds-border-radius-s': foundations.typography.borderRadius.s,
    '--gds-border-radius-m': foundations.typography.borderRadius.m,
    '--gds-border-radius-l': foundations.typography.borderRadius.l,
    '--gds-border-radius-xl': foundations.typography.borderRadius.xl,
    '--gds-border-radius-xxl': foundations.typography.borderRadius.xxl,
    '--gds-border-radius-xxxl': foundations.typography.borderRadius.xxxl,
    '--gds-border-radius-circle': foundations.typography.borderRadius.circle,

    '--gds-font-weight-regular': foundations.typography.fontWeight.regular,
    '--gds-font-weight-medium': foundations.typography.fontWeight.medium,
    '--gds-font-weight-bold': foundations.typography.fontWeight.bold,
    '--gds-font-weight-semibold': foundations.typography.fontWeight.semibold,

    '--gds-font-heading-1-sb': `${foundations.typography.fontWeight.semibold} ${foundations.typography.fontSize[24]} / ${foundations.typography.lineHeight[36]} ${foundations.typography.fontFamily.sans}`,
    '--gds-font-heading-2-sb': `${foundations.typography.fontWeight.semibold} ${foundations.typography.fontSize[20]} / ${foundations.typography.lineHeight[32]} ${foundations.typography.fontFamily.sans}`,
    '--gds-font-heading-3-m': `${foundations.typography.fontWeight.medium} ${foundations.typography.fontSize[18]} / ${foundations.typography.lineHeight[24]} ${foundations.typography.fontFamily.sans}`,
    '--gds-font-heading-4-r': `${foundations.typography.fontWeight.regular} ${foundations.typography.fontSize[16]} / ${foundations.typography.lineHeight[24]} ${foundations.typography.fontFamily.sans}`,
    '--gds-font-heading-4-m': `${foundations.typography.fontWeight.medium} ${foundations.typography.fontSize[16]} / ${foundations.typography.lineHeight[24]} ${foundations.typography.fontFamily.sans}`,
    '--gds-font-heading-5-m': `${foundations.typography.fontWeight.medium} ${foundations.typography.fontSize[14]} / ${foundations.typography.lineHeight[20]} ${foundations.typography.fontFamily.sans}`,
    '--gds-font-heading-6-r': `${foundations.typography.fontWeight.regular} ${foundations.typography.fontSize[12]} / ${foundations.typography.lineHeight[16]} ${foundations.typography.fontFamily.sans}`,
    '--gds-font-heading-6-m': `${foundations.typography.fontWeight.medium} ${foundations.typography.fontSize[12]} / ${foundations.typography.lineHeight[16]} ${foundations.typography.fontFamily.sans}`,

    '--gds-font-body-1-r': `${foundations.typography.fontWeight.regular} ${foundations.typography.fontSize[18]} / ${foundations.typography.lineHeight[24]} ${foundations.typography.fontFamily.sans}`,
    '--gds-font-body-1-m': `${foundations.typography.fontWeight.medium} ${foundations.typography.fontSize[18]} / ${foundations.typography.lineHeight[24]} ${foundations.typography.fontFamily.sans}`,
    '--gds-font-body-2-r': `${foundations.typography.fontWeight.regular} ${foundations.typography.fontSize[16]} / ${foundations.typography.lineHeight[24]} ${foundations.typography.fontFamily.sans}`,
    '--gds-font-body-2-m': `${foundations.typography.fontWeight.medium} ${foundations.typography.fontSize[16]} / ${foundations.typography.lineHeight[24]} ${foundations.typography.fontFamily.sans}`,
    '--gds-font-body-3-r': `${foundations.typography.fontWeight.regular} ${foundations.typography.fontSize[14]} / ${foundations.typography.lineHeight[16]} ${foundations.typography.fontFamily.sans}`,
    '--gds-font-body-3-m': `${foundations.typography.fontWeight.medium} ${foundations.typography.fontSize[14]} / ${foundations.typography.lineHeight[16]} ${foundations.typography.fontFamily.sans}`,
    '--gds-font-body-4-r': `${foundations.typography.fontWeight.regular} ${foundations.typography.fontSize[12]} / ${foundations.typography.lineHeight[16]} ${foundations.typography.fontFamily.sans}`,
    '--gds-font-body-4-m': `${foundations.typography.fontWeight.medium} ${foundations.typography.fontSize[12]} / ${foundations.typography.lineHeight[16]} ${foundations.typography.fontFamily.sans}`,
    '--gds-font-body-5-m': `${foundations.typography.fontWeight.medium} ${foundations.typography.fontSize[11]} / ${foundations.typography.lineHeight[16]} ${foundations.typography.fontFamily.sans}`,
    '--gds-font-body-5-r': `${foundations.typography.fontWeight.regular} ${foundations.typography.fontSize[11]} / ${foundations.typography.lineHeight[16]} ${foundations.typography.fontFamily.sans}`,

    '--gds-font-code-1-r': `${foundations.typography.fontWeight.regular} ${foundations.typography.fontSize[14]} / ${foundations.typography.lineHeight[20]} ${foundations.typography.fontFamily.mono}`,

    '--gds-font-label-1-r': `${foundations.typography.fontWeight.regular} ${foundations.typography.fontSize[14]} / ${foundations.typography.lineHeight[16]} ${foundations.typography.fontFamily.sans}`,
    '--gds-font-label-1-m': `${foundations.typography.fontWeight.medium} ${foundations.typography.fontSize[14]} / ${foundations.typography.lineHeight[16]} ${foundations.typography.fontFamily.sans}`,
    '--gds-font-label-2-r': `${foundations.typography.fontWeight.regular} ${foundations.typography.fontSize[12]} / ${foundations.typography.lineHeight[16]} ${foundations.typography.fontFamily.sans}`,
    '--gds-font-label-2-m': `${foundations.typography.fontWeight.medium} ${foundations.typography.fontSize[12]} / ${foundations.typography.lineHeight[16]} ${foundations.typography.fontFamily.sans}`,

    '--gds-font-paragraph-1-r': `${foundations.typography.fontWeight.regular} ${foundations.typography.fontSize[16]} / ${foundations.typography.lineHeight[24]} ${foundations.typography.fontFamily.sans}`,
    '--gds-font-paragraph-1-m': `${foundations.typography.fontWeight.medium} ${foundations.typography.fontSize[16]} / ${foundations.typography.lineHeight[24]} ${foundations.typography.fontFamily.sans}`,
    '--gds-font-paragraph-2-r': `${foundations.typography.fontWeight.regular} ${foundations.typography.fontSize[14]} / ${foundations.typography.lineHeight[20]} ${foundations.typography.fontFamily.sans}`,
    '--gds-font-paragraph-2-m': `${foundations.typography.fontWeight.medium} ${foundations.typography.fontSize[14]} / ${foundations.typography.lineHeight[20]} ${foundations.typography.fontFamily.sans}`,
    '--gds-font-paragraph-3-r': `${foundations.typography.fontWeight.regular} ${foundations.typography.fontSize[12]} / ${foundations.typography.lineHeight[16]} ${foundations.typography.fontFamily.sans}`,
    '--gds-font-paragraph-3-m': `${foundations.typography.fontWeight.medium} ${foundations.typography.fontSize[12]} / ${foundations.typography.lineHeight[16]} ${foundations.typography.fontFamily.sans}`,

    '--gds-font-link-1-r': `${foundations.typography.fontWeight.regular} ${foundations.typography.fontSize[18]} / ${foundations.typography.lineHeight[24]} ${foundations.typography.fontFamily.sans}`,
    '--gds-font-link-1-m': `${foundations.typography.fontWeight.medium} ${foundations.typography.fontSize[18]} / ${foundations.typography.lineHeight[24]} ${foundations.typography.fontFamily.sans}`,
    '--gds-font-link-2-r': `${foundations.typography.fontWeight.regular} ${foundations.typography.fontSize[14]} / ${foundations.typography.lineHeight[16]} ${foundations.typography.fontFamily.sans}`,
    '--gds-font-link-2-m': `${foundations.typography.fontWeight.medium} ${foundations.typography.fontSize[14]} / ${foundations.typography.lineHeight[16]} ${foundations.typography.fontFamily.sans}`,
    '--gds-font-link-3-r': `${foundations.typography.fontWeight.regular} ${foundations.typography.fontSize[12]} / ${foundations.typography.lineHeight[16]} ${foundations.typography.fontFamily.sans}`,
    '--gds-font-link-3-m': `${foundations.typography.fontWeight.medium} ${foundations.typography.fontSize[12]} / ${foundations.typography.lineHeight[16]} ${foundations.typography.fontFamily.sans}`
  }
}
