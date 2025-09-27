import { h, defineComponent, type PropType, type CSSProperties } from 'vue'
import { type ThemeProps, useConfig, useTheme } from '../../_mixins'
import {
  type ExtractPublicPropTypes,
  resolveWrappedSlot,
  throwError
} from '../../_utils'
import { type CardTheme } from '../styles'
import { useCardContext } from './CardContext'

const cardActionsBaseProps = {
  style: [Object, String] as PropType<CSSProperties | string>,
  tag: {
    type: String as PropType<keyof HTMLElementTagNameMap>,
    default: 'div'
  }
} as const

export const cardActionProps = {
  ...(useTheme.props as ThemeProps<CardTheme>),
  ...cardActionsBaseProps
}

export type CardActionProps = ExtractPublicPropTypes<typeof cardActionProps>

export default defineComponent({
  name: 'CardAction',
  props: cardActionProps,
  setup (props) {
    const ZCard = useCardContext()
    if (!ZCard) {
      throwError(
        'card-action',
        '`z-card-action` must be placed inside `z-card`.'
      )
    }
    const { mergedClsPrefixRef } = useConfig(props)

    return {
      mergedClsPrefix: mergedClsPrefixRef
    }
  },
  render () {
    const { mergedClsPrefix, tag: Component, $slots } = this
    return resolveWrappedSlot($slots.default, (children) => {
      return children ? (
        <Component
          class={`${mergedClsPrefix}-card__action`}
          style={this.style}
          role="region"
        >
          {children}
        </Component>
      ) : null
    })
  }
})
