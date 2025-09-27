import {
  h,
  defineComponent,
  inject,
  computed,
  Fragment,
  type PropType
} from 'vue'
import { throwError } from '../../_utils'
import { listInjectionKey } from './List'
import ListItemSelector from './ListItemSelector'

export default defineComponent({
  name: 'ListItem',
  props: {
    value: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    onMouseenter: Function as PropType<(e: MouseEvent) => void>,
    onClick: Function as PropType<(e: MouseEvent) => void>,
    onMouseleave: Function as PropType<(e: MouseEvent) => void>
  },
  setup (props) {
    const ZList = inject(listInjectionKey, null)
    if (!ZList) {
      throwError('list-item', '`z-list-item` must be placed in `z-list`.')
    }

    const isSelectedRef = computed(() => {
      return (
        (ZList.selectableRef.value &&
          Array.isArray(ZList.modelValue.value) &&
          ZList.modelValue.value.includes(props.value)) ||
        ZList.modelValue.value === props.value
      )
    })

    return {
      showDivider: ZList.showDividerRef,
      mergedClsPrefix: ZList.mergedClsPrefixRef,
      doUpdateValue: ZList.doUpdateValue,
      selectable: ZList.selectableRef.value,
      multiple: ZList.multipleRef.value,
      showIndicator: ZList.showIndicatorRef,
      value: props.value,
      isSelected: isSelectedRef,
      disabled: props.disabled
    }
  },
  render () {
    const {
      $slots,
      mergedClsPrefix,
      doUpdateValue,
      selectable,
      multiple,
      showIndicator,
      value,
      disabled,
      isSelected
    } = this

    // FIXME: rendering warning the performance issue in slots

    return (
      <li
        onClick={(e) => {
          if (disabled) return
          doUpdateValue(value)
          this.$props.onClick?.(e)
        }}
        class={[
          `${mergedClsPrefix}-list-item`,
          {
            [`${mergedClsPrefix}-list-item--selected`]: isSelected
          }
        ]}
        onMouseenter={this.$props.onMouseenter}
        onMouseleave={this.$props.onMouseleave}
      >
        <ListItemSelector
          showIndicator={showIndicator}
          selectable={selectable}
          multiple={multiple}
          selected={isSelected}
          disabled={disabled}
        >
          {{
            default: () => (
              <Fragment>
                {$slots.prefix ? (
                  <div class={`${mergedClsPrefix}-list-item__prefix`}>
                    {$slots.prefix()}
                  </div>
                ) : null}
                {$slots.default ? (
                  <div class={`${mergedClsPrefix}-list-item__main`}>
                    {$slots}
                  </div>
                ) : null}
                {$slots.suffix ? (
                  <div class={`${mergedClsPrefix}-list-item__suffix`}>
                    {$slots.suffix()}
                  </div>
                ) : null}
              </Fragment>
            )
          }}
        </ListItemSelector>
        {this.showDivider && (
          <div class={`${mergedClsPrefix}-list-item__divider`} />
        )}
      </li>
    )
  }
})
