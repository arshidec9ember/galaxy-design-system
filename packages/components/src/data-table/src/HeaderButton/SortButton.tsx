import { defineComponent, type PropType, h, computed, inject } from 'vue'
import { ArrowUpwardIcon, ImportExportIcon } from '../../../_internal/icons'
import { ZBaseIcon } from '../../../_internal'
import { ZTooltip } from '../../../tooltip'
import { useLocale, useConfig } from '../../../_mixins'
import RenderSorter from './RenderSorter'
import { dataTableInjectionKey, type TableBaseColumn } from '../interface'

export default defineComponent({
  name: 'SortIcon',
  props: {
    column: {
      type: Object as PropType<TableBaseColumn>,
      required: true
    }
  },
  setup (props) {
    const { mergedComponentPropsRef } = useConfig()
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { mergedSortStateRef, mergedClsPrefixRef } = inject(
      dataTableInjectionKey
    )!
    const sortStateRef = computed(() =>
      mergedSortStateRef.value.find(
        (state) => state.columnKey === props.column.key
      )
    )

    const { localeRef } = useLocale('DataTable')
    const activeRef = computed(() => {
      return sortStateRef.value !== undefined
    })
    const mergedSortOrderRef = computed(() => {
      const { value: sortState } = sortStateRef
      if (sortState && activeRef.value) {
        return sortState.order
      }
      return false
    })
    const mergedRenderSorterRef = computed(() => {
      return (
        mergedComponentPropsRef?.value?.DataTable?.renderSorter ||
        props.column.renderSorter
      )
    })
    const tooltipTextRef = computed(() => {
      if (mergedSortOrderRef.value === 'ascend') {
        return localeRef.value.sortAscend
      } else if (mergedSortOrderRef.value === 'descend') {
        return localeRef.value.sortDescend
      }
      return localeRef.value.sort
    })
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      active: activeRef,
      mergedSortOrder: mergedSortOrderRef,
      mergedRenderSorter: mergedRenderSorterRef,
      tooltipText: tooltipTextRef
    }
  },
  render () {
    const {
      mergedRenderSorter,
      mergedSortOrder,
      mergedClsPrefix,
      tooltipText
    } = this
    const { renderSorterIcon } = this.column
    const sortIcon = mergedRenderSorter ? (
      <RenderSorter render={mergedRenderSorter} order={mergedSortOrder} />
    ) : (
      <span
        class={[
          `${mergedClsPrefix}-data-table-sorter`,
          mergedSortOrder === 'ascend' &&
            `${mergedClsPrefix}-data-table-sorter--asc`,
          mergedSortOrder === 'descend' &&
            `${mergedClsPrefix}-data-table-sorter--desc`
        ]}
      >
        {renderSorterIcon ? (
          renderSorterIcon({ order: mergedSortOrder })
        ) : (
          <ZBaseIcon clsPrefix={mergedClsPrefix}>
            {{
              default: () =>
                mergedSortOrder === 'ascend' ? (
                  <ArrowUpwardIcon />
                ) : mergedSortOrder === 'descend' ? (
                  <ArrowUpwardIcon />
                ) : (
                  <ImportExportIcon />
                )
            }}
          </ZBaseIcon>
        )}
      </span>
    )
    return (
      <ZTooltip placement="top">
        {{
          trigger: () => sortIcon,
          default: () => tooltipText
        }}
      </ZTooltip>
    )
  }
})
