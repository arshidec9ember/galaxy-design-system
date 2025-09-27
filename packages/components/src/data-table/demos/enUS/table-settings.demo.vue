<markdown>
# Settings
</markdown>

<template>
  <z-data-table
    :settings="true"
    :columns="columns"
    :data="data"
    :pagination="pagination"
    :bordered="false"
    :scroll-x="'1200px'"
  />
</template>

<script lang="ts">
import { h, defineComponent, ref } from 'vue'
import { ZButton } from '@zeta-gds/components'

const createColumns = () => {
  return [
    {
      type: 'selection',
      fixed: 'left'
    },
    {
      title: 'Name',
      key: 'name',
      width: 200
    },
    {
      title: 'Age',
      key: 'age',
      width: 100
    },
    {
      title: 'Row',
      key: 'row',
      width: 100,
      render (row, index: number) {
        return h('span', ['row ', index])
      }
    },
    {
      title: 'Row1',
      width: 100,
      key: 'row1',
      render (row, index: number) {
        return h('span', ['row ', index])
      }
    },
    {
      title: 'Row2',
      key: 'row2',
      render (_, index: number) {
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
      render (row, index: number) {
        return h(ZButton, ['Action ', index])
      },
      width: 100
    }
  ]
}

const data = Array.from({ length: 5 }).map((_, index) => ({
  key: index,
  name: `Edward King ${index}`,
  age: 32,
  address: `London, Park Lane no. ${index}, London, Park Lane no. ${index}`
}))

export default defineComponent({
  setup () {
    const columnsRef = ref<any>(createColumns())

    return {
      data,
      columns: columnsRef,
      pagination: false as const
    }
  }
})
</script>
