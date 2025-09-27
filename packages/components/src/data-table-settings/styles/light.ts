import commonVariables from './_common'
import { commonLight } from '../../_styles/common'
import type { ThemeCommonVars } from '../../_styles/common'
import type { Theme } from '../../_mixins'

export const self = (vars: ThemeCommonVars) => {
  const { primaryColor } = vars
  return {
    ...commonVariables,
    color: primaryColor,
    settingsItemHeaderBoxShadow: '0px 2px 5px 0px #020d4b1a',
    triggerIconColor: '#7D83A6',
    reorderingIconColor: '#30396d',
    dragItemBgColor: '#fff',
    dragListItemBgColor: '#fff',
    settingListItemColor: '#020D4D',
    settingHeaderIconColor: '#434B79',
    dragListItemBgColorDragging: '#e6e7f2',
    borderTop: '1px solid #d4d7e6'
  }
}

export type DataTableSettingsThemeVars = ReturnType<typeof self>

const dataTableSettingsLight: Theme<
'DataTableSettings',
DataTableSettingsThemeVars
> = {
  name: 'DataTableSettings',
  common: commonLight,
  self
}

export default dataTableSettingsLight
export type DataTableSettingsTheme = typeof dataTableSettingsLight
