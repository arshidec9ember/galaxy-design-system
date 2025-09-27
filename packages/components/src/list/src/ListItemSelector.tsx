import { h, defineComponent, type PropType } from 'vue'
import Radio from '../../radio/src/Radio'
import Checkbox from '../../checkbox/src/Checkbox'

export default defineComponent({
  name: 'ListItemSelector',
  props: {
    selectable: Boolean as PropType<boolean>,
    multiple: Boolean as PropType<boolean>, // FIXME: cross check if name can be checkable
    selected: Boolean as PropType<boolean>,
    showIndicator: Boolean as PropType<boolean>,
    indicatorSize: {
      type: String as PropType<'small' | 'medium' | 'large'>,
      default: 'medium'
    },
    disabled: Boolean as PropType<boolean>
  },
  render () {
    const { $slots, $props } = this

    let body
    if ($props.selectable && $props.multiple && $props.showIndicator) {
      body = (
        <Checkbox
          modelValue={$props.selected}
          size={$props.indicatorSize}
          disabled={$props.disabled}
        >
          {{ default: () => $slots.default?.() }}
        </Checkbox>
      )
    } else if ($props.selectable && $props.showIndicator) {
      body = (
        <Radio
          modelValue={$props.selected}
          size={$props.indicatorSize}
          disabled={$props.disabled}
        >
          {{ default: () => $slots.default?.() }}
        </Radio>
      )
    } else {
      body = $slots.default?.()
    }
    return body
  }
})
