import { type RtlItem } from '../../config-provider/src/internal-interface'
import rtlStyle from '../src/styles/rtl.cssr'
import { buttonRtl } from '../../button/styles/rtl'
import { spaceRtl } from '../../space/styles/rtl'

export const facadeRtl: RtlItem = {
  name: 'Facade',
  style: rtlStyle,
  peers: [buttonRtl, spaceRtl]
}
