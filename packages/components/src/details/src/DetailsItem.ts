import { defineComponent, type PropType, type CSSProperties } from 'vue'
import type { ExtractPublicPropTypes } from '../../_utils'
import { DESCRIPTION_ITEM_FLAG } from './utils'

export const detailsItemProps = {
  label: String,
  span: {
    type: Number,
    default: 1
  },
  labelStyle: [Object, String] as PropType<string | CSSProperties>,
  contentStyle: [Object, String] as PropType<string | CSSProperties>
} as const

export type DetailItemProps = ExtractPublicPropTypes<typeof detailsItemProps>

export default defineComponent({
  name: 'DetailsItem',
  [DESCRIPTION_ITEM_FLAG]: true,
  props: detailsItemProps,
  render () {
    return null
  }
})
