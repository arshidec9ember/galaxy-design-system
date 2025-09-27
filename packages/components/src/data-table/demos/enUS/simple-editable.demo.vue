<markdown>
# Simple Editable Table

Simple, but practical.
</markdown>

<template>
  <z-data-table :columns="columns" :data="data" :pagination="pagination" />
  <pre>{{ JSON.stringify(data, null, 2) }}</pre>
</template>

<script lang="ts">
import { h, defineComponent, ref } from 'vue'
import { ZInput } from '@zeta-gds/components'
import type { DataTableColumns } from '@zeta-gds/components'

type RowData = {
  key: number
  name: string
  age: string
  address: string
}

const createData = (): RowData[] => [
  {
    key: 0,
    name: 'John Brown',
    age: '32',
    address: 'New York No. 1 Lake Park'
  },
  {
    key: 1,
    name: 'Jim Green',
    age: '42',
    address: 'London No. 1 Lake Park'
  },
  {
    key: 2,
    name: 'Joe Black',
    age: '32',
    address: 'Sidney No. 1 Lake Park'
  }
]

export default defineComponent({
  setup () {
    const data = ref(createData())
    const createColumns = (): DataTableColumns<RowData> => [
      {
        title: 'Name',
        key: 'name',
        render (row, index) {
          return h(ZInput, {
            modelValue: row.name,
            onUpdateModelValue (v) {
              data.value[index].name = v
            }
          })
        }
      },
      {
        title: 'Age',
        key: 'age',
        render (row, index) {
          return h(ZInput, {
            modelValue: row.age,
            onUpdateModelValue (v) {
              data.value[index].age = v
            }
          })
        }
      },
      {
        title: 'Address',
        key: 'address',
        render (row, index) {
          return h(ZInput, {
            modelValue: row.address,
            onUpdateModelValue (v) {
              data.value[index].address = v
            }
          })
        }
      }
    ]
    return {
      data,
      columns: createColumns(),
      pagination: {
        pageSize: 10
      }
    }
  }
})
</script>
