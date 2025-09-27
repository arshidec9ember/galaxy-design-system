import {
  h,
  ref,
  computed,
  toRef,
  defineComponent,
  type PropType,
  watch,
  Transition,
  withDirectives,
  vShow,
  type InputHTMLAttributes,
  type HTMLAttributes,
  watchEffect,
  nextTick
} from 'vue'
import { getPreciseEventTarget, happensIn } from 'seemly'
import { createTreeMate, type TreeNode } from 'treemate'
import {
  VBinder,
  VFollower,
  VTarget,
  type FollowerInst,
  type FollowerPlacement
} from '../../_external-dependencies/vueuc'
import {
  useIsMounted,
  useMergedState,
  useCompitable
} from '../../_external-dependencies/vooks'
import { clickoutside } from '../../_external-dependencies/vdirs'
import {
  type RenderLabel,
  type RenderOption,
  type NodeProps
} from '../../_internal/select-menu/src/interface'
import { type RenderTag } from '../../_internal/selection/src/interface'
import type { FormValidationStatus } from '../../form/src/interface'
import {
  useTheme,
  useConfig,
  useLocale,
  useFormItem,
  useThemeClass,
  useProxyModel
} from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import {
  call,
  markEventEffectPerformed,
  useAdjustedTo,
  warnOnce
} from '../../_utils'
import type { MaybeArray, ExtractPublicPropTypes } from '../../_utils'
import {
  ZInternalSelectMenu,
  ZInternalSelection,
  type InternalSelectMenuRef,
  type InternalSelectionInst
} from '../../_internal'
import { selectLight, type SelectTheme } from '../styles'
import {
  createValOptMap,
  filterOptions,
  createTmOptions,
  patternMatched
} from './utils'
import type {
  SelectInst,
  SelectMixedOption,
  SelectOption,
  SelectGroupOption,
  SelectIgnoredOption,
  SelectFallbackOption,
  SelectFallbackOptionImpl,
  OnUpdateModelValue,
  OnUpdateModelValueImpl,
  Value,
  Size,
  ValueAtom,
  SelectBaseOption,
  SelectFilter
} from './interface'
import style from './styles/index.cssr'

export const selectProps = {
  ...(useTheme.props as ThemeProps<SelectTheme>),
  to: useAdjustedTo.propTo,
  bordered: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  clearable: Boolean,
  clearFilterAfterSelect: {
    type: Boolean,
    default: true
  },
  options: {
    type: Array as PropType<SelectMixedOption[]>,
    default: () => []
  },
  defaultModelValue: {
    type: [String, Number, Array] as PropType<Value | null>,
    default: null
  },
  keyboard: {
    type: Boolean,
    default: true
  },
  modelValue: [String, Number, Array] as PropType<Value | null>,
  placeholder: String,
  menuProps: Object as PropType<HTMLAttributes>,
  multiple: Boolean,
  size: String as PropType<Size>,
  filterable: Boolean,
  disabled: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  limitTag: Number,
  remote: Boolean,
  loading: Boolean,
  tooltip: {
    type: Boolean,
    default: true
  },
  filter: Function as PropType<SelectFilter>,
  placement: {
    type: String as PropType<FollowerPlacement>,
    default: 'bottom-start'
  },
  widthMode: {
    type: String,
    default: 'trigger'
  },
  tag: Boolean,
  onCreate: Function as PropType<(label: string) => SelectOption>,
  fallbackOption: {
    type: [Function, Boolean] as PropType<
    SelectFallbackOption | false | undefined
    >,
    default: undefined
  },
  show: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  showArrow: {
    type: Boolean,
    default: true
  },
  maxTagCount: [Number, String] as PropType<number | 'responsive'>,
  consistentMenuWidth: {
    type: Boolean,
    default: true
  },
  virtualScroll: {
    type: Boolean,
    default: true
  },
  labelField: {
    type: String,
    default: 'label'
  },
  valueField: {
    type: String,
    default: 'value'
  },
  childrenField: {
    type: String,
    default: 'children'
  },
  delimiters: {
    type: Array,
    default: [',']
  },
  retainOnDuplicate: {
    type: Boolean,
    default: true
  },
  renderOptionLabel: Function as PropType<RenderLabel>,
  renderOption: Function as PropType<RenderOption>,
  renderOptionTag: Function as PropType<RenderTag>,
  'onUpdate:modelValue': [Function, Array] as PropType<
  MaybeArray<OnUpdateModelValue> | undefined
  >,
  inputProps: Object as PropType<InputHTMLAttributes>,
  nodeProps: Function as PropType<NodeProps>,
  ignoreComposition: { type: Boolean, default: true },
  showOnFocus: Boolean,
  // for jsx
  onUpdateModelValue: [Function, Array] as PropType<
  MaybeArray<OnUpdateModelValue> | undefined
  >,
  onBlur: [Function, Array] as PropType<
  MaybeArray<(e: FocusEvent) => void> | undefined
  >,
  onClear: [Function, Array] as PropType<MaybeArray<() => void> | undefined>,
  onFocus: [Function, Array] as PropType<
  MaybeArray<(e: FocusEvent) => void> | undefined
  >,
  onScroll: [Function, Array] as PropType<
  MaybeArray<(e: Event) => void> | undefined
  >,
  onSearch: [Function, Array] as PropType<
  MaybeArray<(value: string) => void> | undefined
  >,
  onUpdateShow: [Function, Array] as PropType<
  MaybeArray<(value: boolean) => void>
  >,
  'onUpdate:show': [Function, Array] as PropType<
  MaybeArray<(value: boolean) => void>
  >,
  displayDirective: {
    type: String as PropType<'if' | 'show'>,
    default: 'show'
  },
  resetMenuOnOptionsChange: {
    type: Boolean,
    default: true
  },
  status: String as PropType<FormValidationStatus>,
  showCheckmark: {
    type: Boolean,
    default: false
  },
  /** deprecated */
  onChange: [Function, Array] as PropType<MaybeArray<OnUpdateModelValue>>,
  items: Array as PropType<SelectMixedOption[]>
} as const

export type SelectProps = ExtractPublicPropTypes<typeof selectProps>

export default defineComponent({
  name: 'Select',
  props: selectProps,
  setup (props) {
    if (__DEV__) {
      watchEffect(() => {
        if (props.items !== undefined) {
          warnOnce(
            'select',
            '`items` is deprecated, please use `options` instead.'
          )
        }
        if (props.onChange !== undefined) {
          warnOnce(
            'select',
            '`on-change` is deprecated, please use `on-update:model-value` instead.'
          )
        }
      })
    }

    const {
      mergedClsPrefixRef,
      mergedBorderedRef,
      namespaceRef,
      inlineThemeDisabled
    } = useConfig(props)
    const themeRef = useTheme(
      'Select',
      '-select',
      style,
      selectLight,
      props,
      mergedClsPrefixRef
    )
    const uncontrolledValueRef = ref(props.defaultModelValue)
    const controlledValueRef = toRef(props, 'modelValue')
    const mergedValueRef = useMergedState(
      controlledValueRef,
      uncontrolledValueRef
    )
    const focusedRef = ref(false)
    const patternRef = ref('')
    const treeMateRef = computed(() => {
      const { valueField, childrenField } = props
      const options = createTmOptions(valueField, childrenField)
      return createTreeMate<
      SelectOption,
      SelectGroupOption,
      SelectIgnoredOption
      >(filteredOptionsRef.value, options)
    })
    const valOptMapRef = computed(() =>
      createValOptMap(
        localOptionsRef.value,
        props.valueField,
        props.childrenField
      )
    )
    const controlledShowRef = useProxyModel(props, 'show')
    const uncontrolledShowRef = ref(false)
    const mergedShowRef = useMergedState(controlledShowRef, uncontrolledShowRef)
    const triggerRef = ref<InternalSelectionInst | null>(null)
    const followerRef = ref<FollowerInst | null>(null)
    const menuRef = ref<InternalSelectMenuRef | null>(null)
    const { localeRef } = useLocale('Select')
    const localizedPlaceholderRef = computed<string>(() => {
      return props.placeholder ?? localeRef.value.placeholder
    })
    const compitableOptionsRef = useCompitable(props, ['items', 'options'])

    const emptyArray: SelectOption[] = []
    const createdOptionsRef = ref<SelectOption[]>([])
    const beingCreatedOptionsRef = ref<SelectOption[]>([])
    const memoValOptMapRef = ref(new Map<string | number, SelectOption>())

    const wrappedFallbackOptionRef = computed(() => {
      const { fallbackOption } = props
      if (fallbackOption === undefined) {
        const { labelField, valueField } = props
        return (value: string | number) => ({
          [labelField]: String(value),
          [valueField]: value
        })
      }
      if (fallbackOption === false) return false
      return (value: string | number) => {
        return Object.assign(
          (fallbackOption as SelectFallbackOptionImpl)(value),
          {
            value
          }
        ) as SelectOption
      }
    })
    const localOptionsRef = computed<SelectMixedOption[]>(() => {
      return (
        beingCreatedOptionsRef.value.concat(
          createdOptionsRef.value
        ) as SelectMixedOption[]
      ).concat(compitableOptionsRef.value)
    })
    const resolvedFilterRef = computed(() => {
      const { filter } = props
      if (filter) return filter
      const { labelField, valueField } = props
      return (pattern: string, option: SelectBaseOption): boolean => {
        if (!option) return false
        const label = option[labelField]
        if (typeof label === 'string') {
          return patternMatched(pattern, label)
        }
        const value = option[valueField]
        if (typeof value === 'string') {
          return patternMatched(pattern, value)
        }
        if (typeof value === 'number') {
          return patternMatched(pattern, String(value))
        }
        return false
      }
    })
    const filteredOptionsRef = computed(() => {
      if (props.remote) {
        return compitableOptionsRef.value
      } else {
        const { value: localOptions } = localOptionsRef
        const { value: pattern } = patternRef
        if (!pattern.length || !props.filterable) {
          return localOptions
        } else {
          return filterOptions(
            localOptions,
            resolvedFilterRef.value,
            pattern,
            props.childrenField
          )
        }
      }
    })
    function getMergedOptions (values: ValueAtom[]): SelectOption[] {
      const remote = props.remote
      const { value: memoValOptMap } = memoValOptMapRef
      const { value: valOptMap } = valOptMapRef
      const { value: wrappedFallbackOption } = wrappedFallbackOptionRef
      const options: SelectOption[] = []
      values.forEach((value) => {
        if (valOptMap.has(value)) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          options.push(valOptMap.get(value)!)
        } else if (remote && memoValOptMap.has(value)) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          options.push(memoValOptMap.get(value)!)
        } else if (wrappedFallbackOption) {
          const option = wrappedFallbackOption(value)
          if (option) {
            options.push(option)
          }
        }
      })
      return options
    }
    const selectedOptionsRef = computed(() => {
      if (props.multiple) {
        const { value: values } = mergedValueRef
        if (!Array.isArray(values)) return []
        return getMergedOptions(values)
      }
      return null
    })
    const selectedOptionRef = computed<SelectOption | null>(() => {
      const { value: mergedValue } = mergedValueRef
      if (!props.multiple && !Array.isArray(mergedValue)) {
        if (mergedValue === null) return null
        return getMergedOptions([mergedValue])[0] || null
      }
      return null
    })

    const formItem = useFormItem(props)
    const { mergedSizeRef, mergedDisabledRef, mergedStatusRef } = formItem
    function doUpdateValue (
      value: string | number | Array<string | number> | null,
      option: SelectOption | null | SelectOption[]
    ): void {
      const {
        onChange,
        'onUpdate:modelValue': _onUpdateModelValue,
        onUpdateModelValue
      } = props
      const { nTriggerFormChange, nTriggerFormInput } = formItem

      if (onChange) call(onChange as OnUpdateModelValueImpl, value, option)
      if (onUpdateModelValue) {
        call(onUpdateModelValue as OnUpdateModelValueImpl, value, option)
      }
      if (_onUpdateModelValue) {
        call(_onUpdateModelValue as OnUpdateModelValueImpl, value, option)
      }
      uncontrolledValueRef.value = value
      nTriggerFormChange()
      nTriggerFormInput()
    }
    function doBlur (e: FocusEvent): void {
      const { onBlur } = props
      const { nTriggerFormBlur } = formItem
      if (onBlur) call(onBlur, e)
      nTriggerFormBlur()
    }
    function doClear (): void {
      const { onClear } = props
      if (onClear) call(onClear)
    }
    function doFocus (e: FocusEvent): void {
      const { onFocus, showOnFocus } = props
      const { nTriggerFormFocus } = formItem
      if (onFocus) call(onFocus, e)
      nTriggerFormFocus()
      if (showOnFocus) {
        openMenu()
      }
    }
    function doSearch (value: string): void {
      const { onSearch } = props
      if (onSearch) call(onSearch, value)
    }
    function doScroll (e: Event): void {
      const { onScroll } = props
      if (onScroll) call(onScroll, e)
    }
    // remote related methods
    function updateMemorizedOptions (): void {
      const { remote, multiple } = props
      if (remote) {
        const { value: memoValOptMap } = memoValOptMapRef
        if (multiple) {
          const { valueField } = props
          selectedOptionsRef.value?.forEach((option) => {
            memoValOptMap.set(
              option[valueField] as NonNullable<SelectOption['value']>,
              option
            )
          })
        } else {
          const option = selectedOptionRef.value
          if (option) {
            memoValOptMap.set(
              option[props.valueField] as NonNullable<SelectOption['value']>,
              option
            )
          }
        }
      }
    }
    // menu related methods
    function doUpdateShow (value: boolean): void {
      controlledShowRef.value = value
      uncontrolledShowRef.value = value
    }
    function openMenu (): void {
      const { value: mergedValue } = mergedValueRef
      if (handleCloseMenu(mergedValue)) return
      doUpdateShow(true)
      uncontrolledShowRef.value = true
      if (props.filterable) {
        focusSelectionInput()
      }
    }
    function closeMenu (): void {
      doUpdateShow(false)
    }
    function handleMenuAfterLeave (): void {
      patternRef.value = ''
      beingCreatedOptionsRef.value = emptyArray
    }
    const activeWithoutMenuOpenRef = ref(false)
    function onTriggerInputFocus (): void {
      if (props.filterable) {
        activeWithoutMenuOpenRef.value = true
      }
    }
    function onTriggerInputBlur (): void {
      if (props.filterable) {
        activeWithoutMenuOpenRef.value = false
        if (!mergedShowRef.value) {
          handleMenuAfterLeave()
        }
      }
    }
    function handleTriggerClick (): void {
      if (mergedDisabledRef.value) return
      if (!mergedShowRef.value) {
        openMenu()
      } else {
        if (!props.filterable && !props.showOnFocus) {
          // already focused, don't need to return focus
          closeMenu()
        } else {
          focusSelectionInput()
        }
      }
    }
    function handleTriggerBlur (e: FocusEvent): void {
      if (menuRef.value?.selfRef?.contains(e.relatedTarget as any)) {
        return
      }
      focusedRef.value = false
      doBlur(e)
      // outside select, don't need to return focus
      closeMenu()
    }
    function handleTriggerFocus (e: FocusEvent): void {
      doFocus(e)
      focusedRef.value = true
    }
    function handleMenuFocus (e: FocusEvent): void {
      focusedRef.value = true
    }
    function handleMenuBlur (e: FocusEvent): void {
      if (triggerRef.value?.$el.contains(e.relatedTarget as any)) return
      focusedRef.value = false
      doBlur(e)
      // outside select, don't need to return focus
      closeMenu()
    }
    function handleCloseMenu (
      mergedValue: number[] | ValueAtom | string[] | ValueAtom[] | null,
      limitMaxTag: boolean = true,
      maxTag: number | undefined = props.limitTag
    ): boolean {
      if (
        mergedDisabledRef.value ||
        (props.multiple &&
          limitMaxTag &&
          maxTag !== undefined &&
          ((Array.isArray(mergedValue) && maxTag <= mergedValue.length) ||
            !maxTag))
      ) {
        return true
      }
      return false
    }
    function handleMenuTabOut (): void {
      triggerRef.value?.focus()
      closeMenu()
    }
    function handleMenuClickOutside (e: MouseEvent): void {
      if (
        menuRef.value?.selfRef?.contains(
          getPreciseEventTarget(e) as Node | null
        )
      ) {
        return
      }
      if (mergedShowRef.value) {
        if (
          !triggerRef.value?.$el.contains(
            getPreciseEventTarget(e) as Node | null
          )
        ) {
          // outside select, don't need to return focus
          closeMenu()
        }
      }
    }
    function createClearedMultipleSelectValue (
      value: string | number | Array<string | number> | null
    ): Array<string | number> {
      if (!Array.isArray(value)) return []
      if (wrappedFallbackOptionRef.value) {
        // if option has a fallback, I can't help user to clear some unknown value
        return Array.from(value)
      } else {
        // if there's no option fallback, unappeared options are treated as invalid
        const { remote } = props
        const { value: valOptMap } = valOptMapRef
        if (remote) {
          const { value: memoValOptMap } = memoValOptMapRef
          return value.filter((v) => valOptMap.has(v) || memoValOptMap.has(v))
        } else {
          return value.filter((v) => valOptMap.has(v))
        }
      }
    }
    function handleToggleByTmNode (
      tmNode: TreeNode<SelectOption>,
      limitMaxTag: boolean = true,
      preserveOption: boolean = false
    ): void {
      handleToggleByOption(tmNode.rawNode, limitMaxTag, preserveOption)
    }
    function handleToggleByOption (
      option: SelectOption,
      limitMaxTag: boolean = false,
      preserveOption: boolean = false
    ): void {
      const { value: mergedValue } = mergedValueRef
      if (handleCloseMenu(mergedValue, limitMaxTag)) {
        closeMenu()
        return
      }
      const { tag, remote, clearFilterAfterSelect, valueField } = props
      if (tag && !remote) {
        const { value: beingCreatedOptions } = beingCreatedOptionsRef
        const beingCreatedOption = beingCreatedOptions[0] || null
        if (beingCreatedOption) {
          const createdOptions = createdOptionsRef.value
          if (!createdOptions.length) {
            createdOptionsRef.value = [beingCreatedOption]
          } else {
            createdOptions.push(beingCreatedOption)
          }
          beingCreatedOptionsRef.value = emptyArray
        }
      }
      if (remote) {
        memoValOptMapRef.value.set(
          option[valueField] as NonNullable<SelectOption['value']>,
          option
        )
      }
      if (props.multiple) {
        const changedValue = createClearedMultipleSelectValue(
          mergedValueRef.value
        )
        const index = changedValue.findIndex(
          (value) =>
            value === (option[valueField] as NonNullable<SelectOption['value']>)
        )
        if (~index) {
          if (!preserveOption) {
            changedValue.splice(index, 1)
            if (tag && !remote) {
              const createdOptionIndex = getCreatedOptionIndex(
                option[valueField] as NonNullable<SelectOption['value']>
              )
              if (~createdOptionIndex) {
                createdOptionsRef.value.splice(createdOptionIndex, 1)
                if (clearFilterAfterSelect) patternRef.value = ''
              }
            }
          }
        } else {
          changedValue.push(
            option[valueField] as NonNullable<SelectOption['value']>
          )
          if (clearFilterAfterSelect) patternRef.value = ''
        }
        doUpdateValue(changedValue, getMergedOptions(changedValue))
        if (
          props.limitTag !== undefined &&
          handleCloseMenu(mergedValue, limitMaxTag, props.limitTag - 1)
        ) {
          closeMenu()
        }
      } else {
        if (tag && !remote) {
          const createdOptionIndex = getCreatedOptionIndex(
            option[valueField] as NonNullable<SelectOption['value']>
          )
          if (~createdOptionIndex) {
            createdOptionsRef.value = [
              createdOptionsRef.value[createdOptionIndex]
            ]
          } else {
            createdOptionsRef.value = emptyArray
          }
        }
        focusSelection()
        closeMenu()
        doUpdateValue(
          option[valueField] as NonNullable<SelectOption['value']>,
          option
        )
      }
    }
    function getCreatedOptionIndex (optionValue: string | number): number {
      const createdOptions = createdOptionsRef.value
      return createdOptions.findIndex(
        (createdOption) =>
          (createdOption[props.valueField] as NonNullable<
          SelectOption['value']
          >) === optionValue
      )
    }
    function handlePatternInput (e: InputEvent): void {
      if (!mergedShowRef.value) {
        openMenu()
      }
      const { value } = e.target as unknown as HTMLInputElement
      patternRef.value = value
      const { tag, remote } = props
      doSearch(value)
      if (tag && !remote) {
        if (!value) {
          beingCreatedOptionsRef.value = emptyArray
          return
        }
        const { onCreate } = props
        const optionBeingCreated = onCreate
          ? onCreate(value)
          : { [props.labelField]: value, [props.valueField]: value }
        const { valueField, labelField } = props
        if (
          compitableOptionsRef.value.some((option) => {
            return (
              option[valueField] === optionBeingCreated[valueField] ||
              option[labelField] === optionBeingCreated[labelField]
            )
          }) ||
          createdOptionsRef.value.some((option) => {
            return (
              option[valueField] === optionBeingCreated[valueField] ||
              option[labelField] === optionBeingCreated[labelField]
            )
          })
        ) {
          beingCreatedOptionsRef.value = emptyArray
        } else {
          beingCreatedOptionsRef.value = [optionBeingCreated]
        }
      }
    }
    function handleClear (e: MouseEvent): void {
      e.stopPropagation()
      const { multiple } = props
      if (!multiple && props.filterable) {
        closeMenu()
      }
      doClear()
      if (multiple) {
        doUpdateValue([], [])
      } else {
        doUpdateValue(null, null)
      }
    }
    function handleMenuMousedown (e: MouseEvent): void {
      if (!happensIn(e, 'action') && !happensIn(e, 'empty')) e.preventDefault()
    }
    // scroll events on menu
    function handleMenuScroll (e: Event): void {
      doScroll(e)
    }

    async function processFilteredValues (
      filteredValues: SelectOption[]
    ): Promise<void> {
      for (const value of filteredValues) {
        await nextTick()
        handleToggleByOption(value, true, props.retainOnDuplicate)
      }
    }
    function updateInputTags (e: ClipboardEvent): void {
      const delimiters = props.delimiters
      const inputText = e.clipboardData?.getData('text')
      const delimitersRegExp = new RegExp(
        delimiters.map((delimiter) => `\\${delimiter as string}`).join('|'),
        'g'
      )

      if (props.multiple && inputText) {
        const multipleText = inputText
          .split(delimitersRegExp)
          .map((input) => input.trim())
          .filter(Boolean)

        const filteredValues: SelectOption[] = []

        multipleText.forEach((text) => {
          // Check existing options first
          let found = false

          props.options.forEach((option) => {
            if (!found) {
              if (
                text.toLowerCase() ===
                  ((option[props.labelField] as string) || '').toLowerCase() &&
                option.type !== 'group' &&
                !option.disabled
              ) {
                filteredValues.push(option as SelectOption)
                found = true
              }

              const children: SelectOption[] | undefined =
                (option[props.childrenField] as SelectOption[]) || undefined
              if (children?.length) {
                children.forEach((child: SelectOption) => {
                  if (
                    !found &&
                    !child.disabled &&
                    text.toLowerCase() ===
                      ((child[props.labelField] as string) || '').toLowerCase()
                  ) {
                    filteredValues.push(child)
                    found = true
                  }
                })
              }
            }
          })

          // If not found in existing options, create new option if tag prop is true
          if (!found && props.tag) {
            const { onCreate } = props
            const newOption = onCreate
              ? onCreate(text)
              : { [props.labelField]: text, [props.valueField]: text }
            filteredValues.push(newOption)
          }
        })

        if (filteredValues.length) {
          processFilteredValues(filteredValues).catch((err) => {
            throw err
          })
        }
      }
    }
    // keyboard events
    // also for menu keydown
    function handleKeydown (e: KeyboardEvent): void {
      if (!props.keyboard) {
        e.preventDefault()
        return
      }
      switch (e.key) {
        case ' ':
          if (props.filterable) break
          else {
            e.preventDefault()
          }
        // eslint-disable-next-line no-fallthrough
        case 'Enter':
          if (!triggerRef.value?.isComposing) {
            if (mergedShowRef.value) {
              const pendingTmNode = menuRef.value?.getPendingTmNode()
              if (pendingTmNode) {
                handleToggleByTmNode(
                  pendingTmNode,
                  true,
                  props.retainOnDuplicate
                )
              } else if (!props.filterable) {
                closeMenu()
                focusSelection()
              }
            } else {
              openMenu()
              if (props.tag && activeWithoutMenuOpenRef.value) {
                const beingCreatedOption = beingCreatedOptionsRef.value[0]
                if (beingCreatedOption) {
                  const optionValue = beingCreatedOption[
                    props.valueField
                  ] as NonNullable<SelectOption['value']>
                  const { value: mergedValue } = mergedValueRef
                  if (props.multiple) {
                    if (
                      Array.isArray(mergedValue) &&
                      mergedValue.some((value) => value === optionValue)
                    ) {
                      // do nothing
                    } else {
                      handleToggleByOption(beingCreatedOption, true)
                    }
                  } else {
                    handleToggleByOption(beingCreatedOption, true)
                  }
                }
              }
            }
          }
          e.preventDefault()
          break
        case 'ArrowUp':
          e.preventDefault()
          if (props.loading) return
          if (mergedShowRef.value) {
            menuRef.value?.prev()
          }
          break
        case 'ArrowDown':
          e.preventDefault()
          if (props.loading) return
          if (mergedShowRef.value) {
            menuRef.value?.next()
          } else {
            openMenu()
          }
          break
        case 'Escape':
          if (mergedShowRef.value) {
            markEventEffectPerformed(e)
            closeMenu()
          }
          triggerRef.value?.focus()
          break
      }
    }
    function focusSelection (): void {
      triggerRef.value?.focus()
    }
    function focusSelectionInput (): void {
      triggerRef.value?.focusInput()
    }
    function handleTriggerOrMenuResize (): void {
      if (!mergedShowRef.value) return
      followerRef.value?.syncPosition()
    }
    updateMemorizedOptions()
    watch(toRef(props, 'options'), updateMemorizedOptions)

    const exposedMethods: SelectInst = {
      focus: () => {
        triggerRef.value?.focus()
      },
      focusInput: () => {
        triggerRef.value?.focusInput()
      },
      blur: () => {
        triggerRef.value?.blur()
      },
      blurInput: () => {
        triggerRef.value?.blurInput()
      }
    }
    const cssVarsRef = computed(() => {
      const {
        self: { menuBoxShadow }
      } = themeRef.value
      return {
        '--z-menu-box-shadow': menuBoxShadow
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('select', undefined, cssVarsRef, props)
      : undefined
    return {
      ...exposedMethods,
      mergedStatus: mergedStatusRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedBordered: mergedBorderedRef,
      namespace: namespaceRef,
      treeMate: treeMateRef,
      isMounted: useIsMounted(),
      triggerRef,
      menuRef,
      updateInputTags,
      pattern: patternRef,
      uncontrolledShow: uncontrolledShowRef,
      mergedShow: mergedShowRef,
      adjustedTo: useAdjustedTo(props),
      uncontrolledValue: uncontrolledValueRef,
      mergedValue: mergedValueRef,
      followerRef,
      localizedPlaceholder: localizedPlaceholderRef,
      selectedOption: selectedOptionRef,
      selectedOptions: selectedOptionsRef,
      mergedSize: mergedSizeRef,
      mergedDisabled: mergedDisabledRef,
      focused: focusedRef,
      activeWithoutMenuOpen: activeWithoutMenuOpenRef,
      inlineThemeDisabled,
      onTriggerInputFocus,
      onTriggerInputBlur,
      handleTriggerOrMenuResize,
      handleMenuFocus,
      handleMenuBlur,
      handleMenuTabOut,
      handleTriggerClick,
      handleToggle: handleToggleByTmNode,
      handleDeleteOption: handleToggleByOption,
      handlePatternInput,
      handleClear,
      handleTriggerBlur,
      handleTriggerFocus,
      handleKeydown,
      handleMenuAfterLeave,
      handleMenuClickOutside,
      handleMenuScroll,
      handleMenuKeydown: handleKeydown,
      handleMenuMousedown,
      mergedTheme: themeRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    return (
      <div class={`${this.mergedClsPrefix}-select`}>
        <VBinder>
          {{
            default: () => [
              <VTarget>
                {{
                  default: () => (
                    <ZInternalSelection
                      ref="triggerRef"
                      inlineThemeDisabled={this.inlineThemeDisabled}
                      status={this.mergedStatus}
                      inputProps={this.inputProps}
                      clsPrefix={this.mergedClsPrefix}
                      showArrow={this.showArrow}
                      maxTagCount={this.maxTagCount}
                      bordered={this.mergedBordered}
                      active={this.activeWithoutMenuOpen || this.mergedShow}
                      pattern={this.pattern}
                      placeholder={this.localizedPlaceholder}
                      selectedOption={this.selectedOption}
                      selectedOptions={this.selectedOptions}
                      multiple={this.multiple}
                      renderTag={this.renderOptionTag}
                      renderLabel={this.renderOptionLabel}
                      filterable={this.filterable}
                      clearable={this.clearable}
                      disabled={this.mergedDisabled}
                      size={this.mergedSize}
                      theme={this.mergedTheme.peers.InternalSelection}
                      labelField={this.labelField}
                      valueField={this.valueField}
                      themeOverrides={
                        this.mergedTheme.peerOverrides.InternalSelection
                      }
                      loading={this.loading}
                      focused={this.focused}
                      tooltip={this.tooltip}
                      onClick={this.handleTriggerClick}
                      onPasteData={this.updateInputTags}
                      onDeleteOption={this.handleDeleteOption}
                      onPatternInput={this.handlePatternInput}
                      onClear={this.handleClear}
                      onBlur={this.handleTriggerBlur}
                      onFocus={this.handleTriggerFocus}
                      onKeydown={this.handleKeydown}
                      onPatternBlur={this.onTriggerInputBlur}
                      onPatternFocus={this.onTriggerInputFocus}
                      onResize={this.handleTriggerOrMenuResize}
                      ignoreComposition={this.ignoreComposition}
                    >
                      {{
                        arrow: () => [this.$slots.arrow?.()]
                      }}
                    </ZInternalSelection>
                  )
                }}
              </VTarget>,
              <VFollower
                ref="followerRef"
                show={this.mergedShow}
                to={this.adjustedTo}
                teleportDisabled={this.adjustedTo === useAdjustedTo.tdkey}
                containerClass={this.namespace}
                width={this.consistentMenuWidth ? 'target' : undefined}
                minWidth="target"
                placement={this.placement}
              >
                {{
                  default: () => (
                    <Transition
                      name="fade-in-scale-up-transition"
                      appear={this.isMounted}
                      onAfterLeave={this.handleMenuAfterLeave}
                    >
                      {{
                        default: () => {
                          if (
                            !(
                              this.mergedShow ||
                              this.displayDirective === 'show'
                            )
                          ) {
                            return null
                          }
                          this.onRender?.()
                          return withDirectives(
                            <ZInternalSelectMenu
                              {...this.menuProps}
                              ref="menuRef"
                              onResize={this.handleTriggerOrMenuResize}
                              inlineThemeDisabled={this.inlineThemeDisabled}
                              virtualScroll={
                                this.consistentMenuWidth && this.virtualScroll
                              }
                              class={[
                                `${this.mergedClsPrefix}-select-menu`,
                                this.themeClass,
                                this.menuProps?.class
                              ]}
                              clsPrefix={this.mergedClsPrefix}
                              focusable
                              labelField={this.labelField}
                              valueField={this.valueField}
                              autoPending={true}
                              tooltip={this.tooltip}
                              nodeProps={this.nodeProps}
                              theme={this.mergedTheme.peers.InternalSelectMenu}
                              themeOverrides={
                                this.mergedTheme.peerOverrides
                                  .InternalSelectMenu
                              }
                              treeMate={this.treeMate}
                              multiple={this.multiple}
                              size="medium"
                              renderOption={this.renderOption}
                              renderLabel={this.renderOptionLabel}
                              value={this.mergedValue}
                              style={[this.menuProps?.style, this.cssVars]}
                              onToggle={this.handleToggle}
                              onScroll={this.handleMenuScroll}
                              onFocus={this.handleMenuFocus}
                              onBlur={this.handleMenuBlur}
                              onKeydown={this.handleMenuKeydown}
                              onTabOut={this.handleMenuTabOut}
                              onMousedown={this.handleMenuMousedown}
                              show={this.mergedShow}
                              showCheckmark={this.showCheckmark}
                              resetMenuOnOptionsChange={
                                this.resetMenuOnOptionsChange
                              }
                            >
                              {{
                                empty: () => [this.$slots.empty?.()],
                                action: () => [this.$slots.action?.()]
                              }}
                            </ZInternalSelectMenu>,
                            this.displayDirective === 'show'
                              ? [
                                  [vShow, this.mergedShow],
                                  [
                                    clickoutside,
                                    this.handleMenuClickOutside,
                                    undefined as unknown as string,
                                    { capture: true }
                                  ]
                                ]
                              : [
                                  [
                                    clickoutside,
                                    this.handleMenuClickOutside,
                                    undefined as unknown as string,
                                    { capture: true }
                                  ]
                                ]
                          )
                        }
                      }}
                    </Transition>
                  )
                }}
              </VFollower>
            ]
          }}
        </VBinder>
      </div>
    )
  }
})
