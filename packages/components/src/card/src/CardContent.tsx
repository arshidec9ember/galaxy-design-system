import { h, defineComponent, type PropType, type CSSProperties } from 'vue'
import { type ThemeProps, useConfig, useTheme } from '../../_mixins'
import {
  type ExtractPublicPropTypes,
  resolveWrappedSlot,
  throwError
} from '../../_utils'
import { ZP } from '../../typography'
import { type CardTheme } from '../styles'
import { useCardContext } from './CardContext'
export const cardContentProps = {
  ...(useTheme.props as ThemeProps<CardTheme>),
  style: [Object, String] as PropType<CSSProperties | string>,
  tag: {
    type: String as PropType<keyof HTMLElementTagNameMap>,
    default: 'div'
  }
}

export type CardContentProps = ExtractPublicPropTypes<typeof cardContentProps>

export default defineComponent({
  name: 'CardContent',
  props: cardContentProps,
  setup (props) {
    const ZCard = useCardContext()

    if (!ZCard) {
      throwError(
        'card-content',
        '`z-card-content` must be placed inside `z-card`.'
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
        <ZP variant="2-r">
          <Component
            class={`${mergedClsPrefix}-card__content`}
            style={this.style}
            role="region"
          >
            {children}
          </Component>
        </ZP>
      ) : null
    })
  }
})
