<markdown>
# Sticky actions
</markdown>

<template>
  <z-data-table
    :settings="true"
    :columns="columns"
    :data="data"
    :pagination="pagination"
    :bordered="false"
    :scroll-x="'1200px'"
    :row-props="rowProps"
  />
</template>

<script lang="ts">
import { h, defineComponent, ref, Ref } from 'vue'
import { ZButton, ZIcon } from '@zeta-gds/components'
import { TrashIcon, MoreVertical } from '../../../_internal/icons'

interface RowData {
  key: number
  name: string
  age: number
  address: string
}

const createColumns = (hoveredRowKey: Ref<number | null>) => {
  return [
    {
      type: 'selection',
      fixed: 'left'
    },
    {
      title: 'Name',
      key: 'name',
      width: 200,
      fixed: 'left'
    },
    {
      title: 'Age',
      key: 'age',
      width: 100,
      fixed: 'left'
    },
    {
      title: 'Row',
      key: 'row',
      width: 100,
      render (row: RowData, index: number) {
        return h('span', ['row ', index])
      }
    },
    {
      title: 'Row1',
      width: 100,
      key: 'row1',
      render (row: RowData, index: number) {
        return h('span', ['row ', index])
      }
    },
    {
      title: 'Row2',
      key: 'row2',
      render (_: RowData, index: number) {
        return h('span', ['row ', index])
      },
      width: 100
    },
    {
      title: 'Address',
      key: 'address',
      width: 200,
      ellipsis: {
        tooltip: true
      }
    },
    {
      title: 'Actions',
      key: 'action',
      render (row: RowData) {
        const actionButtons = [
          h(ZButton, {
            size: 'x-small',
            renderIcon: () => h(ZIcon, { component: MoreVertical })
          })
        ]
        if (hoveredRowKey.value === row.key) {
          actionButtons.push(
            h(ZButton, {
              size: 'x-small',
              renderIcon: () => h(ZIcon, { component: TrashIcon })
            })
          )
        }
        return h(
          'div',
          {
            style: 'display: flex; gap: 8px;'
          },
          actionButtons
        )
      },
      width: 100,
      fixed: 'right'
    }
  ]
}

const data: RowData[] = Array.from({ length: 5 }).map((_, index) => ({
  key: index,
  name: `Edward King ${index}`,
  age: 32,
  address: `London, Park Lane no. ${index}, London, Park Lane no. ${index}`
}))

export default defineComponent({
  setup () {
    const hoveredRowKey = ref<number | null>(null)
    const columnsRef = ref<any>(createColumns(hoveredRowKey))

    function onUpdateColumns (columns: any): any {
      columnsRef.value = columns
    }

    const rowProps = (row: RowData) => {
      return {
        onMouseenter: () => {
          hoveredRowKey.value = row.key
        },
        onMouseleave: () => {
          hoveredRowKey.value = null
        }
      }
    }

    return {
      data,
      columns: columnsRef,
      onUpdateColumns,
      pagination: false as const,
      rowProps
    }
  }
})
</script>
