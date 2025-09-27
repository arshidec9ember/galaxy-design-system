/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  h,
  defineComponent,
  Fragment,
  type PropType,
  ref,
  computed,
  watch,
  toRef,
  nextTick,
  type CSSProperties,
  watchEffect,
  onMounted,
  type InputHTMLAttributes,
  type VNode
} from 'vue'
import {
  VOverflow,
  type VOverflowInst
} from '../../../_external-dependencies/vueuc'
import type {
  RenderLabel,
  RenderLabelImpl
} from '../../select-menu/src/interface'
import type { SelectBaseOption } from '../../../select/src/interface'
import type { FormValidationStatus } from '../../../form/src/interface'
import type { TagRef } from '../../../tag/src/Tag'
import { ZPopover } from '../../../popover'
import { ZTag } from '../../../tag'
import { useThemeClass, useTheme } from '../../../_mixins'
import type { ThemeProps } from '../../../_mixins'
import { createKey, useOnResize, Wrapper } from '../../../_utils'
import Suffix from '../../suffix'
import { useTooltip } from './utils'
import { internalSelectionLight } from '../styles'
import type { InternalSelectionTheme } from '../styles'
import type { RenderTag } from './interface'
import style from './styles/index.cssr'
import { ZText } from '../../../typography'

export interface InternalSelectionInst {
  isComposing: boolean
  focus: () => void
  focusInput: () => void
  blur: () => void
  blurInput: () => void
  $el: HTMLElement
}

export default defineComponent({
  name: 'InternalSelection',
  props: {
    ...(useTheme.props as ThemeProps<InternalSelectionTheme>),
    clsPrefix: {
      type: String,
      required: true
    },
    bordered: {
      type: Boolean as PropType<boolean | undefined>,
      default: undefined
    },
    active: Boolean,
    pattern: {
      type: String,
      default: ''
    },
    placeholder: String,
    selectedOption: {
      type: Object as PropType<SelectBaseOption | null>,
      default: null
    },
    selectedOptions: {
      type: Array as PropType<SelectBaseOption[] | null>,
      default: null
    },
    labelField: { type: String, default: 'label' },
    valueField: {
      type: String,
      default: 'value'
    },
    multiple: Boolean,
    filterable: Boolean,
    clearable: Boolean,
    tooltip: Boolean,
    disabled: Boolean,
    size: {
      type: String as PropType<'x-small' | 'small' | 'medium' | 'large'>,
      default: 'medium'
    },
    loading: Boolean,
    autofocus: Boolean,
    showArrow: {
      type: Boolean,
      default: true
    },
    inputProps: Object as PropType<InputHTMLAttributes>,
    focused: Boolean,
    renderTag: Function as PropType<RenderTag>,
    onKeydown: Function as PropType<(e: KeyboardEvent) => void>,
    onClick: Function as PropType<(e: MouseEvent) => void>,
    onBlur: Function as PropType<(e: FocusEvent) => void>,
    onFocus: Function as PropType<(e: FocusEvent) => void>,
    onDeleteOption: Function as PropType<(option: SelectBaseOption) => void>,
    maxTagCount: [String, Number] as PropType<number | 'responsive'>,
    onClear: Function as PropType<(e: MouseEvent) => void>,
    onPatternInput: Function as PropType<(e: InputEvent) => void>,
    onPatternFocus: Function as PropType<(e: FocusEvent) => void>,
    onPatternBlur: Function as PropType<(e: FocusEvent) => void>,
    onPasteData: Function as PropType<(e: ClipboardEvent) => void>,
    renderLabel: Function as PropType<RenderLabel>,
    status: String as PropType<FormValidationStatus>,
    inlineThemeDisabled: Boolean,
    ignoreComposition: { type: Boolean, default: true },
    onResize: Function as PropType<() => void>
  },
  setup (props) {
    const patternInputMirrorRef = ref<HTMLElement | null>(null)
    const patternInputRef = ref<HTMLElement | null>(null)
    const selfRef = ref<HTMLElement | null>(null)
    const multipleElRef = ref<HTMLElement | null>(null)
    const singleElRef = ref<HTMLElement | null>(null)
    const patternInputWrapperRef = ref<HTMLElement | null>(null)
    const counterRef = ref<TagRef | null>(null)
    const counterWrapperRef = ref<HTMLElement | null>(null)
    const overflowRef = ref<VOverflowInst | null>(null)
    const inputTagElRef = ref<HTMLElement | null>(null)

    const showTagsPopoverRef = ref<boolean>(false)
    const patternInputFocusedRef = ref(false)
    const hoverRef = ref(false)
    const themeRef = useTheme(
      'InternalSelection',
      '-internal-selection',
      style,
      internalSelectionLight,
      props,
      toRef(props, 'clsPrefix')
    )
    const mergedClearableRef = computed(() => {
      return (
        props.clearable && !props.disabled && (hoverRef.value || props.active)
      )
    })
    const filterablePlaceholderRef = computed(() => {
      return props.selectedOption
        ? props.renderTag
          ? props.renderTag({
            option: props.selectedOption,
            handleClose: () => {}
          })
          : props.renderLabel
            ? props.renderLabel(props.selectedOption as never, true)
            : useTooltip(
              props.tooltip,
              props.selectedOption[props.labelField] as string,
              props.selectedOption
            )
        : props.placeholder
    })
    const labelRef = computed(() => {
      const option = props.selectedOption
      if (!option) return undefined
      return option[props.labelField]
    })
    const selectedRef = computed(() => {
      if (props.multiple) {
        return !!(
          Array.isArray(props.selectedOptions) && props.selectedOptions.length
        )
      } else {
        return props.selectedOption !== null
      }
    })
    const textVariantRef = computed(() => {
      switch (props.size) {
        case 'x-small':
          return '4-r'
        case 'small':
          return '3-r'
        case 'medium':
          return '3-r'
        case 'large':
          return '2-r'
        default:
          return '3-r'
      }
    })
    function syncMirrorWidth (): void {
      const { value: patternInputMirrorEl } = patternInputMirrorRef
      if (patternInputMirrorEl) {
        const { value: patternInputEl } = patternInputRef
        if (patternInputEl) {
          patternInputEl.style.width = `${patternInputMirrorEl.offsetWidth}px`
          if (props.maxTagCount !== 'responsive') {
            overflowRef.value?.sync()
          }
        }
      }
    }
    function hideInputTag (): void {
      const { value: inputTagEl } = inputTagElRef
      if (inputTagEl) inputTagEl.style.display = 'none'
    }
    function showInputTag (): void {
      const { value: inputTagEl } = inputTagElRef
      if (inputTagEl) inputTagEl.style.display = 'inline-block'
    }
    watch(toRef(props, 'active'), (value) => {
      if (!value) hideInputTag()
    })
    watch(toRef(props, 'pattern'), () => {
      if (props.multiple) {
        void nextTick(syncMirrorWidth)
      }
    })
    function doFocus (e: FocusEvent): void {
      const { onFocus } = props
      if (onFocus) onFocus(e)
    }
    function doBlur (e: FocusEvent): void {
      const { onBlur } = props
      if (onBlur) onBlur(e)
    }
    function doDeleteOption (value: SelectBaseOption): void {
      const { onDeleteOption } = props
      if (onDeleteOption) onDeleteOption(value)
    }
    function doClear (e: MouseEvent): void {
      const { onClear } = props
      if (onClear) onClear(e)
    }
    function doPatternInput (value: InputEvent): void {
      const { onPatternInput } = props
      if (onPatternInput) onPatternInput(value)
    }
    function handleFocusin (e: FocusEvent): void {
      if (
        !e.relatedTarget ||
        !selfRef.value?.contains(e.relatedTarget as Node)
      ) {
        doFocus(e)
      }
    }
    function handleFocusout (e: FocusEvent): void {
      if (selfRef.value?.contains(e.relatedTarget as Node)) return
      doBlur(e)
    }
    function handleClear (e: MouseEvent): void {
      doClear(e)
    }
    function handleMouseEnter (): void {
      hoverRef.value = true
    }
    function handleMouseLeave (): void {
      hoverRef.value = false
    }
    function handleMouseDown (e: MouseEvent): void {
      if (!props.active || !props.filterable) return
      if (e.target === patternInputRef.value) return
      e.preventDefault()
    }
    function handleDeleteOption (option: SelectBaseOption): void {
      doDeleteOption(option)
    }
    function handlePatternKeyDown (e: KeyboardEvent): void {
      if (e.key === 'Backspace' && !isComposingRef.value) {
        if (!props.pattern.length) {
          const { selectedOptions } = props
          if (selectedOptions?.length) {
            handleDeleteOption(selectedOptions[selectedOptions.length - 1])
          }
        }
      }
    }

    function handlePaste (e: ClipboardEvent): void {
      const { onPasteData } = props
      if (onPasteData) onPasteData(e)
      e.preventDefault()
    }
    const isComposingRef = ref(false)
    // the composition end is later than its input so we can cached the event
    // and return the input event
    let cachedInputEvent: InputEvent | null = null
    function handlePatternInputInput (e: InputEvent): void {
      // we should sync mirror width here
      const { value: patternInputMirrorEl } = patternInputMirrorRef
      if (patternInputMirrorEl) {
        const inputText: string = (e.target as any).value
        patternInputMirrorEl.textContent = inputText
        syncMirrorWidth()
      }
      if (props.ignoreComposition) {
        if (!isComposingRef.value) {
          doPatternInput(e)
        } else {
          cachedInputEvent = e
        }
      } else {
        doPatternInput(e)
      }
    }
    function handleCompositionStart (): void {
      isComposingRef.value = true
    }
    function handleCompositionEnd (): void {
      isComposingRef.value = false
      if (props.ignoreComposition) {
        doPatternInput(cachedInputEvent!)
      }
      cachedInputEvent = null
    }
    function handlePatternInputFocus (e: FocusEvent): void {
      patternInputFocusedRef.value = true
      props.onPatternFocus?.(e)
    }
    function handlePatternInputBlur (e: FocusEvent): void {
      patternInputFocusedRef.value = false
      props.onPatternBlur?.(e)
    }
    function blur (): void {
      if (props.filterable) {
        patternInputFocusedRef.value = false
        patternInputWrapperRef.value?.blur()
        patternInputRef.value?.blur()
      } else if (props.multiple) {
        const { value: multipleEl } = multipleElRef
        multipleEl?.blur()
      } else {
        const { value: singleEl } = singleElRef
        singleEl?.blur()
      }
    }
    function focus (): void {
      if (props.filterable) {
        patternInputFocusedRef.value = false
        patternInputWrapperRef.value?.focus()
      } else if (props.multiple) {
        multipleElRef.value?.focus()
      } else {
        singleElRef.value?.focus()
      }
    }
    function focusInput (): void {
      const { value: patternInputEl } = patternInputRef
      if (patternInputEl) {
        showInputTag()
        patternInputEl.focus()
      }
    }
    function blurInput (): void {
      const { value: patternInputEl } = patternInputRef
      if (patternInputEl) {
        patternInputEl.blur()
      }
    }
    function updateCounter (count: number): void {
      const { value } = counterRef
      if (value) {
        value.setTextContent(`+${count}`)
      }
    }
    function getCounter (): HTMLElement | null {
      const { value } = counterWrapperRef
      return value
    }
    function getTail (): HTMLElement | null {
      return patternInputRef.value
    }
    let enterTimerId: number | null = null
    function clearEnterTimer (): void {
      if (enterTimerId !== null) window.clearTimeout(enterTimerId)
    }
    function handleMouseEnterCounter (): void {
      if (props.active) return
      clearEnterTimer()
      enterTimerId = window.setTimeout(() => {
        if (selectedRef.value) {
          showTagsPopoverRef.value = true
        }
      }, 100)
    }
    function handleMouseLeaveCounter (): void {
      clearEnterTimer()
    }
    function onPopoverUpdateShow (show: boolean): void {
      if (!show) {
        clearEnterTimer()
        showTagsPopoverRef.value = false
      }
    }
    watch(selectedRef, (value) => {
      if (!value) {
        showTagsPopoverRef.value = false
      }
    })
    onMounted(() => {
      watchEffect(() => {
        const patternInputWrapperEl = patternInputWrapperRef.value
        if (!patternInputWrapperEl) return
        if (props.disabled) {
          patternInputWrapperEl.removeAttribute('tabindex')
        } else {
          patternInputWrapperEl.tabIndex = patternInputFocusedRef.value ? -1 : 0
        }
      })
    })
    useOnResize(selfRef, props.onResize)
    const { inlineThemeDisabled } = props
    const cssVarsRef = computed(() => {
      const { size } = props
      const {
        common: { cubicBezierEaseInOut },
        self: {
          borderRadiusLarge,
          color,
          placeholderColor,
          textColor,
          paddingSingle,
          paddingMultiple,
          caretColor,
          colorDisabled,
          textColorDisabled,
          placeholderColorDisabled,
          colorActive,
          boxShadowFocus,
          boxShadowActive,
          boxShadowHover,
          border,
          borderDisabled,
          borderFocus,
          borderHover,
          borderActive,
          arrowColor,
          arrowColorDisabled,
          loadingColor,
          // form warning
          colorActiveWarning,
          boxShadowFocusWarning,
          boxShadowActiveWarning,
          boxShadowHoverWarning,
          borderWarning,
          borderWarningDisabled,
          borderFocusWarning,
          borderHoverWarning,
          borderActiveWarning,
          // form error
          colorActiveError,
          boxShadowFocusError,
          boxShadowActiveError,
          boxShadowHoverError,
          borderError,
          borderErrorDisabled,
          borderFocusError,
          borderHoverError,
          borderActiveError,
          // clear
          clearColor,
          clearColorHover,
          clearColorPressed,
          clearSize,
          // arrow
          arrowSize,
          arrowRightOffset,
          [createKey('height', size)]: height,
          [createKey('fontSize', size)]: fontSize
        }
      } = themeRef.value

      return {
        '--z-bezier': cubicBezierEaseInOut,
        '--z-border': border,
        '--z-border-disabled': borderDisabled,
        '--z-border-active': borderActive,
        '--z-border-focus': borderFocus,
        '--z-border-hover': borderHover,
        '--z-border-radius': borderRadiusLarge,
        '--z-box-shadow-active': boxShadowActive,
        '--z-box-shadow-focus': boxShadowFocus,
        '--z-box-shadow-hover': boxShadowHover,
        '--z-caret-color': caretColor,
        '--z-color': color,
        '--z-color-active': colorActive,
        '--z-color-disabled': colorDisabled,
        '--z-font-size': fontSize,
        '--z-height': height,
        '--z-padding-single': paddingSingle,
        '--z-padding-multiple': paddingMultiple,
        '--z-placeholder-color': placeholderColor,
        '--z-placeholder-color-disabled': placeholderColorDisabled,
        '--z-text-color': textColor,
        '--z-text-color-disabled': textColorDisabled,
        '--z-arrow-color': arrowColor,
        '--z-arrow-color-disabled': arrowColorDisabled,
        '--z-loading-color': loadingColor,
        // form warning
        '--z-color-active-warning': colorActiveWarning,
        '--z-box-shadow-focus-warning': boxShadowFocusWarning,
        '--z-box-shadow-active-warning': boxShadowActiveWarning,
        '--z-box-shadow-hover-warning': boxShadowHoverWarning,
        '--z-border-warning': borderWarning,
        '--z-border-warning-disabled': borderWarningDisabled,
        '--z-border-focus-warning': borderFocusWarning,
        '--z-border-hover-warning': borderHoverWarning,
        '--z-border-active-warning': borderActiveWarning,
        // form error
        '--z-color-active-error': colorActiveError,
        '--z-box-shadow-focus-error': boxShadowFocusError,
        '--z-box-shadow-active-error': boxShadowActiveError,
        '--z-box-shadow-hover-error': boxShadowHoverError,
        '--z-border-error': borderError,
        '--z-border-error-disabled': borderErrorDisabled,
        '--z-border-focus-error': borderFocusError,
        '--z-border-hover-error': borderHoverError,
        '--z-border-active-error': borderActiveError,
        // clear
        '--z-clear-size': clearSize,
        '--z-clear-color': clearColor,
        '--z-clear-color-hover': clearColorHover,
        '--z-clear-color-pressed': clearColorPressed,
        // arrow-size
        '--z-arrow-size': arrowSize,
        '--z-arrow-right-offset': arrowRightOffset
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'internal-selection',
        computed(() => {
          return props.size[0]
        }),
        cssVarsRef,
        props
      )
      : undefined
    return {
      mergedTheme: themeRef,
      mergedClearable: mergedClearableRef,
      patternInputFocused: patternInputFocusedRef,
      filterablePlaceholder: filterablePlaceholderRef,
      label: labelRef,
      selected: selectedRef,
      showTagsPanel: showTagsPopoverRef,
      isComposing: isComposingRef,
      textVariant: textVariantRef,
      // dom ref
      counterRef,
      counterWrapperRef,
      patternInputMirrorRef,
      patternInputRef,
      selfRef,
      multipleElRef,
      singleElRef,
      patternInputWrapperRef,
      overflowRef,
      inputTagElRef,
      handleMouseDown,
      handleFocusin,
      handleClear,
      handlePaste,
      handleMouseEnter,
      handleMouseLeave,
      handleDeleteOption,
      handlePatternKeyDown,
      handlePatternInputInput,
      handlePatternInputBlur,
      handlePatternInputFocus,
      handleMouseEnterCounter,
      handleMouseLeaveCounter,
      handleFocusout,
      handleCompositionEnd,
      handleCompositionStart,
      onPopoverUpdateShow,
      focus,
      focusInput,
      tooltip: props.tooltip,
      blur,
      blurInput,
      updateCounter,
      getCounter,
      getTail,
      renderLabel: props.renderLabel as RenderLabelImpl,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    const {
      status,
      multiple,
      size,
      disabled,
      filterable,
      maxTagCount,
      bordered,
      clsPrefix,
      onRender,
      renderTag,
      renderLabel
    } = this
    onRender?.()
    const maxTagCountResponsive = maxTagCount === 'responsive'
    const maxTagCountNumeric = typeof maxTagCount === 'number'
    const useMaxTagCount = maxTagCountResponsive || maxTagCountNumeric
    const suffix = (
      <Wrapper>
        {{
          default: () => (
            <Suffix
              clsPrefix={clsPrefix}
              loading={this.loading}
              showArrow={this.showArrow}
              showClear={this.mergedClearable && this.selected}
              onClear={this.handleClear}
            >
              {{
                default: () => this.$slots.arrow?.()
              }}
            </Suffix>
          )
        }}
      </Wrapper>
    )
    let body: JSX.Element
    if (multiple) {
      const { labelField } = this
      const createTag = (option: SelectBaseOption): JSX.Element => (
        <div
          class={`${clsPrefix}-base-selection-tag-wrapper`}
          key={option.value}
        >
          {renderTag ? (
            renderTag({
              option,
              handleClose: () => {
                this.handleDeleteOption(option)
              }
            })
          ) : (
            <ZTag
              size={size}
              isComboBox
              closable={!option.disabled}
              bordered={false}
              disabled={disabled}
              onClose={() => {
                this.handleDeleteOption(option)
              }}
              internalCloseIsButtonTag={false}
              internalCloseFocusable={false}
            >
              {{
                default: () =>
                  renderLabel
                    ? renderLabel(option, true)
                    : useTooltip(
                      this.tooltip,
                      option[labelField] as string,
                      option
                    )
              }}
            </ZTag>
          )}
        </div>
      )
      const createOriginalTagNodes = (): VNode[] =>
        (maxTagCountNumeric
          ? this.selectedOptions!.slice(0, maxTagCount)
          : this.selectedOptions!
        ).map(createTag)
      const input = filterable ? (
        <div
          class={`${clsPrefix}-base-selection-input-tag`}
          ref="inputTagElRef"
          key="__input-tag__"
        >
          <input
            {...this.inputProps}
            ref="patternInputRef"
            tabindex={-1}
            disabled={disabled}
            value={this.pattern}
            autofocus={this.autofocus}
            class={`${clsPrefix}-base-selection-input-tag__input`}
            onPaste={this.handlePaste}
            onBlur={this.handlePatternInputBlur}
            onFocus={this.handlePatternInputFocus}
            onKeydown={this.handlePatternKeyDown}
            onInput={this.handlePatternInputInput as any}
            onCompositionstart={this.handleCompositionStart}
            onCompositionend={this.handleCompositionEnd}
          />
          <span
            ref="patternInputMirrorRef"
            class={`${clsPrefix}-base-selection-input-tag__mirror`}
          >
            {this.pattern}
          </span>
        </div>
      ) : null
      // May Overflow
      const renderCounter = maxTagCountResponsive
        ? () => (
            <div
              class={`${clsPrefix}-base-selection-tag-wrapper`}
              ref="counterWrapperRef"
            >
              <ZTag
                isComboBox
                size={size}
                bordered={false}
                ref="counterRef"
                onMouseenter={this.handleMouseEnterCounter}
                onMouseleave={this.handleMouseLeaveCounter}
                disabled={disabled}
              />
            </div>
          )
        : undefined
      let counter: JSX.Element | undefined
      if (maxTagCountNumeric) {
        const rest = this.selectedOptions!.length - maxTagCount
        if (rest > 0) {
          counter = (
            <div
              class={`${clsPrefix}-base-selection-tag-wrapper`}
              key="__counter__"
            >
              <ZTag
                size={size}
                isComboBox
                ref="counterRef"
                onMouseenter={this.handleMouseEnterCounter}
                disabled={disabled}
                bordered={false}
              >
                {{
                  default: () => `+${rest}`
                }}
              </ZTag>
            </div>
          )
        }
      }
      const tags = maxTagCountResponsive ? (
        filterable ? (
          <VOverflow
            ref="overflowRef"
            updateCounter={this.updateCounter}
            getCounter={this.getCounter}
            getTail={this.getTail}
            style={{
              width: '100%',
              display: 'flex',
              overflow: 'hidden'
            }}
          >
            {{
              default: createOriginalTagNodes,
              counter: renderCounter,
              tail: () => input
            }}
          </VOverflow>
        ) : (
          <VOverflow
            ref="overflowRef"
            updateCounter={this.updateCounter}
            getCounter={this.getCounter}
            style={{
              width: '100%',
              display: 'flex',
              overflow: 'hidden'
            }}
          >
            {{
              default: createOriginalTagNodes,
              counter: renderCounter
            }}
          </VOverflow>
        )
      ) : maxTagCountNumeric ? (
        createOriginalTagNodes().concat(counter as JSX.Element)
      ) : (
        createOriginalTagNodes()
      )
      const renderPopover = useMaxTagCount
        ? (): JSX.Element => (
            <div class={`${clsPrefix}-base-selection-popover`}>
              {maxTagCountResponsive
                ? createOriginalTagNodes()
                : this.selectedOptions!.map(createTag)}
            </div>
          )
        : undefined
      const popoverProps = useMaxTagCount
        ? ({
            show: this.showTagsPanel,
            trigger: 'hover',
            overlap: true,
            placement: 'top',
            width: 'trigger',
            onUpdateShow: this.onPopoverUpdateShow,
            theme: this.mergedTheme.peers.Popover,
            themeOverrides: this.mergedTheme.peerOverrides.Popover
          } as const)
        : null
      const showPlaceholder = this.selected
        ? false
        : this.active
          ? !this.pattern && !this.isComposing
          : true
      const placeholder = showPlaceholder ? (
        <ZText variant={this.textVariant}>
          <div
            class={`${clsPrefix}-base-selection-placeholder ${clsPrefix}-base-selection-overlay`}
          >
            <div class={`${clsPrefix}-base-selection-placeholder__inner`}>
              {this.placeholder}
            </div>
          </div>
        </ZText>
      ) : null
      const popoverTrigger = filterable ? (
        <div
          ref="patternInputWrapperRef"
          class={`${clsPrefix}-base-selection-tags`}
        >
          {tags}
          {maxTagCountResponsive ? null : input}
          {suffix}
        </div>
      ) : (
        <div
          ref="multipleElRef"
          class={`${clsPrefix}-base-selection-tags`}
          tabindex={disabled ? undefined : 0}
        >
          {tags}
          {suffix}
        </div>
      )
      body = (
        <>
          {useMaxTagCount ? (
            <ZPopover
              {...popoverProps}
              scrollable
              style="max-height: calc(var(--v-target-height) * 6.6);"
            >
              {{
                trigger: () => popoverTrigger,
                default: renderPopover
              }}
            </ZPopover>
          ) : (
            popoverTrigger
          )}
          {placeholder}
        </>
      )
    } else {
      if (filterable) {
        const hasInput = this.pattern || this.isComposing
        const showPlaceholder = this.active ? !hasInput : !this.selected
        const showSelectedLabel = this.active ? false : this.selected
        body = (
          <div
            ref="patternInputWrapperRef"
            class={`${clsPrefix}-base-selection-label`}
          >
            <input
              {...this.inputProps}
              ref="patternInputRef"
              class={`${clsPrefix}-base-selection-input`}
              value={this.active ? this.pattern : ''}
              placeholder=""
              readonly={disabled}
              disabled={disabled}
              tabindex={-1}
              autofocus={this.autofocus}
              onFocus={this.handlePatternInputFocus}
              onBlur={this.handlePatternInputBlur}
              onInput={this.handlePatternInputInput as any}
              onCompositionstart={this.handleCompositionStart}
              onCompositionend={this.handleCompositionEnd}
            />
            {showSelectedLabel ? (
              <div
                class={`${clsPrefix}-base-selection-label__render-label ${clsPrefix}-base-selection-overlay`}
                key="input"
              >
                <div class={`${clsPrefix}-base-selection-overlay__wrapper`}>
                  <ZText variant={this.textVariant}>
                    {renderTag
                      ? renderTag({
                        option: this.selectedOption!,
                        handleClose: () => {}
                      })
                      : renderLabel
                        ? renderLabel(this.selectedOption!, true)
                        : useTooltip(
                          this.tooltip,
                          this.label as string,
                          this.selectedOption
                        )}
                  </ZText>
                </div>
              </div>
            ) : null}
            {showPlaceholder ? (
              <div
                class={`${clsPrefix}-base-selection-placeholder ${clsPrefix}-base-selection-overlay`}
                key="placeholder"
              >
                <ZText variant={this.textVariant}>
                  <div class={`${clsPrefix}-base-selection-overlay__wrapper`}>
                    {this.filterablePlaceholder}
                  </div>
                </ZText>
              </div>
            ) : null}
            {suffix}
          </div>
        )
      } else {
        body = (
          <div
            ref="singleElRef"
            class={`${clsPrefix}-base-selection-label`}
            tabindex={this.disabled ? undefined : 0}
          >
            {this.label !== undefined ? (
              <div class={`${clsPrefix}-base-selection-input`} key="input">
                <ZText variant={this.textVariant}>
                  <div class={`${clsPrefix}-base-selection-input__content`}>
                    {renderTag
                      ? renderTag({
                        option: this.selectedOption as SelectBaseOption,
                        handleClose: () => {}
                      })
                      : renderLabel
                        ? renderLabel(
                          this.selectedOption as SelectBaseOption,
                          true
                        )
                        : useTooltip(
                          this.tooltip,
                          this.label as string,
                          this.selectedOption
                        )}
                  </div>
                </ZText>
              </div>
            ) : (
              <div
                class={`${clsPrefix}-base-selection-placeholder ${clsPrefix}-base-selection-overlay`}
                key="placeholder"
              >
                <ZText variant={size === 'large' ? '2-r' : '3-r'}>
                  <div class={`${clsPrefix}-base-selection-placeholder__inner`}>
                    {this.placeholder}
                  </div>
                </ZText>
              </div>
            )}
            {suffix}
          </div>
        )
      }
    }
    return (
      <div
        ref="selfRef"
        class={[
          `${clsPrefix}-base-selection`,
          this.themeClass,
          status && `${clsPrefix}-base-selection--${status}-status`,
          {
            [`${clsPrefix}-base-selection--active`]: this.active,
            [`${clsPrefix}-base-selection--selected`]:
              this.selected || (this.active && this.pattern),
            [`${clsPrefix}-base-selection--disabled`]: this.disabled,
            [`${clsPrefix}-base-selection--multiple`]: this.multiple,
            // focus is not controlled by selection itself since it always need
            // to be managed together with menu. provide :focus style will cause
            // many redundant codes.
            [`${clsPrefix}-base-selection--focus`]: this.focused
          }
        ]}
        style={this.cssVars as CSSProperties}
        onClick={this.onClick}
        onMouseenter={this.handleMouseEnter}
        onMouseleave={this.handleMouseLeave}
        onKeydown={this.onKeydown}
        onFocusin={this.handleFocusin}
        onFocusout={this.handleFocusout}
        onMousedown={this.handleMouseDown}
      >
        {body}
        {bordered ? (
          <div class={`${clsPrefix}-base-selection__border`} />
        ) : null}
        {bordered ? (
          <div class={`${clsPrefix}-base-selection__state-border`} />
        ) : null}
      </div>
    )
  }
})
