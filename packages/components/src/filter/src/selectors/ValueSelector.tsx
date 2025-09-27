import { find, get, isEqual, isNil, sortBy, toString } from 'lodash-es'
import {
  computed,
  defineComponent,
  h,
  inject,
  type PropType,
  ref,
  toRef,
  watch
} from 'vue'
import { ZScrollbar } from '../../../_internal/scrollbar'
import { ZCheckbox } from '../../../checkbox'
import { ZInput } from '../../../input'
import { ZList, ZListItem } from '../../../list'
import { ZResult } from '../../../result'
import { ZText } from '../../../typography'
import type { FilterFunction } from '../createFilterInput'
import type { FilterModel, Option } from '../interface'
import { filterItemInjectionKey } from '../keys'

export const valueSelectorProps = {
  searchable: { type: Boolean, default: true },
  multiple: { type: Boolean, default: true },
  showIndicator: { type: Boolean },
  options: { type: Array as () => Option[], default: () => [] },
  renderLabel: { type: Function },
  value: [Array, String] as PropType<string[] | string>
}

export function valueBasedRenderFilterValue (
  field: string,
  model: FilterModel,
  config?: any
): any {
  const value = model.value
  if (config?.options) {
    if (Array.isArray(value)) {
      const LabelValues = value.map((v) => {
        const found = config.options.find(
          (option: { label: string, value: string }) => option.value === v
        )
        return found?.label || v
      })
      return LabelValues
    } else {
      const found = config.options.find(
        (option: { label: string, value: string }) => option.value === value
      )
      return found?.label || value
    }
  }
  return toString(value)
}

export const valueBasedFilterFn: FilterFunction = (field, model, rowData) => {
  const value = get(rowData, field)

  if (!value) {
    return false
  }

  if (Array.isArray(model.value)) {
    return !isNil(find(model.value, (v) => v === value))
  }

  return model.value === value
}

export default defineComponent({
  name: 'ValueSelector',
  props: valueSelectorProps,
  setup (props) {
    const FilterItem = inject(filterItemInjectionKey, null)
    const searchableRef = ref(props.searchable)
    const multipleRef = ref(props.multiple)
    const searchInputRef = toRef('')
    const optionListDefault = ref<Option[]>(props.options)

    const filteredValueListRef = computed<Option[]>(() => {
      if (searchInputRef.value) {
        return optionListDefault.value.filter((listItem) => {
          if (listItem.label) {
            if (typeof listItem.label === 'string') {
              return listItem.label
                .toLowerCase()
                .includes(searchInputRef.value.toLowerCase())
            } else {
              const label: any = listItem.label
              if (label instanceof HTMLElement) {
                return (label?.textContent || '')
                  .toLowerCase()
                  .includes(searchInputRef.value.toLowerCase())
              }
            }
          }
          if (listItem.value) {
            return listItem.value
              .toLowerCase()
              .includes(searchInputRef.value.toLowerCase())
          }
          return true
        })
      }
      return optionListDefault.value
    })

    const findInitialValue = (value: string[]): string[] => {
      return value.filter((val) =>
        optionListDefault.value.find((options) => options.value === val)
      )
    }

    const selectedValuesRef = ref<string[]>(
      props.options?.length > 0 && props.value
        ? Array.isArray(props.value)
          ? findInitialValue(props.value)
          : findInitialValue([props.value])
        : []
    )

    watch(selectedValuesRef, (value) => {
      FilterItem?.updateValue(props.multiple ? value : value[0])
    })

    const sortedSelectedValues = computed(() => {
      const selectedValues = selectedValuesRef.value ?? props.value
      if (Array.isArray(selectedValues)) {
        return sortBy(selectedValues)
      }
      return selectedValues
    })

    const isAllItemsSelected = computed(() =>
      isEqual(
        sortedSelectedValues.value,
        sortBy(optionListDefault.value.map((val) => val.value))
      )
    )

    const doUpdateValue = (value: string | string[]): void => {
      selectedValuesRef.value = Array.isArray(value) ? value : [value]
    }

    const setSearchInput = (val: string): void => {
      searchInputRef.value = val
      if (props.options?.length === 0 && val) {
        selectedValuesRef.value = [val]
      }
    }

    const handleCheckedChange = (val: boolean): void => {
      if (props.multiple) {
        selectedValuesRef.value = isAllItemsSelected.value
          ? []
          : filteredValueListRef.value.map((val) => val.value)
      }
    }

    return {
      searchable: searchableRef,
      multiple: multipleRef,
      doUpdateValue,
      handleCheckedChange,
      filteredValueList: filteredValueListRef,
      searchInput: searchInputRef,
      setSearchInput,
      isAllItemsSelected,
      valueListDefault: optionListDefault,
      selectedValues: selectedValuesRef
    }
  },
  render () {
    const {
      filteredValueList,
      selectedValues,
      handleCheckedChange,
      searchable,
      multiple,
      searchInput,
      doUpdateValue
    } = this

    const indeterminate =
      selectedValues.length &&
      selectedValues.length < this.valueListDefault.length
        ? true
        : void 0

    return (
      <ZList
        hoverable
        selectable
        clickable
        showDivider={false}
        multiple={multiple}
        showIndicator={this.$props.showIndicator || multiple}
        modelValue={selectedValues}
        onUpdateModelValue={doUpdateValue}
      >
        {{
          header: () =>
            searchable ? (
              <ZInput
                clearable
                modelValue={searchInput}
                type="text"
                placeholder="Search"
                onUpdateModelValue={this.setSearchInput}
              />
            ) : null,
          default: () =>
            this.$props.options.length && (
              <ZScrollbar style="max-height:200px; padding: 8px 0 8px 0;">
                {() =>
                  filteredValueList.length ? (
                    [
                      multiple && (
                        <ZCheckbox
                          class="z-list-item"
                          indeterminate={indeterminate}
                          modelValue={this.isAllItemsSelected}
                          onChange={handleCheckedChange}
                        >
                          {() => <ZText>{() => 'Select All'}</ZText>}
                        </ZCheckbox>
                      ),
                      filteredValueList.map((item) => (
                        <ZListItem key={item.value} value={item.value}>
                          {() => (
                            <ZText>
                              {() =>
                                this.$props.renderLabel?.(item) ??
                                (item.label || item.value)
                              }
                            </ZText>
                          )}
                        </ZListItem>
                      ))
                    ]
                  ) : (
                    <ZResult
                      status={'warning'}
                      title="No Results Found"
                      description="Please try with different input"
                    ></ZResult>
                  )
                }
              </ZScrollbar>
            )
        }}
      </ZList>
    )
  }
})
