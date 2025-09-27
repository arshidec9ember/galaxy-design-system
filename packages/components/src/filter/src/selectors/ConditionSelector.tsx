import {
  cloneDeep,
  get,
  isArray,
  isEmpty,
  isNil,
  isNumber,
  isString,
  set,
  toString,
  upperFirst
} from 'lodash-es'

import {
  computed,
  defineComponent,
  Fragment,
  h,
  inject,
  ref,
  toRef,
  watch,
  type PropType
} from 'vue'
import { ZInput, ZInputGroup, ZInputGroupLabel } from '../../../input'
import { ZSelect } from '../../../select'
import { ZSpace } from '../../../space'
import { ZText } from '../../../typography'
import {
  DEFAULT_NUMBER_CONDITIONAL_VALUE,
  DEFAULT_TEXT_CONDITIONAL_VALUE
} from '../constants'
import {
  type FilterFunction,
  type RenderFilterValue
} from '../createFilterInput'
import type {
  ConditionalInputValue,
  FilterModel,
  FilterValue
} from '../interface'
import { filterItemInjectionKey } from '../keys'
import { NUMBER_OPERATORS, TEXT_OPERATORS, type FilterOperator } from '../utils'

export const conditionSelectorProps = {
  type: {
    type: String as PropType<'text' | 'number'>,
    default: 'text'
  },
  condition: {
    type: String as PropType<string>,
    default: null
  },
  value: {
    type: [String, Number, Array, Object] as PropType<
    FilterValue | Record<string, any>
    >,
    default: null
  }
}

const OPERATOR_MAP: Record<string, FilterOperator> = {
  text: TEXT_OPERATORS,
  number: NUMBER_OPERATORS
}
const DEFAULT_OPERATOR_MAP: Record<string, string> = {
  text: DEFAULT_TEXT_CONDITIONAL_VALUE,
  number: DEFAULT_NUMBER_CONDITIONAL_VALUE
}

interface ConditionSelectorModelExtra {
  condition: string
}

export const conditionBasedFilterFn: FilterFunction<
ConditionSelectorModelExtra
> = (field, model, rowData, options) => {
  if (!model.condition) {
    return true
  }

  const value = get(rowData, field)

  if (isNil(value) || isEmpty(value)) {
    return false
  }

  const operator = OPERATOR_MAP?.[model.type]?.[model.condition]

  if (!operator) {
    throw new Error(
      `ConditionSelector: type=${model.type} and condition=${model.condition} is not supported.`
    )
  }

  if (Array.isArray(operator.fields)) {
    return operator.fields.every((item) => {
      const fieldValue = get(model.value, item.field)
      return fieldValue === get(value, item.field)
    })
  }

  if (operator.validator && !isNil(model.value)) {
    if (
      isString(model.value) ||
      isNumber(model.value) ||
      isArray(model.value)
    ) {
      return operator.validator(model.value, value, options)
    }

    throw new Error(
      `ConditionSelector: value should not be of type ${typeof model.value}.`
    )
  }

  return false
}

export const conditionBasedRenderFilterValue: RenderFilterValue = (
  field: string,
  model: FilterModel
) => {
  const _model = model

  const operator = OPERATOR_MAP?.[_model.type]?.[_model.condition]
  const value = get(model, 'value', '')

  if (!operator) {
    return toString(value)
  }

  if (Array.isArray(operator.fields)) {
    return (
      <span class="condition-value-node">
        {operator.fields.map((item) => {
          return (
            <span class="condition-value">
              {upperFirst(item.label)}
              {': '}
              <ZText color="var(--z-value-text-color)" strong>
                {() => toString(get(value, item.field, ''))}
              </ZText>{' '}
            </span>
          )
        })}
      </span>
    )
  }

  return (
    <span>
      {operator.label}{' '}
      <ZText color="var(--z-value-text-color)" strong>
        {() => toString(value)}
      </ZText>
    </span>
  )
}

export default defineComponent({
  name: 'ConditionSelector',
  props: conditionSelectorProps,
  setup (props) {
    const FilterItem = inject(filterItemInjectionKey, null)
    const conditionalValueRef = toRef(cloneDeep(props.value))

    const operator = OPERATOR_MAP[props.type]
    if (!operator) {
      throw new Error(`ConditionSelector: type ${props.type} is not supported.`)
    }

    const conditionSelectedRef = ref(
      OPERATOR_MAP[props.type][props.condition]
        ? props.condition
        : DEFAULT_OPERATOR_MAP[props.type] ?? DEFAULT_TEXT_CONDITIONAL_VALUE
    )

    const options = Object.keys(operator).map((key) => {
      return { label: operator[key].label, value: key }
    })

    const hasFields = computed(() =>
      Array.isArray(operator[conditionSelectedRef.value].fields)
    )

    watch(
      [conditionalValueRef, conditionSelectedRef],
      ([value, condition]) => {
        FilterItem?.updateValue(value, {
          condition,
          type: props.type
        })
      },
      { immediate: true }
    )

    const handleConditionChange = (value: string): void => {
      const fields = operator[value].fields

      conditionSelectedRef.value = value

      if (Array.isArray(fields)) {
        const fieldsModel = {}
        fields.forEach((field) => {
          set(
            fieldsModel,
            field.field,
            get(conditionalValueRef.value, field.field, null)
          )
        })
        conditionalValueRef.value = fieldsModel
      } else {
        conditionalValueRef.value = null
      }
    }
    const handleFieldValueChange = (val: FilterValue, field?: string): void => {
      if (field) {
        set(conditionalValueRef.value as object, field, val)
      } else {
        conditionalValueRef.value = val
      }
    }
    return {
      options,
      hasFields,
      operator,
      handleConditionChange,
      conditionSelected: conditionSelectedRef,
      handleFieldValueChange,
      conditionalValue: conditionalValueRef,
      type: props.type,
      forceClose: FilterItem?.forceClosePopover
    }
  },
  render () {
    const conditionFields: () => JSX.Element | null = () => {
      if (!this.conditionSelected) return null

      if (this.hasFields) {
        const fields = this.operator[this.conditionSelected].fields
        return (
          <ZSpace vertical>
            {() =>
              fields?.map((item) => {
                const fieldValue = get(this.conditionalValue, item.field)

                return (
                  <ZInputGroup>
                    {() => (
                      <Fragment>
                        <ZInputGroupLabel>{() => item.label}</ZInputGroupLabel>
                        <ZInput
                          modelValue={
                            !isNil(fieldValue)
                              ? toString(fieldValue)
                              : (null as ConditionalInputValue)
                          }
                          type={this.$props.type}
                          onUpdateModelValue={(value) => {
                            this.handleFieldValueChange(value, item.field)
                          }}
                          placeholder={`Enter ${item.label} value`}
                        />
                      </Fragment>
                    )}
                  </ZInputGroup>
                )
              })
            }
          </ZSpace>
        )
      }

      return (
        <ZInputGroup>
          {() => (
            <>
              <ZInputGroupLabel>{() => 'Value'}</ZInputGroupLabel>
              <ZInput
                modelValue={
                  toString(this.conditionalValue) as ConditionalInputValue
                }
                type={this.$props.type}
                onKeydown={(e) => {
                  if (e.key === 'Enter') {
                    this.forceClose?.()
                  }
                }}
                onUpdateModelValue={(value) => {
                  this.handleFieldValueChange(value)
                }}
                placeholder=""
              />
            </>
          )}
        </ZInputGroup>
      )
    }

    return (
      <ZSpace vertical style="padding: 16px;">
        {() => (
          <>
            <ZInputGroup>
              {() => (
                <>
                  <ZInputGroupLabel>{() => 'Condition'}</ZInputGroupLabel>
                  <ZSelect
                    consistentMenuWidth={false}
                    modelValue={this.conditionSelected}
                    onUpdateModelValue={this.handleConditionChange}
                    options={this.options}
                  ></ZSelect>
                </>
              )}
            </ZInputGroup>
            {conditionFields()}
          </>
        )}
      </ZSpace>
    )
  }
})
