import {
  h,
  defineComponent,
  ref,
  Transition,
  computed,
  provide,
  type PropType,
  watch,
  withDirectives,
  type ExtractPropTypes,
  type CSSProperties,
  toRef,
  type Ref,
  watchEffect,
  type VNode
} from 'vue'
import {
  VBinder,
  VTarget,
  VFollower,
  type FollowerPlacement
} from '../../_external-dependencies/vueuc'
import { clickoutside } from '../../_external-dependencies/vdirs'
import { format, getTime, isValid } from 'date-fns/esm'
import {
  useIsMounted,
  useMergedState
} from '../../_external-dependencies/vooks'
import { getPreciseEventTarget, happensIn } from 'seemly'
import type { Size as TimePickerSize } from '../../time-picker/src/interface'
import type { TimePickerProps } from '../../time-picker/src/TimePicker'
import type { FormValidationStatus } from '../../form/src/interface'
import { DateIcon, ToIcon } from '../../_internal/icons'
import type { InputInst, InputProps } from '../../input'
import { ZInput } from '../../input'
import { ZBaseIcon } from '../../_internal'
import {
  useFormItem,
  useTheme,
  useConfig,
  useLocale,
  useThemeClass
} from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import {
  warn,
  call,
  useAdjustedTo,
  createKey,
  warnOnce,
  resolveSlot,
  markEventEffectPerformed
} from '../../_utils'
import type { MaybeArray, ExtractPublicPropTypes } from '../../_utils'
import type { DatePickerTheme } from '../styles/light'
import { datePickerLight } from '../styles'
import { getShortcuts, strictParse } from './utils'
import {
  uniCalendarValidation,
  dualCalendarValidation
} from './validation-utils'
import { type DatePickerType } from './config'
import type {
  OnUpdateModelValue,
  OnUpdateModelValueImpl,
  Value,
  PanelRef,
  IsDateDisabled,
  IsTimeDisabled,
  Shortcuts,
  FirstDayOfWeek,
  DefaultTime,
  FormattedValue,
  OnUpdateFormattedValue,
  OnUpdateFormattedValueImpl,
  DatePickerInst,
  OnConfirmImpl,
  OnConfirm
} from './interface'
import { datePickerInjectionKey } from './interface'
import DatetimePanel from './panel/datetime'
import DatetimerangePanel from './panel/datetimerange'
import DatePanel from './panel/date'
import DaterangePanel from './panel/daterange'
import MonthPanel from './panel/month'
import MonthRangePanel from './panel/monthrange'
import style from './styles/index.cssr'

export const datePickerProps = {
  ...(useTheme.props as ThemeProps<DatePickerTheme>),
  to: useAdjustedTo.propTo,
  bordered: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  clearable: Boolean,
  updateValueOnClose: Boolean,
  defaultModelValue: [Number, Array] as PropType<Value | null>,
  defaultFormattedValue: [String, Array] as PropType<FormattedValue | null>,
  defaultTime: [Number, String, Array] as PropType<DefaultTime>,
  disabled: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  placement: {
    type: String as PropType<FollowerPlacement>,
    default: 'bottom-start'
  },
  modelValue: [Number, Array] as PropType<Value | null>,
  formattedValue: [String, Array] as PropType<FormattedValue | null>,
  size: String as PropType<'small' | 'medium' | 'large'>,
  type: {
    type: String as PropType<DatePickerType>,
    default: 'date'
  },
  valueFormat: String,
  separator: String,
  placeholder: String,
  startPlaceholder: String,
  endPlaceholder: String,
  format: String,
  dateFormat: String,
  timeFormat: String,
  minYear: Number,
  maxYear: Number,
  actions: Array as PropType<Array<'clear' | 'confirm' | 'today'> | null>,
  showShortcuts: {
    type: Boolean,
    default: false
  },
  shortcuts: Object as PropType<Shortcuts>,
  isDateDisabled: Function as PropType<IsDateDisabled>,
  isTimeDisabled: Function as PropType<IsTimeDisabled>,
  show: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  panel: Boolean,
  ranges: Object as PropType<Record<string, [number, number]>>,
  firstDayOfWeek: Number as PropType<FirstDayOfWeek>,
  inputReadonly: Boolean,
  closeOnSelect: Boolean,
  status: String as PropType<FormValidationStatus>,
  timePickerProps: [Object, Array] as PropType<
  TimePickerProps | [TimePickerProps, TimePickerProps]
  >,
  onClear: Function as PropType<() => void>,
  onConfirm: Function as PropType<OnConfirm>,
  defaultCalendarStartTime: Number,
  defaultCalendarEndTime: Number,
  bindCalendarMonths: Boolean,
  'onUpdate:show': [Function, Array] as PropType<
  MaybeArray<(show: boolean) => void>
  >,
  onUpdateShow: [Function, Array] as PropType<
  MaybeArray<(show: boolean) => void>
  >,
  'onUpdate:formattedValue': [Function, Array] as PropType<
  MaybeArray<OnUpdateFormattedValue>
  >,
  onUpdateFormattedValue: [Function, Array] as PropType<
  MaybeArray<OnUpdateFormattedValue>
  >,
  'onUpdate:modelValue': [Function, Array] as PropType<
  MaybeArray<OnUpdateModelValue>
  >,
  onUpdateModelValue: [Function, Array] as PropType<
  MaybeArray<OnUpdateModelValue>
  >,
  onFocus: [Function, Array] as PropType<(e: FocusEvent) => void>,
  onBlur: [Function, Array] as PropType<(e: FocusEvent) => void>,
  // deprecated
  onChange: [Function, Array] as PropType<MaybeArray<OnUpdateModelValue>>
} as const

export type DatePickerSetupProps = ExtractPropTypes<typeof datePickerProps>
export type DatePickerProps = ExtractPublicPropTypes<typeof datePickerProps>

export default defineComponent({
  name: 'DatePicker',
  props: datePickerProps,
  setup (props, { slots }) {
    if (__DEV__) {
      watchEffect(() => {
        if (props.onChange !== undefined) {
          warnOnce(
            'date-picker',
            '`on-change` is deprecated, please use `on-update:model-value` instead.'
          )
        }
      })
    }
    const { localeRef, dateLocaleRef } = useLocale('DatePicker')
    const formItem = useFormItem(props)
    const { mergedSizeRef, mergedDisabledRef, mergedStatusRef } = formItem
    const {
      mergedComponentPropsRef,
      mergedClsPrefixRef,
      mergedBorderedRef,
      namespaceRef,
      inlineThemeDisabled
    } = useConfig(props)
    const panelInstRef = ref<PanelRef | null>(null)
    const triggerElRef = ref<HTMLElement | null>(null)
    const inputInstRef = ref<InputInst | null>(null)
    const uncontrolledShowRef = ref<boolean>(false)
    const controlledShowRef = toRef(props, 'show')
    const mergedShowRef = useMergedState(controlledShowRef, uncontrolledShowRef)
    const dateFnsOptionsRef = computed(() => {
      return {
        locale: dateLocaleRef.value.locale
      }
    })

    const mergedFormatRef = computed(() => {
      const { format } = props
      if (format) return format
      switch (props.type) {
        case 'date':
        case 'daterange':
          return localeRef.value.dateFormat
        case 'datetime':
        case 'datetimerange':
          return localeRef.value.dateTimeFormat
        case 'year':
        case 'yearrange':
          return localeRef.value.yearTypeFormat
        case 'month':
        case 'monthrange':
          return localeRef.value.monthTypeFormat
        case 'quarter':
        case 'quarterrange':
          return localeRef.value.quarterFormat
      }
    })
    const mergedValueFormatRef = computed(() => {
      return props.valueFormat ?? mergedFormatRef.value
    })

    function getTimestampValue (value: FormattedValue | null): Value | null {
      if (value === null) return null
      const { value: mergedValueFormat } = mergedValueFormatRef
      const { value: dateFnsOptions } = dateFnsOptionsRef
      if (Array.isArray(value)) {
        return [
          strictParse(
            value[0],
            mergedValueFormat,
            new Date(),
            dateFnsOptions
          ).getTime(),
          strictParse(
            value[1],
            mergedValueFormat,
            new Date(),
            dateFnsOptions
          ).getTime()
        ]
      }
      return strictParse(
        value,
        mergedValueFormat,
        new Date(),
        dateFnsOptions
      ).getTime()
    }

    const { defaultFormattedValue, defaultModelValue } = props

    const uncontrolledValueRef = ref(
      (defaultFormattedValue !== undefined
        ? getTimestampValue(defaultFormattedValue)
        : defaultModelValue) ?? null
    )
    const controlledValueRef = computed(() => {
      const { formattedValue } = props
      if (formattedValue !== undefined) {
        return getTimestampValue(formattedValue)
      }
      return props.modelValue
    })
    const mergedValueRef = useMergedState(
      controlledValueRef,
      uncontrolledValueRef
    )

    // We don't change value unless blur or confirm is called
    const pendingValueRef: Ref<Value | null> = ref(null)
    watchEffect(() => {
      pendingValueRef.value = mergedValueRef.value
    })
    const singleInputValueRef = ref('')
    const rangeStartInputValueRef = ref('')
    const rangeEndInputValueRef = ref('')
    const singleInputOnConfirmValueRef = ref('')
    const rangeStartInputOnConfirmValueRef = ref('')
    const rangeEndInputOnConfirmValueRef = ref('')
    const themeRef = useTheme(
      'DatePicker',
      '-date-picker',
      style,
      datePickerLight,
      props,
      mergedClsPrefixRef
    )
    const timePickerSizeRef = computed<TimePickerSize>(() => {
      return (
        mergedComponentPropsRef?.value?.DatePicker?.timePickerSize || 'small'
      )
    })
    const isRangeRef = computed(() => {
      return [
        'daterange',
        'datetimerange',
        'monthrange',
        'quarterrange',
        'yearrange'
      ].includes(props.type)
    })
    const localizedPlacehoderRef = computed(() => {
      const { placeholder } = props
      if (placeholder === undefined) {
        const { type } = props
        switch (type) {
          case 'date':
            return localeRef.value.datePlaceholder
          case 'datetime':
            return localeRef.value.datetimePlaceholder
          case 'month':
            return localeRef.value.monthPlaceholder
          case 'year':
            return localeRef.value.yearPlaceholder
          case 'quarter':
            return localeRef.value.quarterPlaceholder
          default:
            return ''
        }
      } else {
        return placeholder
      }
    })
    const localizedStartPlaceholderRef = computed(() => {
      if (props.startPlaceholder === undefined) {
        if (props.type === 'daterange') {
          return localeRef.value.startDatePlaceholder
        } else if (props.type === 'datetimerange') {
          return localeRef.value.startDatetimePlaceholder
        } else if (props.type === 'monthrange') {
          return localeRef.value.startMonthPlaceholder
        }
        return ''
      } else {
        return props.startPlaceholder
      }
    })
    const localizedEndPlaceholderRef = computed(() => {
      if (props.endPlaceholder === undefined) {
        if (props.type === 'daterange') {
          return localeRef.value.endDatePlaceholder
        } else if (props.type === 'datetimerange') {
          return localeRef.value.endDatetimePlaceholder
        } else if (props.type === 'monthrange') {
          return localeRef.value.endMonthPlaceholder
        }
        return ''
      } else {
        return props.endPlaceholder
      }
    })
    const mergedActionsRef = computed(() => {
      const { actions, type, clearable } = props
      if (actions === null) return []
      if (actions !== undefined) return actions
      const result = clearable ? ['clear'] : []
      switch (type) {
        case 'date': {
          result.push('today')
          return result
        }
        case 'datetime': {
          result.push('today')
          result.push('confirm')
          return result
        }
        case 'daterange': {
          result.push('confirm')
          return result
        }
        case 'datetimerange': {
          result.push('confirm')
          return result
        }
        case 'month': {
          result.push('confirm')
          return result
        }
        case 'year': {
          return result
        }
        case 'quarter': {
          result.push('confirm')
          return result
        }
        case 'monthrange':
        case 'yearrange':
        case 'quarterrange': {
          result.push('confirm')
          return result
        }
        default: {
          warn(
            'date-picker',
            "The type is wrong, z-date-picker's type only supports `date`, `datetime`, `daterange` and `datetimerange`."
          )
          break
        }
      }
    })

    const mergedShortcutRef = computed(() => {
      const { shortcuts, type } = props
      // if shortcut is undefined, we need to show the default shortcuts  based on the type
      // else shortcut will be overrides
      if (shortcuts !== undefined) {
        return shortcuts
      }
      return getShortcuts(type)
    })
    function getFormattedValue (value: Value | null): FormattedValue | null {
      if (value === null) return null
      if (Array.isArray(value)) {
        const { value: mergedValueFormat } = mergedValueFormatRef
        const { value: dateFnsOptions } = dateFnsOptionsRef
        return [
          format(value[0], mergedValueFormat, dateFnsOptions),
          format(value[1], mergedValueFormat, dateFnsOptionsRef.value)
        ]
      } else {
        return format(
          value,
          mergedValueFormatRef.value,
          dateFnsOptionsRef.value
        )
      }
    }
    function doUpdatePendingValue (value: Value | null): void {
      pendingValueRef.value = value
    }
    function doUpdateFormattedValue (
      value: FormattedValue | null,
      timestampValue: Value | null
    ): void {
      const {
        'onUpdate:formattedValue': _onUpdateFormattedValue,
        onUpdateFormattedValue
      } = props
      if (_onUpdateFormattedValue) {
        call(
          _onUpdateFormattedValue as OnUpdateFormattedValueImpl,
          value,
          timestampValue
        )
      }
      if (onUpdateFormattedValue) {
        call(
          onUpdateFormattedValue as OnUpdateFormattedValueImpl,
          value,
          timestampValue
        )
      }
    }
    function setValuesOnConfirm (value: Value | null): void {
      if (value) {
        setInputRef(value)
      } else {
        clearInputRef()
      }
    }
    function hasConfirmAction (): boolean {
      return mergedActionsRef.value?.includes('confirm') ?? false
    }
    function setInputRef (value: any): void {
      if (props.formattedValue) {
        rangeStartInputOnConfirmValueRef.value = rangeStartInputValueRef.value
        rangeEndInputOnConfirmValueRef.value = rangeEndInputValueRef.value
        singleInputOnConfirmValueRef.value = singleInputValueRef.value
      } else {
        if (Array.isArray(value)) {
          rangeStartInputOnConfirmValueRef.value = value
            ? format(value[0], mergedFormatRef.value, dateFnsOptionsRef.value)
            : ''
          rangeEndInputOnConfirmValueRef.value = value
            ? format(value[1], mergedFormatRef.value, dateFnsOptionsRef.value)
            : ''
        } else {
          singleInputOnConfirmValueRef.value = value
            ? format(value, mergedFormatRef.value, dateFnsOptionsRef.value)
            : ''
        }
      }
    }
    function clearInputRef (): void {
      rangeStartInputOnConfirmValueRef.value = ''
      rangeEndInputOnConfirmValueRef.value = ''
      singleInputOnConfirmValueRef.value = ''
    }
    function doUpdateValue (
      value: Value | null,
      options: {
        doConfirm: boolean
      }
    ): void {
      const {
        'onUpdate:modelValue': _onUpdateModelValue,
        onUpdateModelValue,
        onChange
      } = props
      const { nTriggerFormChange, nTriggerFormInput } = formItem
      const formattedValue = getFormattedValue(value)
      setValuesOnConfirm(value)
      if (options.doConfirm) {
        doConfirm(value, formattedValue)
      }
      if (onUpdateModelValue) {
        call(
          onUpdateModelValue as OnUpdateModelValueImpl,
          value,
          formattedValue
        )
      }
      if (_onUpdateModelValue) {
        call(
          _onUpdateModelValue as OnUpdateModelValueImpl,
          value,
          formattedValue
        )
      }
      if (onChange) {
        call(onChange as OnUpdateModelValueImpl, value, formattedValue)
      }
      uncontrolledValueRef.value = value

      doUpdateFormattedValue(formattedValue, value)

      nTriggerFormChange()
      nTriggerFormInput()
    }
    function doClear (): void {
      const { onClear } = props
      onClear?.()
    }
    function doConfirm (
      value: Value | null,
      formattedValue: FormattedValue | null
    ): void {
      const { onConfirm } = props
      if (onConfirm) (onConfirm as OnConfirmImpl)(value, formattedValue)
    }
    function doFocus (e: FocusEvent): void {
      const { onFocus } = props
      const { nTriggerFormFocus } = formItem
      if (onFocus) call(onFocus, e)
      nTriggerFormFocus()
    }
    function doBlur (e: FocusEvent): void {
      const { onBlur } = props
      const { nTriggerFormBlur } = formItem
      if (onBlur) call(onBlur, e)
      nTriggerFormBlur()
    }
    function doUpdateShow (show: boolean): void {
      const { 'onUpdate:show': _onUpdateShow, onUpdateShow } = props
      if (_onUpdateShow) call(_onUpdateShow, show)
      if (onUpdateShow) call(onUpdateShow, show)
      uncontrolledShowRef.value = show
    }
    function handleKeydown (e: KeyboardEvent): void {
      if (e.key === 'Escape') {
        if (mergedShowRef.value) {
          markEventEffectPerformed(e)
          closeCalendar({
            returnFocus: true
          })
        }
      }
      // We need to handle the conflict with normal date value input
      // const { value: mergedValue } = mergedValueRef
      // if (props.type === 'date' && !Array.isArray(mergedValue)) {
      //   const nextValue = getDerivedTimeFromKeyboardEvent(mergedValue, e)
      //   doUpdateValue(nextValue)
      // }
    }
    function handleInputKeydown (e: KeyboardEvent): void {
      if (e.key === 'Escape' && mergedShowRef.value) {
        markEventEffectPerformed(e)
        // closeCalendar will be called in handleDeactivated
      }
    }
    function handleClear (): void {
      doUpdateShow(false)
      inputInstRef.value?.deactivate()
      doClear()
    }
    function handlePanelClear (): void {
      // close will be called inside panel
      inputInstRef.value?.deactivate()
      doClear()
    }
    function handlePanelTabOut (): void {
      closeCalendar({
        returnFocus: true
      })
    }
    function handleClickOutside (e: MouseEvent): void {
      if (
        panelInstRef.value?.$el.contains(
          getPreciseEventTarget(e) as Node | null
        )
      ) {
        return
      }
      if (
        mergedShowRef.value &&
        !triggerElRef.value?.contains(getPreciseEventTarget(e) as Node | null)
      ) {
        closeCalendar({
          returnFocus: false
        })
      }
    }
    function handlePanelClose (disableUpdateOnClose: boolean): void {
      closeCalendar({
        returnFocus: true,
        disableUpdateOnClose
      })
    }

    // --- Panel update value
    function handlePanelUpdateValue (
      value: Value | null,
      doUpdate: boolean
    ): void {
      if (doUpdate) {
        doUpdateValue(value, { doConfirm: false })
      } else {
        doUpdatePendingValue(value)
      }
    }
    function handlePanelConfirm (): void {
      const pendingValue = pendingValueRef.value
      doUpdateValue(
        Array.isArray(pendingValue)
          ? [pendingValue[0], pendingValue[1]]
          : pendingValue,
        { doConfirm: true }
      )
    }
    // --- Refresh
    function deriveInputState (): void {
      const { value } = pendingValueRef
      if (isRangeRef.value) {
        if (Array.isArray(value) || value === null) {
          deriveRangeInputState(value)
        }
      } else {
        if (!Array.isArray(value)) {
          deriveSingleInputState(value)
        }
      }
    }
    function deriveSingleInputState (value: number | null): void {
      if (value === null) {
        singleInputValueRef.value = ''
      } else {
        singleInputValueRef.value = format(
          value,
          mergedFormatRef.value,
          dateFnsOptionsRef.value
        )
      }
    }
    function deriveRangeInputState (values: [number, number] | null): void {
      if (values === null) {
        rangeStartInputValueRef.value = ''
        rangeEndInputValueRef.value = ''
      } else {
        const dateFnsOptions = dateFnsOptionsRef.value
        rangeStartInputValueRef.value = format(
          values[0],
          mergedFormatRef.value,
          dateFnsOptions
        )
        rangeEndInputValueRef.value = format(
          values[1],
          mergedFormatRef.value,
          dateFnsOptions
        )
      }
    }
    // --- Input deactivate & blur
    function handleInputActivate (): void {
      if (!mergedShowRef.value) {
        openCalendar()
      }
    }
    function handleInputBlur (e: FocusEvent): void {
      if (!panelInstRef.value?.$el.contains(e.relatedTarget as Node)) {
        doBlur(e)
        deriveInputState()
        closeCalendar({
          returnFocus: false
        })
      }
    }
    function handleInputDeactivate (): void {
      if (mergedDisabledRef.value) return
      deriveInputState()
      closeCalendar({
        returnFocus: false
      })
    }
    // --- Input
    function handleSingleUpdateValue (v: string): void {
      // TODO, fix conflict with clear
      if (v === '') {
        doUpdateValue(null, { doConfirm: false })
        pendingValueRef.value = null
        singleInputValueRef.value = ''
        return
      }
      const newSelectedDateTime = strictParse(
        v,
        mergedFormatRef.value,
        new Date(),
        dateFnsOptionsRef.value
      )
      if (isValid(newSelectedDateTime)) {
        doUpdateValue(getTime(newSelectedDateTime), { doConfirm: false })
        deriveInputState()
      } else {
        singleInputValueRef.value = v
      }
    }
    function handleRangeUpdateValue (v: [string, string]): void {
      if (v[0] === '' && v[1] === '') {
        // clear or just delete all the inputs
        doUpdateValue(null, { doConfirm: false })
        pendingValueRef.value = null
        rangeStartInputValueRef.value = ''
        rangeEndInputValueRef.value = ''
        return
      }
      const [startTime, endTime] = v
      const newStartTime = strictParse(
        startTime,
        mergedFormatRef.value,
        new Date(),
        dateFnsOptionsRef.value
      )
      const newEndTime = strictParse(
        endTime,
        mergedFormatRef.value,
        new Date(),
        dateFnsOptionsRef.value
      )
      if (isValid(newStartTime) && isValid(newEndTime)) {
        doUpdateValue([getTime(newStartTime), getTime(newEndTime)], {
          doConfirm: false
        })
        deriveInputState()
      } else {
        ;[rangeStartInputValueRef.value, rangeEndInputValueRef.value] = v
      }
    }
    // --- Click
    function handleTriggerClick (e: MouseEvent): void {
      if (mergedDisabledRef.value) return
      if (happensIn(e, 'clear')) return
      if (!mergedShowRef.value) {
        openCalendar()
      }
    }
    // --- Focus
    function handleInputFocus (e: FocusEvent): void {
      if (mergedDisabledRef.value) return
      doFocus(e)
    }
    // --- Calendar
    function openCalendar (): void {
      if (mergedDisabledRef.value || mergedShowRef.value) return
      doUpdateShow(true)
    }
    function closeCalendar ({
      returnFocus,
      disableUpdateOnClose
    }: {
      returnFocus: boolean
      disableUpdateOnClose?: boolean
    }): void {
      if (mergedShowRef.value) {
        doUpdateShow(false)
        if (
          props.type !== 'date' &&
          (props.updateValueOnClose || !hasConfirmAction()) &&
          !disableUpdateOnClose
        ) {
          handlePanelConfirm()
        }
        if (returnFocus) {
          inputInstRef.value?.focus()
        }
      }
    }
    // If new value is valid, set calendarTime and refresh display strings.
    // If new value is invalid, do nothing.
    watch(pendingValueRef, () => {
      deriveInputState()
    })
    // init
    deriveInputState()
    setInputRef(props.modelValue)
    watch(mergedShowRef, (value) => {
      if (!value) {
        // close & restore original value
        // it won't conflict with props.value change
        // since when prop is passed, it is already
        // up to date.
        pendingValueRef.value = mergedValueRef.value
      }
    })

    // use pending value to do validation
    const uniVaidation = uniCalendarValidation(props, pendingValueRef)
    const dualValidation = dualCalendarValidation(props, pendingValueRef)
    provide(datePickerInjectionKey, {
      mergedClsPrefixRef,
      mergedThemeRef: themeRef,
      timePickerSizeRef,
      localeRef,
      dateLocaleRef,
      firstDayOfWeekRef: toRef(props, 'firstDayOfWeek'),
      isDateDisabledRef: toRef(props, 'isDateDisabled'),
      rangesRef: toRef(props, 'ranges'),
      timePickerPropsRef: toRef(props, 'timePickerProps'),
      closeOnSelectRef: toRef(props, 'closeOnSelect'),
      updateValueOnCloseRef: toRef(props, 'updateValueOnClose'),
      ...uniVaidation,
      ...dualValidation,
      datePickerSlots: slots
    })

    const exposedMethods: DatePickerInst = {
      focus: () => {
        inputInstRef.value?.focus()
      },
      blur: () => {
        inputInstRef.value?.blur()
      }
    }

    const triggerCssVarsRef = computed(() => {
      const {
        common: { cubicBezierEaseInOut },
        self: { iconColor, iconColorDisabled }
      } = themeRef.value
      return {
        '--z-bezier': cubicBezierEaseInOut,
        '--z-icon-color-override': iconColor,
        '--z-icon-color-disabled-override': iconColorDisabled
      }
    })
    const triggerThemeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'date-picker-trigger',
        undefined,
        triggerCssVarsRef,
        props
      )
      : undefined

    const cssVarsRef = computed(() => {
      const { type } = props
      const {
        common: { cubicBezierEaseInOut },
        self: {
          calendarTitleFontSize,
          calendarDaysFontSize,
          itemFontSize,
          itemTextColor,
          itemColorDisabled,
          itemColorIncluded,
          itemColorHover,
          itemColorActive,
          itemBorderRadius,
          itemTextColorDisabled,
          itemTextColorActive,
          itemTextColorCurrent,
          panelColor,
          panelTextColor,
          arrowColor,
          calendarTitleTextColor,
          panelActionDividerColor,
          panelHeaderDividerColor,
          calendarDaysDividerColor,
          panelBoxShadow,
          panelBorderRadius,
          calendarTitleFontWeight,
          panelExtraFooterPadding,
          panelActionPadding,
          itemSize,
          itemCellWidth,
          itemCellHeight,
          scrollItemWidth,
          scrollItemHeight,
          calendarTitlePadding,
          calendarTitleHeight,
          calendarDaysHeight,
          calendarDaysTextColor,
          arrowSize,
          panelHeaderPadding,
          calendarDividerColor,
          calendarTitleGridTempateColumns,
          iconColor,
          iconColorDisabled,
          scrollItemBorderRadius,
          calendarTitleColorHover,
          shortcutItemColor,
          shortcutItemHoverColor,
          placeholderColor,
          [createKey('calendarLeftPadding', type)]: calendarLeftPadding,
          [createKey('calendarRightPadding', type)]: calendarRightPadding
        }
      } = themeRef.value

      return {
        '--z-bezier': cubicBezierEaseInOut,

        '--z-panel-border-radius': panelBorderRadius,
        '--z-panel-color': panelColor,
        '--z-panel-box-shadow': panelBoxShadow,
        '--z-panel-text-color': panelTextColor,

        // panel header
        '--z-panel-header-padding': panelHeaderPadding,
        '--z-panel-header-divider-color': panelHeaderDividerColor,

        // panel calendar
        '--z-calendar-left-padding': calendarLeftPadding,
        '--z-calendar-right-padding': calendarRightPadding,
        '--z-calendar-title-color-hover': calendarTitleColorHover,
        '--z-calendar-title-height': calendarTitleHeight,
        '--z-calendar-title-padding': calendarTitlePadding,
        '--z-calendar-title-font-size': calendarTitleFontSize,
        '--z-calendar-title-font-weight': calendarTitleFontWeight,
        '--z-calendar-title-text-color': calendarTitleTextColor,
        '--z-calendar-title-grid-template-columns':
          calendarTitleGridTempateColumns,
        '--z-calendar-days-height': calendarDaysHeight,
        '--z-calendar-days-divider-color': calendarDaysDividerColor,
        '--z-calendar-days-font-size': calendarDaysFontSize,
        '--z-calendar-days-text-color': calendarDaysTextColor,
        '--z-calendar-divider-color': calendarDividerColor,

        // panel action
        '--z-panel-action-padding': panelActionPadding,
        '--z-panel-extra-footer-padding': panelExtraFooterPadding,
        '--z-panel-action-divider-color': panelActionDividerColor,
        '--z-panel-shortcut-item-color': shortcutItemColor,
        '--z-panel-shortcut-item-hover-color': shortcutItemHoverColor,

        '--z-placeholder-color': placeholderColor,

        // panel item
        '--z-item-font-size': itemFontSize,
        '--z-item-border-radius': itemBorderRadius,
        '--z-item-size': itemSize,
        '--z-item-cell-width': itemCellWidth,
        '--z-item-cell-height': itemCellHeight,
        '--z-item-text-color': itemTextColor,
        '--z-item-color-included': itemColorIncluded,
        '--z-item-color-disabled': itemColorDisabled,
        '--z-item-color-hover': itemColorHover,
        '--z-item-color-active': itemColorActive,
        '--z-item-text-color-disabled': itemTextColorDisabled,
        '--z-item-text-color-active': itemTextColorActive,
        '--z-item-current-text-color': itemTextColorCurrent,

        // scroll item
        '--z-scroll-item-width': scrollItemWidth,
        '--z-scroll-item-height': scrollItemHeight,
        '--z-scroll-item-border-radius': scrollItemBorderRadius,

        // panel arrow
        '--z-arrow-size': arrowSize,
        '--z-arrow-color': arrowColor,

        // icon in trigger
        '--z-icon-color': iconColor,
        '--z-icon-color-disabled': iconColorDisabled
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'date-picker',
        computed(() => {
          return props.type
        }),
        cssVarsRef,
        props
      )
      : undefined

    return {
      ...exposedMethods,
      mergedStatus: mergedStatusRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedBordered: mergedBorderedRef,
      namespace: namespaceRef,
      uncontrolledValue: uncontrolledValueRef,
      pendingValue: pendingValueRef,
      panelInstRef,
      triggerElRef,
      inputInstRef,
      isMounted: useIsMounted(),
      displayTime: hasConfirmAction()
        ? singleInputOnConfirmValueRef
        : singleInputValueRef,
      displayStartTime: hasConfirmAction()
        ? rangeStartInputOnConfirmValueRef
        : rangeStartInputValueRef,
      displayEndTime: hasConfirmAction()
        ? rangeEndInputOnConfirmValueRef
        : rangeEndInputValueRef,
      mergedShow: mergedShowRef,
      adjustedTo: useAdjustedTo(props),
      isRange: isRangeRef,
      localizedStartPlaceholder: localizedStartPlaceholderRef,
      localizedEndPlaceholder: localizedEndPlaceholderRef,
      mergedSize: mergedSizeRef,
      mergedDisabled: mergedDisabledRef,
      localizedPlacehoder: localizedPlacehoderRef,
      isValueInvalid: uniVaidation.isValueInvalidRef,
      isStartValueInvalid: dualValidation.isStartValueInvalidRef,
      isEndValueInvalid: dualValidation.isEndValueInvalidRef,
      handleInputKeydown,
      handleClickOutside,
      handleKeydown,
      handleClear,
      handlePanelClear,
      handleTriggerClick,
      handleInputActivate,
      handleInputDeactivate,
      handleInputFocus,
      handleInputBlur,
      handlePanelTabOut,
      handlePanelClose,
      handleRangeUpdateValue,
      handleSingleUpdateValue,
      handlePanelUpdateValue,
      handlePanelConfirm,
      mergedTheme: themeRef,
      actions: mergedActionsRef,
      shortcuts: mergedShortcutRef,
      triggerCssVars: inlineThemeDisabled ? undefined : triggerCssVarsRef,
      triggerThemeClass: triggerThemeClassHandle?.themeClass,
      triggerOnRender: triggerThemeClassHandle?.onRender,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    const { clearable, triggerOnRender, mergedClsPrefix, $slots } = this
    const commonPanelProps = {
      onUpdateValue: this.handlePanelUpdateValue,
      onTabOut: this.handlePanelTabOut,
      onClose: this.handlePanelClose,
      onClear: this.handlePanelClear,
      onKeydown: this.handleKeydown,
      onConfirm: this.handlePanelConfirm,
      ref: 'panelInstRef',
      value: this.pendingValue,
      active: this.mergedShow,
      actions: this.actions,
      shortcuts: this.shortcuts,
      style: this.cssVars as CSSProperties,
      defaultTime: this.defaultTime,
      themeClass: this.themeClass,
      panel: this.panel,
      showShortcuts: this.showShortcuts,
      onRender: this.onRender,
      minYear: this.minYear,
      maxYear: this.maxYear
    }
    const renderPanel = (): VNode => {
      const { type } = this
      return type === 'datetime' ? (
        <DatetimePanel {...commonPanelProps}>{$slots}</DatetimePanel>
      ) : type === 'daterange' ? (
        <DaterangePanel
          {...commonPanelProps}
          defaultCalendarStartTime={this.defaultCalendarStartTime}
          defaultCalendarEndTime={this.defaultCalendarEndTime}
          bindCalendarMonths={this.bindCalendarMonths}
        >
          {$slots}
        </DaterangePanel>
      ) : type === 'datetimerange' ? (
        <DatetimerangePanel
          {...commonPanelProps}
          defaultCalendarStartTime={this.defaultCalendarStartTime}
          defaultCalendarEndTime={this.defaultCalendarEndTime}
          bindCalendarMonths={this.bindCalendarMonths}
        >
          {$slots}
        </DatetimerangePanel>
      ) : type === 'month' || type === 'year' || type === 'quarter' ? (
        <MonthPanel {...commonPanelProps} type={type} key={type} />
      ) : type === 'monthrange' ||
        type === 'yearrange' ||
        type === 'quarterrange' ? (
        <MonthRangePanel {...commonPanelProps} type={type} />
          ) : (
        <DatePanel {...commonPanelProps}>{$slots}</DatePanel>
          )
    }
    if (this.panel) {
      return renderPanel()
    }
    triggerOnRender?.()
    const commonInputProps: InputProps = {
      bordered: this.mergedBordered,
      size: this.mergedSize,
      passivelyActivated: true,
      disabled: this.mergedDisabled,
      readonly: this.inputReadonly || this.mergedDisabled,
      clearable,
      onClear: this.handleClear,
      onClick: this.handleTriggerClick,
      onKeydown: this.handleInputKeydown,
      onActivate: this.handleInputActivate,
      onDeactivate: this.handleInputDeactivate,
      onFocus: this.handleInputFocus,
      onBlur: this.handleInputBlur
    }
    return (
      <div
        ref="triggerElRef"
        class={[
          `${mergedClsPrefix}-date-picker`,
          this.mergedDisabled && `${mergedClsPrefix}-date-picker--disabled`,
          this.isRange && `${mergedClsPrefix}-date-picker--range`,
          this.triggerThemeClass
        ]}
        style={this.triggerCssVars as CSSProperties}
        onKeydown={this.handleKeydown}
      >
        <VBinder>
          {{
            default: () => [
              <VTarget>
                {{
                  default: () =>
                    this.isRange ? (
                      <ZInput
                        ref="inputInstRef"
                        status={this.mergedStatus}
                        modelValue={[
                          this.displayStartTime,
                          this.displayEndTime
                        ]}
                        placeholder={[
                          this.localizedStartPlaceholder,
                          this.localizedEndPlaceholder
                        ]}
                        textDecoration={[
                          this.isStartValueInvalid ? 'line-through' : '',
                          this.isEndValueInvalid ? 'line-through' : ''
                        ]}
                        pair
                        onUpdateModelValue={this.handleRangeUpdateValue}
                        theme={this.mergedTheme.peers.Input}
                        themeOverrides={this.mergedTheme.peerOverrides.Input}
                        internalForceFocus={this.mergedShow}
                        internalDeactivateOnEnter
                        {...commonInputProps}
                      >
                        {{
                          separator: () =>
                            this.separator === undefined
                              ? resolveSlot($slots.separator, () => [
                                  <ZBaseIcon
                                    clsPrefix={mergedClsPrefix}
                                    class={`${mergedClsPrefix}-date-picker-icon`}
                                  >
                                    {{
                                      default: () => <ToIcon />
                                    }}
                                  </ZBaseIcon>
                              ])
                              : this.separator,
                          [clearable ? 'clear-icon-placeholder' : 'suffix']:
                            () =>
                              resolveSlot($slots['date-icon'], () => [
                                <ZBaseIcon
                                  clsPrefix={mergedClsPrefix}
                                  class={`${mergedClsPrefix}-date-picker-icon`}
                                >
                                  {{
                                    default: () => <DateIcon />
                                  }}
                                </ZBaseIcon>
                              ])
                        }}
                      </ZInput>
                    ) : (
                      <ZInput
                        ref="inputInstRef"
                        status={this.mergedStatus}
                        modelValue={this.displayTime}
                        placeholder={this.localizedPlacehoder}
                        textDecoration={
                          this.isValueInvalid && !this.isRange
                            ? 'line-through'
                            : ''
                        }
                        onUpdateModelValue={this.handleSingleUpdateValue}
                        theme={this.mergedTheme.peers.Input}
                        themeOverrides={this.mergedTheme.peerOverrides.Input}
                        internalForceFocus={this.mergedShow}
                        internalDeactivateOnEnter
                        {...commonInputProps}
                      >
                        {{
                          [clearable ? 'clear-icon-placeholder' : 'suffix']:
                            () => (
                              <ZBaseIcon
                                clsPrefix={mergedClsPrefix}
                                class={`${mergedClsPrefix}-date-picker-icon`}
                              >
                                {{
                                  default: () =>
                                    resolveSlot($slots['date-icon'], () => [
                                      <DateIcon />
                                    ])
                                }}
                              </ZBaseIcon>
                            )
                        }}
                      </ZInput>
                    )
                }}
              </VTarget>,
              <VFollower
                show={this.mergedShow}
                containerClass={this.namespace}
                to={this.adjustedTo}
                teleportDisabled={this.adjustedTo === useAdjustedTo.tdkey}
                placement={this.placement}
              >
                {{
                  default: () => (
                    <Transition
                      name="fade-in-scale-up-transition"
                      appear={this.isMounted}
                    >
                      {{
                        default: () => {
                          if (!this.mergedShow) return null
                          return withDirectives(renderPanel(), [
                            [
                              clickoutside,
                              this.handleClickOutside,
                              undefined as unknown as string,
                              { capture: true }
                            ]
                          ])
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
