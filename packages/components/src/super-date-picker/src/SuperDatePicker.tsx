import {
  h,
  ref,
  computed,
  defineComponent,
  type PropType,
  type CSSProperties,
  watch,
  onBeforeMount
} from 'vue'
import { format, startOfDay, startOfMonth, startOfYear } from 'date-fns'
import { call } from '../../_utils'
import type { ExtractPublicPropTypes, MaybeArray } from '../../_utils'
import { useConfig, useLocale } from '../../_mixins'
import { ZDatePicker } from '../../date-picker'
import { ZButton } from '../../button'
import { ZSpace } from '../../space'
import { ZCard } from '../../card'
import { ZText, ZP } from '../../typography'
import { ZPopover } from '../../popover'
import { ZInput } from '../../input'
import { ZTabs, ZTabPane } from '../../tabs'
import { ZSelect } from '../../select'
import { ZSwitch } from '../../switch'
import { ZDivider } from '../../divider'
import style from './styles/index.cssr'

export const superDatePickerProps = {
  value: Number as PropType<number | null>,
  defaultValue: Number as PropType<number | null>,
  placeholder: {
    type: String,
    default: undefined
  },
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: 'medium'
  },
  disabled: Boolean,
  clearable: {
    type: Boolean,
    default: true
  },
  format: {
    type: String,
    default: 'dd-MMM-yyyy'
  },
  displayFormat: {
    type: String,
    default: 'dd-MMM-yyyy'
  },
  type: {
    type: String as PropType<'date' | 'datetime'>,
    default: 'date'
  },
  bordered: {
    type: Boolean,
    default: true
  },
  readonly: Boolean,
  showAbsolute: {
    type: Boolean,
    default: true
  },
  showRelative: {
    type: Boolean,
    default: true
  },
  showNow: {
    type: Boolean,
    default: true
  },
  defaultTab: {
    type: String as PropType<'absolute' | 'relative' | 'now'>,
    default: 'absolute'
  },
  roundToDay: {
    type: Boolean,
    default: false
  },
  // Date Picker specific props for absolute tab
  firstDayOfWeek: Number as PropType<0 | 1 | 2 | 3 | 4 | 5 | 6>,
  timePickerProps: Object as PropType<any>,
  'onUpdate:value': [Function, Array] as PropType<
  MaybeArray<(value: number | null) => void>
  >,
  onChange: [Function, Array] as PropType<
  MaybeArray<(value: number | null) => void>
  >
} as const

export type SuperDatePickerProps = ExtractPublicPropTypes<
  typeof superDatePickerProps
>

export default defineComponent({
  name: 'SuperDatePicker',
  props: superDatePickerProps,
  setup (props, { emit }) {
    const { mergedClsPrefixRef } = useConfig(props)
    const { localeRef } = useLocale('SuperDatePicker')

    // Mount CSS styles
    onBeforeMount(() => {
      if (typeof document !== 'undefined') {
        style.mount({
          id: 'z-super-date-picker',
          head: true
        })
      }
    })

    const showRef = ref(false)
    const activeTabRef = ref(props.defaultTab)
    const localValueRef = ref<number | null>(
      props.value ?? props.defaultValue ?? null
    )
    const roundToDayRef = ref(props.roundToDay)
    const timeInputRef = ref('10:00 AM')
    const intervalNumberRef = ref(0)
    const intervalUnitRef = ref(4) // Default to "Days ago"
    const relativeInputTextRef = ref(1)
    const absoluteDateRef = ref<Date | null>(null)
    const absoluteTimeRef = ref<Date | null>(null)
    const disabledPickerRenderKeyRef = ref(0)

    // Interval options for the dropdowns
    const intervalOptions = computed(() => [
      { id: 1, value: -1, name: localeRef.value.intervals.secondsAgo },
      { id: 2, value: -60, name: localeRef.value.intervals.minutesAgo },
      { id: 3, value: -60 * 60, name: localeRef.value.intervals.hoursAgo },
      { id: 4, value: -60 * 60 * 24, name: localeRef.value.intervals.daysAgo },
      {
        id: 5,
        value: -60 * 60 * 24 * 7,
        name: localeRef.value.intervals.weeksAgo
      },
      { id: 6, value: -2592000, name: localeRef.value.intervals.monthsAgo },
      { id: 7, value: -31536000, name: localeRef.value.intervals.yearsAgo },
      { id: 8, value: 1, name: localeRef.value.intervals.secondsFromNow },
      { id: 9, value: 60, name: localeRef.value.intervals.minutesFromNow },
      { id: 10, value: 60 * 60, name: localeRef.value.intervals.hoursFromNow },
      {
        id: 11,
        value: 60 * 60 * 24,
        name: localeRef.value.intervals.daysFromNow
      },
      {
        id: 12,
        value: 60 * 60 * 24 * 7,
        name: localeRef.value.intervals.weeksFromNow
      },
      { id: 13, value: 2592000, name: localeRef.value.intervals.monthsFromNow },
      { id: 14, value: 31536000, name: localeRef.value.intervals.yearsFromNow }
    ])

    // Watch for external value changes
    watch(
      () => props.value,
      (newValue) => {
        localValueRef.value = newValue ?? null
      },
      { immediate: true }
    )

    // Watch localValue changes to update disabled date/time pickers in absolute tab
    watch(
      localValueRef,
      (newValue) => {
        // Increment render key to force re-render of disabled picker
        disabledPickerRenderKeyRef.value++

        if (newValue) {
          const date = new Date(newValue)
          absoluteDateRef.value = date
          absoluteTimeRef.value = date
        } else {
          absoluteDateRef.value = null
          absoluteTimeRef.value = null
        }
      },
      { immediate: true }
    )

    // Watch activeTab changes to calculate relative date when switching to relative tab
    watch(
      activeTabRef,
      (newTab) => {
        if (newTab === 'relative') {
          calculateRelativeDate()
        }
      },
      { immediate: true }
    )

    const mergedPlaceholder = computed(() => {
      return props.placeholder ?? localeRef.value.placeholder
    })

    // Computed value for the disabled date picker to ensure reactivity
    const disabledPickerValue = computed(() => {
      // Return the exact same value for proper reactivity
      if (localValueRef.value === null || localValueRef.value === undefined) {
        return null
      }

      // For single dates, return as-is
      return localValueRef.value
    })

    // Computed key for forcing re-render of disabled picker
    const disabledPickerKey = computed(() => {
      return `${JSON.stringify(localValueRef.value)}_${props.type}_${
        disabledPickerRenderKeyRef.value
      }`
    })

    // Computed value for the disabled date picker in relative tab
    const relativeDisabledPickerValue = computed(() => {
      if (localValueRef.value === null || localValueRef.value === undefined) {
        return null
      }

      // For single dates, return as-is
      return localValueRef.value
    })

    // Computed property for dynamic round text based on selected interval unit
    const roundToUnitText = computed(() => {
      const unit = intervalOptions.value.find(
        (opt) => opt.id === intervalUnitRef.value
      )
      if (!unit) return localeRef.value.switches.roundToDay

      // Extract the unit type from the interval name and return localized text
      if (unit.name.toLowerCase().includes('second')) {
        return localeRef.value.switches.roundToSecond
      } else if (unit.name.toLowerCase().includes('minute')) {
        return localeRef.value.switches.roundToMinute
      } else if (unit.name.toLowerCase().includes('hour')) {
        return localeRef.value.switches.roundToHour
      } else if (unit.name.toLowerCase().includes('day')) {
        return localeRef.value.switches.roundToDay
      } else if (unit.name.toLowerCase().includes('week')) {
        return localeRef.value.switches.roundToWeek
      } else if (unit.name.toLowerCase().includes('month')) {
        return localeRef.value.switches.roundToMonth
      } else if (unit.name.toLowerCase().includes('year')) {
        return localeRef.value.switches.roundToYear
      }

      return localeRef.value.switches.roundToDay // fallback
    })

    // Format display value using design system tokens
    const displayValueRef = computed(() => {
      if (!localValueRef.value) return ''

      // For single date types, show the date
      if (typeof localValueRef.value === 'number') {
        return format(new Date(localValueRef.value), props.displayFormat)
      }

      return ''
    })

    function handleDatePickerChange (value: number | null): void {
      localValueRef.value = value

      // Emit updates following MCP rules
      if (props['onUpdate:value']) call(props['onUpdate:value'], value)
      if (props.onChange) call(props.onChange, value)
      emit('update:value', value)
      emit('change', value)
    }

    function handleTriggerClick (): void {
      if (!props.disabled && !props.readonly) {
        showRef.value = !showRef.value
      }
    }

    function handleClickOutside (): void {
      showRef.value = false
    }

    function handleClear (): void {
      localValueRef.value = null

      if (props['onUpdate:value']) call(props['onUpdate:value'], null)
      if (props.onChange) call(props.onChange, null)
      emit('update:value', null)
      emit('change', null)
    }

    function handleApply (): void {
      showRef.value = false
    }

    function handleCancel (): void {
      showRef.value = false
    }

    function handleRelativeInputChange (value: string): void {
      const numValue = parseInt(value, 10) || 1
      relativeInputTextRef.value = numValue
      calculateRelativeDate()
    }

    function handleIntervalNumberChange (value: number): void {
      intervalNumberRef.value = value
      calculateRelativeDate()
    }

    function handleIntervalNumberInputChange (value: string): void {
      // Only allow digits
      const digitsOnly = value.replace(/\D/g, '')
      const numValue = digitsOnly ? parseInt(digitsOnly, 10) : 0

      // Update the interval number if it's a valid positive number
      if (numValue > 0) {
        intervalNumberRef.value = numValue
        calculateRelativeDate()
      } else if (digitsOnly === '') {
        // Allow empty state and reset the date value
        intervalNumberRef.value = 0
        localValueRef.value = null

        // Emit updates following MCP rules
        if (props['onUpdate:value']) {
          call(props['onUpdate:value'], null)
        }
        if (props.onChange) call(props.onChange, null)
        emit('update:value', null)
        emit('change', null)
      }
    }

    function handleRelativeUnitChange (unitId: number): void {
      intervalUnitRef.value = unitId
      calculateRelativeDate()
    }

    function handleRoundToDayChange (value: boolean): void {
      roundToDayRef.value = value
      calculateRelativeDate()
    }

    function calculateRelativeDate (): void {
      // If interval number is 0 or empty, don't calculate anything
      if (intervalNumberRef.value <= 0) {
        return
      }

      const now = Date.now()
      const unit = intervalOptions.value.find(
        (opt) => opt.id === intervalUnitRef.value
      )
      if (unit) {
        const expectedTime = now + 1000 * intervalNumberRef.value * unit.value
        const calculatedDate = new Date(expectedTime)

        if (roundToDayRef.value) {
          // Round down to the start of the time unit based on the selected interval
          let calculatedTime: number

          if (unit.name.toLowerCase().includes('second')) {
            // Round down to the start of the current second
            const roundedDate = new Date(calculatedDate)
            roundedDate.setMilliseconds(0)
            calculatedTime = roundedDate.getTime()
          } else if (unit.name.toLowerCase().includes('minute')) {
            // Round down to the start of the current minute
            const roundedDate = new Date(calculatedDate)
            roundedDate.setSeconds(0, 0)
            calculatedTime = roundedDate.getTime()
          } else if (unit.name.toLowerCase().includes('hour')) {
            // Round down to the start of the hour
            const roundedDate = new Date(calculatedDate)
            roundedDate.setMinutes(0, 0, 0)
            calculatedTime = roundedDate.getTime()
          } else if (unit.name.toLowerCase().includes('day')) {
            // Round to start of the day
            calculatedTime = startOfDay(calculatedDate).getTime()
          } else if (unit.name.toLowerCase().includes('week')) {
            // Round to the start of the week (Monday)
            const startDate = new Date(calculatedDate)
            const dayOfWeek = startDate.getDay()
            const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1 // Sunday is 0, Monday is 1
            startDate.setDate(startDate.getDate() - daysToMonday)
            calculatedTime = startOfDay(startDate).getTime()
          } else if (unit.name.toLowerCase().includes('month')) {
            // Start of the current month
            calculatedTime = startOfMonth(calculatedDate).getTime()
          } else if (unit.name.toLowerCase().includes('year')) {
            // Start of the current year
            calculatedTime = startOfYear(calculatedDate).getTime()
          } else {
            // Default fallback to start of day
            calculatedTime = startOfDay(calculatedDate).getTime()
          }

          // Use the calculated time for single date types
          localValueRef.value = calculatedTime
        } else {
          // Without rounding, use the calculated time
          localValueRef.value = expectedTime
        }

        // Emit updates following MCP rules
        if (props['onUpdate:value']) {
          call(props['onUpdate:value'], localValueRef.value)
        }
        if (props.onChange) call(props.onChange, localValueRef.value)
        emit('update:value', localValueRef.value)
        emit('change', localValueRef.value)
      }
    }

    function formatDisabledValue (date: Date | number | null): string {
      if (date && !isNaN(Number(date))) {
        return format(new Date(date), props.displayFormat)
      }
      return format(new Date(), props.displayFormat)
    }

    function handleAbsoluteDateChange (value: number | null): void {
      absoluteDateRef.value = value ? new Date(value) : null
      updateAbsoluteValue()
    }

    function handleAbsoluteTimeChange (value: number | null): void {
      absoluteTimeRef.value = value ? new Date(value) : null
      updateAbsoluteValue()
    }

    function updateAbsoluteValue (): void {
      if (absoluteDateRef.value) {
        const resultDate = new Date(absoluteDateRef.value)

        if (absoluteTimeRef.value) {
          const timeDate = new Date(absoluteTimeRef.value)
          resultDate.setHours(
            timeDate.getHours(),
            timeDate.getMinutes(),
            timeDate.getSeconds()
          )
        }

        if (roundToDayRef.value) {
          // For single date types, use start of day
          localValueRef.value = startOfDay(resultDate).getTime()
        } else {
          // For single date types, use the timestamp directly
          localValueRef.value = resultDate.getTime()
        }
      }
    }
    function handleNowClick (): void {
      const now = Date.now()

      localValueRef.value = now
      if (props['onUpdate:value']) call(props['onUpdate:value'], now)
      if (props.onChange) call(props.onChange, now)
      emit('update:value', now)
      emit('change', now)

      // Close popover after setting now
      showRef.value = false
    }

    return {
      mergedClsPrefix: mergedClsPrefixRef,
      locale: localeRef,
      mergedPlaceholder,
      localValue: localValueRef,
      disabledPickerValue,
      relativeDisabledPickerValue,
      disabledPickerKey,
      roundToUnitText,
      displayValue: displayValueRef,
      activeTab: activeTabRef,
      roundToDay: roundToDayRef,
      timeInput: timeInputRef,
      intervalNumber: intervalNumberRef,
      intervalUnit: intervalUnitRef,
      intervalOptions,
      relativeInputText: relativeInputTextRef,
      absoluteDate: absoluteDateRef,
      absoluteTime: absoluteTimeRef,
      show: showRef,
      handleDatePickerChange,
      handleTriggerClick,
      handleClickOutside,
      handleClear,
      handleApply,
      handleCancel,
      handleNowClick,
      handleRelativeInputChange,
      handleIntervalNumberChange,
      handleIntervalNumberInputChange,
      handleRelativeUnitChange,
      handleRoundToDayChange,
      handleAbsoluteDateChange,
      handleAbsoluteTimeChange,
      formatDisabledValue
    }
  },

  render () {
    const { mergedClsPrefix } = this
    const { showAbsolute, showRelative, showNow } = this.$props
    return (
      <div class={`${mergedClsPrefix}-super-date-picker`}>
        <ZPopover
          show={this.show}
          trigger="manual"
          placement="bottom-start"
          displayDirective="show"
          onClickoutside={this.handleClickOutside}
        >
          {{
            trigger: () => (
              <ZInput
                modelValue={this.displayValue}
                placeholder={this.mergedPlaceholder}
                size={this.size}
                disabled={this.disabled}
                readonly
                clearable={this.clearable && !!this.localValue}
                bordered={this.bordered}
                onClick={this.handleTriggerClick}
                onClear={this.handleClear}
              />
            ),
            default: () => (
              <ZCard
                size="small"
                bordered={false}
                class={`${mergedClsPrefix}-super-date-picker__card`}
              >
                <ZTabs
                  modelValue={this.activeTab}
                  onUpdateModelValue={(value) => {
                    this.activeTab = value
                  }}
                  variant="line"
                  size="medium"
                  class={`${mergedClsPrefix}-super-date-picker__tabs`}
                >
                  {showAbsolute && (
                    <ZTabPane name="absolute" tab={this.locale.tabs.absolute}>
                      <div
                        class={`${mergedClsPrefix}-super-date-picker__tab-content`}
                      >
                        {/* Date Picker Panel with built-in controls */}
                        <div
                          class={`${mergedClsPrefix}-super-date-picker__date-picker-panel`}
                        >
                          <div
                            class={`${mergedClsPrefix}-super-date-picker__date-picker-row`}
                          >
                            <ZDatePicker
                              key={this.disabledPickerKey}
                              modelValue={this.disabledPickerValue}
                              size={this.size}
                              type={this.type}
                              format={this.format}
                              placeholder={this.format}
                              disabled={true}
                              inputReadonly={true}
                              clearable={false}
                              bordered={this.bordered}
                              class={`${mergedClsPrefix}-super-date-picker__date-picker`}
                            />
                          </div>
                          <ZDatePicker
                            modelValue={this.localValue}
                            size={this.size}
                            type={this.type}
                            format={this.format}
                            clearable={this.clearable}
                            bordered={this.bordered}
                            firstDayOfWeek={this.firstDayOfWeek}
                            timePickerProps={this.timePickerProps}
                            panel
                            onUpdateModelValue={this.handleDatePickerChange}
                            onConfirm={this.handleApply}
                            onClear={this.handleClear}
                          />
                        </div>

                        {/* Disabled Date and Time Picker Section */}
                      </div>
                    </ZTabPane>
                  )}

                  {showRelative && (
                    <ZTabPane name="relative" tab={this.locale.tabs.relative}>
                      <div
                        class={`${mergedClsPrefix}-super-date-picker__tab-content`}
                      >
                        {/* Dropdown Section for Number and Interval */}
                        <ZSpace vertical size="medium">
                          <div
                            class={`${mergedClsPrefix}-super-date-picker__dropdown-row`}
                          >
                            <ZInput
                              modelValue={
                                this.intervalNumber > 0
                                  ? this.intervalNumber.toString()
                                  : ''
                              }
                              onUpdateModelValue={
                                this.handleIntervalNumberInputChange
                              }
                              size={this.size}
                              placeholder={this.locale.placeholders.number}
                              class={`${mergedClsPrefix}-super-date-picker__number-select`}
                              type="text"
                              onInput={(value: string) => {
                                // Prevent non-digit characters from being typed
                                const digitsOnly = value.replace(/\D/g, '')
                                if (value !== digitsOnly) {
                                  // If non-digits were typed, update with digits only
                                  this.handleIntervalNumberInputChange(
                                    digitsOnly
                                  )
                                }
                              }}
                            />
                            <ZSelect
                              modelValue={this.intervalUnit}
                              onUpdateModelValue={this.handleRelativeUnitChange}
                              size={this.size}
                              placeholder={this.locale.placeholders.interval}
                              class={`${mergedClsPrefix}-super-date-picker__interval-select`}
                              options={this.intervalOptions.map((option) => ({
                                label: option.name,
                                value: option.id
                              }))}
                            />
                          </div>
                        </ZSpace>

                        {/* Switch Section - Round to unit as a switch */}
                        <div
                          class={`${mergedClsPrefix}-super-date-picker__switch-row`}
                        >
                          <ZSwitch
                            modelValue={this.roundToDay}
                            onUpdateModelValue={this.handleRoundToDayChange}
                            size="medium"
                          />
                          <ZText
                            class={`${mergedClsPrefix}-super-date-picker__switch-label`}
                          >
                            {this.roundToUnitText}
                          </ZText>
                        </div>

                        {/* Read-only Date and Time Picker Section */}
                        <ZSpace vertical size="medium">
                          <div
                            class={`${mergedClsPrefix}-super-date-picker__date-picker-row`}
                          >
                            <ZDatePicker
                              key={this.disabledPickerKey + '_relative'}
                              modelValue={this.relativeDisabledPickerValue}
                              size={this.size}
                              type="datetime"
                              format={'dd-MMM-yyyy HH:mm:ss.SSS'}
                              disabled={true}
                              inputReadonly={true}
                              clearable={false}
                              bordered={this.bordered}
                              placeholder={
                                this.locale.placeholders.datePlaceholder
                              }
                              class={`${mergedClsPrefix}-super-date-picker__date-picker`}
                            />
                          </div>
                        </ZSpace>
                        {/* Divider above buttons */}
                        <ZDivider
                          style={
                            {
                              marginTop: '0',
                              marginBottom: '0'
                            } satisfies CSSProperties
                          }
                        />
                        {/* Button Section - Positioned at bottom */}
                        <div
                          class={`${mergedClsPrefix}-super-date-picker__button-row`}
                        >
                          <ZButton
                            size="medium"
                            onClick={this.handleApply}
                            color="primary"
                            variant="filled"
                            class={`${mergedClsPrefix}-super-date-picker__apply-button`}
                          >
                            {this.locale.buttons.apply}
                          </ZButton>
                          <ZButton
                            size="medium"
                            onClick={this.handleCancel}
                            color="neutral"
                            variant="outlined"
                            class={`${mergedClsPrefix}-super-date-picker__cancel-button`}
                          >
                            {this.locale.buttons.cancel}
                          </ZButton>
                        </div>
                      </div>
                    </ZTabPane>
                  )}

                  {showNow && (
                    <ZTabPane name="now" tab={this.locale.tabs.now}>
                      <div
                        class={`${mergedClsPrefix}-super-date-picker__tab-content`}
                      >
                        <ZP
                          variant="2-r"
                          class={`${mergedClsPrefix}-super-date-picker__now-description`}
                        >
                          {this.locale.nowDescription}
                        </ZP>

                        <ZButton
                          size="medium"
                          onClick={this.handleNowClick}
                          color="primary"
                          variant="filled"
                          class={`${mergedClsPrefix}-super-date-picker__now-button`}
                        >
                          {this.locale.buttons.setNow}
                        </ZButton>
                      </div>
                    </ZTabPane>
                  )}
                </ZTabs>
              </ZCard>
            )
          }}
        </ZPopover>
      </div>
    )
  }
})
