import { defineComponent, h, type PropType, inject } from 'vue'
import { ZRadio } from '../../../radio'
import { dataTableInjectionKey, type RowKey } from '../interface'

// Extract the radio to avoid useless rendering in table body
export default defineComponent({
  name: 'DataTableBodyRadio',
  props: {
    rowKey: {
      type: [String, Number] as PropType<RowKey>,
      required: true
    },
    disabled: {
      type: Boolean,
      required: true
    },
    onUpdateChecked: {
      type: Function as PropType<(checked: boolean) => void>,
      required: true
    }
  },
  setup (props) {
    const {
      mergedCheckedRowKeySetRef,
      componentId
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = inject(dataTableInjectionKey)!
    return () => {
      const { rowKey } = props
      return (
        <ZRadio
          name={componentId}
          disabled={props.disabled}
          modelValue={mergedCheckedRowKeySetRef.value.has(rowKey)}
          onUpdateModelValue={props.onUpdateChecked}
        />
      )
    }
  }
})
