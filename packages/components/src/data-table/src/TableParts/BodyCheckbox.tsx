import { defineComponent, h, type PropType, inject } from 'vue'
import { ZCheckbox } from '../../../checkbox'
import { dataTableInjectionKey, type RowKey } from '../interface'

// Extract the checkbox to avoid useless rendering in table body
export default defineComponent({
  name: 'DataTableBodyCheckbox',
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
      type: Function as PropType<
      (checked: boolean, e: MouseEvent | KeyboardEvent) => void
      >,
      required: true
    }
  },
  setup (props) {
    const {
      mergedCheckedRowKeySetRef,
      mergedInderminateRowKeySetRef
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = inject(dataTableInjectionKey)!
    return () => {
      const { rowKey } = props
      return (
        <ZCheckbox
          privateInsideTable
          disabled={props.disabled}
          indeterminate={mergedInderminateRowKeySetRef.value.has(rowKey)}
          modelValue={mergedCheckedRowKeySetRef.value.has(rowKey)}
          onUpdateModelValue={props.onUpdateChecked}
        />
      )
    }
  }
})
