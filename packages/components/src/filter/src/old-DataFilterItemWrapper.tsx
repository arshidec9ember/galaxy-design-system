// import { useToggle } from '@vueuse/core'
// import { upperFirst } from 'lodash-es'
// import {
//   defineComponent,
//   inject,
//   provide,
//   ref,
//   h,
//   computed,
//   Fragment,
//   type PropType,
//   type VNodeChild
// } from 'vue'
// import { ArrowDropDownIcon } from '../../_internal/icons'
// import { ZButton } from '../../button'
// import { ZIcon } from '../../icon'
// import { ZPopover } from '../../popover'
// import { ZTabPane, ZTabs } from '../../tabs'
// import { ZTag } from '../../tag'
// import { ZSpace } from './../../space'
// import { getFilterItemSelector } from './createFilterInput'
// import type {
//   FilterValue,
//   FilterValueSelector,
//   LabelValueMap
// } from './interface'
// import { filterInjectionKey, filterItemInjectionKey } from './keys'
// import format from 'date-fns/format'
// import { useLocale, useConfig } from '../../_mixins'
// import {
//   FILTER_ITEM_ACTIONS,
//   DATE_TIME_PICKER_TYPES,
//   DEFAULT_TEXT_CONDITIONAL_VALUE,
//   DEFAULT_NUMBER_CONDITIONAL_VALUE,
//   SELECTOR_TYPES
// } from './constants'
// import { type FilterOperator, NUMBER_OPERATORS, TEXT_OPERATORS } from './utils'

// export const dataFilterItemWrapperProps = {
//   field: { type: String, default: 'field' },
//   fixed: { type: Boolean },
//   type: {
//     type: String as PropType<'text' | 'number' | 'date'>,
//     default: 'text'
//   },
//   activeSelector: String,
//   popoverStyle: Object,
//   popoverActive: {
//     type: Boolean,
//     default: false
//   },
//   label: {
//     type: [String, Function] as PropType<string | (() => VNodeChild)>,
//     default: ''
//   },
//   selectors: {
//     type: Object as PropType<FilterValueSelector>,
//     default: null
//   },
//   triggerRenderType: {
//     type: String as PropType<'tag' | 'button'>,
//     default: 'tag'
//   },
//   labelTransform: {
//     type: Function as PropType<
//     (
//       label: string | VNodeChild,
//       value: string | string[] | number | number[],
//       condition?: string
//     ) => LabelValueMap
//     >,
//     default: undefined
//   }
// }

// export default defineComponent({
//   name: 'DataFilterItemWrapper',
//   props: dataFilterItemWrapperProps,
//   setup (props) {
//     const filterInjection = inject(filterInjectionKey, null)
//     const selectorComponents: any[] = []
//     const { mergedClsPrefixRef } = useConfig(props)
//     const conditionRef = ref<string>(
//       props.selectors?.[SELECTOR_TYPES.CONDITION]?.condition ||
//         (props.selectors?.[SELECTOR_TYPES.CONDITION]?.type === 'text'
//           ? DEFAULT_TEXT_CONDITIONAL_VALUE
//           : DEFAULT_NUMBER_CONDITIONAL_VALUE)
//     )
//     const temporaryConditionRef = ref<string>(
//       props.selectors?.[SELECTOR_TYPES.CONDITION]?.condition ||
//         (props.selectors?.[SELECTOR_TYPES.CONDITION]?.type === 'text'
//           ? DEFAULT_TEXT_CONDITIONAL_VALUE
//           : DEFAULT_NUMBER_CONDITIONAL_VALUE)
//     )
//     for (const selectorKey in props.selectors) {
//       if (Object.prototype.hasOwnProperty.call(props.selectors, selectorKey)) {
//         const filterComponent = getFilterItemSelector(selectorKey)
//         if (filterComponent) {
//           selectorComponents.push({
//             ...filterComponent,
//             config: props.selectors[selectorKey]
//           })
//         }
//       }
//     }
//     const selectedTabRef = ref<string | undefined>(
//       selectorComponents.length > 0 ? selectorComponents[0].key : undefined
//     )
//     selectedTabRef.value = props.activeSelector || selectedTabRef.value
//     const selectedComponentIndex = selectorComponents.findIndex(
//       (item) => item.key === selectedTabRef.value
//     )
//     const defaultValues =
//       selectorComponents.length > 0
//         ? selectorComponents[
//           selectedComponentIndex >= 0 ? selectedComponentIndex : 0
//         ].config?.value
//         : null
//     const activeSelectorComputedRef = computed(() => {
//       return props.selectors[selectedTabRef.value ?? 0]
//     })
//     const temporarySelectedValuesRef = ref<FilterValue>(defaultValues)
//     const selectedValuesRef = ref<FilterValue>(defaultValues)

//     const labelFormatFnMap = new Map()

//     provide(filterItemInjectionKey, {
//       getFieldValue: filterInjection?.getFieldValue,
//       updateFilterState: filterInjection?.updateFilterState,
//       removeAppliedFilter: filterInjection?.removeAppliedFilter,
//       registerFilterFn: filterInjection?.registerFilterFn,
//       labelFormatter (labelFn) {
//         labelFormatFnMap.set(selectedTabRef.value, labelFn)
//       },
//       updateValue (value, condition?: string) {
//         if (condition) {
//           temporaryConditionRef.value = condition
//         }
//         if (value !== undefined) {
//           temporarySelectedValuesRef.value = value
//         }
//         if (!showFooter()) {
//           applyFilter()
//           setIsPopoverActive(false)
//         }
//       }
//     })
//     const applyFilter = (): void => {
//       selectedValuesRef.value = temporarySelectedValuesRef.value
//       conditionRef.value = temporaryConditionRef.value
//       if (selectedTabRef.value) {
//         filterInjection?.applyFilterValues(
//           props.field,
//           selectedTabRef.value,
//           selectedTabRef.value !== SELECTOR_TYPES.CONDITION
//             ? selectedValuesRef.value
//             : { value: selectedValuesRef.value, condition: conditionRef.value }
//         )
//       }
//     }
//     const getLabelValues = (
//       label: string | VNodeChild,
//       value?: string | string[] | number | number[],
//       type?: string
//     ): LabelValueMap => {
//       // Use labelTransform prop if provided
//       if (props.labelTransform && value) {
//         return props.labelTransform(label, value, conditionRef.value)
//       } else {
//         if (!value || (Array.isArray(value) && !value.length)) {
//           return {
//             prefix: label
//           }
//         }
//         let suffix = ''
//         let updatedValue = value
//         // handling label for conditional filters
//         if (selectedTabRef.value === SELECTOR_TYPES.CONDITION) {
//           const OPERATOR_MAP: Record<string, FilterOperator> = {
//             text: TEXT_OPERATORS,
//             number: NUMBER_OPERATORS
//           }
//           const conditionValue =
//             OPERATOR_MAP[
//               props.selectors?.[SELECTOR_TYPES.CONDITION]?.type ?? 'text'
//             ][conditionRef.value]?.label
//           suffix = `${conditionValue} ${
//             Array.isArray(value) && value.length === 2
//               ? `${value[0]} - ${value[1]}`
//               : String(value)
//           }`
//           return {
//             prefix: typeof label === 'string' ? label + ' :' : label,
//             suffix
//           }
//         } else if (type === DATE_TIME_PICKER_TYPES.DATE) {
//           const { localeRef } = useLocale('Filters')
//           const mergedFormatRef = computed(() => {
//             switch (props.selectors[SELECTOR_TYPES.DATE].type) {
//               case DATE_TIME_PICKER_TYPES.DATE:
//               case DATE_TIME_PICKER_TYPES.DATE_RANGE:
//                 return localeRef.value.dateFormat
//               case DATE_TIME_PICKER_TYPES.DATE_TIME:
//               case DATE_TIME_PICKER_TYPES.DATE_TIME_RANGE:
//                 return localeRef.value.dateTimeFormat
//               case DATE_TIME_PICKER_TYPES.YEAR:
//               case DATE_TIME_PICKER_TYPES.YEAR_RANGE:
//                 return localeRef.value.yearTypeFormat
//               case DATE_TIME_PICKER_TYPES.MONTH:
//               case DATE_TIME_PICKER_TYPES.MONTH_RANGE:
//                 return localeRef.value.monthTypeFormat
//               case DATE_TIME_PICKER_TYPES.QUARTER:
//               case DATE_TIME_PICKER_TYPES.QUARTER_RANGE:
//                 return localeRef.value.quarterFormat
//               default:
//                 return localeRef.value.dateTimeFormat
//             }
//           })
//           if (Array.isArray(value) && value[0] && value[1]) {
//             updatedValue = [
//               format(Number(value[0]), mergedFormatRef.value),
//               format(Number(value[1]), mergedFormatRef.value)
//             ]
//           } else {
//             updatedValue = format(Number(value), mergedFormatRef.value)
//           }
//           suffix = Array.isArray(updatedValue)
//             ? updatedValue.length > 2
//               ? `${updatedValue.length} Selected`
//               : updatedValue.join(' - ')
//             : String(updatedValue)
//         } else {
//           suffix = Array.isArray(updatedValue)
//             ? updatedValue.length > 2
//               ? `${updatedValue.length} Selected`
//               : updatedValue.join(', ')
//             : String(updatedValue)
//         }
//         return {
//           prefix: typeof label === 'string' ? label + ' :' : label,
//           suffix
//         }
//       }
//     }

//     const finalLabel = computed<LabelValueMap>(() => {
//       const label =
//         typeof props.label === 'function' ? props.label() : props.label
//       const defaultLabel = label || upperFirst(props.field) || ''
//       if (!selectedValuesRef.value) {
//         return getLabelValues(defaultLabel)
//       }

//       const formatter = labelFormatFnMap.get(selectedTabRef.value)

//       return getLabelValues(
//         defaultLabel,
//         formatter
//           ? formatter(selectedValuesRef.value)
//           : selectedValuesRef.value,
//         props.type
//       )
//     })

//     const [isPopoverActive, setIsPopoverActive] = useToggle(props.popoverActive)

//     const tabValueUpdate = (value: string): void => {
//       // write a logic to set the default value for the selected tab
//       selectedTabRef.value = value
//     }

//     const footerActionHandler = (action: (...args: any[]) => any) => {
//       return () => {
//         action()
//         setIsPopoverActive(false)
//       }
//     }

//     const showFooter = (): boolean => {
//       if (selectedTabRef.value) {
//         // if there are any multi-select filters, footer will always be shown
//         if (
//           props.selectors[selectedTabRef.value]?.multiple ||
//           props.selectors[selectedTabRef.value]?.type?.includes('range')
//         ) {
//           return true
//         }
//         return !props.selectors?.[selectedTabRef.value]?.hideFooter
//       }
//       return false
//     }

//     const valueExists = (selectedValues: FilterValue): boolean => {
//       if (Array.isArray(selectedValues)) {
//         return selectedValues?.length > 0
//       }
//       return !!selectedValues
//     }

//     const handleClickOutSide = (): void => {
//       setIsPopoverActive(false)
//       if (!defaultValues) {
//         filterInjection?.removeAppliedFilter(props.field)
//       }
//     }

//     const handleTriggerClose = (): void => {
//       selectedValuesRef.value = defaultValues
//       filterInjection?.removeAppliedFilter(props.field)
//     }

//     const handleApplyAction = footerActionHandler(() => {
//       applyFilter()
//     })

//     const handleClearAction = footerActionHandler(() => {
//       if (selectedTabRef.value === SELECTOR_TYPES.LIST) {
//         temporarySelectedValuesRef.value = activeSelectorComputedRef.value
//           .multiple
//           ? []
//           : ''
//       } else if (selectedTabRef.value === SELECTOR_TYPES.DATE) {
//         temporarySelectedValuesRef.value = null
//       } else {
//         temporarySelectedValuesRef.value =
//           activeSelectorComputedRef.value.type === 'text' ? '' : 0
//       }
//       applyFilter()
//     })

//     const handleResetAction = footerActionHandler(() => {
//       filterInjection?.resetFilter(props.field)
//     })

//     return {
//       handleClickOutSide,
//       handleTriggerClose,
//       handleApplyAction,
//       handleResetAction,
//       handleClearAction,
//       mergedClsPrefix: mergedClsPrefixRef,
//       finalLabel,
//       selectorComponents,
//       tabValueUpdate,
//       selectedValues: selectedValuesRef,
//       valueExists,
//       selectedTab: selectedTabRef,
//       showFooter,
//       backgroundColorTag: { color: 'var(--z-tag-background-color)' },
//       handleUpdateShow: setIsPopoverActive,
//       isPopoverActive,
//       popoverStyle: ref(props.popoverStyle),
//       fixed: ref(props.fixed),
//       triggerRenderType: props.triggerRenderType,
//       activeSelector: activeSelectorComputedRef
//     }
//   },
//   render () {
//     const {
//       $slots,
//       mergedClsPrefix,
//       backgroundColorTag,
//       selectedValues,
//       selectedTab,
//       activeSelector,
//       showFooter
//     } = this

//     const labelNode = [
//       <span class="filter-tag-label">{this.finalLabel.prefix}</span>,
//       this.finalLabel.suffix && (
//         <span class="filter-tag-value">{this.finalLabel.suffix}</span>
//       )
//     ]

//     const tabsNode = this.selectorComponents &&
//       this.selectorComponents.length > 0 && (
//         <ZTabs
//           defaultModelValue={selectedTab}
//           onUpdateModelValue={this.tabValueUpdate}
//           tabsPadding={16}
//           variant="line"
//           animated
//         >
//           {() =>
//             this.selectorComponents.map(
//               ({ key, name, component: SelectorComponent, config }) => (
//                 <ZTabPane style="padding: 0" key={key} name={key} tab={name}>
//                   {() => (
//                     <SelectorComponent
//                       {...config}
//                       key={key}
//                       value={selectedValues}
//                     ></SelectorComponent>
//                   )}
//                 </ZTabPane>
//               )
//             )
//           }
//         </ZTabs>
//     )

//     const panelNode: () => JSX.Element = () => {
//       if (this.selectorComponents.length === 1) {
//         const { component: SelectorComponent, config } =
//           this.selectorComponents[0]

//         return (
//           <SelectorComponent
//             {...config}
//             value={selectedValues}
//           ></SelectorComponent>
//         )
//       }

//       return tabsNode || <></>
//     }

//     const showFooterAction = (action: string): boolean => {
//       const footerActions = activeSelector.actions ?? ['apply', 'cancel']
//       return (
//         footerActions.findIndex((val: string) => val === action.toLowerCase()) >
//         -1
//       )
//     }

//     const actionsMap = {
//       apply: (
//         <ZButton
//           size="small"
//           variant="filled"
//           color="primary"
//           onClick={this.handleApplyAction}
//         >
//           {() => FILTER_ITEM_ACTIONS.APPLY}
//         </ZButton>
//       ),
//       cancel: (
//         <ZButton size="small" onClick={this.handleClickOutSide}>
//           {() => FILTER_ITEM_ACTIONS.CANCEL}
//         </ZButton>
//       ),
//       reset: (
//         <ZButton size="small" variant="text" onClick={this.handleResetAction}>
//           {() => FILTER_ITEM_ACTIONS.RESET}
//         </ZButton>
//       ),
//       clear: (
//         <ZButton size="small" variant="text" onClick={this.handleClearAction}>
//           {() => FILTER_ITEM_ACTIONS.CLEAR}
//         </ZButton>
//       )
//     }

//     return (
//       <div class={`${mergedClsPrefix}-filter-item`}>
//         <ZPopover
//           content-style="padding: 0;"
//           trigger="click"
//           placement="bottom-start"
//           onUpdateShow={this.handleUpdateShow}
//           onClickoutside={this.handleClickOutSide}
//           show={this.isPopoverActive}
//           style={{ padding: '0px', minWidth: '226px', ...this.popoverStyle }}
//         >
//           {{
//             trigger: () => {
//               if (this.triggerRenderType === 'button') {
//                 return (
//                   <ZButton size="small" iconPlacement="end">
//                     {{
//                       default: () => labelNode,
//                       icon: () => (
//                         <ZIcon>
//                           {() => <ArrowDropDownIcon></ArrowDropDownIcon>}
//                         </ZIcon>
//                       )
//                     }}
//                   </ZButton>
//                 )
//               }

//               return (
//                 <ZTag
//                   size="medium"
//                   round
//                   checkable
//                   color={backgroundColorTag}
//                   borderStyle={
//                     this.valueExists(selectedValues) ? 'solid' : 'dashed'
//                   }
//                   checked={this.isPopoverActive}
//                   closable={
//                     typeof this.fixed === 'boolean' ? !this.fixed : true
//                   }
//                   onClose={this.handleTriggerClose}
//                 >
//                   {() => labelNode}
//                 </ZTag>
//               )
//             },

//             default: panelNode,
//             footer: () =>
//               $slots.footer ??
//               (showFooter() && (
//                 <ZSpace align="center">
//                   {() => [
//                     showFooterAction(FILTER_ITEM_ACTIONS.APPLY) &&
//                       actionsMap.apply,
//                     showFooterAction(FILTER_ITEM_ACTIONS.CANCEL) &&
//                       actionsMap.cancel,
//                     showFooterAction(FILTER_ITEM_ACTIONS.RESET) &&
//                       actionsMap.reset,
//                     showFooterAction(FILTER_ITEM_ACTIONS.CLEAR) &&
//                       actionsMap.clear
//                   ]}
//                 </ZSpace>
//               ))
//           }}
//         </ZPopover>
//       </div>
//     )
//   }
// })
