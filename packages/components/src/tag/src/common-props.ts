import { type PropType } from 'vue'

export interface TagColor {
  color?: string
  borderColor?: string
  textColor?: string
  iconColor?: string
}

export default {
  color: {
    type: [Object, String] as PropType<
    | 'neutral'
    | 'primary'
    | 'success'
    | 'info'
    | 'warning'
    | 'error'
    | TagColor
    >,
    default: 'neutral'
  },

  round: Boolean,
  size: {
    type: String as PropType<'x-small' | 'small' | 'medium' | 'large'>,
    default: 'medium'
  },
  closable: Boolean,
  disabled: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  }
} as const
