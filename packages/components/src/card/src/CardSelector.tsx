import { h, defineComponent, type PropType, toRef } from 'vue'
import { type ThemeProps, useTheme, useConfig } from '../../_mixins'
import { type ExtractPublicPropTypes, resolveWrappedSlot } from '../../_utils'
import { type CardTheme } from '../styles'
import { provideCardSelectorContext } from './CardContext'
import { ZCheckboxGroup } from '../../checkbox'
import { ZRadioGroup } from '../../radio'

export const cardSelectorProps = {
  ...(useTheme.props as ThemeProps<CardTheme>),
  multiple: {
    type: Boolean as PropType<boolean>,
    default: false
  }
}

export type CardSelectorProps = ExtractPublicPropTypes<typeof cardSelectorProps>

export default defineComponent({
  name: 'CardSelector',
  props: cardSelectorProps,
  setup (props) {
    const multipleRef = toRef(props, 'multiple')
    const { mergedClsPrefixRef } = useConfig(props)

    provideCardSelectorContext({
      multipleRef
    })
    return {
      multiple: multipleRef,
      mergedClsPrefix: mergedClsPrefixRef
    }
  },
  render () {
    const { $slots, multiple, mergedClsPrefix } = this
    return resolveWrappedSlot($slots.default, (children) => {
      if (multiple) {
        return (
          <ZCheckboxGroup class={`${mergedClsPrefix}-card-selector`}>
            {{
              default: () => children
            }}
          </ZCheckboxGroup>
        )
      }
      return (
        <ZRadioGroup class={`${mergedClsPrefix}-card-selector`}>
          {{
            default: () => children
          }}
        </ZRadioGroup>
      )
    })
  }
})
