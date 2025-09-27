import {
  h,
  watch,
  toRef,
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
import { type CardTheme } from '../styles'
import { useCardContext } from './CardContext'

export const cardMediaProps = {
  ...(useTheme.props as ThemeProps<CardTheme>),
  style: [Object, String] as PropType<CSSProperties | string>,
  tag: {
    type: String as PropType<keyof HTMLElementTagNameMap>,
    default: 'div'
  },
  background: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  src: String as PropType<string>
}

export type CardMediaProps = ExtractPublicPropTypes<typeof cardMediaProps>

export default defineComponent({
  name: 'CardMedia',
  props: cardMediaProps,
  setup (props) {
    const ZCard = useCardContext()
    const backgroundRef = toRef(props, 'background')

    if (!ZCard) {
      throwError('card-media', '`z-card-media` must be placed inside `z-card`.')
    }

    ZCard.setHasBackground(backgroundRef.value)
    watch(
      () => backgroundRef.value,
      () => {
        ZCard.setHasBackground(backgroundRef.value)
      }
    )

    if (!ZCard) {
      throwError('card-media', '`z-card-media` must be placed inside `z-card`.')
    }

    const { mergedClsPrefixRef } = useConfig(props)

    const mediaUrlRef = computed(() => (props.src ? `url("${props.src}")` : ''))

    const cssVarsRef = computed(() => {
      // eslint-disable @typescript-eslint/restrict-template-expressions
      return {
        '--z-card-media-image': mediaUrlRef.value
      }
    })

    return {
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: cssVarsRef,
      mediaUrl: mediaUrlRef
    }
  },
  render () {
    const {
      mergedClsPrefix,
      $slots,
      tag: Component,
      style,
      mediaUrl,
      background
    } = this
    return resolveWrappedSlot($slots.default, (children) => {
      return (
        <Component
          class={[
            `${mergedClsPrefix}-card-media-layer`,
            {
              [`${mergedClsPrefix}-card-media`]: mediaUrl,
              [`${mergedClsPrefix}-card-media-layer--background`]: background,
              [`${mergedClsPrefix}-card-media--cover`]: mediaUrl
            }
          ]}
          style={[this.cssVars, style]}
          role="region"
        >
          {children}
        </Component>
      )
    })
  }
})
