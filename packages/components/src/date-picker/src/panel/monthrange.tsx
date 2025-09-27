import {
  defineComponent,
  h,
  renderSlot,
  watchEffect,
  type PropType,
  type VNode,
  onMounted
} from 'vue'
import { VirtualList } from '../../../_external-dependencies/vueuc'
import { ZxButton } from '../../../button'
import { ZBaseFocusDetector, ZScrollbar } from '../../../_internal'
import { warnOnce } from '../../../_utils'
import type { MonthItem, QuarterItem, YearItem } from '../utils'
import { monthMap } from '../utils'
import { MONTH_ITEM_HEIGHT } from '../config'
import { useDualCalendar, useDualCalendarProps } from './use-dual-calendar'
import { ZList, ZListItem } from '../../../list'
import { ZEllipsis } from '../../../ellipsis'

export default defineComponent({
  name: 'MonthRangePanel',
  props: {
    ...useDualCalendarProps,
    type: {
      type: String as PropType<'monthrange' | 'yearrange' | 'quarterrange'>,
      required: true
    }
  },
  setup (props) {
    if (__DEV__) {
      watchEffect(() => {
        if (props.actions?.includes('today')) {
          warnOnce(
            'date-picker',
            'The `today` action is not supported for z-date-picker of ' +
              `${props.type}` +
              'type'
          )
        }
      })
    }
    const useCalendarRef = useDualCalendar(props, props.type)
    const renderItem = (
      item: YearItem | MonthItem | QuarterItem,
      i: number,
      mergedClsPrefix: string,
      type: 'start' | 'end'
    ): VNode => {
      const { handleColItemClick } = useCalendarRef
      // TODO
      let disabled = false
      if (item.type === 'year' && (props?.minYear || props?.maxYear)) {
        if (props?.minYear && props?.maxYear) {
          disabled =
            item.dateObject?.year < props.minYear ||
            item.dateObject?.year > props.maxYear
        } else if (props?.minYear) {
          disabled = item.dateObject?.year < props.minYear
        } else if (props?.maxYear) {
          disabled = item.dateObject?.year > props.maxYear
        }
      }
      return (
        <div
          data-n-date
          key={i}
          class={[
            `${mergedClsPrefix}-date-panel-month-calendar__picker-col-item`,
            {
              [`${mergedClsPrefix}-date-panel-month-calendar__picker-col-item--current`]:
                item.isCurrent,
              [`${mergedClsPrefix}-date-panel-month-calendar__picker-col-item--selected`]:
                item.selected,
              [`${mergedClsPrefix}-date-panel-month-calendar__picker-col-item--disabled`]:
                disabled
            }
          ]}
          onClick={
            disabled
              ? undefined
              : () => {
                  handleColItemClick(item, type)
                }
          }
        >
          {item.type === 'month'
            ? monthMap[item.dateObject.month + 1]
            : item.type === 'quarter'
              ? `Q${item.dateObject.quarter}`
              : item.dateObject.year}
        </div>
      )
    }
    onMounted(() => {
      useCalendarRef.justifyColumnsScrollState()
    })
    return { ...useCalendarRef, renderItem }
  },
  render () {
    const {
      mergedClsPrefix,
      mergedTheme,
      shortcuts,
      type,
      renderItem,
      onRender,
      showShortcuts
    } = this
    onRender?.()
    return (
      <div
        ref="selfRef"
        tabindex={0}
        class={[
          `${mergedClsPrefix}-date-panel`,
          `${mergedClsPrefix}-date-panel--daterange`,
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
              `${mergedClsPrefix}-date-panel--daterange`
            ]}
          >
            <div
              ref="startDatesElRef"
              class={`${mergedClsPrefix}-date-panel-calendar ${mergedClsPrefix}-date-panel-calendar--start`}
            >
              <div class={`${mergedClsPrefix}-date-panel-month-calendar`}>
                {type === 'monthrange' || type === 'quarterrange' ? (
                  <div
                    class={`${mergedClsPrefix}-date-panel-month-calendar__picker-col`}
                  >
                    <ZScrollbar
                      ref="startMonthScrollbarRef"
                      theme={mergedTheme.peers.Scrollbar}
                      themeOverrides={mergedTheme.peerOverrides.Scrollbar}
                    >
                      {{
                        default: () => [
                          (type === 'monthrange'
                            ? this.startMonthArray
                            : this.startQuarterArray
                          ).map((item, i) =>
                            renderItem(item, i, mergedClsPrefix, 'start')
                          ),
                          type === 'monthrange' && (
                            <div
                              class={`${mergedClsPrefix}-date-panel-month-calendar__padding`}
                            />
                          )
                        ]
                      }}
                    </ZScrollbar>
                  </div>
                ) : null}
                <ZScrollbar
                  ref="startYearScrollbarRef"
                  class={`${mergedClsPrefix}-date-panel-month-calendar__picker-col`}
                  theme={mergedTheme.peers.Scrollbar}
                  themeOverrides={mergedTheme.peerOverrides.Scrollbar}
                  container={() => this.virtualListContainer('start')}
                  content={() => this.virtualListContent('start')}
                  horizontalRailStyle={{ zIndex: 1 }}
                  verticalRailStyle={{ zIndex: 1 }}
                >
                  {{
                    default: () => (
                      <VirtualList
                        ref="startYearVlRef"
                        items={this.startYearArray}
                        itemSize={MONTH_ITEM_HEIGHT}
                        showScrollbar={false}
                        keyField="ts"
                        onScroll={this.handleStartYearVlScroll}
                        paddingBottom={4}
                      >
                        {{
                          default: ({
                            item,
                            index
                          }: {
                            item: YearItem
                            index: number
                          }) => {
                            return renderItem(
                              item,
                              index,
                              mergedClsPrefix,
                              'start'
                            )
                          }
                        }}
                      </VirtualList>
                    )
                  }}
                </ZScrollbar>
              </div>
            </div>
            <div
              ref="endDatesElRef"
              class={`${mergedClsPrefix}-date-panel-calendar ${mergedClsPrefix}-date-panel-calendar--end`}
            >
              <div class={`${mergedClsPrefix}-date-panel-month-calendar`}>
                {type === 'monthrange' || type === 'quarterrange' ? (
                  <div
                    class={`${mergedClsPrefix}-date-panel-month-calendar__picker-col`}
                  >
                    <ZScrollbar
                      ref="endMonthScrollbarRef"
                      theme={mergedTheme.peers.Scrollbar}
                      themeOverrides={mergedTheme.peerOverrides.Scrollbar}
                    >
                      {{
                        default: () => [
                          (type === 'monthrange'
                            ? this.endMonthArray
                            : this.endQuarterArray
                          ).map((item, i) =>
                            renderItem(item, i, mergedClsPrefix, 'end')
                          ),
                          type === 'monthrange' && (
                            <div
                              class={`${mergedClsPrefix}-date-panel-month-calendar__padding`}
                            />
                          )
                        ]
                      }}
                    </ZScrollbar>
                  </div>
                ) : null}
                <ZScrollbar
                  ref="endYearScrollbarRef"
                  class={`${mergedClsPrefix}-date-panel-month-calendar__picker-col`}
                  theme={mergedTheme.peers.Scrollbar}
                  themeOverrides={mergedTheme.peerOverrides.Scrollbar}
                  container={() => this.virtualListContainer('end')}
                  content={() => this.virtualListContent('end')}
                  horizontalRailStyle={{ zIndex: 1 }}
                  verticalRailStyle={{ zIndex: 1 }}
                >
                  {{
                    default: () => (
                      <VirtualList
                        ref="endYearVlRef"
                        items={this.endYearArray}
                        itemSize={MONTH_ITEM_HEIGHT}
                        showScrollbar={false}
                        keyField="ts"
                        onScroll={this.handleEndYearVlScroll}
                        paddingBottom={4}
                      >
                        {{
                          default: ({
                            item,
                            index
                          }: {
                            item: YearItem
                            index: number
                          }) => {
                            return renderItem(
                              item,
                              index,
                              mergedClsPrefix,
                              'end'
                            )
                          }
                        }}
                      </VirtualList>
                    )
                  }}
                </ZScrollbar>
              </div>
            </div>
            {this.datePickerSlots.footer ? (
              <div class={`${mergedClsPrefix}-date-panel-footer`}>
                {renderSlot(this.datePickerSlots, 'footer')}
              </div>
            ) : null}
            {this.actions?.length ? (
              <div class={`${mergedClsPrefix}-date-panel-actions`}>
                <div class={`${mergedClsPrefix}-date-panel-actions__prefix`}>
                  {this.actions?.includes('confirm') ? (
                    <ZxButton
                      theme={mergedTheme.peers.Button}
                      themeOverrides={mergedTheme.peerOverrides.Button}
                      size="medium"
                      variant="filled"
                      color="primary"
                      disabled={this.isRangeInvalid}
                      onClick={this.handleConfirmClick}
                    >
                      {{ default: () => this.locale.confirm }}
                    </ZxButton>
                  ) : null}
                  {this.actions?.includes('clear') ? (
                    <ZxButton
                      theme={mergedTheme.peers.Button}
                      themeOverrides={mergedTheme.peerOverrides.Button}
                      size="medium"
                      onClick={this.handleClearClick}
                    >
                      {{ default: () => this.locale.clear }}
                    </ZxButton>
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
