import { commonDark } from '../../_styles/common'
import type { DetailsViewTheme } from './light'
import { self } from './light'

const detailsViewDark: DetailsViewTheme = {
  name: 'DetailsView',
  common: commonDark,
  self (vars) {
    const commonSelf = self(vars)
    return commonSelf
  }
}

export default detailsViewDark
