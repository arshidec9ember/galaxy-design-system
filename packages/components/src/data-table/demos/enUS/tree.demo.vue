<markdown>
# Tree data

Set `children` in row data to show tree data. If you want to use other key to get children, you can set another `children-key`.
</markdown>

<template>
  <z-data-table
    :columns="columns"
    :data="data"
    :row-key="rowKey"
    default-expand-all
    :scroll-x="'150%'"
  />
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'
import {
  DataTableColumns,
  ZAvatar,
  ZRating,
  ZLink,
  ZTag,
  ZIcon
} from '@zeta-gds/components'
import { Email } from '@zeta/icons'

type RowData = {
  index: number
  name: string
  avatar: string
  website: string
  rating: number
  email: string
  phoneNumber: string
  children?: RowData[]
}
export default defineComponent({
  setup () {
    const data: RowData[] = [
      {
        index: 1,
        name: 'Harry Padilla',
        avatar: 'https://avatars.githubusercontent.com/u/20698600?v=4',
        website: 'http://safuvtav.hu/ewofu',
        rating: 4,
        email: 'harry@gmail.com',
        phoneNumber: '+1 (555) 555-5555',
        children: [
          {
            index: 2,
            name: 'Maurice Gomez',
            avatar: 'https://avatars.githubusercontent.com/u/20698383?v=4',
            website: 'http://alwat.bo/vojuvubi',
            rating: 3.5,
            email: 'maurice@gmail.com',
            phoneNumber: '+1 (555) 555-5555',
            children: [
              {
                index: 3,
                name: 'Brandon Greene',
                avatar: 'https://avatars.githubusercontent.com/u/20698637?v=4',
                website: 'http://vo.sj/rejij',
                rating: 2,
                email: 'brandon@gmail.com',
                phoneNumber: '+1 (555) 555-5555'
              },
              {
                index: 4,
                name: 'Minnie Wise',
                avatar: 'https://avatars.githubusercontent.com/u/20698837?v=4',
                website: 'http://vo.sj/feyuefr',
                rating: 4.5,
                email: 'Minnie@gmail.com',
                phoneNumber: '+1 (555) 555-5555'
              }
            ]
          }
        ]
      },
      {
        index: 5,
        name: 'Allen Henderson',
        avatar: 'https://avatars.githubusercontent.com/u/20698388?v=4',
        website: 'http://vo.sj/frbjrjber',
        rating: 3.5,
        email: 'allen@gmail.com',
        phoneNumber: '+1 (555) 555-5555'
      },
      {
        index: 6,
        name: 'Mike Cain',
        avatar: 'https://avatars.githubusercontent.com/u/20698939?v=4',
        website: 'http://vo.sj/feyufehuerefr',
        rating: 4,
        email: 'mike@gmail.com',
        phoneNumber: '+91 (555) 555-5555'
      }
    ]
    const columns: DataTableColumns<RowData> = [
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
        title: 'avatar + name',
        key: 'avatar',
        width: 250,
        render (rowData) {
          return h(
            'div',
            {
              style: {
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }
            },
            [
              h(ZAvatar, {
                round: true,
                src: rowData.avatar,
                size: 22
              }),
              h(
                'div',
                {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }
                },
                [
                  h('div', {}, [
                    h('span', rowData.name),
                    h(
                      'div',
                      {
                        style: {
                          color: 'var(--gds-color-text-neutral-light2)'
                        }
                      },
                      'Write description'
                    )
                  ]),
                  h(ZTag, { color: 'primary' }, 'Tag1'),
                  h(
                    ZIcon,
                    { color: 'var(--gds-color-icon-neutral)', size: '16px' },
                    () => h(Email)
                  )
                ]
              )
            ]
          )
        }
      },
      {
        title: 'website',
        key: 'website',
        render (rowData) {
          return h(
            ZLink,
            {
              href: rowData.website,
              target: '_blank'
            },
            rowData.website
          )
        }
      },
      {
        title: 'rating',
        key: 'rating',
        render (rowData) {
          return h(ZRating, {
            readonly: true,
            defaultModelValue: rowData.rating
          })
        }
      },
      {
        title: 'email',
        key: 'email',
        render (rowData) {
          return h(
            ZLink,
            {
              href: `mailto:${rowData.email}`
            },
            rowData.email
          )
        }
      },
      {
        title: 'phone Number',
        key: 'phoneNumber'
      }
    ]
    return {
      rowKey: (row: RowData) => row.index,
      columns,
      data
    }
  }
})
</script>
