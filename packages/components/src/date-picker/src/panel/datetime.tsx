import { h, defineComponent } from 'vue'
import { ZButton } from '../../../button'
import { ZTimePicker } from '../../../time-picker'
import { ZInput } from '../../../input'
import {
  BackwardIcon,
  FastBackwardIcon,
  ForwardIcon,
  FastForwardIcon,
  DateIcon
} from '../../../_internal/icons'
import { ZBaseFocusDetector } from '../../../_internal'
import { useCalendar, useCalendarProps } from './use-calendar'
import PanelHeader from './panelHeader'
import { resolveSlot } from '../../../_utils'
import { ZList, ZListItem } from '../../../list'
import { ZText } from '../../../typography'
import { ZEllipsis } from '../../../ellipsis'
/**
 * DateTime Panel
 * Update picker value on:
 * 1. confirm click
 * 2. clear click
 */
export default defineComponent({
  name: 'DateTimePanel',
  props: useCalendarProps,
  setup (props) {
    return useCalendar(props, 'datetime')
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
          `${mergedClsPrefix}-date-panel--datetime`,
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
                return Array.isArray(shortcut) ? null : (
                  <ZListItem
                    class={`${mergedClsPrefix}-date-panel-shortcuts__item`}
                    onMouseenter={() => {
                      this.handleSingleShortcutMouseenter(shortcut)
                    }}
                    onClick={() => {
                      this.handleSingleShortcutClick(shortcut)
                    }}
                    onMouseleave={() => {
                      this.handleShortcutMouseleave()
                    }}
                  >
                    <ZEllipsis textVariant="3-r" renderZText>
                      {{ default: () => key }}
                    </ZEllipsis>
                  </ZListItem>
                )
              })}
            </ZList>
          ) : null}
          <div
            class={[
              `${mergedClsPrefix}-date-panel`,
              `${mergedClsPrefix}-date-panel--datetime`
            ]}
          >
            <div class={`${mergedClsPrefix}-date-panel-header`}>
              <ZInput
                modelValue={this.dateInputValue}
                theme={mergedTheme.peers.Input}
                themeOverrides={mergedTheme.peerOverrides.Input}
                stateful={false}
                size={this.timePickerSize}
                class={`${mergedClsPrefix}-date-panel-date-input`}
                textDecoration={this.isDateInvalid ? 'line-through' : ''}
                placeholder={this.locale.selectDate}
                onBlur={this.handleDateInputBlur}
                onUpdateModelValue={this.handleDateInput}
              >
                {{
                  prefix: () => <DateIcon></DateIcon>
                }}
              </ZInput>
              <ZTimePicker
                size={this.timePickerSize}
                placeholder={this.locale.selectTime}
                format={this.timeFormat}
                {...(Array.isArray(timePickerProps)
                  ? undefined
                  : timePickerProps)}
                to={false}
                theme={mergedTheme.peers.TimePicker}
                showIcon={true}
                themeOverrides={mergedTheme.peerOverrides.TimePicker}
                modelValue={Array.isArray(this.value) ? null : this.value}
                isHourDisabled={this.isHourDisabled}
                isMinuteDisabled={this.isMinuteDisabled}
                isSecondDisabled={this.isSecondDisabled}
                onUpdateModelValue={this.handleTimePickerChange}
                stateful={false}
              />
            </div>
            <div class={`${mergedClsPrefix}-date-panel-calendar`}>
              <div class={`${mergedClsPrefix}-date-panel-month`}>
                <div
                  class={`${mergedClsPrefix}-date-panel-month__fast-prev`}
                  onClick={this.prevYear}
                >
                  {resolveSlot($slots['prev-year'], () => [
                    <FastBackwardIcon />
                  ])}
                </div>
                <div
                  class={`${mergedClsPrefix}-date-panel-month__prev`}
                  onClick={this.prevMonth}
                >
                  {resolveSlot($slots['prev-month'], () => [<BackwardIcon />])}
                </div>
                <PanelHeader
                  monthBeforeYear={this.locale.monthBeforeYear}
                  value={this.calendarValue}
                  minYear={this.minYear}
                  maxYear={this.maxYear}
                  onUpdateValue={this.onUpdateCalendarValue}
                  mergedClsPrefix={mergedClsPrefix}
                  calendarMonth={this.calendarMonth}
                  calendarYear={this.calendarYear}
                />
                <div
                  class={`${mergedClsPrefix}-date-panel-month__next`}
                  onClick={this.nextMonth}
                >
                  {resolveSlot($slots['next-month'], () => [<ForwardIcon />])}
                </div>
                <div
                  class={`${mergedClsPrefix}-date-panel-month__fast-next`}
                  onClick={this.nextYear}
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
              <div class={`${mergedClsPrefix}-date-panel-dates`}>
                {this.dateArray.map((dateItem, i) => (
                  <ZText>
                    <div
                      data-n-date
                      key={i}
                      class={[
                        `${mergedClsPrefix}-date-panel-date`,
                        {
                          [`${mergedClsPrefix}-date-panel-date--current`]:
                            dateItem.isCurrentDate,
                          [`${mergedClsPrefix}-date-panel-date--selected`]:
                            dateItem.selected,
                          [`${mergedClsPrefix}-date-panel-date--excluded`]:
                            !dateItem.inCurrentMonth,
                          [`${mergedClsPrefix}-date-panel-date--disabled`]:
                            this.mergedIsDateDisabled(dateItem.ts)
                        }
                      ]}
                      onClick={() => {
                        this.handleDateClick(dateItem)
                      }}
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
                ))}
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
                      disabled={this.isDateInvalid}
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
                      onClick={this.clearSelectedDateTime}
                    >
                      {{ default: () => this.locale.clear }}
                    </ZButton>
                  ) : null}
                  {this.actions?.includes('today') ? (
                    <span class="today">
                      <ZButton
                        theme={mergedTheme.peers.Button}
                        themeOverrides={mergedTheme.peerOverrides.Button}
                        size="medium"
                        variant="subtle"
                        color="primary"
                        onClick={this.handleTodayClick}
                      >
                        {{ default: () => this.locale.now }}
                      </ZButton>
                    </span>
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
