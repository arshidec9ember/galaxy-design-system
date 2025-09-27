import {
  h,
  defineComponent,
  type CSSProperties,
  type PropType,
  Fragment
} from 'vue'
import {
  resolveChildSlot,
  type ExtractPublicPropTypes,
  keysOf,
  type MaybeArray
} from '../../_utils'
import {
  ZCard,
  ZCardMedia,
  ZCardHeader,
  ZCardContent,
  ZCardFooter,
  ZCardAction,
  cardBaseProps
} from '../../card'
import { type ThemeProps, useConfig, useTheme } from '../../_mixins'
import { cardStandardLight } from '../styles'
import type { CardStandardTheme } from '../styles'
import style from './styles/index.cssr'

export const cardStandardProps = {
  ...(useTheme.props as ThemeProps<CardStandardTheme>),
  title: String,
  onClose: [Function, Array] as PropType<MaybeArray<() => void>>,
  contentStyle: [Object, String] as PropType<CSSProperties | string>,
  headerStyle: [Object, String] as PropType<CSSProperties | string>,
  headerEndStyle: [Object, String] as PropType<CSSProperties | string>,
  footerStyle: [Object, String] as PropType<CSSProperties | string>,
  ...cardBaseProps
} as const

export const cardStandardBasePropKeys = keysOf(cardStandardProps)

export type CardStandardProps = ExtractPublicPropTypes<typeof cardStandardProps>

/**
 * @description: Standard template for card
 */
export default defineComponent({
  name: 'CardStandard',
  props: cardStandardProps,
  setup (props) {
    const { mergedClsPrefixRef } = useConfig(props)
    const themeRef = useTheme(
      'CardStandard',
      '-card-standard',
      style,
      cardStandardLight,
      props,
      mergedClsPrefixRef
    )
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      mergedTheme: themeRef
    }
  },
  render () {
    const {
      mergedClsPrefix,
      $slots,
      title,
      contentStyle,
      headerStyle,
      headerEndStyle,
      footerStyle,
      divider,
      size,
      bordered,
      closable,
      hoverable,
      role,
      onClose,
      tag,
      $attrs
    } = this

    return (
      <ZCard
        {...$attrs}
        class={`${mergedClsPrefix}-card-standard`}
        tag={tag}
        size={size}
        bordered={bordered}
        hoverable={hoverable}
        role={role}
        divider={divider}
      >
        {() => (
          <>
            <ZCardMedia>{() => resolveChildSlot($slots.media)}</ZCardMedia>
            <ZCardHeader
              title={title}
              style={headerStyle}
              endStyle={headerEndStyle}
              closable={closable}
              onClose={onClose}
            >
              {{
                default: () => resolveChildSlot($slots.header),
                end: () => resolveChildSlot($slots['header-end'])
              }}
            </ZCardHeader>
            <ZCardContent
              style={contentStyle}
              class={`${mergedClsPrefix}-card-standard__content`}
            >
              {() => resolveChildSlot($slots.default)}
            </ZCardContent>
            <ZCardFooter
              style={footerStyle}
              class={`${mergedClsPrefix}-card-standard__footer`}
            >
              {() => resolveChildSlot($slots.footer)}
            </ZCardFooter>
            <ZCardAction>{() => resolveChildSlot($slots.action)}</ZCardAction>
          </>
        )}
      </ZCard>
    )
  }
})
