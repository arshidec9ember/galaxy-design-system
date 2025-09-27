import {
  computed,
  defineComponent,
  h,
  ref,
  type PropType,
  type CSSProperties,
  Fragment,
  toRef
} from 'vue'
import {
  format,
  getYear,
  addMonths,
  startOfDay,
  startOfMonth,
  getMonth
} from 'date-fns/esm'
import { useMergedState } from '../../_external-dependencies/vooks'
import { dateArray } from '../../date-picker/src/utils'
import { ChevronLeftIcon, ChevronRightIcon } from '../../_internal/icons'
import { ZBaseIcon } from '../../_internal'
import { call, resolveSlotWithProps } from '../../_utils'
import type { ExtractPublicPropTypes, MaybeArray } from '../../_utils'
import { ZButton } from '../../button'
import { ZButtonGroup } from '../../button-group'
import { useConfig, useLocale, useTheme, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { calendarLight } from '../styles'
import type { CalendarTheme } from '../styles'
import type { OnUpdateModelValue, DateItem, OnPanelChange } from './interface'
import style from './styles/index.cssr'

export const calendarProps = {
  ...(useTheme.props as ThemeProps<CalendarTheme>),
  isDateDisabled: Function as PropType<(date: number) => boolean | undefined>,
  modelValue: Number,
  defaultModelValue: {
    type: Number as PropType<number | null>,
    default: null
  },
  onPanelChange: Function as PropType<OnPanelChange>,
  'onUpdate:modelValue': [Function, Array] as PropType<
  MaybeArray<OnUpdateModelValue>
  >,
  onUpdateModelValue: [Function, Array] as PropType<
  MaybeArray<OnUpdateModelValue>
  >
} as const

export type CalendarProps = ExtractPublicPropTypes<typeof calendarProps>

export default defineComponent({
  name: 'Calendar',
  props: calendarProps,
  setup (props) {
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
    const themeRef = useTheme(
      'Calendar',
      '-calendar',
      style,
      calendarLight,
      props,
      mergedClsPrefixRef
    )
    const { localeRef, dateLocaleRef } = useLocale('DatePicker')
    const now = Date.now()
    // ts => timestamp
    const monthTsRef = ref(
      startOfMonth(props.defaultModelValue ?? now).valueOf()
    )
    const uncontrolledValueRef = ref<number | null>(
      props.defaultModelValue || null
    )
    const mergedValueRef = useMergedState(
      toRef(props, 'modelValue'),
      uncontrolledValueRef
    )

    function doUpdateValue (value: number, time: DateItem): void {
      const { onUpdateModelValue, 'onUpdate:modelValue': _onUpdateModelValue } =
        props
      if (onUpdateModelValue) {
        call(onUpdateModelValue, value, time)
      }
      if (_onUpdateModelValue) {
        call(_onUpdateModelValue, value, time)
      }
      uncontrolledValueRef.value = value
    }

    function handlePrevClick (): void {
      const monthTs = addMonths(monthTsRef.value, -1).valueOf()
      monthTsRef.value = monthTs
      props.onPanelChange?.({
        year: getYear(monthTs),
        month: getMonth(monthTs) + 1
      })
    }
    function handleNextClick (): void {
      const monthTs = addMonths(monthTsRef.value, 1).valueOf()
      monthTsRef.value = monthTs
      props.onPanelChange?.({
        year: getYear(monthTs),
        month: getMonth(monthTs) + 1
      })
    }
    function handleTodayClick (): void {
      const { value: monthTs } = monthTsRef
      const oldYear = getYear(monthTs)
      const oldMonth = getMonth(monthTs)
      const newMonthTs = startOfMonth(now).valueOf()
      monthTsRef.value = newMonthTs
      const newYear = getYear(newMonthTs)
      const newMonth = getMonth(newMonthTs)
      if (oldYear !== newYear || oldMonth !== newMonth) {
        props.onPanelChange?.({
          year: newYear,
          month: newMonth + 1
        })
      }
    }
    const cssVarsRef = computed(() => {
      const {
        common: { cubicBezierEaseInOut },
        self: {
          borderColor,
          borderColorModal,
          borderColorPopover,
          borderRadius,
          titleFontSize,
          textColor,
          titleFontWeight,
          titleTextColor,
          dayTextColor,
          fontSize,
          lineHeight,
          dateColorCurrent,
          dateTextColorCurrent,
          cellColorHover,
          cellColor,
          cellColorModal,
          barColor,
          cellColorPopover,
          cellColorHoverModal,
          cellColorHoverPopover
        }
      } = themeRef.value
      return {
        '--z-bezier': cubicBezierEaseInOut,
        '--z-border-color': borderColor,
        '--z-border-color-modal': borderColorModal,
        '--z-border-color-popover': borderColorPopover,
        '--z-border-radius': borderRadius,
        '--z-text-color': textColor,
        '--z-title-font-weight': titleFontWeight,
        '--z-title-font-size': titleFontSize,
        '--z-title-text-color': titleTextColor,
        '--z-day-text-color': dayTextColor,
        '--z-font-size': fontSize,
        '--z-line-height': lineHeight,
        '--z-date-color-current': dateColorCurrent,
        '--z-date-text-color-current': dateTextColorCurrent,
        '--z-cell-color': cellColor,
        '--z-cell-color-modal': cellColorModal,
        '--z-cell-color-popover': cellColorPopover,
        '--z-cell-color-hover': cellColorHover,
        '--z-cell-color-hover-modal': cellColorHoverModal,
        '--z-cell-color-hover-popover': cellColorHoverPopover,
        '--z-bar-color': barColor
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('calendar', undefined, cssVarsRef, props)
      : undefined
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      locale: localeRef,
      dateLocale: dateLocaleRef,
      now,
      mergedValue: mergedValueRef,
      monthTs: monthTsRef,
      dateItems: computed(() => {
        return dateArray(
          monthTsRef.value,
          mergedValueRef.value,
          now,
          localeRef.value.firstDayOfWeek,
          true
        )
      }),
      doUpdateValue,
      handleTodayClick,
      handlePrevClick,
      handleNextClick,
      mergedTheme: themeRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    const {
      isDateDisabled,
      mergedClsPrefix,
      monthTs,
      cssVars,
      mergedValue,
      mergedTheme,
      $slots,
      locale: { monthBeforeYear, today },
      dateLocale: { locale },
      handleTodayClick,
      handlePrevClick,
      handleNextClick,
      onRender
    } = this
    onRender?.()
    const normalizedValue = mergedValue && startOfDay(mergedValue).valueOf()
    const year = getYear(monthTs)
    const calendarMonth = getMonth(monthTs) + 1
    return (
      <div
        class={[`${mergedClsPrefix}-calendar`, this.themeClass]}
        style={cssVars as CSSProperties}
      >
        <div class={`${mergedClsPrefix}-calendar-header`}>
          <div class={`${mergedClsPrefix}-calendar-header__title`}>
            {resolveSlotWithProps(
              $slots.header,
              { year, month: calendarMonth },
              () => {
                const localeMonth = format(monthTs, 'MMMM', { locale })
                return [
                  monthBeforeYear
                    ? `${localeMonth} ${year}`
                    : `${year} ${localeMonth}`
                ]
              }
            )}
          </div>
          <div class={`${mergedClsPrefix}-calendar-header__extra`}>
            <ZButtonGroup>
              {{
                default: () => (
                  <>
                    <ZButton
                      size="small"
                      onClick={handlePrevClick}
                      theme={mergedTheme.peers.Button}
                      themeOverrides={mergedTheme.peerOverrides.Button}
                    >
                      {{
                        icon: () => (
                          <ZBaseIcon
                            clsPrefix={mergedClsPrefix}
                            class={`${mergedClsPrefix}-calendar-prev-btn`}
                          >
                            {{ default: () => <ChevronLeftIcon /> }}
                          </ZBaseIcon>
                        )
                      }}
                    </ZButton>
                    <ZButton
                      size="small"
                      variant="text"
                      color="primary"
                      onClick={handleTodayClick}
                      theme={mergedTheme.peers.Button}
                      themeOverrides={mergedTheme.peerOverrides.Button}
                    >
                      {{ default: () => today }}
                    </ZButton>
                    <ZButton
                      size="small"
                      onClick={handleNextClick}
                      theme={mergedTheme.peers.Button}
                      themeOverrides={mergedTheme.peerOverrides.Button}
                    >
                      {{
                        icon: () => (
                          <ZBaseIcon
                            clsPrefix={mergedClsPrefix}
                            class={`${mergedClsPrefix}-calendar-next-btn`}
                          >
                            {{ default: () => <ChevronRightIcon /> }}
                          </ZBaseIcon>
                        )
                      }}
                    </ZButton>
                  </>
                )
              }}
            </ZButtonGroup>
          </div>
        </div>
        <div class={`${mergedClsPrefix}-calendar-dates`}>
          {this.dateItems.map(
            ({ dateObject, ts, inCurrentMonth, isCurrentDate }, index) => {
              const { year, month, date } = dateObject
              const fullDate = format(ts, 'yyyy-MM-dd')
              // 'notInCurrentMonth' and 'disabled' are both disabled styles, but 'disabled''s cursor are not-allowed
              const notInCurrentMonth = !inCurrentMonth
              const disabled = isDateDisabled?.(ts) === true
              const selected = normalizedValue === startOfDay(ts).valueOf()
              return (
                <div
                  key={`${calendarMonth}-${index}`}
                  class={[
                    `${mergedClsPrefix}-calendar-cell`,
                    disabled && `${mergedClsPrefix}-calendar-cell--disabled`,
                    notInCurrentMonth &&
                      `${mergedClsPrefix}-calendar-cell--other-month`,
                    disabled && `${mergedClsPrefix}-calendar-cell--not-allowed`,
                    isCurrentDate &&
                      `${mergedClsPrefix}-calendar-cell--current`,
                    selected && `${mergedClsPrefix}-calendar-cell--selected`
                  ]}
                  onClick={() => {
                    if (disabled) return
                    const monthTs = startOfMonth(ts).valueOf()
                    this.monthTs = monthTs
                    if (notInCurrentMonth) {
                      this.onPanelChange?.({
                        year: getYear(monthTs),
                        month: getMonth(monthTs) + 1
                      })
                    }
                    this.doUpdateValue(ts, {
                      year,
                      month: month + 1,
                      date
                    })
                  }}
                >
                  <div class={`${mergedClsPrefix}-calendar-date`}>
                    <div
                      class={`${mergedClsPrefix}-calendar-date__date`}
                      title={fullDate}
                    >
                      {date}
                    </div>
                    {index < 7 && (
                      <div
                        class={`${mergedClsPrefix}-calendar-date__day`}
                        title={fullDate}
                      >
                        {format(ts, 'EEE', {
                          locale
                        })}
                      </div>
                    )}
                  </div>
                  {$slots.default?.({
                    year,
                    month: month + 1,
                    date
                  })}
                  <div class={`${mergedClsPrefix}-calendar-cell__bar`} />
                </div>
              )
            }
          )}
        </div>
      </div>
    )
  }
})
