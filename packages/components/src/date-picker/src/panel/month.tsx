import { h, defineComponent, type VNode, type PropType, onMounted } from 'vue'
import { VirtualList } from '../../../_external-dependencies/vueuc'
import { ZButton } from '../../../button'
import { ZBaseFocusDetector, ZScrollbar } from '../../../_internal'
import { monthMap } from '../utils'
import type { MonthItem, YearItem, QuarterItem } from '../utils'
import { MONTH_ITEM_HEIGHT } from '../config'
import { useCalendar, useCalendarProps } from './use-calendar'
import type { OnPanelUpdateValueImpl } from '../interface'
import { ZList, ZListItem } from '../../../list'
import { ZEllipsis } from '../../../ellipsis'

/**
 * Month Panel
 * Update picker value on:
 * 1. item click
 * 2. clear click
 */
export default defineComponent({
  name: 'MonthPanel',
  props: {
    ...useCalendarProps,
    type: {
      type: String as PropType<'month' | 'year' | 'quarter'>,
      required: true
    },
    // panelHeader prop
    useAsQuickJump: Boolean
  },
  setup (props) {
    const useCalendarRef = useCalendar(props, props.type)
    const getRenderContent = (
      item: YearItem | MonthItem | QuarterItem
    ): number | string => {
      switch (item.type) {
        case 'year':
          return item.dateObject.year
        case 'month':
          return monthMap[item.dateObject.month + 1]
        case 'quarter':
          return `Q${item.dateObject.quarter}`
      }
    }
    const { useAsQuickJump } = props
    const renderItem = (
      item: YearItem | MonthItem | QuarterItem,
      i: number,
      mergedClsPrefix: string
    ): VNode => {
      const { mergedIsDateDisabled, handleDateClick, handleQuickMonthClick } =
        useCalendarRef
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
                disabled || (!useAsQuickJump && mergedIsDateDisabled(item.ts))
            }
          ]}
          onClick={() => {
            useAsQuickJump
              ? handleQuickMonthClick(item, (value) => {
                ;(props.onUpdateValue as OnPanelUpdateValueImpl)(value, false)
              })
              : handleDateClick(item)
          }}
        >
          {getRenderContent(item)}
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
      actions,
      renderItem,
      type,
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
          `${mergedClsPrefix}-date-panel--month`,
          !this.panel && `${mergedClsPrefix}-date-panel--shadow`,
          this.themeClass
        ]}
        onFocus={this.handlePanelFocus}
        onKeydown={this.handlePanelKeyDown}
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
              `${mergedClsPrefix}-date-panel--month`
            ]}
          >
            <div class={`${mergedClsPrefix}-date-panel-month-calendar`}>
              {type === 'month' || type === 'quarter' ? (
                <div
                  class={`${mergedClsPrefix}-date-panel-month-calendar__picker-col`}
                >
                  <ZScrollbar
                    ref="monthScrollbarRef"
                    theme={mergedTheme.peers.Scrollbar}
                    themeOverrides={mergedTheme.peerOverrides.Scrollbar}
                  >
                    {{
                      default: () => [
                        (type === 'month'
                          ? this.monthArray
                          : this.quarterArray
                        ).map((item, i) =>
                          renderItem(item, i, mergedClsPrefix)
                        ),
                        <div
                          class={`${mergedClsPrefix}-date-panel-${type}-calendar__padding`}
                        />
                      ]
                    }}
                  </ZScrollbar>
                </div>
              ) : null}
              <ZScrollbar
                ref="yearScrollbarRef"
                class={`${mergedClsPrefix}-date-panel-month-calendar__picker-col`}
                theme={mergedTheme.peers.Scrollbar}
                themeOverrides={mergedTheme.peerOverrides.Scrollbar}
                container={this.virtualListContainer}
                content={this.virtualListContent}
                horizontalRailStyle={{ zIndex: 1 }}
                verticalRailStyle={{ zIndex: 1 }}
              >
                {{
                  default: () => (
                    <VirtualList
                      ref="yearVlRef"
                      items={this.yearArray}
                      itemSize={MONTH_ITEM_HEIGHT}
                      showScrollbar={false}
                      keyField="ts"
                      onScroll={this.handleVirtualListScroll}
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
                          return renderItem(item, index, mergedClsPrefix)
                        }
                      }}
                    </VirtualList>
                  )
                }}
              </ZScrollbar>
            </div>
            {this.datePickerSlots.footer ? (
              <div class={`${mergedClsPrefix}-date-panel-footer`}>
                {{
                  default: this.datePickerSlots.footer
                }}
              </div>
            ) : null}
            {actions?.length ? (
              <div class={`${mergedClsPrefix}-date-panel-actions`}>
                <div class={`${mergedClsPrefix}-date-panel-actions__prefix`}>
                  {actions?.includes('confirm') ? (
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
                  {actions?.includes('clear') ? (
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
