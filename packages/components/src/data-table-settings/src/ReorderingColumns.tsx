import {
  defineComponent,
  ref,
  h,
  watch,
  onBeforeUnmount,
  type PropType,
  computed,
  nextTick,
  type VNode
} from 'vue'
import { useConfig, useLocale } from '../../_mixins'
import { ZAlert } from '../../alert'
import { ZList, ZListItem } from '../../list'
import { ZButton } from '../../button'
import { ZText } from '../../typography'
import { ZIcon } from '../../icon'
import { ZScrollbar } from '../../scrollbar'
import { ArrowBackIcon, RestartAltIcon } from '../../_internal/icons'
import DraggableItem from './DraggableItem'
import {
  type TableColumns,
  type TableColumn
} from '../../data-table/src/interface'

export default defineComponent({
  name: 'ReorderingColumns',
  props: {
    columns: {
      type: Array as PropType<TableColumns>,
      default: () => []
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
    },
    recalculateFixedColumnPositions: {
      type: Function as PropType<() => void>,
      default: null
    },
    maxPinnedColumns: {
      type: Number,
      default: Infinity
    }
  },
  setup (props) {
    const { mergedClsPrefixRef } = useConfig(props)
    const dragId = ref<string | null>(null)
    const columns = ref<any[]>(props.columns)

    const dragStartSection = ref<null | 'left' | 'unpinned' | 'right'>(null)
    const isInvalidDrag = ref(false)
    const invalidDropTargetSection = ref<null | 'left' | 'unpinned' | 'right'>(
      null
    )
    const hasShownPinLimitAlertForCurrentDrag = ref(false)
    const { localeRef } = useLocale('DataTable')
    const initiallyFixedKeys = computed(() => {
      const fixedKeys = new Set<string>()
      props.columns.forEach((col) => {
        if (col.fixed === 'left' || col.fixed === 'right') {
          if (col.key) {
            fixedKeys.add(col.key.toString())
          }
        }
      })
      return fixedKeys
    })

    const pinnedLeftColumns = computed(() =>
      columns.value.filter(
        (col) =>
          col.fixed === 'left' &&
          col.type !== 'selection' &&
          col.type !== 'expand' &&
          col.visible !== false
      )
    )

    const pinnedRightColumns = computed(() =>
      columns.value.filter(
        (col) =>
          col.fixed === 'right' &&
          col.type !== 'selection' &&
          col.type !== 'expand' &&
          col.visible !== false
      )
    )

    const unpinnedColumns = computed(() =>
      columns.value.filter(
        (col) =>
          (!col.fixed || (col.fixed !== 'left' && col.fixed !== 'right')) &&
          col.type !== 'selection' &&
          col.type !== 'expand' &&
          col.visible !== false
      )
    )

    const currentPinnedCount = computed(
      () => pinnedLeftColumns.value.length + pinnedRightColumns.value.length
    )

    const showPinLimitReachedAlert = computed(() => {
      return (
        props.maxPinnedColumns !== Infinity &&
        currentPinnedCount.value >= props.maxPinnedColumns
      )
    })

    const handleDrag = (id: string): void => {
      dragId.value = id
      hasShownPinLimitAlertForCurrentDrag.value = false
      const draggedColumn = columns.value.find((col) => col.key === id)
      if (draggedColumn) {
        if (draggedColumn.fixed === 'left') {
          dragStartSection.value = 'left'
        } else if (draggedColumn.fixed === 'right') {
          dragStartSection.value = 'right'
        } else {
          dragStartSection.value = 'unpinned'
        }
      }
    }

    const handleDragOver = (
      event: DragEvent,
      hoverSectionType: 'left' | 'unpinned' | 'right'
    ): void => {
      const sourceSectionType = dragStartSection.value

      if (
        sourceSectionType !== null &&
        sourceSectionType !== hoverSectionType
      ) {
        isInvalidDrag.value = true

        const isAttemptingToPinByDrag =
          sourceSectionType === 'unpinned' &&
          (hoverSectionType === 'left' || hoverSectionType === 'right')
        if (
          isAttemptingToPinByDrag &&
          currentPinnedCount.value >= props.maxPinnedColumns &&
          props.maxPinnedColumns !== Infinity
        ) {
          if (!hasShownPinLimitAlertForCurrentDrag.value) {
            hasShownPinLimitAlertForCurrentDrag.value = true
          }
        }
      } else {
        isInvalidDrag.value = false
        event.preventDefault()
      }
    }

    const handleDragLeave = (
      event: DragEvent,
      sectionType: 'left' | 'unpinned' | 'right'
    ): void => {
      const currentTarget = event.currentTarget as HTMLElement
      const relatedTarget = event.relatedTarget as Node | null

      if (!relatedTarget || !currentTarget.contains(relatedTarget)) {
        if (invalidDropTargetSection.value === sectionType) {
          invalidDropTargetSection.value = null
        }
      }
    }

    watch(
      columns,
      (newVal: TableColumns) => {
        props.onUpdateColumns(newVal)
      },
      { deep: true }
    )

    onBeforeUnmount(() => {
      props.onBack()
    })

    const handleDrop = (id: string): void => {
      if (!dragId.value || isInvalidDrag.value) {
        dragId.value = null
        dragStartSection.value = null
        isInvalidDrag.value = false
        return
      }

      const draggedColumnIndex = columns.value.findIndex(
        (col) => col.key === dragId.value
      )
      const dropColumnIndex = columns.value.findIndex((col) => col.key === id)

      if (draggedColumnIndex === -1 || dropColumnIndex === -1) {
        dragId.value = null
        dragStartSection.value = null
        isInvalidDrag.value = false
        return
      }

      const draggedColumn = columns.value[draggedColumnIndex]
      const dropColumn = columns.value[dropColumnIndex]

      const getSectionType = (
        col: TableColumn
      ): 'left' | 'right' | 'unpinned' => {
        if (col.fixed === 'left') return 'left'
        if (col.fixed === 'right') return 'right'
        return 'unpinned'
      }

      const dragItemSectionType = getSectionType(draggedColumn)
      const dropTargetItemSectionType = getSectionType(dropColumn)

      if (dragItemSectionType !== dropTargetItemSectionType) {
        dragId.value = null
        dragStartSection.value = null
        isInvalidDrag.value = false
        return
      }

      const newCols = [...columns.value]
      if (draggedColumnIndex !== dropColumnIndex) {
        const [movedItem] = newCols.splice(draggedColumnIndex, 1)
        newCols.splice(dropColumnIndex, 0, movedItem)
        columns.value = newCols

        void nextTick(() => {
          props.recalculateFixedColumnPositions?.()
        })
      }

      dragId.value = null
      dragStartSection.value = null
      isInvalidDrag.value = false
    }

    const onPinColumn = (
      key: string | number,
      newPosition: 'left' | 'right' | null
    ): void => {
      const currentColumnsSnapshot = [...columns.value]
      const columnIndex = currentColumnsSnapshot.findIndex(
        (col) => col.key === key
      )
      if (columnIndex === -1) return

      const columnToModify = currentColumnsSnapshot[columnIndex]
      const oldPosition = columnToModify.fixed

      if (oldPosition === newPosition) return
      const columnToMove = { ...columnToModify, fixed: newPosition }

      currentColumnsSnapshot.splice(columnIndex, 1)

      const leftPinned: TableColumns[] = []
      const unpinned: TableColumns[] = []
      const rightPinned: TableColumns[] = []

      currentColumnsSnapshot.forEach((col) => {
        if (col.key === columnToMove.key) return
        if (col.fixed === 'left') {
          leftPinned.push(col)
        } else if (col.fixed === 'right') {
          rightPinned.push(col)
        } else {
          unpinned.push(col)
        }
      })

      if (newPosition === 'left') {
        leftPinned.push(columnToMove)
      } else if (newPosition === 'right') {
        rightPinned.push(columnToMove)
      } else {
        unpinned.unshift(columnToMove)
      }

      columns.value = [...leftPinned, ...unpinned, ...rightPinned]
      void nextTick(() => {
        props.recalculateFixedColumnPositions?.()
      })
    }

    return {
      mergedClsPrefix: mergedClsPrefixRef,
      initiallyFixedKeys,
      columns,
      pinnedLeftColumns,
      unpinnedColumns,
      pinnedRightColumns,
      handleDrag,
      handleDrop,
      handleDragOver,
      handleDragLeave,
      isInvalidDrag,
      onPinColumn,
      maxPinnedColumns: props.maxPinnedColumns,
      currentPinnedCount,
      showPinLimitReachedAlert,
      localeRef
    }
  },
  render () {
    const {
      mergedClsPrefix,
      maxPinnedColumns,
      currentPinnedCount,
      showPinLimitReachedAlert
    } = this

    const alertContent = (): VNode => (
      <ZAlert
        color="error"
        class={`${mergedClsPrefix}-data-table-settings__pin-limit-alert`}
        style={{ margin: '1rem' }}
        closable
      >
        {{
          default: () => `${this.localeRef.maxPin} (${this.maxPinnedColumns}) `
        }}
      </ZAlert>
    )

    return (
      <ZList
        hoverable
        showDivider={false}
        class={`${mergedClsPrefix}-data-table-settings__reordering-columns`}
      >
        {{
          header: () => (
            <div
              class={`${mergedClsPrefix}-data-table-settings__reordering-columns-header`}
            >
              <ZButton
                variant="subtle"
                onClick={() => this.$props.onBack()}
                class={`${mergedClsPrefix}-data-table-settings__reordering-columns-header-back-button`}
              >
                {() => <ZIcon>{() => <ArrowBackIcon />}</ZIcon>}
              </ZButton>
              <ZText
                strong
                class={`${mergedClsPrefix}-data-table-settings__reordering-columns-header-title`}
              >
                {() => 'Column: Order & Pinning'}
              </ZText>
            </div>
          ),
          default: () => (
            <ZScrollbar
              class={`${mergedClsPrefix}-data-table-settings__reordering-columns-list-item-wrapper`}
            >
              {showPinLimitReachedAlert && alertContent()}{' '}
              <div
                class={`${mergedClsPrefix}-data-table-settings__reordering-section`}
                onDragover={(e) => {
                  this.handleDragOver(e, 'left')
                }}
                onDragleave={(e) => {
                  this.handleDragLeave(e, 'left')
                }}
              >
                <ZText
                  class={`${mergedClsPrefix}-data-table-settings__reordering-section-title`}
                >
                  {() =>
                    `${this.localeRef.pinLeft} (${this.pinnedLeftColumns.length})`
                  }
                </ZText>
                {this.pinnedLeftColumns.map((column) => (
                  <ZListItem
                    class={`${mergedClsPrefix}-data-table-settings__reordering-columns-list-item`}
                    key={column.key}
                  >
                    {() => (
                      <DraggableItem
                        column={column}
                        handleDrag={this.handleDrag}
                        handleDrop={this.handleDrop}
                        onPinColumn={this.onPinColumn}
                        maxPinnedColumns={maxPinnedColumns}
                        currentPinnedCount={currentPinnedCount}
                      />
                    )}
                  </ZListItem>
                ))}
              </div>
              <div
                class={`${mergedClsPrefix}-data-table-settings__reordering-section`}
                onDragover={(e) => {
                  this.handleDragOver(e, 'unpinned')
                }}
                onDragleave={(e) => {
                  this.handleDragLeave(e, 'unpinned')
                }}
              >
                <ZText
                  class={`${mergedClsPrefix}-data-table-settings__reordering-section-title`}
                >
                  {() =>
                    `${this.localeRef.unPin} (${this.unpinnedColumns.length})`
                  }
                </ZText>
                {this.unpinnedColumns.map((column) => (
                  <ZListItem
                    class={`${mergedClsPrefix}-data-table-settings__reordering-columns-list-item`}
                    key={column.key}
                  >
                    {() => (
                      <DraggableItem
                        column={column}
                        handleDrag={this.handleDrag}
                        handleDrop={this.handleDrop}
                        onPinColumn={this.onPinColumn}
                        maxPinnedColumns={this.maxPinnedColumns}
                        currentPinnedCount={currentPinnedCount}
                      />
                    )}
                  </ZListItem>
                ))}
              </div>
              <div
                class={`${mergedClsPrefix}-data-table-settings__reordering-section`}
                onDragover={(e) => {
                  this.handleDragOver(e, 'right')
                }}
                onDragleave={(e) => {
                  this.handleDragLeave(e, 'right')
                }}
              >
                <ZText
                  class={`${mergedClsPrefix}-data-table-settings__reordering-section-title`}
                >
                  {() =>
                    `${this.localeRef.pinRight} (${this.pinnedRightColumns.length})`
                  }
                </ZText>
                {this.pinnedRightColumns.map((column) => (
                  <ZListItem
                    class={`${mergedClsPrefix}-data-table-settings__reordering-columns-list-item`}
                    key={column.key}
                  >
                    {() => (
                      <DraggableItem
                        column={column}
                        handleDrag={this.handleDrag}
                        handleDrop={this.handleDrop}
                        onPinColumn={this.onPinColumn}
                        maxPinnedColumns={this.maxPinnedColumns}
                        currentPinnedCount={currentPinnedCount}
                      />
                    )}
                  </ZListItem>
                ))}
              </div>
            </ZScrollbar>
          ),
          footer: () => (
            <div
              class={`${mergedClsPrefix}-data-table-settings__reordering-columns-footer`}
            >
              <ZButton
                variant="subtle"
                onClick={() => {
                  this.$props.onResetDefault()
                  this.columns = [...this.$props.columns]
                }}
                class={`${mergedClsPrefix}-data-table-settings__reordering-columns-footer-button`}
                renderIcon={() => <ZIcon>{() => <RestartAltIcon />}</ZIcon>}
              >
                {() => 'Restore Defaults'}
              </ZButton>
            </div>
          )
        }}
      </ZList>
    )
  }
})
