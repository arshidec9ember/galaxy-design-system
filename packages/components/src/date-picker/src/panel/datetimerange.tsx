import { defineComponent, h, watchEffect } from 'vue'
import { ZButton } from '../../../button'
import { ZInput } from '../../../input'
import { ZTimePicker } from '../../../time-picker'
import {
  BackwardIcon,
  FastBackwardIcon,
  ForwardIcon,
  FastForwardIcon,
  DateIcon
} from '../../../_internal/icons'
import { ZBaseFocusDetector } from '../../../_internal'
import { resolveSlot, warnOnce } from '../../../_utils'
import { useDualCalendar, useDualCalendarProps } from './use-dual-calendar'
import PanelHeader from './panelHeader'
import { ZList, ZListItem } from '../../../list'
import { ZText } from '../../../typography'
import { ZEllipsis } from '../../../ellipsis'

export default defineComponent({
  name: 'DateTimeRangePanel',
  props: useDualCalendarProps,
  setup (props) {
    if (__DEV__) {
      watchEffect(() => {
        if (props.actions?.includes('today')) {
          warnOnce(
            'date-picker',
            'The `today` action is not supported for z-date-picker of `datetimerange` type'
          )
        }
      })
    }
    return useDualCalendar(props, 'datetimerange')
  },
  render () {
    const {
      mergedClsPrefix,
      mergedTheme,
      shortcuts,
      timePickerProps,
      onRender,
      $slots,
      showShortcuts
    } = this
    onRender?.()
    return (
      <div
        ref="selfRef"
        tabindex={0}
        class={[
          `${mergedClsPrefix}-date-panel`,
          `${mergedClsPrefix}-date-panel--datetimerange`,
          !this.panel && `${mergedClsPrefix}-date-panel--shadow`,
          this.themeClass
        ]}
        onKeydown={this.handlePanelKeyDown}
        onFocus={this.handlePanelFocus}
      >
        <div class={`${mergedClsPrefix}-date-panel-shortcuts-wrapper`}>
          {showShortcuts && shortcuts ? (
            <ZList
              hoverable
              showDivider={false}
              class={`${mergedClsPrefix}-date-panel-shortcuts`}
            >
              {Object.keys(shortcuts).map((key) => {
                const shortcut = shortcuts[key]
                return Array.isArray(shortcut) ||
                  typeof shortcut === 'function' ? (
                  <ZListItem
                    class={`${mergedClsPrefix}-date-panel-shortcuts__item`}
                    onMouseenter={() => {
                      this.handleRangeShortcutMouseenter(shortcut)
                    }}
                    onClick={() => {
                      this.handleRangeShortcutClick(shortcut)
                    }}
                    onMouseleave={() => {
                      this.handleShortcutMouseleave()
                    }}
                  >
                    <ZEllipsis textVariant="3-r" renderZText>
                      {{ default: () => key }}
                    </ZEllipsis>
                  </ZListItem>
                    ) : null
              })}
            </ZList>
          ) : null}
          <div
            class={[
              `${mergedClsPrefix}-date-panel`,
              `${mergedClsPrefix}-date-panel--datetimerange`
            ]}
          >
            <div class={`${mergedClsPrefix}-date-panel-header`}>
              <ZInput
                modelValue={this.startDateDisplayString}
                theme={mergedTheme.peers.Input}
                themeOverrides={mergedTheme.peerOverrides.Input}
                size={this.timePickerSize}
                stateful={false}
                class={`${mergedClsPrefix}-date-panel-date-input`}
                textDecoration={this.isStartValueInvalid ? 'line-through' : ''}
                placeholder={this.locale.selectDate}
                onBlur={this.handleStartDateInputBlur}
                onUpdateModelValue={this.handleStartDateInput}
              >
                {{
                  prefix: () => <DateIcon></DateIcon>
                }}
              </ZInput>
              <ZTimePicker
                placeholder={this.locale.selectTime}
                actions={[]}
                format={this.timeFormat}
                size={this.timePickerSize}
                {...(Array.isArray(timePickerProps)
                  ? timePickerProps[0]
                  : timePickerProps)}
                modelValue={this.startTimeValue}
                to={false}
                showIcon={true}
                disabled={this.isSelecting}
                theme={mergedTheme.peers.TimePicker}
                themeOverrides={mergedTheme.peerOverrides.TimePicker}
                stateful={false}
                isHourDisabled={this.isStartHourDisabled}
                isMinuteDisabled={this.isStartMinuteDisabled}
                isSecondDisabled={this.isStartSecondDisabled}
                onUpdateModelValue={this.handleStartTimePickerChange}
              />
              <ZInput
                modelValue={this.endDateInput}
                theme={mergedTheme.peers.Input}
                themeOverrides={mergedTheme.peerOverrides.Input}
                stateful={false}
                size={this.timePickerSize}
                class={`${mergedClsPrefix}-date-panel-date-input`}
                textDecoration={this.isEndValueInvalid ? 'line-through' : ''}
                placeholder={this.locale.selectDate}
                onBlur={this.handleEndDateInputBlur}
                onUpdateModelValue={this.handleEndDateInput}
              >
                {{
                  prefix: () => <DateIcon></DateIcon>
                }}
              </ZInput>
              <ZTimePicker
                placeholder={this.locale.selectTime}
                format={this.timeFormat}
                actions={[]}
                size={this.timePickerSize}
                {...(Array.isArray(timePickerProps)
                  ? timePickerProps[1]
                  : timePickerProps)}
                disabled={this.isSelecting}
                showIcon={true}
                theme={mergedTheme.peers.TimePicker}
                themeOverrides={mergedTheme.peerOverrides.TimePicker}
                to={false}
                stateful={false}
                modelValue={this.endTimeValue}
                isHourDisabled={this.isEndHourDisabled}
                isMinuteDisabled={this.isEndMinuteDisabled}
                isSecondDisabled={this.isEndSecondDisabled}
                onUpdateModelValue={this.handleEndTimePickerChange}
              />
            </div>
            <div
              ref="startDatesElRef"
              class={`${mergedClsPrefix}-date-panel-calendar ${mergedClsPrefix}-date-panel-calendar--start`}
            >
              <div class={`${mergedClsPrefix}-date-panel-month`}>
                <div
                  class={`${mergedClsPrefix}-date-panel-month__fast-prev`}
                  onClick={this.startCalendarPrevYear}
                >
                  {resolveSlot($slots['prev-year'], () => [
                    <FastBackwardIcon />
                  ])}
                </div>
                <div
                  class={`${mergedClsPrefix}-date-panel-month__prev`}
                  onClick={this.startCalendarPrevMonth}
                >
                  {resolveSlot($slots['prev-month'], () => [<BackwardIcon />])}
                </div>
                <PanelHeader
                  monthBeforeYear={this.locale.monthBeforeYear}
                  value={this.startCalendarDateTime}
                  minYear={this.minYear}
                  maxYear={this.maxYear}
                  onUpdateValue={this.onUpdateStartCalendarValue}
                  mergedClsPrefix={mergedClsPrefix}
                  calendarMonth={this.startCalendarMonth}
                  calendarYear={this.startCalendarYear}
                />
                <div
                  class={`${mergedClsPrefix}-date-panel-month__next`}
                  onClick={this.startCalendarNextMonth}
                >
                  {resolveSlot($slots['next-month'], () => [<ForwardIcon />])}
                </div>
                <div
                  class={`${mergedClsPrefix}-date-panel-month__fast-next`}
                  onClick={this.startCalendarNextYear}
                >
                  {resolveSlot($slots['next-year'], () => [
                    <FastForwardIcon />
                  ])}
                </div>
              </div>
              <div class={`${mergedClsPrefix}-date-panel-weekdays`}>
                {this.weekdays.map((weekday) => (
                  <ZText variant="4-m">
                    <div
                      key={weekday}
                      class={`${mergedClsPrefix}-date-panel-weekdays__day`}
                    >
                      {weekday}
                    </div>
                  </ZText>
                ))}
              </div>
              <div class={`${mergedClsPrefix}-date-panel__divider`} />
              <div class={`${mergedClsPrefix}-date-panel-dates`}>
                {this.startDateArray.map((dateItem, i) => {
                  const disabled = this.mergedIsDateDisabled(dateItem.ts)
                  return (
                    <ZText>
                      <div
                        data-n-date
                        key={i}
                        class={[
                          `${mergedClsPrefix}-date-panel-date`,
                          {
                            [`${mergedClsPrefix}-date-panel-date--excluded`]:
                              !dateItem.inCurrentMonth,
                            [`${mergedClsPrefix}-date-panel-date--current`]:
                              dateItem.isCurrentDate,
                            [`${mergedClsPrefix}-date-panel-date--selected`]:
                              dateItem.selected,
                            [`${mergedClsPrefix}-date-panel-date--covered`]:
                              dateItem.inSpan,
                            [`${mergedClsPrefix}-date-panel-date--start`]:
                              dateItem.startOfSpan,
                            [`${mergedClsPrefix}-date-panel-date--end`]:
                              dateItem.endOfSpan,
                            [`${mergedClsPrefix}-date-panel-date--disabled`]:
                              disabled
                          }
                        ]}
                        onClick={
                          disabled
                            ? undefined
                            : () => {
                                this.handleDateClick(dateItem)
                              }
                        }
                        onMouseenter={
                          disabled
                            ? undefined
                            : () => {
                                this.handleDateMouseEnter(dateItem)
                              }
                        }
                      >
                        <div
                          class={`${mergedClsPrefix}-date-panel-date__trigger`}
                        />
                        {dateItem.dateObject.date}
                        {dateItem.isCurrentDate ? (
                          <div
                            class={`${mergedClsPrefix}-date-panel-date__sup`}
                          />
                        ) : null}
                      </div>
                    </ZText>
                  )
                })}
              </div>
            </div>
            <div
              ref="endDatesElRef"
              class={`${mergedClsPrefix}-date-panel-calendar ${mergedClsPrefix}-date-panel-calendar--end`}
            >
              <div class={`${mergedClsPrefix}-date-panel-month`}>
                <div
                  class={`${mergedClsPrefix}-date-panel-month__fast-prev`}
                  onClick={this.endCalendarPrevYear}
                >
                  {resolveSlot($slots['prev-year'], () => [
                    <FastBackwardIcon />
                  ])}
                </div>
                <div
                  class={`${mergedClsPrefix}-date-panel-month__prev`}
                  onClick={this.endCalendarPrevMonth}
                >
                  {resolveSlot($slots['prev-month'], () => [<BackwardIcon />])}
                </div>
                <PanelHeader
                  monthBeforeYear={this.locale.monthBeforeYear}
                  value={this.endCalendarDateTime}
                  onUpdateValue={this.onUpdateEndCalendarValue}
                  mergedClsPrefix={mergedClsPrefix}
                  minYear={this.minYear}
                  maxYear={this.maxYear}
                  calendarMonth={this.endCalendarMonth}
                  calendarYear={this.endCalendarYear}
                />
                <div
                  class={`${mergedClsPrefix}-date-panel-month__next`}
                  onClick={this.endCalendarNextMonth}
                >
                  {resolveSlot($slots['next-month'], () => [<ForwardIcon />])}
                </div>
                <div
                  class={`${mergedClsPrefix}-date-panel-month__fast-next`}
                  onClick={this.endCalendarNextYear}
                >
                  {resolveSlot($slots['next-year'], () => [
                    <FastForwardIcon />
                  ])}
                </div>
              </div>
              <div class={`${mergedClsPrefix}-date-panel-weekdays`}>
                {this.weekdays.map((weekday) => (
                  <ZText variant="4-m">
                    <div
                      key={weekday}
                      class={`${mergedClsPrefix}-date-panel-weekdays__day`}
                    >
                      {weekday}
                    </div>
                  </ZText>
                ))}
              </div>
              <div class={`${mergedClsPrefix}-date-panel__divider`} />
              <div class={`${mergedClsPrefix}-date-panel-dates`}>
                {this.endDateArray.map((dateItem, i) => {
                  const disabled = this.mergedIsDateDisabled(dateItem.ts)
                  return (
                    <ZText>
                      <div
                        data-n-date
                        key={i}
                        class={[
                          `${mergedClsPrefix}-date-panel-date`,
                          {
                            [`${mergedClsPrefix}-date-panel-date--excluded`]:
                              !dateItem.inCurrentMonth,
                            [`${mergedClsPrefix}-date-panel-date--current`]:
                              dateItem.isCurrentDate,
                            [`${mergedClsPrefix}-date-panel-date--selected`]:
                              dateItem.selected,
                            [`${mergedClsPrefix}-date-panel-date--covered`]:
                              dateItem.inSpan,
                            [`${mergedClsPrefix}-date-panel-date--start`]:
                              dateItem.startOfSpan,
                            [`${mergedClsPrefix}-date-panel-date--end`]:
                              dateItem.endOfSpan,
                            [`${mergedClsPrefix}-date-panel-date--disabled`]:
                              disabled
                          }
                        ]}
                        onClick={
                          disabled
                            ? undefined
                            : () => {
                                this.handleDateClick(dateItem)
                              }
                        }
                        onMouseenter={
                          disabled
                            ? undefined
                            : () => {
                                this.handleDateMouseEnter(dateItem)
                              }
                        }
                      >
                        <div
                          class={`${mergedClsPrefix}-date-panel-date__trigger`}
                        />
                        {dateItem.dateObject.date}
                        {dateItem.isCurrentDate ? (
                          <div
                            class={`${mergedClsPrefix}-date-panel-date__sup`}
                          />
                        ) : null}
                      </div>
                    </ZText>
                  )
                })}
              </div>
            </div>
            {this.datePickerSlots.footer ? (
              <div class={`${mergedClsPrefix}-date-panel-footer`}>
                {this.datePickerSlots.footer()}
              </div>
            ) : null}
            {this.actions?.length ? (
              <div class={`${mergedClsPrefix}-date-panel-actions`}>
                <div class={`${mergedClsPrefix}-date-panel-actions__prefix`}>
                  {this.actions?.includes('confirm') ? (
                    <ZButton
                      theme={mergedTheme.peers.Button}
                      themeOverrides={mergedTheme.peerOverrides.Button}
                      size="medium"
                      variant="filled"
                      color="primary"
                      disabled={this.isRangeInvalid || this.isSelecting}
                      onClick={this.handleConfirmClick}
                    >
                      {{ default: () => this.locale.confirm }}
                    </ZButton>
                  ) : null}
                  {this.actions?.includes('clear') ? (
                    <ZButton
                      theme={mergedTheme.peers.Button}
                      themeOverrides={mergedTheme.peerOverrides.Button}
                      size="medium"
                      onClick={this.handleClearClick}
                    >
                      {{ default: () => this.locale.clear }}
                    </ZButton>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <ZBaseFocusDetector onFocus={this.handleFocusDetectorFocus} />
      </div>
    )
  }
})
