<markdown>
# Customized cell rendering

You may use `render-cell` to customize empty state.
</markdown>

<template>
  <z-data-table :columns="columns" :data="data" :render-cell="renderCell" />
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'
import { ZTag, ZText } from '@zeta-gds/components'
import type { DataTableColumns } from '@zeta-gds/components'

type Song = {
  no: number
  note: string
  title: string
}

const createColumns = (): DataTableColumns<Song> => {
  return [
    {
      title: 'Date',
      key: 'no',
      width: 120,
      render: (_, index) => {
        return index + 1
      }
    },
    {
      title: 'Note',
      key: 'note'
    },
    {
      title: 'Title',
      key: 'title'
    },
    {
      title: 'Tags',
      key: 'tags',
      render: (rowData) => {
        return h(
          ZTag,
          {
            type: rowData.no % 2 === 0 ? 'success' : 'error'
          },
          {
            default: () => {
              return rowData.no % 2 === 0 ? 'Success' : 'Error'
            }
          }
        )
      }
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: () => {
        return h('div', 'Actions')
      }
    }
  ]
}

const data: Song[] = [
  { no: 1, note: 'Note 1', title: 'Song 1' },
  { no: 2, note: '', title: 'Song 2' },
  { no: 3, note: '', title: 'Song 3' },
  { no: 4, note: 'Note 4', title: 'Song 4' },
  { no: 5, note: '', title: 'Song 5' }
]

export default defineComponent({
  setup () {
    return {
      data,
      columns: createColumns(),
      pagination: false as const,
      renderCell: (
        value: string | number,
        _rowData: Song,
        _columnInfo: Record<string, any>
      ) => {
        if (!value) {
          return h(
            ZText,
            { depth: 3, italic: true, size: 'small', underline: true },
            { default: () => '< Data Not Found >' }
          )
        }
        return value
      }
    }
  }
})
</script>
