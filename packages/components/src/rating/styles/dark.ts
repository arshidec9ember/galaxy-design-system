import { commonDark } from '../../_styles/common'
import { type RatingTheme } from './light'

const ratingDark: RatingTheme = {
  name: 'Rating',
  common: commonDark,
  self (vars) {
    const { railColor } = vars
    return {
      itemColor: railColor,
      itemColorActive: '#CCAA33',
      itemSize: '20px',
      sizeSmall: '16px',
      sizeMedium: '20px',
      sizeLarge: '24px'
    }
  }
}

export default ratingDark
