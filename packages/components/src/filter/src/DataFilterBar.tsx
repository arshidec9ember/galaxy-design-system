import { hasOwn, useArrayFilter, useSorted } from '@vueuse/core'
import { cloneDeep, isEmpty, isEqual, isNil, noop, set } from 'lodash-es'
import type { CSSProperties, PropType } from 'vue'
import {
  computed,
  defineComponent,
  h,
  provide,
  ref,
  watchEffect,
  watch
} from 'vue'
import { ZBaseIcon } from '../../_internal'
import { AddIcon, ResetIcon } from '../../_internal/icons'
import type { ThemeProps } from '../../_mixins'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import {
  call,
  type ExtractPublicPropTypes,
  type MaybeArray
} from '../../_utils'
import { ZButton } from '../../button'
import { ZList, ZListItem } from '../../list'
import { ZPopover } from '../../popover'
import { ZSpace } from '../../space'
import { ZTag } from '../../tag'
import { ZText } from '../../typography'
import type { FilterTheme } from '../styles'
import { filterLight } from '../styles'
import DataFilterItemWrapper from './DataFilterItemWrapper'
import { FILTER_TEXT, RESET_TEXT } from './constants'
import {
  createFilterItemSelector,
  getFilterItemSelector
} from './createFilterInput'
import { ZScrollbar } from '../../scrollbar'
import type {
  DataFilterItemConfig,
  FilterInjection,
  FilterModel,
  FilterState,
  OnUpdateData,
  OnUpdateValue
} from './interface'
import { filterInjectionKey } from './keys'
import ConditionSelector, {
  conditionBasedFilterFn,
  conditionBasedRenderFilterValue
} from './selectors/ConditionSelector'
import DateSelector, {
  dateBasedFilterFn,
  dateBasedRenderFilterValue
} from './selectors/DateSelector'
import ValueSelector, {
  valueBasedFilterFn,
  valueBasedRenderFilterValue
} from './selectors/ValueSelector'
import style from './styles/index.cssr'

export const filterProps = {
  ...(useTheme.props as ThemeProps<FilterTheme>),
  filters: {
    type: Array as PropType<DataFilterItemConfig[]>,
    default: () => []
  },
  modelValue: {
    type: Object as PropType<FilterState>,
    default: () => {}
  },
  data: {
    type: Array as PropType<any[]>,
    default: []
  },
  onUpdateData: [Function, Array] as PropType<MaybeArray<OnUpdateData>>,
  'onUpdate:data': [Function, Array] as PropType<MaybeArray<OnUpdateData>>,
  onUpdateModelValue: [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
  'onUpdate:modelValue': [Function, Array] as PropType<
  MaybeArray<OnUpdateValue>
  >,
  onReset: {
    type: Function as PropType<() => void>
  }
}

export type FilterProps = ExtractPublicPropTypes<typeof filterProps>

createFilterItemSelector('by-value', {
  label: 'By Value',
  component: ValueSelector,
  filterFn: valueBasedFilterFn,
  renderFilterValue: valueBasedRenderFilterValue
})

createFilterItemSelector('by-date', {
  label: 'By Date',
  component: DateSelector,
  filterFn: dateBasedFilterFn,
  renderFilterValue: dateBasedRenderFilterValue
})

createFilterItemSelector('by-condition', {
  label: 'By Condition',
  component: ConditionSelector,
  filterFn: conditionBasedFilterFn,
  renderFilterValue: conditionBasedRenderFilterValue
})

export default defineComponent({
  name: 'Filter',
  props: filterProps,
  setup (props) {
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)

    const initialModelValue = cloneDeep(props.modelValue)
    const modelValueRef = ref(cloneDeep(initialModelValue))

    const filtersRef = ref(cloneDeep(props.filters))
    const clonedData = cloneDeep(props.data)

    /**
     * @description
     * This function is used to check if the reset button should be hidden or not
     * The reset button should be hidden if all the filters are in their initial state
     * or if the initial model value and the current model value are the same
     * @returns {boolean}
     * */
    const isResetHiddenRef = computed(() => {
      const initialValue = initialModelValue || {}
      const modelValue = modelValueRef.value || {}

      // If both objects are empty, hide the reset button
      if (isEmpty(initialValue) && isEmpty(modelValue)) return true

      // Get unique keys from both objects
      const uniqueFilterKeys = new Set([
        ...Object.keys(initialValue),
        ...Object.keys(modelValue)
      ])

      // Check if all keys have equivalent values
      return [...uniqueFilterKeys].every((key) => {
        const initialFilterKey = initialValue[key]?.value
        const modelValueFilterKey = modelValue[key]?.value

        // Consider null or undefined values as equal
        return (
          (isNil(initialFilterKey) && isNil(modelValueFilterKey)) ||
          isEqual(initialFilterKey, modelValueFilterKey)
        )
      })
    })

    // Watch for changes in filters prop
    watch(
      () => props.filters,
      (newFilters: DataFilterItemConfig[]) => {
        filtersRef.value = cloneDeep(newFilters)
      }
    )

    watch(
      () => props.modelValue,
      (newFilters, oldFilter) => {
        if (isEqual(newFilters, oldFilter)) return
        modelValueRef.value = cloneDeep(newFilters)
      }
    )

    const __applyFilter = (
      filterItem: DataFilterItemConfig,
      filterModel: FilterModel
    ): void => {
      // if (!filterItem.applied || filterItem.fixed) {
      //   filterItem.applied = filterItem.applied || Date.now()
      // }

      filterItem._state = 'applied'

      // if (!filterItem.fixed) {
      filterItem._index = filterItem._index ?? Date.now()
      // }

      // DEVNOTE: if filterModel is null then filterModel.selector will be broken to fix that we need
      // to add this hack
      if (filterModel === null) {
        filterModel = {}
      }

      if (!filterModel.selector) {
        filterModel.selector = Object.keys(filterItem.selectors)[0]
      }

      const selector = filterItem.selectors[filterModel.selector]

      if (selector) {
        Object.assign(selector, filterModel)
      }
    }

    const filterClientData = (modelValue: FilterState): any[] => {
      if (clonedData.length === 0) return []
      if (isEmpty(modelValueRef.value)) return clonedData

      return clonedData.filter((row) => {
        const toBeFiltered = Object.entries(modelValue).every(
          ([field, filterModel]) => {
            if (field && !isNil(filterModel) && filterModel.selector) {
              const filterFn = getFilterItemSelector(
                filterModel.selector
              )?.filterFn
              if (
                filterFn &&
                typeof filterFn === 'function' &&
                (!isNil(filterModel.value) || !isEmpty(filterModel.value))
              ) {
                const filterConfig = filtersRef.value.find(
                  (filter) => filter.field === field
                )

                if (filterConfig?.dataFiltering === false) return true

                const found = filterFn(
                  field,
                  filterModel,
                  row,
                  cloneDeep(filterConfig?.selectors[filterModel.selector])
                )
                return !!found
              }
            }

            return true
          },
          true
        )

        return toBeFiltered
      })
    }

    const serializedFilters = (modelValue: FilterState): void => {
      filtersRef.value.forEach((filterItem, index) => {
        filterItem._state = filterItem._state || 'init'

        if (filterItem.fixed) {
          // find model value
          if (modelValue[filterItem.field]) {
            __applyFilter(filterItem, modelValue[filterItem.field])
          } else {
            // default filter model
            const defaultFilterModelValue = {
              type: filterItem.type || 'text',
              value: null
            }

            modelValue[filterItem.field] = defaultFilterModelValue

            __applyFilter(filterItem, defaultFilterModelValue)
          }
        }

        if (hasOwn(modelValue, filterItem.field)) {
          __applyFilter(filterItem, modelValue[filterItem.field])
        } else {
          // filterItem._state = 'init'
        }
      })
    }
    watch(
      modelValueRef,
      (modelValue) => {
        serializedFilters(modelValue)
        const filteredData = filterClientData(modelValue)
        emitDataUpdate(filteredData)
        emitModelValueUpdate(modelValue)
      },
      { deep: true }
    )

    watchEffect(() => {
      const modelValue = modelValueRef.value
      serializedFilters(modelValue)
    })

    const appliedFilterListRef = useArrayFilter(
      useSorted(filtersRef, (prev, next) => {
        // render fixed filters first
        if (prev.fixed && !next.fixed) return -1
        if (prev.fixed && next.fixed) return 0
        if (!prev.fixed && next.fixed) return 1

        // render applied filters later
        const prevApplied = prev._index ?? Number.MAX_SAFE_INTEGER
        const nextApplied = next._index ?? Number.MAX_SAFE_INTEGER
        return prevApplied - nextApplied
      }),
      // filtersRef,
      (filterItem) => filterItem._state === 'applied' || !!filterItem.fixed
    )

    const remainingFilterListRef = useArrayFilter(
      filtersRef,
      (filterItem) => filterItem._state !== 'applied' && !filterItem.fixed
    )

    // updating the filter state and returning back to user
    const updateFilterState: FilterInjection['updateFilterState'] = (
      field,
      value
    ) => {
      set(modelValueRef.value, [field], value)
    }

    // trigger the update value function to return the updated value to the user
    function emitModelValueUpdate (modelValue: FilterState): void {
      const { 'onUpdate:modelValue': _onUpdateFilters, onUpdateModelValue } =
        props
      if (_onUpdateFilters) {
        call(_onUpdateFilters as any, modelValue)
      }
      if (onUpdateModelValue) {
        call(onUpdateModelValue as any, modelValue)
      }
    }

    function emitDataUpdate (data: any[]): void {
      const { 'onUpdate:data': _onUpdateData, onUpdateData } = props
      if (_onUpdateData) {
        call(_onUpdateData as any, data)
      }
      if (onUpdateData) {
        call(onUpdateData as any, data)
      }
    }

    provide(filterInjectionKey, {
      updateFilterState,
      applyFilterValues: function (
        field: string,
        selectedTab: string,
        value: any
      ): void {
        const found = filtersRef.value.find((filter) => filter.field === field)
        if (found) {
          const selector = found.selectors[selectedTab]
          if (selector) {
            selector.value = value
          }
        }
      },
      resetFilter: noop,
      removeAppliedFilter: function (field: string): void {
        const foundIndex = filtersRef.value.findIndex(
          (filter) => filter.field === field
        )
        if (foundIndex !== -1) {
          const found = filtersRef.value[foundIndex]
          found._state = found.fixed ? 'init' : 'removed'
          found._index = found.fixed ? found._index : Number.MAX_SAFE_INTEGER
        }
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete modelValueRef.value[field]
      }
    })

    const themeRef = useTheme(
      'Filter',
      '-filter',
      style,
      filterLight,
      props,
      mergedClsPrefixRef
    )

    const cssVarsRef = computed(() => {
      const {
        self: {
          actionBorderColor,
          actionTextColor,
          labelTextColor,
          tagActiveColor,
          tagHoverColor,
          textColor,
          valueTextColor,
          resetColor,
          resetColorHover
        }
      } = themeRef.value
      return {
        '--z-text-color': textColor,
        '--z-action-text-color': actionTextColor,
        '--z-label-text-color': labelTextColor,
        '--z-value-text-color': valueTextColor,
        '--z-tag-border-color': actionBorderColor,
        '--z-reset-color': resetColor,
        '--z-tag-hover-color': tagHoverColor,
        '--z-tag-active-color': tagActiveColor,
        '--z-reset-color-hover': resetColorHover
      }
    })

    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('filter', undefined, cssVarsRef, props)
      : undefined

    const actionColor = computed(() => {
      const {
        self: {
          actionTextColor,
          textColor,
          tagBackgroundColor,
          actionBorderColor
        }
      } = themeRef.value
      return {
        color: tagBackgroundColor,
        iconColor: textColor,
        textColor: actionTextColor,
        borderColor: actionBorderColor
      }
    })

    const resetCssVarsRef = computed(() => {
      const {
        self: { resetTextColor, fontSize, resetColorHover }
      } = themeRef.value
      return {
        '--z-font-size': fontSize,
        '--z-text-color': resetTextColor,
        '--z-reset-text-color-hover': resetColorHover
      }
    })
    const addFilter = (fieldName: string): void => {
      const found = filtersRef.value.find(
        (filter) => filter.field === fieldName
      )
      if (found) {
        found._state = 'applied'
      }
    }

    const resetDataFilterModel = (): void => {
      filtersRef.value.forEach((filter) => {
        filter._state = 'init'
      })
      modelValueRef.value = cloneDeep(initialModelValue)
      if (typeof props.onReset === 'function') {
        props.onReset()
      }
    }

    return {
      appliedFilterList: appliedFilterListRef,
      remainingFilterList: remainingFilterListRef,
      initialModelValue: ref(initialModelValue),
      resetCssVars: resetCssVarsRef,
      actionColor,
      isResetHidden: isResetHiddenRef,
      addFilterTagColor: {
        // color: 'var(--z-tag-background-color)',
        textColor: 'var(--z-active-value-color)',
        iconColor: 'var(--z-active-value-color)'
      },
      addFilter,
      resetFilters: resetDataFilterModel,
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    const {
      $slots,
      mergedClsPrefix,
      onRender,
      actionColor,
      appliedFilterList,
      remainingFilterList,
      resetFilters
    } = this

    onRender?.()

    // TODO: write your own component - don't reuse ZButton while creating a new component
    const resetNode = (
      <ZSpace class={`${mergedClsPrefix}-action-reset`} inline>
        {() => {
          return $slots?.reset ? (
            $slots?.reset?.()
          ) : (
            <ZButton
              style={this.resetCssVars as CSSProperties}
              class={`${mergedClsPrefix}-action-reset__button`}
              size="x-small"
              round
              variant="text"
              onClick={resetFilters}
            >
              {{
                icon: () => (
                  <ZBaseIcon clsPrefix={mergedClsPrefix}>
                    {() => <ResetIcon />}
                  </ZBaseIcon>
                ),
                default: () => RESET_TEXT
              }}
            </ZButton>
          )
        }}
      </ZSpace>
    )

    // TODO: write your own component - don't reuse ZButton while creating a new component | avoid DRY code in library
    const remainingFiltersNode = (
      <ZPopover
        trigger="click"
        placement="bottom-start"
        minWidth={180}
        style={{ padding: 0 }}
      >
        {{
          trigger: () => (
            <ZTag
              class={`${mergedClsPrefix}-action-add`}
              size="large"
              round
              checkable
              color={actionColor}
              borderStyle="dashed"
            >
              {{
                icon: () => (
                  <ZBaseIcon clsPrefix={mergedClsPrefix}>
                    {() => <AddIcon />}
                  </ZBaseIcon>
                ),
                default: () => FILTER_TEXT
              }}
            </ZTag>
          ),
          default: () => (
            <ZScrollbar
              class={[
                `${mergedClsPrefix}-filter`,
                `${mergedClsPrefix}-remaining-filter-wrapper`
              ]}
            >
              {() => {
                return (
                  <ZList
                    showDivider={false}
                    selectable
                    hoverable
                    clickable
                    multiple={false}
                    onUpdateModelValue={this.addFilter as any}
                  >
                    {() =>
                      remainingFilterList.map((filter) => (
                        <ZListItem key={filter.field} value={filter.field}>
                          {() => (
                            <ZText>
                              {() => filter.label || filter.field || ''}
                            </ZText>
                          )}
                        </ZListItem>
                      ))
                    }
                  </ZList>
                )
              }}
            </ZScrollbar>
          )
        }}
      </ZPopover>
    )

    return (
      <ZSpace
        wrap={false}
        style={this.cssVars}
        class={[`${mergedClsPrefix}-filter`, this.themeClass]}
        align={'center'}
      >
        {{
          default: () => [
            <ZSpace inline align={'center'}>
              {() => {
                const nodes = appliedFilterList.map((filter, index) => {
                  return (
                    <DataFilterItemWrapper
                      class={`${mergedClsPrefix}-filter-item`}
                      type={filter.type}
                      field={filter.field}
                      key={
                        filter.field +
                        index.toString() +
                        JSON.stringify(filter.selectors)
                      }
                      label={filter.label}
                      filterModelValue={this.modelValue[filter.field]}
                      initialModelValue={this.initialModelValue[filter.field]}
                      selectors={filter.selectors}
                      fixed={filter.fixed}
                      popoverActive={
                        !(filter.field in this.modelValue) && !filter.fixed
                      }
                      popoverStyle={filter.popoverStyle}
                      onApply={filter.onApply}
                      onCancel={filter.onCancel}
                      onReset={filter.onReset}
                    ></DataFilterItemWrapper>
                  )
                })

                remainingFilterList.length && nodes.push(remainingFiltersNode)
                if (this.isResetHidden) return nodes
                nodes.push(resetNode)
                return nodes
              }}
            </ZSpace>
          ]
        }}
      </ZSpace>
    )
  }
})
