import {
  h,
  computed,
  defineComponent,
  ref,
  provide,
  toRef,
  type CSSProperties,
  Transition,
  watchEffect
} from 'vue'
import { createId } from 'seemly'
import { useConfig, useLocale, useTheme, useThemeClass } from '../../_mixins'
import { ZBaseLoading } from '../../_internal'
import { ZPagination } from '../../pagination'
import { createKey, resolveSlot, warnOnce } from '../../_utils'
import { dataTableLight } from '../styles'
import MainTable from './MainTable'
import { useCheck } from './use-check'
import { useTableData } from './use-table-data'
import { useScroll } from './use-scroll'
import { useResizable } from './use-resizable'
import type { RowKey, MainTableRef, DataTableInst } from './interface'
import { dataTableInjectionKey, dataTableProps } from './interface'
import { useGroupHeader } from './use-group-header'
import { useExpand } from './use-expand'
import style from './styles/index.cssr'
import { ZDataTableSettings } from '../../data-table-settings'

export default defineComponent({
  name: 'DataTable',
  alias: ['AdvancedTable'],
  props: dataTableProps,
  setup (props, { slots }) {
    if (__DEV__) {
      watchEffect(() => {
        if (props.onPageChange !== undefined) {
          warnOnce(
            'data-table',
            '`on-page-change` is deprecated, please use `on-update:page` instead.'
          )
        }
        if (props.onPageSizeChange !== undefined) {
          warnOnce(
            'data-table',
            '`on-page-size-change` is deprecated, please use `on-update:page-size` instead.'
          )
        }
        if (props.onSorterChange !== undefined) {
          warnOnce(
            'data-table',
            '`on-sorter-change` is deprecated, please use `on-update:sorter` instead.'
          )
        }
        if (props.onFiltersChange !== undefined) {
          warnOnce(
            'data-table',
            '`on-filters-change` is deprecated, please use `on-update:filters` instead.'
          )
        }
        if (props.onCheckedRowKeysChange !== undefined) {
          warnOnce(
            'data-table',
            '`on-checked-row-keys-change` is deprecated, please use `on-update:checked-row-keys` instead.'
          )
        }
      })
    }

    const { mergedBorderedRef, mergedClsPrefixRef, inlineThemeDisabled } =
      useConfig(props)
    const mergedBottomBorderedRef = computed(() => {
      const { bottomBordered } = props
      // do not add bottom bordered class if bordered is true
      // since border is displayed on wrapper
      if (mergedBorderedRef.value) return false
      if (bottomBordered !== undefined) return bottomBordered
      return true
    })
    const themeRef = useTheme(
      'DataTable',
      '-data-table',
      style,
      dataTableLight,
      props,
      mergedClsPrefixRef
    )
    const bodyWidthRef = ref<number | null>(null)
    const mainTableInstRef = ref<MainTableRef | null>(null)
    const { getResizableWidth, clearResizableWidth, doUpdateResizableWidth } =
      useResizable()
    const columnsValueRef = ref<any>(props.columns)

    const { rowsRef, colsRef, dataRelatedColsRef, hasEllipsisRef } =
      useGroupHeader(columnsValueRef, getResizableWidth)

    const {
      treeMateRef,
      mergedCurrentPageRef,
      paginatedDataRef,
      rawPaginatedDataRef,
      selectionColumnRef,
      hoverKeyRef,
      mergedPaginationRef,
      mergedFilterStateRef,
      mergedSortStateRef,
      childTriggerColIndexRef,
      doUpdatePage,
      doUpdateFilters,
      onUnstableColumnResize,
      deriveNextSorter,
      filter,
      filters,
      clearFilter,
      clearFilters,
      clearSorter,
      page,
      sort
    } = useTableData(props, { dataRelatedColsRef })
    const {
      doCheckAll,
      doUncheckAll,
      doCheck,
      doUncheck,
      headerCheckboxDisabledRef,
      someRowsCheckedRef,
      allRowsCheckedRef,
      mergedCheckedRowKeySetRef,
      mergedInderminateRowKeySetRef
    } = useCheck(props, {
      selectionColumnRef,
      treeMateRef,
      paginatedDataRef
    })
    const {
      stickyExpandedRowsRef,
      mergedExpandedRowKeysRef,
      renderExpandRef,
      expandableRef,
      doUpdateExpandedRowKeys
    } = useExpand(props, treeMateRef)
    const {
      handleTableBodyScroll,
      handleTableHeaderScroll,
      syncScrollState,
      setHeaderScrollLeft,
      leftActiveFixedColKeyRef,
      leftActiveFixedChildrenColKeysRef,
      rightActiveFixedColKeyRef,
      rightActiveFixedChildrenColKeysRef,
      leftFixedColumnsRef,
      recalculateFixedPositions,
      rightFixedColumnsRef,
      fixedColumnLeftMapRef,
      fixedColumnRightMapRef
    } = useScroll(props, {
      bodyWidthRef,
      mainTableInstRef,
      mergedCurrentPageRef,
      columnsValueRef
    })
    const { localeRef } = useLocale('DataTable')
    const mergedTableLayoutRef = computed(() => {
      // Layout
      // virtual |descrete header | ellpisis => fixed
      //    = virtual | maxHeight | ellpisis => fixed
      if (
        props.virtualScroll ||
        props.flexHeight ||
        props.maxHeight !== undefined ||
        hasEllipsisRef.value
      ) {
        return 'fixed'
      }
      return props.tableLayout
    })
    provide(dataTableInjectionKey, {
      props,
      treeMateRef,
      renderExpandIconRef: toRef(props, 'renderRowExpandIcon'),
      loadingKeySetRef: ref(new Set<RowKey>()),
      slots,
      indentRef: toRef(props, 'indent'),
      childTriggerColIndexRef,
      bodyWidthRef,
      componentId: createId(),
      hoverKeyRef,
      mergedClsPrefixRef,
      mergedThemeRef: themeRef,
      scrollXRef: computed(() => props.scrollX),
      rowsRef,
      colsRef,
      paginatedDataRef,
      leftActiveFixedColKeyRef,
      leftActiveFixedChildrenColKeysRef,
      rightActiveFixedColKeyRef,
      rightActiveFixedChildrenColKeysRef,
      leftFixedColumnsRef,
      rightFixedColumnsRef,
      fixedColumnLeftMapRef,
      fixedColumnRightMapRef,
      mergedCurrentPageRef,
      someRowsCheckedRef,
      allRowsCheckedRef,
      mergedSortStateRef,
      mergedFilterStateRef,
      loadingRef: toRef(props, 'loading'),
      hasErrorRef: toRef(props, 'hasError'),
      rowClassNameRef: toRef(props, 'rowClassName'),
      mergedCheckedRowKeySetRef,
      mergedExpandedRowKeysRef,
      mergedInderminateRowKeySetRef,
      localeRef,
      expandableRef,
      stickyExpandedRowsRef,
      rowKeyRef: toRef(props, 'rowKey'),
      renderExpandRef,
      summaryRef: toRef(props, 'summary'),
      virtualScrollRef: toRef(props, 'virtualScroll'),
      rowPropsRef: toRef(props, 'rowProps'),
      stripedRef: toRef(props, 'striped'),
      checkOptionsRef: computed(() => {
        const { value: selectionColumn } = selectionColumnRef
        return selectionColumn?.options
      }),
      rawPaginatedDataRef,
      filterMenuCssVarsRef: computed(() => {
        const {
          self: { actionDividerColor, actionPadding, actionButtonMargin }
        } = themeRef.value
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        return {
          '--z-action-padding': actionPadding,
          '--z-action-button-margin': actionButtonMargin,
          '--z-action-divider-color': actionDividerColor
        } as CSSProperties
      }),
      onLoadRef: toRef(props, 'onLoad'),
      mergedTableLayoutRef,
      maxHeightRef: toRef(props, 'maxHeight'),
      minHeightRef: toRef(props, 'minHeight'),
      flexHeightRef: toRef(props, 'flexHeight'),
      headerCheckboxDisabledRef,
      paginationBehaviorOnFilterRef: toRef(props, 'paginationBehaviorOnFilter'),
      summaryPlacementRef: toRef(props, 'summaryPlacement'),
      scrollbarPropsRef: toRef(props, 'scrollbarProps'),
      syncScrollState,
      doUpdatePage,
      doUpdateFilters,
      getResizableWidth,
      onUnstableColumnResize,
      clearResizableWidth,
      doUpdateResizableWidth,
      deriveNextSorter,
      doCheck,
      doUncheck,
      doCheckAll,
      doUncheckAll,
      doUpdateExpandedRowKeys,
      handleTableHeaderScroll,
      handleTableBodyScroll,
      setHeaderScrollLeft,
      renderCell: toRef(props, 'renderCell')
    })
    const exposedMethods: DataTableInst = {
      filter,
      filters,
      clearFilters,
      clearSorter,
      page,
      sort,
      clearFilter,
      scrollTo: (arg0: any, arg1?: any) => {
        mainTableInstRef.value?.scrollTo(arg0, arg1)
      }
    }
    const cssVarsRef = computed(() => {
      const { size } = props
      const {
        common: { cubicBezierEaseInOut },
        self: {
          borderColor,
          tdColorHover,
          thColor,
          thColorHover,
          tdColor,
          tdTextColor,
          trBackgroundColorSelected,
          thTextColor,
          thDescriptionTextColor,
          thFontWeight,
          thButtonColorHover,
          thIconColor,
          thIconColorActive,
          filterSize,
          borderRadius,
          lineHeight,
          tdColorDisabled,
          tdColorModal,
          thColorModal,
          borderColorModal,
          thColorHoverModal,
          tdColorHoverModal,
          borderColorPopover,
          thColorPopover,
          tdColorPopover,
          tdColorHoverPopover,
          thColorHoverPopover,
          paginationMargin,
          emptyPadding,
          errorPadding,
          boxShadowAfter,
          boxShadowBefore,
          boxShadowExpanded,
          expandedBackgroundColor,
          sorterSize,
          resizableContainerSize,
          resizableSize,
          loadingColor,
          loadingSize,
          opacityLoading,
          tdColorStriped,
          tdColorStripedModal,
          tdColorStripedPopover,
          [createKey('fontSize', size)]: fontSize,
          [createKey('thPadding', size)]: thPadding,
          [createKey('tdPadding', size)]: tdPadding
        }
      } = themeRef.value
      return {
        '--z-font-size': fontSize,
        '--z-th-padding': thPadding,
        '--z-td-padding': tdPadding,
        '--z-bezier': cubicBezierEaseInOut,
        '--z-border-radius': borderRadius,
        '--z-line-height': lineHeight,
        '--z-border-color': borderColor,
        '--z-border-color-modal': borderColorModal,
        '--z-border-color-popover': borderColorPopover,
        '--z-th-white-space': hasEllipsisRef.value ? 'nowrap' : 'normal',
        '--z-th-color': thColor,
        '--z-th-color-hover': thColorHover,
        '--z-th-color-modal': thColorModal,
        '--z-th-color-hover-modal': thColorHoverModal,
        '--z-th-color-popover': thColorPopover,
        '--z-th-description-text-color': thDescriptionTextColor,
        '--z-th-color-hover-popover': thColorHoverPopover,
        '--z-td-color': tdColor,
        '--z-td-color-hover': tdColorHover,
        '--z-td-color-modal': tdColorModal,
        '--z-td-color-hover-modal': tdColorHoverModal,
        '--z-td-color-popover': tdColorPopover,
        '--z-td-color-hover-popover': tdColorHoverPopover,
        '--z-th-text-color': thTextColor,
        '--z-td-text-color': tdTextColor,
        '--z-th-font-weight': thFontWeight,
        '--z-th-button-color-hover': thButtonColorHover,
        '--z-th-icon-color': thIconColor,
        '--z-th-icon-color-active': thIconColorActive,
        '--z-filter-size': filterSize,
        '--z-pagination-margin': paginationMargin,
        '--z-empty-padding': emptyPadding,
        '--z-error-padding': errorPadding,
        '--z-box-shadow-before': boxShadowBefore,
        '--z-box-shadow-after': boxShadowAfter,
        '--z-box-shadow-expanded': boxShadowExpanded,
        '--z-expanded-background-color': expandedBackgroundColor,
        '--z-sorter-size': sorterSize,
        '--z-resizable-container-size': resizableContainerSize,
        '--z-resizable-size': resizableSize,
        '--z-loading-size': loadingSize,
        '--z-loading-color': loadingColor,
        '--z-opacity-loading': opacityLoading,
        '--z-td-color-striped': tdColorStriped,
        '--z-td-color-disabled': tdColorDisabled,
        '--z-td-color-striped-modal': tdColorStripedModal,
        '--z-td-color-striped-popover': tdColorStripedPopover,
        '--z-tr-background-color-selected': trBackgroundColorSelected,
        '--z-tr-background-color-selected-hover': thIconColorActive
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'data-table',
        computed(() => props.size[0]),
        cssVarsRef,
        props
      )
      : undefined
    const mergedShowPaginationRef = computed(() => {
      if (!props.pagination) return false
      if (props.paginateSinglePage) return true
      const mergedPagination = mergedPaginationRef.value
      const { pageCount } = mergedPagination
      if (pageCount !== undefined) return pageCount > 1
      return (
        mergedPagination.itemCount &&
        mergedPagination.pageSize &&
        mergedPagination.itemCount > mergedPagination.pageSize
      )
    })

    const updateColumnsValueRef = (cols: any): any => {
      columnsValueRef.value = cols
      const { colsRef: groupedColsRef } = useGroupHeader(
        ref(cols),
        getResizableWidth
      )
      colsRef.value.splice(0, colsRef.value.length, ...groupedColsRef.value)

      recalculateFixedPositions()
    }

    return {
      mainTableInstRef,
      columnsValueRef,
      settings: props.settings,
      updateColumnsValueRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedTheme: themeRef,
      paginatedData: paginatedDataRef,
      mergedBordered: mergedBorderedRef,
      mergedBottomBordered: mergedBottomBorderedRef,
      mergedPagination: mergedPaginationRef,
      mergedShowPagination: mergedShowPaginationRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender,
      ...exposedMethods
    }
  },
  render () {
    const {
      mergedClsPrefix,
      themeClass,
      onRender,
      $slots,
      spinnerProps,
      settings
    } = this
    onRender?.()
    return (
      <div
        class={[
          `${mergedClsPrefix}-data-table`,
          themeClass,
          {
            [`${mergedClsPrefix}-data-table--bordered`]: this.mergedBordered,
            [`${mergedClsPrefix}-data-table--bottom-bordered`]:
              this.mergedBottomBordered,
            [`${mergedClsPrefix}-data-table--hide-column-separator`]:
              !this.columnSeparator,
            [`${mergedClsPrefix}-data-table--hide-row-separator`]:
              !this.rowSeparator,
            [`${mergedClsPrefix}-data-table--loading`]: this.loading,
            [`${mergedClsPrefix}-data-table--error`]: this.hasError,
            [`${mergedClsPrefix}-data-table--flex-height`]: this.flexHeight
          }
        ]}
        style={this.cssVars as CSSProperties}
      >
        <div class={`${mergedClsPrefix}-data-table-wrapper`}>
          {settings && (
            <div class={`${mergedClsPrefix}-data-table-settings`}>
              <ZDataTableSettings
                columns={this.columnsValueRef}
                onUpdateColumns={this.updateColumnsValueRef}
                maxPinnedColumns={this.maxPinnedColumns}
              ></ZDataTableSettings>
            </div>
          )}
          <MainTable ref="mainTableInstRef" />
        </div>
        {this.mergedShowPagination ? (
          <div class={`${mergedClsPrefix}-data-table__pagination`}>
            <ZPagination
              theme={this.mergedTheme.peers.Pagination}
              themeOverrides={this.mergedTheme.peerOverrides.Pagination}
              disabled={this.loading}
              {...this.mergedPagination}
            />
          </div>
        ) : null}
        <Transition name="fade-in-scale-up-transition">
          {{
            default: () => {
              return this.loading ? (
                <div class={`${mergedClsPrefix}-data-table-loading-wrapper`}>
                  {resolveSlot($slots.loading, () => [
                    <ZBaseLoading
                      clsPrefix={mergedClsPrefix}
                      strokeWidth={20}
                      {...spinnerProps}
                    />
                  ])}
                </div>
              ) : null
            }
          }}
        </Transition>
      </div>
    )
  }
})
