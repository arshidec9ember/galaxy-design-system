import {
  defineComponent,
  ref,
  h,
  onBeforeUnmount,
  Fragment,
  watch,
  computed,
  type PropType
} from 'vue'
import { useConfig } from '../../_mixins'
import { ZList, ZListItem } from '../../list'
import { ZText } from '../../typography'
import { ZButton } from '../../button'
import { ZInput } from '../../input'
import { ZIcon } from '../../icon'
import { ZEmpty } from '../../empty'
import { ZScrollbar } from '../../scrollbar'
import {
  ArrowBackIcon,
  RestartAltIcon,
  SearchIcon,
  NoResultFoundIcon
} from '../../_internal/icons'
import {
  type TableColumns,
  type TableColumn,
  type ColumnKey
} from '../../data-table/src/interface'

export default defineComponent({
  name: 'ShowHideColumns',
  props: {
    columns: {
      type: Array as PropType<TableColumns<any>>,
      required: true
    },
    onUpdateColumns: {
      type: Function,
      default: () => {}
    },
    onBack: {
      type: Function,
      default: () => {}
    },
    onResetDefault: {
      type: Function,
      default: () => {}
    }
  },
  setup (props) {
    const { mergedClsPrefixRef } = useConfig(props)
    const columnsRef = ref<any>(props.columns)
    const searchValueRef = ref<string>('')

    const onSearch = (v: string): void => {
      searchValueRef.value = v
    }
    const selectedColumnKeys = ref<Array<ColumnKey | undefined>>(
      props.columns
        .filter((c) => c.type !== 'expand' && c.type !== 'selection')
        .filter((c) => c.visible !== false)
        .map((c) => c.key)
    )

    const totalColumns = computed((): number => {
      return props.columns.filter(
        (c) => c.type !== 'expand' && c.type !== 'selection'
      ).length
    })

    onBeforeUnmount(() => {
      props.onBack()
    })

    watch(
      () => props.columns,
      (newVal: TableColumns<any>) => {
        selectedColumnKeys.value = newVal
          .filter((c) => c.type !== 'expand' && c.type !== 'selection')
          .filter((c) => c.visible !== false)
          .map((c) => c.key)
      }
    )

    const filteredColumns = (column: TableColumn<any>): boolean => {
      if (column.type === 'selection' || column.type === 'expand') {
        return false
      }
      if (searchValueRef.value === '') {
        return true
      }
      if (typeof column.title === 'string') {
        return column.title
          .toLowerCase()
          .trim()
          .includes(searchValueRef.value.trim().toLowerCase())
      }
      return false
    }

    const onUpdateModelValue = (v: Array<ColumnKey | undefined>): void => {
      selectedColumnKeys.value = v
      const newColumns = columnsRef.value.map((c: any) => {
        if (c.type === 'expand' || c.type === 'selection') {
          return c
        }
        c.visible = selectedColumnKeys.value.includes(c.key)
        return c
      })
      props.onUpdateColumns(newColumns)
    }

    const filteredColumnsListRef = computed((): TableColumns<any> => {
      return columnsRef.value.filter(filteredColumns)
    })

    return {
      mergedClsPrefix: mergedClsPrefixRef,
      selectedColumnKeys,
      searchValue: searchValueRef,
      columns: columnsRef,
      totalColumns,
      filteredColumnsList: filteredColumnsListRef,
      onSearch,
      filteredColumns,
      onUpdateModelValue
    }
  },
  render () {
    const { selectedColumnKeys, onUpdateModelValue } = this
    return (
      <ZList
        class={`${this.mergedClsPrefix}-data-table-settings__show-hide-columns`}
        modelValue={selectedColumnKeys as string[]}
        hoverable
        clickable
        selectable
        multiple
        show-indicator
        showDivider={false}
        onUpdateModelValue={onUpdateModelValue as any}
      >
        {{
          header: () => {
            return (
              <div
                class={`${this.mergedClsPrefix}-data-table-settings__show-hide-columns-header`}
              >
                <ZButton
                  variant="subtle"
                  onClick={() => this.$props.onBack()}
                  class={`${this.mergedClsPrefix}-data-table-settings__show-hide-columns-header-back-button`}
                >
                  {() => <ZIcon>{() => <ArrowBackIcon />}</ZIcon>}
                </ZButton>
                <ZText
                  strong
                  class={`${this.mergedClsPrefix}-data-table-settings__show-hide-columns-header-title`}
                >
                  {() => 'Column: Show / Hide'}
                </ZText>
              </div>
            )
          },
          default: () => {
            return (
              <Fragment>
                <div
                  class={`${this.mergedClsPrefix}-data-table-settings__show-hide-columns-search`}
                >
                  <ZInput
                    placeholder="Search Column"
                    modelValue={this.searchValue}
                    onUpdateModelValue={this.onSearch}
                  >
                    {{
                      prefix: () => (
                        <ZIcon color={'var(--z-data-table-trigger-icon-color)'}>
                          {() => <SearchIcon />}
                        </ZIcon>
                      )
                    }}
                  </ZInput>
                </div>
                {this.filteredColumnsList.length ? (
                  <ZScrollbar
                    class={`${this.mergedClsPrefix}-data-table-settings__show-hide-columns-list-item-wrapper`}
                  >
                    {this.filteredColumnsList.map((column: any): any => (
                      <ZListItem
                        key={column.key}
                        value={column.key}
                        disabled={Boolean(column.fixed)}
                      >
                        {() => column.title || ''}
                      </ZListItem>
                    ))}
                  </ZScrollbar>
                ) : (
                  <ZEmpty
                    title={'No Column Found'}
                    showDescription={false}
                    class={`${this.mergedClsPrefix}-data-table-settings__show-hide-columns-empty`}
                  >
                    {{
                      icon: () => <ZIcon>{() => <NoResultFoundIcon />}</ZIcon>,
                      actions: () => (
                        <ZButton
                          onClick={() => {
                            this.onSearch('')
                          }}
                          size="small"
                        >
                          {() => 'Clear Search'}
                        </ZButton>
                      )
                    }}
                  </ZEmpty>
                )}
              </Fragment>
            )
          },
          footer: () => {
            return (
              <div
                class={`${this.mergedClsPrefix}-data-table-settings__show-hide-columns-footer`}
              >
                <ZButton
                  variant="subtle"
                  size="small"
                  onClick={() => {
                    this.$props.onResetDefault()
                    this.columns = this.$props.columns
                  }}
                  class={[
                    `${this.mergedClsPrefix}-data-table-settings__show-hide-columns-footer-button`
                  ]}
                  renderIcon={() => <ZIcon>{() => <RestartAltIcon />}</ZIcon>}
                >
                  {() => 'Restore Defaults'}
                </ZButton>
                <span>
                  {selectedColumnKeys.length} of {this.totalColumns} selected
                </span>
              </div>
            )
          }
        }}
      </ZList>
    )
  }
})
