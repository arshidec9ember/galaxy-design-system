import {
  h,
  defineComponent,
  ref,
  computed,
  Fragment,
  type PropType,
  type CSSProperties,
  onMounted
} from 'vue'
import type { ThemeProps } from '../../_mixins'
import { useConfig, useTheme, useLocale } from '../../_mixins'
import { useRtl } from '../../_mixins/use-rtl'
import { cloneDeep } from 'lodash-es'
import { ZPopover } from '../../popover'
import { ZIcon } from '../../icon'
import { ZList, ZListItem } from '../../list'
import { ZText } from '../../typography'
import { ZButton } from '../../button'
import { ZTooltip } from '../../tooltip'
import {
  MoveUpIcon,
  RemoveRedEyeIcon,
  SettingsIcon
} from '../../_internal/icons'
import ReorderingColumns from './ReorderingColumns'
import style from './styles/index.cssr'
import ShowHideColumns from './ShowHideColumns'
import { type DataTableSettingsTheme } from '../styles/light'
import { dataTableSettingsLight } from '../styles'
import { type TableColumns } from '../../data-table/src/interface'

const { localeRef } = useLocale('DataTable')
const settingsList = [
  {
    key: 'show-hide-column',
    label: 'Show / Hide',
    icon: RemoveRedEyeIcon
  },
  {
    key: 'order-n-pinning',
    label: localeRef.value.reorderingColumns,
    icon: MoveUpIcon
  }
]

export default defineComponent({
  name: 'DataTableSettings',
  props: {
    ...(useTheme.props as ThemeProps<DataTableSettingsTheme>),
    columns: {
      type: Array as PropType<TableColumns<any>>,
      default: []
    },
    onUpdateColumns: {
      type: Function,
      default: () => {}
    },
    maxPinnedColumns: {
      type: Number,
      default: Infinity
    }
  },
  setup (props) {
    const { mergedClsPrefixRef, mergedRtlRef } = useConfig(props)
    const themeRef = useTheme(
      'DataTableSettings',
      '-data-table-settings',
      style,
      dataTableSettingsLight,
      props,
      mergedClsPrefixRef
    )
    const rtlEnabledRef = useRtl(
      'DataTableSettings',
      mergedRtlRef,
      mergedClsPrefixRef
    )

    const cssVarsRef = computed(() => {
      const {
        self: {
          settingsPadding,
          triggerIconColor,
          reorderingIconColor,
          borderTop,
          dragItemBgColor,
          dragListItemBgColor,
          settingListItemColor,
          settingHeaderIconColor,
          settingsItemHeaderBoxShadow,
          dragListItemBgColorDragging
        }
      } = themeRef.value
      return {
        '--z-settings-padding': settingsPadding,
        '--z-settings-item-header-box-shadow': settingsItemHeaderBoxShadow,
        '--z-drag-item-bg-color': dragItemBgColor,
        '--z-data-table-trigger-icon-color': triggerIconColor,
        '--z-setting-list-item-color': settingListItemColor,
        '--z-setting-header-icon-color': settingHeaderIconColor,
        '--z-data-table-reordering-columns-item-icon-color':
          reorderingIconColor,
        '--z-border-top': borderTop,
        '--z-drag-list-item-bg-color': dragListItemBgColor,
        '--z-drag-list-item-bg-color-dragging': dragListItemBgColorDragging
      }
    })

    const showPopoverRef = ref(false)
    const selectedValueIndexRef = ref<string | string[]>('')
    const initialColumnConfig = ref<any>([])
    const columnsRef = ref<any>(cloneDeep(props.columns))

    const onUpdateModelValue = (v: string | string[]): void => {
      selectedValueIndexRef.value = v
    }

    const onUpdatePopover = (v: boolean): void => {
      showPopoverRef.value = v
    }

    onMounted(() => {
      initialColumnConfig.value = cloneDeep(props.columns)
    })

    const onResetShowHide = (): void => {
      const newColumns = cloneDeep(initialColumnConfig.value)
      props.onUpdateColumns(newColumns)
      columnsRef.value = newColumns
    }

    const onUpdateColumnsLocal = (newColumns: TableColumns<any>): void => {
      columnsRef.value = newColumns
      props.onUpdateColumns(newColumns)
    }

    const onResetReordering = (): void => {
      const initialColumnConfigOrder = initialColumnConfig.value.map(
        (item: any) => item.key
      )
      const newColumns = initialColumnConfigOrder.map((key: string) => {
        return cloneDeep(
          initialColumnConfig.value.find((item: any) => item.key === key)
        )
      })
      props.onUpdateColumns(newColumns)
      columnsRef.value = newColumns
    }

    return {
      rtlEnabled: rtlEnabledRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedTheme: themeRef,
      cssVars: cssVarsRef,
      columns: columnsRef,
      showPopover: showPopoverRef,
      selectedValueIndex: selectedValueIndexRef,
      onUpdateModelValue,
      onUpdatePopover,
      onUpdateColumnsLocal,
      onResetShowHide,
      onResetReordering
    }
  },
  render () {
    const { mergedClsPrefix, onUpdatePopover } = this
    return (
      <ZPopover
        style={this.cssVars as CSSProperties}
        show={this.showPopover}
        onUpdateShow={onUpdatePopover}
        trigger="click"
        arrow={false}
        placement="bottom-end"
        class={`${mergedClsPrefix}-data-table-settings`}
      >
        {{
          trigger: () => {
            return (
              <ZTooltip>
                {{
                  default: () => 'Table Settings',
                  trigger: () => (
                    <ZButton
                      style={this.cssVars as CSSProperties}
                      variant="subtle"
                      class={`${mergedClsPrefix}-data-table-settings-trigger`}
                    >
                      {() => (
                        <ZIcon
                          size={20}
                          class={`${mergedClsPrefix}-data-table-settings-trigger-icon`}
                        >
                          {() => <SettingsIcon />}
                        </ZIcon>
                      )}
                    </ZButton>
                  )
                }}
              </ZTooltip>
            )
          },
          default: () => {
            return (
              <div>
                {this.selectedValueIndex === '' ? (
                  <ZList
                    class={`${mergedClsPrefix}-data-table-settings__settings-list`}
                    modelValue={this.selectedValueIndex}
                    onUpdateModelValue={this.onUpdateModelValue}
                    hoverable
                    clickable
                    selectable
                    showDivider={false}
                  >
                    {{
                      header: () => {
                        return (
                          <ZText
                            color="neutral"
                            class={`${mergedClsPrefix}-data-table-settings__settings-list-header`}
                          >
                            {() => 'COLUMN SETTINGS'}
                          </ZText>
                        )
                      },
                      default: () => {
                        return (
                          <Fragment>
                            {settingsList.map((item) => (
                              <ZListItem value={item.key}>
                                {() => (
                                  <div
                                    class={`${mergedClsPrefix}-data-table-settings__settings-list-item`}
                                  >
                                    <ZIcon
                                      size={20}
                                      class={`${mergedClsPrefix}-data-table-settings__settings-list-item-icon`}
                                    >
                                      {() => <item.icon />}
                                    </ZIcon>
                                    <ZText
                                      class={`${mergedClsPrefix}-data-table-settings__settings-list-item-text`}
                                    >
                                      {() => item.label}
                                    </ZText>
                                  </div>
                                )}
                              </ZListItem>
                            ))}
                          </Fragment>
                        )
                      }
                    }}
                  </ZList>
                ) : this.selectedValueIndex === 'order-n-pinning' ? (
                  <ReorderingColumns
                    columns={this.columns}
                    onUpdateColumns={this.onUpdateColumnsLocal}
                    onBack={() => {
                      this.selectedValueIndex = ''
                    }}
                    onResetDefault={this.onResetReordering}
                    maxPinnedColumns={this.maxPinnedColumns}
                  />
                ) : this.selectedValueIndex === 'show-hide-column' ? (
                  <ShowHideColumns
                    columns={this.columns}
                    onUpdateColumns={this.onUpdateColumnsLocal}
                    onBack={() => {
                      this.selectedValueIndex = ''
                    }}
                    onResetDefault={this.onResetShowHide}
                  />
                ) : null}
              </div>
            )
          }
        }}
      </ZPopover>
    )
  }
})
