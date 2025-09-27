import { c, cB, cE } from '../../../_utils/cssr'

export default c([
  cB('card-standard', [
    c('&:first-child', [
      cE('content, footer', {
        paddingTop: 0
      })
    ])
  ])
])
