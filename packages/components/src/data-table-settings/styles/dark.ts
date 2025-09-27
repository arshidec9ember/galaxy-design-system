import { commonDark } from '../../_styles/common'
import type { DataTableSettingsTheme } from './light'
import { self } from './light'

const dataTableSettingsDark: DataTableSettingsTheme = {
  name: 'DataTableSettings',
  common: commonDark,
  self (vars) {
    const commonSelf = self(vars)
    return {
      ...commonSelf,
      color: '#fff',
      settingsItemHeaderBoxShadow: '0px 2px 5px 0px #020d4b1a',
      dragItemBgColor: '#fff',
      dragListItemBgColor: '#fff',
      dragListItemBgColorDragging: '#e6e7f2',
      borderTop: '1px solid #d4d7e6'
    }
  }
}

export default dataTableSettingsDark
