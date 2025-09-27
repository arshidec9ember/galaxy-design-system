import {
  h,
  defineComponent,
  computed,
  type PropType,
  type CSSProperties
} from 'vue'
import { type ThemeProps, useConfig, useTheme } from '../../_mixins'
import {
  type ExtractPublicPropTypes,
  resolveWrappedSlot,
  throwError
} from '../../_utils'
import { cardLight, type CardTheme } from '../styles'
import { useCardContext } from './CardContext'
import { ref } from 'vue'
import style from './styles/index.cssr'
import { getModeFromValue } from '../../color-picker/src/utils'

export const cardActionAreaProps = {
  ...(useTheme.props as ThemeProps<CardTheme>),
  style: [Object, String] as PropType<CSSProperties | string>,
  tag: {
    type: String as PropType<keyof HTMLElementTagNameMap>,
    default: 'div'
  },
  animation: {
    type: String as PropType<'hover' | 'shine'>
  },
  color: {
    type: String as PropType<string | null>,
    default: null,
    validator: (value: string) => {
      const mode = getModeFromValue(value)
      return Boolean(!value || (mode && mode !== 'hsv'))
    }
  }
}

export type CardActionAreaProps = ExtractPublicPropTypes<
  typeof cardActionAreaProps
>

export default defineComponent({
  name: 'CardActionArea',
  props: cardActionAreaProps,
  setup (props) {
    const areaRef = ref<HTMLElement | null>(null)
    const ZCard = useCardContext()

    if (!ZCard) {
      throwError(
        'card-action-area',
        '`z-card-action-area` must be placed inside `z-card`.'
      )
    }
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
    const themeRef = useTheme(
      'Card',
      '-card',
      style,
      cardLight,
      props,
      mergedClsPrefixRef
    )

    const cssVarsRef = computed(() => {
      const {
        common: { actionColor }
      } = themeRef.value

      return {
        '--z-action-area-color': props.color || actionColor
      }
    })

    return {
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      areaRef
    }
  },
  render () {
    const {
      mergedClsPrefix,
      tag: Component,
      $slots,
      cssVars,
      animation,
      style
    } = this

    return resolveWrappedSlot($slots.default, (children) => {
      return (
        children && (
          <Component
            ref="areaRef"
            class={[
              `${mergedClsPrefix}-card__action-area`,
              {
                [`${mergedClsPrefix}-card__action-area--hover`]:
                  animation === 'hover',

                [`${mergedClsPrefix}-card__action-area--shine`]:
                  animation === 'shine'
              }
            ]}
            style={[cssVars, style]}
            role="region"
          >
            {children}
          </Component>
        )
      )
    })
  }
})
