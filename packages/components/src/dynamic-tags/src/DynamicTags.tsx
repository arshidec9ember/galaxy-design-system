import {
  h,
  defineComponent,
  ref,
  type PropType,
  type CSSProperties,
  computed,
  nextTick,
  watchEffect,
  type VNodeChild
} from 'vue'
import { useMergedState } from '../../_external-dependencies/vooks'
import commonProps from '../../tag/src/common-props'
import { AddIcon } from '../../_internal/icons'
import { ZButton } from '../../button'
import { ZSpace } from '../../space'
import type { InputInst, InputProps } from '../../input'
import { ZInput } from '../../input'
import { ZTag } from '../../tag'
import { ZBaseIcon } from '../../_internal'
import {
  useTheme,
  useFormItem,
  useLocale,
  useConfig,
  useThemeClass,
  useProxyModel
} from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { call, smallerSize, warnOnce } from '../../_utils'
import type { MaybeArray, ExtractPublicPropTypes } from '../../_utils'
import { dynamicTagsLight } from '../styles'
import type { DynamicTagsTheme } from '../styles'
import type {
  OnUpdateModelValue,
  DynamicTagsOption,
  OnCreate,
  OnUpdateModelValueImpl
} from './interface'
import style from './styles/index.cssr'

export const dynamicTagsProps = {
  ...(useTheme.props as ThemeProps<DynamicTagsTheme>),
  ...commonProps,
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: 'medium'
  },
  closable: {
    type: Boolean,
    default: true
  },
  defaultModelValue: {
    type: Array as PropType<Array<string | DynamicTagsOption>>,
    default: () => []
  },
  modelValue: Array as PropType<Array<string | DynamicTagsOption>>,
  inputStyle: [String, Object] as PropType<string | CSSProperties>,
  inputProps: Object as PropType<InputProps>,
  max: Number as PropType<number>,
  tagStyle: [String, Object] as PropType<string | CSSProperties>,
  renderTag: Function as PropType<
  | ((tag: string, index: number) => VNodeChild)
  | ((tag: DynamicTagsOption, index: number) => VNodeChild)
  >,
  onCreate: {
    type: Function as PropType<OnCreate>,
    default: (label: string) => label
  },
  'onUpdate:modelValue': [Function, Array] as PropType<
  MaybeArray<OnUpdateModelValue>
  >,
  onUpdateModelValue: [Function, Array] as PropType<
  MaybeArray<OnUpdateModelValue>
  >,
  // deprecated
  onChange: [Function, Array] as PropType<
  MaybeArray<OnUpdateModelValue> | undefined
  >
}

export type DynamicTagsProps = ExtractPublicPropTypes<typeof dynamicTagsProps>

export default defineComponent({
  name: 'DynamicTags',
  props: dynamicTagsProps,
  setup (props) {
    if (__DEV__) {
      watchEffect(() => {
        if (props.onChange !== undefined) {
          warnOnce(
            'dynamic-tags',
            '`on-change` is deprecated, please use `on-update:model-value` instead.'
          )
        }
      })
    }
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
    const { localeRef } = useLocale('DynamicTags')
    const formItem = useFormItem(props)
    const { mergedDisabledRef } = formItem
    const inputValueRef = ref('')
    const showInputRef = ref(false)
    const inputForceFocusedRef = ref(true)
    const inputInstRef = ref<InputInst | null>(null)
    const themeRef = useTheme(
      'DynamicTags',
      '-dynamic-tags',
      style,
      dynamicTagsLight,
      props,
      mergedClsPrefixRef
    )
    const uncontrolledValueRef = ref(props.defaultModelValue)
    const controlledValueRef = useProxyModel(props, 'modelValue')
    const mergedValueRef = useMergedState(
      controlledValueRef,
      uncontrolledValueRef
    )
    const localizedAddRef = computed(() => {
      return localeRef.value.add
    })
    const inputSizeRef = computed(() => {
      return smallerSize(props.size)
    })
    const triggerDisabledRef = computed(() => {
      return (
        mergedDisabledRef.value ||
        (!!props.max && mergedValueRef.value.length >= props.max)
      )
    })
    function doChange (value: Array<string | DynamicTagsOption>): void {
      const { onChange } = props
      const { nTriggerFormInput, nTriggerFormChange } = formItem
      if (onChange) call(onChange as OnUpdateModelValueImpl, value)
      controlledValueRef.value = value
      uncontrolledValueRef.value = value
      nTriggerFormInput()
      nTriggerFormChange()
    }
    function handleCloseClick (index: number): void {
      const tags = mergedValueRef.value.slice(0)
      tags.splice(index, 1)
      doChange(tags)
    }
    function handleInputKeyUp (e: KeyboardEvent): void {
      switch (e.key) {
        case 'Enter':
          handleInputConfirm()
      }
    }
    function handleInputConfirm (externalValue?: string): void {
      const nextValue = externalValue ?? inputValueRef.value
      if (nextValue) {
        const tags = mergedValueRef.value.slice(0)
        tags.push(props.onCreate(nextValue))
        doChange(tags)
      }
      showInputRef.value = false
      inputForceFocusedRef.value = true
      inputValueRef.value = ''
    }
    function handleInputBlur (): void {
      handleInputConfirm()
    }
    function handleAddClick (): void {
      showInputRef.value = true
      void nextTick(() => {
        inputInstRef.value?.focus()
        inputForceFocusedRef.value = false
      })
    }
    const cssVarsRef = computed(() => {
      const {
        self: { inputWidth }
      } = themeRef.value
      return {
        '--z-input-width': inputWidth
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('dynamic-tags', undefined, cssVarsRef, props)
      : undefined
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      inputInstRef,
      localizedAdd: localizedAddRef,
      inputSize: inputSizeRef,
      inputValue: inputValueRef,
      showInput: showInputRef,
      inputForceFocused: inputForceFocusedRef,
      mergedValue: mergedValueRef,
      mergedDisabled: mergedDisabledRef,
      triggerDisabled: triggerDisabledRef,
      handleInputKeyUp,
      handleAddClick,
      handleInputBlur,
      handleCloseClick,
      handleInputConfirm,
      mergedTheme: themeRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    const { mergedTheme, cssVars, mergedClsPrefix, onRender, renderTag } = this
    onRender?.()
    return (
      <ZSpace
        class={[`${mergedClsPrefix}-dynamic-tags`, this.themeClass]}
        size="small"
        style={cssVars as any}
        theme={mergedTheme.peers.Space}
        themeOverrides={mergedTheme.peerOverrides.Space}
        itemStyle="display: flex;"
      >
        {{
          default: () => {
            const {
              mergedTheme,
              tagStyle,
              round,
              size,
              color,
              closable,
              mergedDisabled,
              showInput,
              inputValue,
              inputStyle,
              inputSize,
              inputForceFocused,
              triggerDisabled,
              handleInputKeyUp,
              handleInputBlur,
              handleAddClick,
              handleCloseClick,
              handleInputConfirm,
              $slots
            } = this
            return this.mergedValue
              .map((tag, index) =>
                renderTag ? (
                  renderTag(tag as string & DynamicTagsOption, index)
                ) : (
                  <ZTag
                    key={index}
                    theme={mergedTheme.peers.Tag}
                    themeOverrides={mergedTheme.peerOverrides.Tag}
                    style={tagStyle}
                    round={round}
                    size={size}
                    color={color}
                    closable={closable}
                    disabled={mergedDisabled}
                    onClose={() => {
                      handleCloseClick(index)
                    }}
                  >
                    {{
                      default: () => (typeof tag === 'string' ? tag : tag.label)
                    }}
                  </ZTag>
                )
              )
              .concat(
                showInput ? (
                  $slots.input ? (
                    $slots.input({
                      submit: handleInputConfirm,
                      deactivate: handleInputBlur
                    })
                  ) : (
                    <ZInput
                      placeholder=""
                      size={inputSize}
                      style={inputStyle}
                      autosize
                      {...this.inputProps}
                      ref="inputInstRef"
                      modelValue={inputValue}
                      onUpdateModelValue={(v) => {
                        this.inputValue = v
                      }}
                      theme={mergedTheme.peers.Input}
                      themeOverrides={mergedTheme.peerOverrides.Input}
                      onKeyup={handleInputKeyUp}
                      onBlur={handleInputBlur}
                      internalForceFocus={inputForceFocused}
                    />
                  )
                ) : $slots.trigger ? (
                  $slots.trigger({
                    activate: handleAddClick,
                    disabled: triggerDisabled
                  })
                ) : (
                  <ZButton
                    variant="outlined"
                    border-style="dashed"
                    disabled={triggerDisabled}
                    theme={mergedTheme.peers.Button}
                    themeOverrides={mergedTheme.peerOverrides.Button}
                    size={inputSize}
                    onClick={handleAddClick}
                  >
                    {{
                      icon: () => (
                        <ZBaseIcon clsPrefix={mergedClsPrefix}>
                          {{ default: () => <AddIcon /> }}
                        </ZBaseIcon>
                      )
                    }}
                  </ZButton>
                )
              )
          }
        }}
      </ZSpace>
    )
  }
})
