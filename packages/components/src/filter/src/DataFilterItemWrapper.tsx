import { useToggle } from '@vueuse/core'
import {
  cloneDeep,
  isEmpty,
  isEqual,
  isNil,
  isObject,
  isUndefined,
  toString,
  upperFirst
} from 'lodash-es'
import {
  Fragment,
  computed,
  defineComponent,
  h,
  inject,
  provide,
  ref,
  watch,
  watchEffect,
  Suspense,
  type PropType,
  type VNodeChild,
  type VNode
} from 'vue'
import { ArrowDropDownIcon, ResetIcon } from '../../_internal/icons'
import { useConfig } from '../../_mixins'
import { ZButton } from '../../button'
import { ZIcon } from '../../icon'
import { ZPopover } from '../../popover'
import { ZTabPane, ZTabs } from '../../tabs'
import { ZTag } from '../../tag'
import { ZSpace } from './../../space'
import { FILTER_ITEM_ACTIONS } from './constants'
import { getFilterItemSelector, type FilterItemsMap } from './createFilterInput'
import type {
  FilterItemUISelectorModel,
  FilterModel,
  FilterValue,
  FilterValueSelector,
  LabelValueMap
} from './interface'
import { filterInjectionKey, filterItemInjectionKey } from './keys'
import { ZSpinner } from '../../spinner'
import { findValueType } from './utils'

interface SelectorComponent extends FilterItemsMap {
  config: FilterItemUISelectorModel
}

const RENDER_FILTER_VALUE_LIMIT = 2

export const dataFilterItemWrapperProps = {
  field: { type: String, required: true, default: '' },
  fixed: { type: Boolean, default: false },
  type: {
    type: String as PropType<'text' | 'number' | 'date'>,
    default: 'text'
  },
  filterModelValue: {
    type: Object as PropType<FilterModel>,
    default: null
  },
  initialModelValue: {
    type: Object as PropType<FilterModel>,
    default: null
  },
  popoverStyle: Object,
  popoverActive: {
    type: Boolean,
    default: false
  },
  label: {
    type: [String, Function] as PropType<string | (() => VNodeChild)>,
    default: ''
  },
  selectors: {
    type: Object as PropType<FilterValueSelector>,
    default: null
  },
  triggerRenderType: {
    type: String as PropType<'tag' | 'button'>,
    default: 'tag'
  },
  onApply: Function as PropType<(filterModel: FilterModel) => void>,
  onCancel: Function as PropType<() => void>,
  onReset: Function as PropType<() => void>
}

export default defineComponent({
  name: 'DataFilterItemWrapper',
  props: dataFilterItemWrapperProps,
  setup (props) {
    const Filter = inject(filterInjectionKey, null)
    const initialModelValue = props.initialModelValue

    // can make `selectorComponents`  a ref in future if needed
    const selectorComponents: SelectorComponent[] = []
    const { mergedClsPrefixRef } = useConfig(props)

    for (const selectorKey in props.selectors) {
      if (Object.prototype.hasOwnProperty.call(props.selectors, selectorKey)) {
        const filterComponent = getFilterItemSelector(selectorKey)
        if (filterComponent) {
          const selectorConfig = props.selectors[selectorKey]
          const defaults = {
            actions: ['apply', 'cancel']
          }
          const selectorComponent = {
            ...filterComponent,
            config: Object.assign(defaults, selectorConfig)
          }
          selectorComponents.push(selectorComponent)
        }
      }
    }

    const selectedTabRef = ref<string>(
      props.filterModelValue?.selector ?? selectorComponents[0].key
    )

    const selectedTabComponent = computed(() =>
      selectorComponents.find((i) => i.key === selectedTabRef.value)
    )

    const hasActions = computed(
      () => !!selectedTabComponent.value?.config.actions?.length
    )

    const defaultValues = selectedTabComponent.value?.config.value ?? null

    const temporarySelectedValuesRef = ref<FilterValue>(null)
    const tempAttrsRef = ref({})
    const attrsRef = ref({})
    const _internalSelectedValuesRef = ref<Record<string, FilterValue>>({
      [selectedTabRef.value]: cloneDeep(defaultValues)
    })

    const selectedValuesRef = computed<any>({
      get () {
        return _internalSelectedValuesRef.value[selectedTabRef.value]
      },
      set (value: FilterModel) {
        _internalSelectedValuesRef.value[selectedTabRef.value] = value
      }
    })

    watchEffect(() => {
      selectedValuesRef.value = cloneDeep(props.filterModelValue?.value)
    })

    const applyFilter = (value = temporarySelectedValuesRef.value): void => {
      selectedValuesRef.value = cloneDeep(value)
      attrsRef.value = cloneDeep(tempAttrsRef.value)

      if (selectedTabRef.value) {
        const filterModel = {
          type: findValueType(value, selectedTabRef.value),
          value: selectedValuesRef.value,
          selector: selectedTabRef.value,
          ...attrsRef.value
        }
        Filter?.updateFilterState(props.field, filterModel)

        if (typeof props.onApply === 'function') {
          props.onApply(filterModel)
        }
      }
    }

    const labelFormatFnMap = new Map()

    provide(filterItemInjectionKey, {
      removeAppliedFilter: Filter?.removeAppliedFilter,
      forceClosePopover: () => {
        applyFilter(temporarySelectedValuesRef.value)
        setIsPopoverActive(false)
      },
      updateValue (value, attrs) {
        if (isUndefined(value)) return

        temporarySelectedValuesRef.value = value

        if (attrs) tempAttrsRef.value = attrs
      }
    })

    const getLabelValues = (
      label: string | VNodeChild,
      value?: string | string[] | number | number[]
    ): LabelValueMap => {
      if (!valueExists(value)) {
        return {
          prefix: label
        }
      }

      const suffix = computed(() => {
        if (selectedTabComponent.value?.config?.valueTransformer) {
          if (Array.isArray(value)) {
            const updatedValue = value.map(
              (val) =>
                (selectedTabComponent.value as any)?.config?.valueTransformer?.(
                  val,
                  props.field,
                  selectedTabComponent.value?.config
                ) ?? val
            )
            return value.length > RENDER_FILTER_VALUE_LIMIT
              ? `${value.length} Selected`
              : updatedValue.join(', ')
          }
          const transformValue =
            selectedTabComponent.value?.config?.valueTransformer?.(
              value,
              props.field,
              selectedTabComponent.value?.config
            ) ?? value

          return toString(transformValue)
        }

        if (
          typeof selectedTabComponent.value?.renderFilterValue === 'function'
        ) {
          const values = selectedTabComponent.value?.renderFilterValue(
            props.field,
            props.filterModelValue,
            selectedTabComponent.value?.config
          )
          if (Array.isArray(values)) {
            return values.length > RENDER_FILTER_VALUE_LIMIT
              ? `${values.length} Selected`
              : values.join(', ')
          }
          return values
        }

        if (Array.isArray(value)) {
          return value.length > RENDER_FILTER_VALUE_LIMIT
            ? `${value.length} Selected`
            : value.join(', ')
        }

        return toString(value)
      })

      return {
        prefix: typeof label === 'string' ? label + ':' : label,
        suffix: suffix.value
      }
    }

    const finalLabel = computed<LabelValueMap>(() => {
      const label =
        typeof props.label === 'function' ? props.label() : props.label
      const defaultLabel = label || upperFirst(props.field) || ''
      if (!selectedValuesRef.value) {
        return getLabelValues(defaultLabel)
      }

      const formatter = labelFormatFnMap.get(selectedTabRef.value)

      return getLabelValues(
        defaultLabel,
        formatter ? formatter(selectedValuesRef.value) : selectedValuesRef.value
      )
    })

    const [isPopoverActive, setIsPopoverActive] = useToggle(props.popoverActive)

    watch(isPopoverActive, (active) => {
      if (active) {
        // Handle popover open action if any
        return
      }

      if (!hasActions.value) {
        if (isNil(temporarySelectedValuesRef.value)) {
          removeAppliedFilter()
        } else {
          applyFilter()
        }

        return
      }

      if (!valueExists(selectedValuesRef.value)) {
        removeAppliedFilter()
        return
      }

      // failsafe to update attrs
      if (
        (!isNil(temporarySelectedValuesRef.value) ||
          isEmpty(temporarySelectedValuesRef.value)) &&
        isEqual(temporarySelectedValuesRef.value, selectedValuesRef.value)
      ) {
        if (!hasActions.value) {
          applyFilter(selectedValuesRef.value)
        }
      }

      if (
        isNil(temporarySelectedValuesRef.value) ||
        isEmpty(temporarySelectedValuesRef.value)
      ) {
        // Should handle remove filter action
        // Take prop to control this action
      }

      temporarySelectedValuesRef.value = null
      tempAttrsRef.value = {}
    })

    const tabValueUpdate = (value: string): void => {
      // write a logic to set the default value for the selected tab
      selectedTabRef.value = value
    }

    const valueExists = (value?: FilterValue): boolean => {
      if (isObject(value)) {
        return !isEmpty(value)
      }

      return !!value
    }

    const closePopover = (): void => {
      setIsPopoverActive(false)
    }

    const handleCancelAction = (): void => {
      closePopover()
      if (typeof props.onCancel === 'function') {
        props.onCancel()
      }
    }

    const removeAppliedFilter = (): void => {
      Filter?.removeAppliedFilter(props.field)
    }

    const handleApplyAction = (): void => {
      applyFilter()
      closePopover()
    }

    const handleClearAction = (): void => {
      closePopover()
    }

    const handleResetAction = (): void => {
      Filter?.updateFilterState(props.field, initialModelValue)
      setIsPopoverActive(false)

      if (typeof props.onReset === 'function') {
        props.onReset()
      }
    }

    const isResetHiddenRef = computed(() => {
      const initialValue = initialModelValue || {}
      const modelValue = props.filterModelValue || {}

      // If both objects are empty, hide the reset button
      if (isEmpty(initialValue) && isEmpty(modelValue)) return true

      const initialFilterValue = initialValue?.value
      const modelValueFilterValue = modelValue?.value

      return (
        (isNil(initialFilterValue) && isNil(modelValueFilterValue)) ||
        isEqual(initialFilterValue, modelValueFilterValue)
      )
    })

    const disableApplyBtn = computed(() => {
      return !valueExists(temporarySelectedValuesRef.value)
    })

    const popoverValues = computed<any>(() => {
      if (selectedTabComponent.value?.config?.valueTransformer) {
        return selectedValuesRef.value.map(
          (val: any) =>
            selectedTabComponent.value?.config.valueTransformer?.(
              val,
              props.field,
              selectedTabComponent.value?.config
            ) ?? val
        )
      }
      if (typeof selectedTabComponent.value?.renderFilterValue === 'function') {
        const values = selectedTabComponent.value?.renderFilterValue(
          props.field,
          props.filterModelValue,
          selectedTabComponent.value?.config
        )
        return values
      }
      return selectedValuesRef.value
    })

    return {
      // action handlers
      handleClickOutSide: handleCancelAction,
      removeAppliedFilter,
      handleApplyAction,
      handleResetAction,
      handleUpdateShow: setIsPopoverActive,
      handleClearAction,

      mergedClsPrefix: mergedClsPrefixRef,
      finalLabel,
      selectorComponents,
      tabValueUpdate,
      selectedValues: selectedValuesRef,
      temporarySelectedValues: temporarySelectedValuesRef,
      attrs: attrsRef,
      disableApplyBtn,
      selectedTab: selectedTabRef,
      backgroundColorTag: {
        // color: 'var(--z-tag-background-color)',
        borderColor: !selectedValuesRef.value
          ? 'var(--z-tag-border-color)'
          : undefined
      },
      isPopoverActive,
      popoverStyle: ref(props.popoverStyle),
      fixed: ref(props.fixed),
      triggerRenderType: props.triggerRenderType,
      isResetHidden: isResetHiddenRef,
      selectedTabComponent,
      popoverValues,
      hasActions
    }
  },
  render () {
    const {
      $slots,
      mergedClsPrefix,
      backgroundColorTag,
      selectedValues,
      selectedTab,
      selectedTabComponent
    } = this

    const showValuePopover =
      Array.isArray(selectedValues) &&
      selectedValues.length > RENDER_FILTER_VALUE_LIMIT

    const ValuePopover = (
      <ZPopover
        content-style="padding: 0;"
        trigger="hover"
        maxWidth={256}
        placement="top"
        showArrow={false}
      >
        {{
          trigger: () => <span>{this.finalLabel.suffix}</span>,
          default: () => (
            <ZSpace align="center">
              {() =>
                this.popoverValues.map((value: any) => (
                  <ZTag size="small" round bordered borderStyle="solid">
                    {() => value}
                  </ZTag>
                ))
              }
            </ZSpace>
          )
        }}
      </ZPopover>
    )

    const labelNode = [
      <span class={`${this.mergedClsPrefix}-filter__tag-label`}>
        {this.finalLabel.prefix}
      </span>,
      this.finalLabel.suffix && (
        <span class={`${this.mergedClsPrefix}-filter__tag-value`}>
          {showValuePopover ? ValuePopover : this.finalLabel.suffix}
        </span>
      )
    ]

    const generateSelectorComponent = (selector: SelectorComponent): VNode => {
      const node = (
        <selector.component
          {...selector.config}
          {...this.filterModelValue}
          key={this.field + selector.key}
          value={selectedValues}
        ></selector.component>
      )

      if (selector.async) {
        return (
          <Suspense>
            {{
              default: node,
              fallback: <ZSpinner></ZSpinner>
            }}
          </Suspense>
        )
      }

      return <Fragment>{node}</Fragment>
    }

    const tabsNode = this.selectorComponents &&
      this.selectorComponents.length > 0 && (
        <ZTabs
          defaultModelValue={selectedTab}
          onUpdateModelValue={this.tabValueUpdate}
          tabsPadding={16}
          variant="line"
          animated
        >
          {() =>
            this.selectorComponents.map((selector) => (
              <ZTabPane
                style="padding: 0"
                key={selector.key}
                name={selector.key}
                tab={selector.label}
              >
                {() => generateSelectorComponent(selector)}
              </ZTabPane>
            ))
          }
        </ZTabs>
    )

    const panelNode: () => JSX.Element = () => {
      if (this.selectorComponents.length === 1) {
        return generateSelectorComponent(this.selectorComponents[0])
      }

      return tabsNode || <></>
    }

    const showFooterAction = (action: string): boolean => {
      return !!selectedTabComponent?.config.actions?.find(
        (val: string) => val === action.toLowerCase()
      )
    }

    const actionsMap = {
      apply: (
        <ZButton
          size="small"
          variant="filled"
          color="primary"
          disabled={this.disableApplyBtn}
          onClick={this.handleApplyAction}
        >
          {() => FILTER_ITEM_ACTIONS.APPLY}
        </ZButton>
      ),
      cancel: (
        <ZButton size="small" onClick={this.handleClickOutSide}>
          {() => FILTER_ITEM_ACTIONS.CANCEL}
        </ZButton>
      ),
      reset: (
        <ZButton size="small" variant="text" onClick={this.handleResetAction}>
          {() => FILTER_ITEM_ACTIONS.RESET}
        </ZButton>
      ),
      clear: (
        <ZButton size="small" variant="text" onClick={this.handleClearAction}>
          {() => FILTER_ITEM_ACTIONS.CLEAR}
        </ZButton>
      )
    }

    return (
      <div class={`${mergedClsPrefix}-filter-item`}>
        <ZPopover
          content-style="padding: 0;"
          trigger="click"
          placement="bottom-start"
          onUpdateShow={this.handleUpdateShow}
          onClickoutside={this.handleClickOutSide}
          show={this.isPopoverActive}
          style={{ padding: '0px', minWidth: '226px', ...this.popoverStyle }}
        >
          {{
            trigger: () => {
              if (this.triggerRenderType === 'button') {
                return (
                  <ZButton size="small" iconPlacement="end">
                    {{
                      default: () => labelNode,
                      icon: () => (
                        <ZIcon>
                          {() => <ArrowDropDownIcon></ArrowDropDownIcon>}
                        </ZIcon>
                      )
                    }}
                  </ZButton>
                )
              }

              return (
                <ZTag
                  size="large"
                  round
                  checkable
                  color={backgroundColorTag}
                  borderStyle={this.selectedValues ? 'solid' : 'dashed'}
                  checked={this.isPopoverActive}
                  closable={
                    typeof this.fixed === 'boolean' ? !this.fixed : true
                  }
                  onClose={this.removeAppliedFilter}
                >
                  {{
                    default: () => labelNode,
                    action:
                      !this.fixed || this.isResetHidden
                        ? undefined
                        : () => (
                            <ZButton
                              size="small"
                              variant="text"
                              onClick={() => {
                                this.handleResetAction()
                              }}
                            >
                              {() => (
                                <ZIcon>{() => <ResetIcon></ResetIcon>}</ZIcon>
                              )}
                            </ZButton>
                          )
                  }}
                </ZTag>
              )
            },

            default: panelNode,
            footer: () =>
              $slots.footer ??
              (this.hasActions ? (
                <ZSpace align="center">
                  {() => [
                    showFooterAction(FILTER_ITEM_ACTIONS.APPLY) &&
                      actionsMap.apply,
                    showFooterAction(FILTER_ITEM_ACTIONS.CANCEL) &&
                      actionsMap.cancel,
                    showFooterAction(FILTER_ITEM_ACTIONS.RESET) &&
                      actionsMap.reset,
                    showFooterAction(FILTER_ITEM_ACTIONS.CLEAR) &&
                      actionsMap.clear
                  ]}
                </ZSpace>
              ) : null)
          }}
        </ZPopover>
      </div>
    )
  }
})
