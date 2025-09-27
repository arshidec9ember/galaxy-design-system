<markdown>
# Async expand tree data

Change data in `onLoad` prop.
</markdown>

<template>
  <z-data-table
    :columns="columns"
    :data="data"
    :cascade="false"
    allow-checking-not-loaded
    :scroll-x="'150%'"
    @load="onLoad"
  />
</template>

<script lang="ts">
import { defineComponent, h, ref } from 'vue'
import { DataTableColumns, ZAvatar, ZRating, ZLink } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const columns: DataTableColumns = [
      {
        type: 'selection',
        fixed: 'left'
      },
      {
        title: 'name',
        key: 'name',
        fixed: 'left'
      },
      {
        title: 'avatar',
        key: 'avatar',
        render (rowData) {
          if (rowData.avatar) {
            return h(ZAvatar, {
              round: true,
              src: rowData.avatar as string,
              size: 22
            })
          }
          return null
        }
      },
      {
        title: 'website',
        key: 'website',
        render (rowData: Record<string, any>) {
          if (rowData.website) {
            return h(
              ZLink,
              {
                href: rowData.website,
                target: '_blank'
              },
              rowData.website
            )
          }
          return null
        }
      },
      {
        title: 'rating',
        key: 'rating',
        render (rowData: Record<string, any>) {
          if (rowData.rating) {
            return h(ZRating, {
              readonly: true,
              defaultModelValue: rowData.rating
            })
          }
          return null
        }
      },
      {
        title: 'email',
        key: 'email',
        render (rowData: Record<string, any>) {
          if (rowData.email) {
            return h(
              ZLink,
              {
                href: `mailto:${rowData.email}`
              },
              rowData.email
            )
          }
          return null
        }
      },
      {
        title: 'phone Number',
        key: 'phoneNumber'
      }
    ]
    const dataRef = ref([
      { key: '123', name: 'Harry Padilla', isLeaf: false },
      { key: '1234', name: 'Allen Henderson', isLeaf: false },
      { key: '1238', name: 'Mike Cain', isLeaf: false }
    ])
    return {
      columns,
      data: dataRef,
      onLoad (row: Record<string, unknown>) {
        return new Promise<void>((resolve) => {
          setTimeout(() => {
            row.children = [
              {
                key: row.key + '-1',
                index: row.index + '-1',
                name: 'Brandon Greene',
                avatar: 'https://avatars.githubusercontent.com/u/20698637?v=4',
                website: 'http://vo.sj/rejij',
                rating: 2,
                email: 'brandon@gmail.com',
                phoneNumber: '+1 (555) 555-5555'
              }
            ]
            resolve()
          }, 1000)
        })
      }
    }
  }
})
</script>
