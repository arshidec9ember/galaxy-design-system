// import type { CSSProperties, PropType, Ref } from 'vue'
// import { computed, defineComponent, provide, ref, h } from 'vue'
// import type { ThemeProps } from '../../_mixins'
// import { useConfig, useTheme, useThemeClass } from '../../_mixins'
// import {
//   call,
//   type ExtractPublicPropTypes,
//   type MaybeArray
// } from '../../_utils'
// import { ZButton } from '../../button'
// import { ZList, ZListItem } from '../../list'
// import { ZPopover } from '../../popover'
// import type { FilterTheme } from '../styles'
// import { filterLight } from '../styles'
// import type {
//   OnUpdateValue,
//   OnUpdateData,
//   FilterInjection,
//   FilterState,
//   DataFilterItemConfig
// } from './interface'
// import style from './styles/index.cssr'
// import { filterInjectionKey } from './keys'
// import { set, cloneDeep, sortBy, uniqueId } from 'lodash-es'
// import { ZText } from '../../typography'
// import { ZTag } from '../../tag'
// import { ZBaseIcon } from '../../_internal'
// import { AddIcon, ResetIcon } from '../../_internal/icons'
// import { ZSpace } from '../../space'
// import DataFilterItemWrapper from './DataFilterItemWrapper'
// import { createFilterItemSelector } from './createFilterInput'
// import ValueSelector, { valueBasedFilterFn } from './selectors/ValueSelector'
// import DateSelector from './selectors/DateSelector'
// import ConditionSelector from './selectors/ConditionSelector'
// import { FILTER_ITEM_ACTIONS, FILTER_TEXT } from './constants'
// import { useArrayFilter } from '@vueuse/core'
// import { getFilteredList } from './utils'

// export const filterProps = {
//   ...(useTheme.props as ThemeProps<FilterTheme>),
//   filters: {
//     type: Array as PropType<DataFilterItemConfig[]>,
//     default: () => []
//   },
//   modelValue: {
//     type: Object as PropType<FilterState>,
//     default: () => {}
//   },
//   data: {
//     type: Array,
//     default: []
//   },
//   onUpdateData: [Function, Array] as PropType<MaybeArray<OnUpdateData>>,
//   'onUpdate:data': [Function, Array] as PropType<MaybeArray<OnUpdateData>>,
//   onUpdateModelValue: [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
//   'onUpdate:modelValue': [Function, Array] as PropType<
//   MaybeArray<OnUpdateValue>
//   >
// }

// export type FilterProps = ExtractPublicPropTypes<typeof filterProps>

// createFilterItemSelector('by-value', {
//   label: 'By Value',
//   component: ValueSelector,
//   filterFn: valueBasedFilterFn
// })
// createFilterItemSelector('by-date', {
//   label: 'By Date',
//   component: DateSelector
// })
// createFilterItemSelector('by-condition', {
//   label: 'By Condition',
//   component: ConditionSelector
// })

// export default defineComponent({
//   name: 'Filter',
//   props: filterProps,
//   setup (props) {
//     // setting the data ref to be used in the component
//     const initialData = cloneDeep(props.data)
//     const dataRef = ref(props.data)
//     // setting initial filter list and initial filters which will be reused later to reset the filters
//     const initialValues = cloneDeep(props.modelValue)
//     const initialFilters: DataFilterItemConfig[] = cloneDeep(
//       setVisibleState(props.filters, initialValues)
//     )
//     // setting refs for the filter list and values to be used in the component which will change based on the user interaction
//     const valueRef = ref(cloneDeep(initialValues))
//     const filtersRef: Ref<DataFilterItemConfig[]> = ref(
//       cloneDeep(initialFilters)
//     )
//     // setting the applied and remaining filters based on the visibility
//     const appliedFilterListRef = useArrayFilter(
//       filtersRef,
//       (filterItem) => !!filterItem.applied
//     )
//     const remainingFilterListRef = useArrayFilter(
//       filtersRef,
//       (filterItem) => !filterItem.applied
//     )
//     // filtering the data based on the filter state
//     doUpdateData()
//     // setting the activeResetRef to check if the reset button is active or not depending if anything has changed in the filter list
//     const activeResetRef = ref(false)
//     // setting the intial placement index to be used in the filter list
//     let placementIndex = filtersRef.value.length

//     const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)

//     // Apply filter
//     const applyFilter = (
//       field: string,
//       selectorKey: string,
//       value: any
//     ): void => {
//       let appliedValue =
//         selectorKey === 'by-condition' ? { ...value } : { value }
//       filtersRef.value = filtersRef.value.map((filterItem) => {
//         filterItem.popoverActive = false
//         if (filterItem.field === field) {
//           filterItem.applied = true
//           filterItem.activeSelector = selectorKey
//           filterItem.popoverActive = false
//           if (selectorKey) {
//             filterItem.selectors = {
//               ...filterItem.selectors,
//               [selectorKey]: {
//                 ...filterItem.selectors[selectorKey],
//                 ...appliedValue
//               }
//             }
//             updateFilterState(field, { type: selectorKey, ...appliedValue })
//           }
//           // below condition is to handle the case when the filter is applied for the first time
//           if (!selectorKey && !value) {
//             placementIndex += 1
//             filterItem.index = placementIndex
//             // Setting the filter state in case the filter is applied for the first time and has values present
//             const selectorKey =
//               filterItem.activeSelector ?? Object.keys(filterItem.selectors)[0]
//             const initialValue = filterItem.selectors[selectorKey].value
//             const initialCondition = filterItem.selectors[selectorKey].condition
//             appliedValue =
//               selectorKey === 'by-condition'
//                 ? { value: initialValue, condition: initialCondition }
//                 : { value: initialValue }
//             filterItem.popoverActive = true
//             updateFilterState(field, { type: selectorKey, ...appliedValue })
//           }
//         }
//         return { ...filterItem, key: uniqueId() }
//       })
//       if (!selectorKey && !value) {
//         filtersRef.value = sortBy(filtersRef.value, 'index')
//       }
//     }

//     // Removing filter
//     const removeFilter = (field: string): void => {
//       filtersRef.value = filtersRef.value.map((filterItem) => {
//         if (filterItem.field === field) {
//           filterItem.popoverActive = false
//           filterItem.applied = false
//           filterItem.selectors = {
//             ...initialFilters.find((val) => val.field === field)?.selectors
//           }
//         }
//         return { ...filterItem, key: uniqueId() }
//       })
//       activeResetRef.value = true
//       set(valueRef.value, field, void 0)
//       doUpdateData()
//     }

//     // reset individual filter
//     const resetFilter = (field: string): void => {
//       const filterItem = filtersRef.value.find((item) => item.field === field)
//       if (filterItem) {
//         const selectorKey =
//           filterItem.activeSelector ?? Object.keys(filterItem.selectors)[0]
//         filterItem.selectors = {
//           ...initialFilters.find((val) => val.field === field)?.selectors
//         }
//         activeResetRef.value = true
//         set(valueRef.value, field, {
//           type: selectorKey,
//           value: filterItem.selectors[selectorKey].value
//         })
//         filterItem.key = uniqueId()
//       }
//       doUpdateData()
//     }

//     // reset to initial list
//     const reset = (): void => {
//       filtersRef.value = filtersRef.value.map((filterItem) => {
//         const initialFilterField = initialFilters.find(
//           (val) => val.field === filterItem.field
//         )
//         if (initialFilterField) {
//           const { index, applied: visible, fixed, selectors } = initialFilterField
//           return {
//             ...filterItem,
//             index,
//             applied: visible,
//             fixed,
//             selectors: { ...selectors },
//             key: uniqueId()
//           }
//         }
//         return filterItem
//       })
//       filtersRef.value = sortBy(filtersRef.value, 'index')
//       activeResetRef.value = false
//       placementIndex = filtersRef.value.length
//       valueRef.value = { ...initialValues }
//       doUpdateValue()
//       doUpdateData()
//     }

//     // updating the filter state and returning back to user
//     const updateFilterState: FilterInjection['updateFilterState'] = (
//       field,
//       value
//     ) => {
//       activeResetRef.value = true
//       set(valueRef.value, field, value)
//       doUpdateValue()
//     }

//     function doUpdateData (): void {
//       const { 'onUpdate:data': _onUpdateData, onUpdateData } = props
//       if (initialData.length > 0) {
//         dataRef.value = getFilteredList(initialData, valueRef.value)
//       }
//       if (onUpdateData) {
//         call(onUpdateData as any, dataRef.value)
//       }
//       if (_onUpdateData) {
//         call(_onUpdateData as any, dataRef.value)
//       }
//     }

//     // trigger the update value function to return the updated value to the user
//     function doUpdateValue (): void {
//       const { 'onUpdate:modelValue': _onUpdateFilters, onUpdateModelValue } =
//         props
//       if (_onUpdateFilters) {
//         call(_onUpdateFilters as any, valueRef.value)
//       }
//       if (onUpdateModelValue) {
//         call(onUpdateModelValue as any, valueRef.value)
//       }
//       doUpdateData()
//     }

//     // sets the visibility in the filters based on the value
//     function setVisibleState (
//       filters: DataFilterItemConfig[],
//       value: FilterState
//     ): DataFilterItemConfig[] {
//       return filters.map((filterItem, index) => {
//         const updatedSelectors = { ...filterItem.selectors }
//         if (value?.[filterItem.field]) {
//           const filterType = value[filterItem.field].type
//           if (filterType) {
//             updatedSelectors[filterType] = {
//               ...filterItem.selectors[filterType],
//               value: value[filterItem.field].value,
//               condition: value[filterItem.field].condition
//             }
//           }
//         }
//         return {
//           ...filterItem,
//           index,
//           visible: !!value[filterItem.field],
//           selectors: { ...updatedSelectors }
//         }
//       })
//     }

//     const filterFunctionMap = new Map<string, unknown>()

//     provide(filterInjectionKey, {
//       updateFilterState,
//       getFieldValue: (field: string) => {
//         return valueRef.value?.[field]
//       },
//       applyFilterValues: applyFilter,
//       resetFilter,
//       removeAppliedFilter: removeFilter,
//       registerFilterFn (field, filterFn) {
//         filterFunctionMap.set(field, filterFn)
//       }
//     })

//     const themeRef = useTheme(
//       'Filter',
//       '-filter',
//       style,
//       filterLight,
//       props,
//       mergedClsPrefixRef
//     )

//     const cssVarsRef = computed(() => {
//       const {
//         self: {
//           valueTextColor,
//           tagBackgroundColor,
//           tagHoverColor,
//           tagActiveColor,
//           resetColor
//         }
//       } = themeRef.value
//       return {
//         '--z-active-value-color': valueTextColor,
//         '--z-tag-background-color': tagBackgroundColor,
//         '--z-reset-color': resetColor,
//         '--z-tag-hover-color': tagHoverColor,
//         '--z-tag-active-color': tagActiveColor
//       }
//     })

//     const themeClassHandle = inlineThemeDisabled
//       ? useThemeClass('filter', undefined, cssVarsRef, props)
//       : undefined

//     return {
//       appliedFilterList: appliedFilterListRef,
//       remainingFilterList: remainingFilterListRef,
//       applyFilter,
//       resetFilter,
//       reset,
//       activeReset: activeResetRef,
//       addFilterTagColor: {
//         color: 'var(--z-tag-background-color)',
//         textColor: 'var(--z-active-value-color)',
//         iconColor: 'var(--z-active-value-color)'
//       },
//       mergedClsPrefix: mergedClsPrefixRef,
//       cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
//       themeClass: themeClassHandle?.themeClass,
//       onRender: themeClassHandle?.onRender
//     }
//   },
//   render () {
//     const {
//       $slots,
//       mergedClsPrefix,
//       onRender,
//       addFilterTagColor,
//       appliedFilterList,
//       remainingFilterList,
//       activeReset,
//       reset
//     } = this

//     onRender?.()

//     const resetNode = (
//       <ZSpace class="reset-container" inline>
//         {() => {
//           return $slots?.reset ? (
//             $slots?.reset?.()
//           ) : (
//             <ZButton class="reset" size="small" variant="text" onClick={reset}>
//               {{
//                 icon: () => (
//                   <ZBaseIcon clsPrefix={mergedClsPrefix}>
//                     {() => <ResetIcon />}
//                   </ZBaseIcon>
//                 ),
//                 default: () => FILTER_ITEM_ACTIONS.RESET
//               }}
//             </ZButton>
//           )
//         }}
//       </ZSpace>
//     )

//     const remainingFiltersNode = (
//       <ZPopover
//         trigger="click"
//         placement="bottom-start"
//         minWidth={180}
//         style={{ padding: 0 }}
//       >
//         {{
//           trigger: () => (
//             <ZTag
//               size="medium"
//               round
//               checkable
//               color={addFilterTagColor}
//               borderStyle="dashed"
//             >
//               {{
//                 icon: () => (
//                   <ZBaseIcon clsPrefix={mergedClsPrefix}>
//                     {() => <AddIcon />}
//                   </ZBaseIcon>
//                 ),
//                 default: () => FILTER_TEXT
//               }}
//             </ZTag>
//           ),
//           default: () => (
//             <ZList
//               showDivider={false}
//               selectable
//               hoverable
//               clickable
//               onUpdateModelValue={this.applyFilter as any}
//             >
//               {() =>
//                 remainingFilterList.map((filter) => (
//                   <ZListItem key={filter.field} value={filter.field}>
//                     {() => (
//                       <ZText>{() => filter.label || filter.field || ''}</ZText>
//                     )}
//                   </ZListItem>
//                 ))
//               }
//             </ZList>
//           )
//         }}
//       </ZPopover>
//     )

//     return (
//       <ZSpace
//         wrap={false}
//         style={this.cssVars as CSSProperties}
//         class={[`${mergedClsPrefix}-filter`, this.themeClass]}
//       >
//         {{
//           default: () => [
//             <ZSpace inline>
//               {() => {
//                 const nodes = appliedFilterList.map((filter) => {
//                   return (
//                     <DataFilterItemWrapper
//                       type={filter.type}
//                       field={filter.field}
//                       key={filter.key}
//                       label={filter.label}
//                       activeSelector={filter.activeSelector}
//                       selectors={filter.selectors}
//                       fixed={filter.fixed}
//                       popoverActive={filter.popoverActive}
//                       popoverStyle={filter.popoverStyle}
//                       labelTransform={filter.labelTransform}
//                     ></DataFilterItemWrapper>
//                   )
//                 })

//                 remainingFilterList.length && nodes.push(remainingFiltersNode)
//                 activeReset && nodes.push(resetNode)
//                 return nodes
//               }}
//             </ZSpace>
//           ]
//         }}
//       </ZSpace>
//     )
//   }
// })
