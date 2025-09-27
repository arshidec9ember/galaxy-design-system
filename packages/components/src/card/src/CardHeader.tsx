import { h, defineComponent, type PropType, type CSSProperties } from 'vue'
import { type ThemeProps, useConfig, useTheme } from '../../_mixins'
import {
  type ExtractPublicPropTypes,
  type MaybeArray,
  call,
  resolveWrappedSlot,
  throwError
} from '../../_utils'
import { type CardTheme } from '../styles'
import { ZBaseClose } from '../../_internal'
import { useCardContext } from './CardContext'
import { ZTitle } from '../../typography'

const cardHeaderBaseProps = {
  title: String,
  style: [Object, String] as PropType<CSSProperties | string>,
  endStyle: [Object, String] as PropType<CSSProperties | string>,
  closable: Boolean,
  onClose: [Function, Array] as PropType<MaybeArray<() => void>>,
  tag: {
    type: String as PropType<keyof HTMLElementTagNameMap>,
    default: 'div'
  }
} as const

export const cardHeaderProps = {
  ...(useTheme.props as ThemeProps<CardTheme>),
  ...cardHeaderBaseProps
}

export type CardHeaderProps = ExtractPublicPropTypes<typeof cardHeaderProps>

export default defineComponent({
  name: 'CardHeader',
  props: cardHeaderProps,
  setup (props) {
    const handleCloseClick = (): void => {
      const { onClose } = props
      if (onClose) call(onClose)
    }
    const ZCard = useCardContext()

    if (!ZCard) {
      throwError(
        'card-header',
        '`z-card-header` must be placed inside `z-card`.'
      )
    }

    const { mergedClsPrefixRef } = useConfig(props)

    return {
      mergedClsPrefix: mergedClsPrefixRef,
      handleCloseClick
    }
  },
  render () {
    const { mergedClsPrefix, tag: Component, $slots, handleCloseClick } = this

    return resolveWrappedSlot($slots.default, (children) => {
      return children || this.title || this.closable ? (
        <Component
          class={[`${mergedClsPrefix}-card-header`]}
          style={this.style}
          role="banner"
        >
          <ZTitle variant="4-m" class={`${mergedClsPrefix}-card-header__main`}>
            {this.title || children}
          </ZTitle>
          {resolveWrappedSlot(
            $slots.end,
            (children) =>
              children && (
                <div
                  class={`${mergedClsPrefix}-card-header__end`}
                  style={this.endStyle}
                >
                  {children}
                </div>
              )
          )}
          {this.closable ? (
            <ZBaseClose
              clsPrefix={mergedClsPrefix}
              class={`${mergedClsPrefix}-card-header__close`}
              onClick={handleCloseClick}
              absolute
            />
          ) : null}
        </Component>
      ) : null
    })
  }
})
