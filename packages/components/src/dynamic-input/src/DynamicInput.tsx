import {
  h,
  ref,
  toRef,
  isProxy,
  toRaw,
  computed,
  defineComponent,
  type PropType,
  inject,
  type CSSProperties,
  provide,
  watchEffect
} from 'vue'
import { useMergedState } from '../../_external-dependencies/vooks'
import { createId } from 'seemly'
import {
  RemoveIcon,
  AddIcon,
  ArrowDownIcon,
  ArrowUpIcon
} from '../../_internal/icons'
import { formItemInjectionKey } from '../../_mixins/use-form-item'
import { ZBaseIcon } from '../../_internal'
import { ZButton } from '../../button'
import { ZButtonGroup } from '../../button-group'
import type { ButtonProps } from '../../button'
import {
  useTheme,
  useLocale,
  useConfig,
  useThemeClass,
  useProxyModel
} from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { call, warnOnce, resolveSlotWithProps, resolveSlot } from '../../_utils'
import type { MaybeArray, ExtractPublicPropTypes } from '../../_utils'
import { dynamicInputLight } from '../styles'
import type { DynamicInputTheme } from '../styles'
import ZDynamicInputInputPreset from './InputPreset'
import ZDynamicInputPairPreset from './PairPreset'
import { dynamicInputInjectionKey } from './interface'
import type { OnUpdateModelValue } from './interface'
import style from './styles/index.cssr'
import { useRtl } from '../../_mixins/use-rtl'

const globalDataKeyMap = new WeakMap()

export const dynamicInputProps = {
  ...(useTheme.props as ThemeProps<DynamicInputTheme>),
  max: Number,
  min: {
    type: Number,
    default: 0
  },
  modelValue: Array as PropType<any[]>,
  // TODO: make it robust for different types
  defaultModelValue: {
    type: Array as PropType<any[]>,
    default: () => []
  },
  preset: {
    type: String as PropType<'input' | 'pair'>,
    default: 'input'
  },
  keyField: String,
  itemStyle: [String, Object] as PropType<string | CSSProperties>,
  // for preset pair
  keyPlaceholder: {
    type: String,
    default: ''
  },
  valuePlaceholder: {
    type: String,
    default: ''
  },
  // for preset input
  placeholder: {
    type: String,
    default: ''
  },
  disabled: Boolean,
  showSortButton: Boolean,
  createButtonProps: Object as PropType<ButtonProps>,
  onCreate: Function as PropType<(index: number) => any>,
  onRemove: Function as PropType<(index: number) => void>,
  'onUpdate:modelValue': [Function, Array] as PropType<
  MaybeArray<OnUpdateModelValue>
  >,
  onUpdateModelValue: [Function, Array] as PropType<
  MaybeArray<OnUpdateModelValue>
  >,
  // deprecated
  onClear: Function as PropType<() => void>,
  onInput: [Function, Array] as PropType<MaybeArray<OnUpdateModelValue>>
} as const

export type DynamicInputProps = ExtractPublicPropTypes<typeof dynamicInputProps>

export default defineComponent({
  name: 'DynamicInput',
  props: dynamicInputProps,
  setup (props, { slots }) {
    if (__DEV__) {
      watchEffect(() => {
        if (props.onClear !== undefined) {
          warnOnce(
            'dynamic-input',
            '`on-clear` is deprecated, it is out of usage anymore.'
          )
        }
        if (props.onInput !== undefined) {
          warnOnce(
            'dynamic-input',
            '`on-input` is deprecated, please use `on-update:model-value` instead.'
          )
        }
      })
    }
    const {
      mergedComponentPropsRef,
      mergedClsPrefixRef,
      mergedRtlRef,
      inlineThemeDisabled
    } = useConfig()
    const ZFormItem = inject(formItemInjectionKey, null)
    const uncontrolledValueRef = ref(props.defaultModelValue)
    const controlledValueRef = useProxyModel(props, 'modelValue')
    const mergedValueRef = useMergedState(
      controlledValueRef,
      uncontrolledValueRef
    )
    const themeRef = useTheme(
      'DynamicInput',
      '-dynamic-input',
      style,
      dynamicInputLight,
      props,
      mergedClsPrefixRef
    )
    const insertionDisabledRef = computed(() => {
      const { value: mergedValue } = mergedValueRef
      if (Array.isArray(mergedValue)) {
        const { max } = props
        return max !== undefined && mergedValue.length >= max
      }
      return false
    })
    const removeDisabledRef = computed(() => {
      const { value: mergedValue } = mergedValueRef
      if (Array.isArray(mergedValue)) return mergedValue.length <= props.min
      return true
    })
    const buttonSizeRef = computed(() => {
      return mergedComponentPropsRef?.value?.DynamicInput?.buttonSize
    })
    function doUpdateValue (value: any[]): void {
      const { onInput } = props
      if (onInput) call(onInput, value)
      controlledValueRef.value = value
      uncontrolledValueRef.value = value
    }
    function ensureKey (value: any, index: number): string | number {
      if (value === undefined || value === null) return index
      if (typeof value !== 'object') return index
      const rawValue = isProxy(value) ? toRaw(value) : value
      let key = globalDataKeyMap.get(rawValue)
      if (key === undefined) {
        globalDataKeyMap.set(rawValue, (key = createId()))
      }
      return key
    }
    function handleValueChange (index: number, value: any): void {
      const { value: mergedValue } = mergedValueRef
      const newValue = Array.from(mergedValue ?? [])
      const originalItem = newValue[index]
      newValue[index] = value
      // update dataKeyMap
      if (
        originalItem &&
        value &&
        typeof originalItem === 'object' &&
        typeof value === 'object'
      ) {
        const rawOriginal = isProxy(originalItem)
          ? toRaw(originalItem)
          : originalItem
        const rawNew = isProxy(value) ? toRaw(value) : value
        // inherit key is value position is not change
        const originalKey = globalDataKeyMap.get(rawOriginal)
        if (originalKey !== undefined) {
          globalDataKeyMap.set(rawNew, originalKey)
        }
      }
      doUpdateValue(newValue)
    }
    function handleCreateClick (): void {
      createItem(-1)
    }
    function createItem (index: number): void {
      const { value: mergedValue } = mergedValueRef
      const { onCreate } = props
      const newValue = Array.from(mergedValue ?? [])
      if (onCreate) {
        newValue.splice(index + 1, 0, onCreate(index + 1))
        doUpdateValue(newValue)
      } else if (slots.default) {
        newValue.splice(index + 1, 0, null)
        doUpdateValue(newValue)
      } else {
        switch (props.preset) {
          case 'input':
            newValue.splice(index + 1, 0, '')
            doUpdateValue(newValue)
            break
          case 'pair':
            newValue.splice(index + 1, 0, { key: '', value: '' })
            doUpdateValue(newValue)
            break
        }
      }
    }
    function remove (index: number): void {
      const { value: mergedValue } = mergedValueRef
      if (!Array.isArray(mergedValue)) return
      const { min } = props
      if (mergedValue.length <= min) return
      const { onRemove } = props
      if (onRemove) {
        onRemove(index)
      }
      const newValue = Array.from(mergedValue)
      newValue.splice(index, 1)
      doUpdateValue(newValue)
    }
    function swap (
      array: any[],
      currentIndex: number,
      targetIndex: number
    ): void {
      if (
        currentIndex < 0 ||
        targetIndex < 0 ||
        currentIndex >= array.length ||
        targetIndex >= array.length
      ) {
        return
      }
      if (currentIndex === targetIndex) return
      const currentItem = array[currentIndex]
      array[currentIndex] = array[targetIndex]
      array[targetIndex] = currentItem
    }
    function move (type: 'up' | 'down', index: number): void {
      const { value: mergedValue } = mergedValueRef
      if (!Array.isArray(mergedValue)) return
      const newValue = Array.from(mergedValue)
      if (type === 'up') {
        swap(newValue, index, index - 1)
      }
      if (type === 'down') {
        swap(newValue, index, index + 1)
      }
      doUpdateValue(newValue)
    }
    provide(dynamicInputInjectionKey, {
      mergedThemeRef: themeRef,
      keyPlaceholderRef: toRef(props, 'keyPlaceholder'),
      valuePlaceholderRef: toRef(props, 'valuePlaceholder'),
      placeholderRef: toRef(props, 'placeholder')
    })
    const rtlEnabledRef = useRtl(
      'DynamicInput',
      mergedRtlRef,
      mergedClsPrefixRef
    )
    const cssVarsRef = computed(() => {
      const {
        self: { actionMargin, actionMarginRtl }
      } = themeRef.value
      return {
        '--action-margin': actionMargin,
        '--action-margin-rtl': actionMarginRtl
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('dynamic-input', undefined, cssVarsRef, props)
      : undefined

    return {
      locale: useLocale('DynamicInput').localeRef,
      rtlEnabled: rtlEnabledRef,
      buttonSize: buttonSizeRef,
      mergedClsPrefix: mergedClsPrefixRef,
      ZFormItem,
      uncontrolledValue: uncontrolledValueRef,
      mergedValue: mergedValueRef,
      insertionDisabled: insertionDisabledRef,
      removeDisabled: removeDisabledRef,
      handleCreateClick,
      ensureKey,
      handleValueChange,
      remove,
      move,
      createItem,
      mergedTheme: themeRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    const {
      $slots,
      buttonSize,
      mergedClsPrefix,
      mergedValue,
      locale,
      mergedTheme,
      keyField,
      itemStyle,
      preset,
      showSortButton,
      ZFormItem,
      ensureKey,
      handleValueChange,
      remove,
      createItem,
      move,
      onRender,
      disabled
    } = this
    onRender?.()
    return (
      <div
        class={[
          `${mergedClsPrefix}-dynamic-input`,
          this.rtlEnabled && `${mergedClsPrefix}-dynamic-input--rtl`,
          this.themeClass
        ]}
        style={this.cssVars as CSSProperties}
      >
        {!Array.isArray(mergedValue) || mergedValue.length === 0 ? (
          <ZButton
            fill-width
            variant="outlined"
            border-style="dashed"
            size={buttonSize}
            {...this.createButtonProps}
            disabled={this.insertionDisabled || disabled}
            theme={mergedTheme.peers.Button}
            themeOverrides={mergedTheme.peerOverrides.Button}
            onClick={this.handleCreateClick}
          >
            {{
              default: () =>
                resolveSlot($slots['create-button-default'], () => [
                  locale.create
                ]),
              icon: () =>
                resolveSlot($slots['create-button-icon'], () => [
                  <ZBaseIcon clsPrefix={mergedClsPrefix}>
                    {{ default: () => <AddIcon /> }}
                  </ZBaseIcon>
                ])
            }}
          </ZButton>
        ) : (
          mergedValue.map((_, index) => (
            <div
              key={keyField ? _[keyField] : ensureKey(_, index)}
              data-key={keyField ? _[keyField] : ensureKey(_, index)}
              class={`${mergedClsPrefix}-dynamic-input-item`}
              style={itemStyle}
            >
              {resolveSlotWithProps(
                $slots.default,
                {
                  value: mergedValue[index],
                  index
                },
                () => {
                  return [
                    preset === 'input' ? (
                      <ZDynamicInputInputPreset
                        disabled={disabled}
                        clsPrefix={mergedClsPrefix}
                        value={mergedValue[index]}
                        parentPath={
                          ZFormItem ? ZFormItem.path.value : undefined
                        }
                        path={
                          ZFormItem?.path.value
                            ? `${ZFormItem.path.value}[${index}]`
                            : undefined
                        }
                        onUpdateValue={(v) => {
                          handleValueChange(index, v)
                        }}
                      />
                    ) : preset === 'pair' ? (
                      <ZDynamicInputPairPreset
                        disabled={disabled}
                        clsPrefix={mergedClsPrefix}
                        value={mergedValue[index]}
                        parentPath={
                          ZFormItem ? ZFormItem.path.value : undefined
                        }
                        path={
                          ZFormItem?.path.value
                            ? `${ZFormItem.path.value}[${index}]`
                            : undefined
                        }
                        onUpdateValue={(v) => {
                          handleValueChange(index, v)
                        }}
                      />
                    ) : null
                  ]
                }
              )}
              {resolveSlotWithProps(
                $slots.action,
                {
                  value: mergedValue[index],
                  index,
                  create: createItem,
                  remove,
                  move
                },
                () => [
                  <div class={`${mergedClsPrefix}-dynamic-input-item__action`}>
                    <ZButtonGroup size={buttonSize}>
                      {{
                        default: () => [
                          <ZButton
                            disabled={this.removeDisabled || disabled}
                            theme={mergedTheme.peers.Button}
                            themeOverrides={mergedTheme.peerOverrides.Button}
                            circle
                            onClick={() => {
                              remove(index)
                            }}
                          >
                            {{
                              icon: () => (
                                <ZBaseIcon clsPrefix={mergedClsPrefix}>
                                  {{ default: () => <RemoveIcon /> }}
                                </ZBaseIcon>
                              )
                            }}
                          </ZButton>,
                          <ZButton
                            disabled={this.insertionDisabled || disabled}
                            circle
                            theme={mergedTheme.peers.Button}
                            themeOverrides={mergedTheme.peerOverrides.Button}
                            onClick={() => {
                              createItem(index)
                            }}
                          >
                            {{
                              icon: () => (
                                <ZBaseIcon clsPrefix={mergedClsPrefix}>
                                  {{ default: () => <AddIcon /> }}
                                </ZBaseIcon>
                              )
                            }}
                          </ZButton>,
                          showSortButton ? (
                            <ZButton
                              disabled={index === 0 || disabled}
                              circle
                              theme={mergedTheme.peers.Button}
                              themeOverrides={mergedTheme.peerOverrides.Button}
                              onClick={() => {
                                move('up', index)
                              }}
                            >
                              {{
                                icon: () => (
                                  <ZBaseIcon clsPrefix={mergedClsPrefix}>
                                    {{
                                      default: () => <ArrowUpIcon />
                                    }}
                                  </ZBaseIcon>
                                )
                              }}
                            </ZButton>
                          ) : null,
                          showSortButton ? (
                            <ZButton
                              disabled={
                                index === mergedValue.length - 1 || disabled
                              }
                              circle
                              theme={mergedTheme.peers.Button}
                              themeOverrides={mergedTheme.peerOverrides.Button}
                              onClick={() => {
                                move('down', index)
                              }}
                            >
                              {{
                                icon: () => (
                                  <ZBaseIcon clsPrefix={mergedClsPrefix}>
                                    {{ default: () => <ArrowDownIcon /> }}
                                  </ZBaseIcon>
                                )
                              }}
                            </ZButton>
                          ) : null
                        ]
                      }}
                    </ZButtonGroup>
                  </div>
                ]
              )}
            </div>
          ))
        )}
      </div>
    )
  }
})
