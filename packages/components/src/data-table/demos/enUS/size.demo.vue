<markdown>
# Size
</markdown>

<template>
  <z-space vertical :size="12">
    <z-radio-group v-model="size">
      <z-radio-button
        v-for="s in ['small', 'medium', 'large']"
        :key="s"
        :value="s"
      >
        {{ s }}
      </z-radio-button>
    </z-radio-group>
    <z-data-table
      :size="size"
      :columns="columns"
      :data="data"
      :pagination="pagination"
    />
  </z-space>
</template>

<script lang="ts">
import { h, defineComponent, ref } from 'vue'
import { ZTag, ZButton, useMessage } from '@zeta-gds/components'
import type { DataTableColumns } from '@zeta-gds/components'

type RowData = {
  key: number
  name: string
  age: number
  address: string
  tags: string[]
}

const createColumns = ({
  sendMail
}: {
  sendMail: (rowData: RowData) => void
}): DataTableColumns<RowData> => {
  return [
    {
      title: 'Name',
      key: 'name'
    },
    {
      title: 'Age',
      key: 'age'
    },
    {
      title: 'Address',
      key: 'address'
    },
    {
      title: 'Tags',
      key: 'tags',
      render (row) {
        const tags = row.tags.map((tagKey) => {
          return h(
            ZTag,
            {
              style: {
                marginRight: '6px'
              },
              type: 'info',
              bordered: false
            },
            {
              default: () => tagKey
            }
          )
        })
        return tags
      }
    },
    {
      title: 'Action',
      key: 'actions',
      render (row) {
        return h(
          ZButton,
          {
            size: 'small',
            onClick: () => sendMail(row)
          },
          { default: () => 'Send Email' }
        )
      }
    }
  ]
}

const createData = (): RowData[] => [
  {
    key: 0,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer']
  },
  {
    key: 1,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['wow']
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  }
]

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      size: ref('small'),
      data: createData(),
      columns: createColumns({
        sendMail (rowData) {
          message.info('send mail to ' + rowData.name)
        }
      }),
      pagination: {
        pageSize: 10
      }
    }
  }
})
</script>
