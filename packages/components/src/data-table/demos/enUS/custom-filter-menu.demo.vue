<markdown>
# Customize Icons

You can customize filter & filter menu & sorter & expand icon.
</markdown>

<template>
  <z-data-table
    :columns="cols"
    :data="data"
    :render-row-expand-icon="renderRowExpandIcon"
  />
</template>

<script lang="ts">
import { defineComponent, h, reactive } from 'vue'
import {
  ZButton,
  ZSpace,
  ZIcon,
  DataTableColumns,
  DataTableBaseColumn
} from '@zeta-gds/components'
import { SearchOutline, PawOutline } from '@vicons/ionicons5'

const data = [
  {
    Left: '1',
    Right: '1'
  },
  {
    Left: '2',
    Right: '2'
  }
]

export default defineComponent({
  setup () {
    const renderRowExpandIcon = () => {
      return h(ZIcon, null, { default: () => h(PawOutline) })
    }
    const filterColumn = reactive<DataTableBaseColumn>({
      title: 'Right',
      key: 'Right',
      filter: 'default',
      filterOptionValue: null,
      renderFilterIcon: () => {
        return h(ZIcon, null, { default: () => h(SearchOutline) })
      },
      renderFilterMenu: ({ hide }) => {
        return h(
          ZSpace,
          { style: { padding: '12px' }, vertical: true },
          {
            default: () => [
              h(
                ZButton,
                {
                  onClick: () => {
                    filterColumn.filterOptionValue = '1'
                  }
                },
                { default: () => 'Filter by 1' }
              ),
              h(
                ZButton,
                {
                  onClick: () => {
                    filterColumn.filterOptionValue = '2'
                  }
                },
                { default: () => 'Filter by 2' }
              ),
              h(
                ZButton,
                {
                  onClick: () => {
                    filterColumn.filterOptionValue = null
                    hide()
                  }
                },
                { default: () => 'clear' }
              )
            ]
          }
        )
      }
    })
    const colsReactive: DataTableColumns = reactive([
      {
        type: 'expand',
        renderExpand: () => {
          return 'Expand content'
        }
      },
      {
        title: 'Left',
        key: 'Left',
        sorter: 'default',
        renderSorterIcon: ({ order }) => {
          const style = 'transform: translateY(-3px);'
          if (order === false) return h('div', { style }, ['🤔'])
          if (order === 'ascend') return h('div', { style }, ['👇'])
          if (order === 'descend') return h('div', { style }, ['👆'])
        }
      },
      filterColumn
    ])

    return {
      cols: colsReactive,
      data,
      renderRowExpandIcon
    }
  }
})
</script>
