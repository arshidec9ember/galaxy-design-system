import { commonLight } from '../../_styles/common'
import type { Theme } from '../../_mixins'

export const self = () => ({
  toolbarBorderColor: 'var(--gds-color-border-neutral-dark1)',
  toolbarPadding: '0.5rem',
  toolbarHeight: '1.5rem',
  buttonSize: '1.5rem'
})

export type TextEditorThemeVars = ReturnType<typeof self>

const textEditorLight: Theme<'TextEditor', TextEditorThemeVars> = {
  name: 'TextEditor',
  common: commonLight,
  self
}

export default textEditorLight
export type TextEditorTheme = typeof textEditorLight
