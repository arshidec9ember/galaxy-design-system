import { h, defineComponent } from 'vue'
import { resolveWrappedSlot } from '../../../_utils'
import { useCardSelectorContext } from '../CardContext'
import { type PropType } from 'vue'
import { ZCheckbox } from '../../../checkbox'
import { ZRadio } from '../../../radio'
import { useConfig } from '../../../_mixins'

export const cardControlProps = {
  value: {
    type: [String, Number, Boolean] as PropType<string | number | boolean>,
    default: 'on'
  },
  disabled: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  }
}
/**
 * @description: Adds a checkbox or radio to the card
 */
const CardControl = defineComponent({
  name: 'CardControl',
  props: cardControlProps,
  setup (props) {
    const { mergedClsPrefixRef } = useConfig(props)
    const ZCardSelector = useCardSelectorContext()

    return {
      ZCardSelector,
      mergedClsPrefix: mergedClsPrefixRef,
      multiple: ZCardSelector?.multipleRef
    }
  },
  render () {
    const {
      value,
      ZCardSelector,
      $slots,
      disabled,
      multiple,
      mergedClsPrefix
    } = this
    if (!ZCardSelector) {
      return resolveWrappedSlot($slots.default, (children) => children)
    }

    if (multiple) {
      return resolveWrappedSlot($slots.default, (children) => (
        <ZCheckbox
          disabled={disabled}
          value={value as string | number}
          class={`${mergedClsPrefix}-checkbox--card-control`}
        >
          {{
            default: () => children
          }}
        </ZCheckbox>
      ))
    }

    return resolveWrappedSlot($slots.default, (children) => (
      <ZRadio
        disabled={disabled}
        value={value}
        class={`${mergedClsPrefix}-radio--card-control`}
      >
        {{
          default: () => children
        }}
      </ZRadio>
    ))
  }
})

export default CardControl
