import { commonDark } from '../../_styles/common'
import { self, type CardStandardTheme } from './light'

const cardStandardDark: CardStandardTheme = {
  name: 'CardStandard',
  common: commonDark,
  self (vars) {
    const commonSelf = self(vars)
    return commonSelf
  }
}

export default cardStandardDark
