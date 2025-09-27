import { h, defineComponent, type PropType, type CSSProperties } from 'vue'
import { type ThemeProps, useConfig, useTheme } from '../../_mixins'
import {
  type ExtractPublicPropTypes,
  resolveWrappedSlot,
  throwError
} from '../../_utils'
import { type CardTheme } from '../styles'
import { useCardContext } from './CardContext'

const cardFooterBaseProps = {
  style: [Object, String] as PropType<CSSProperties | string>,
  tag: {
    type: String as PropType<keyof HTMLElementTagNameMap>,
    default: 'div'
  }
} as const

export const cardFooterProps = {
  ...(useTheme.props as ThemeProps<CardTheme>),
  ...cardFooterBaseProps
}

export type CardFooterProps = ExtractPublicPropTypes<typeof cardFooterProps>

export default defineComponent({
  name: 'CardFooter',
  props: cardFooterProps,
  setup (props) {
    const ZCard = useCardContext()

    if (!ZCard) {
      throwError(
        'card-footer',
        '`z-card-footer` must be placed inside `z-card`.'
      )
    }
    const { mergedClsPrefixRef } = useConfig(props)

    return {
      mergedClsPrefix: mergedClsPrefixRef
    }
  },
  render () {
    const { mergedClsPrefix, $slots, style, tag: Component } = this
    return resolveWrappedSlot($slots.default, (children) => {
      return children ? (
        <Component
          class={`${mergedClsPrefix}-card__footer`}
          style={style}
          role="contentinfo"
        >
          {children}
        </Component>
      ) : null
    })
  }
})
