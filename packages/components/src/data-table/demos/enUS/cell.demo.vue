<markdown>
    # Cell Demo
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
import { ZButton, ZTag, ZIcon, ZA } from '@zeta-gds/components'
import { Email } from '@zeta/icons'
import {
  PersonCircleOutline as UserIcon
  // Pencil as EditIcon,
  // LogOutOutline as LogoutIcon
} from '@vicons/ionicons5'

const renderIcon = (icon: any) => () =>
  h(ZIcon, null, {
    default: () => h(icon)
  })

const createColumns = () => {
  return [
    {
      type: 'selection',
      fixed: 'left'
    },
    {
      title: 'Name',
      key: 'name',
      width: 200,
      fixed: 'left',
      icon: renderIcon(UserIcon),
      render (row) {
        return [
          h('div', row.name),
          h(
            'div',
            {
              style: { color: 'var(--gds-color-text-neutral-light2)' }
            },
            'Write description'
          )
        ]
      }
    },
    {
      title: 'Link',
      key: 'link',
      width: 150,
      render (row) {
        return h(
          ZA,
          {
            href: `https://example.com/${row.key}`,
            target: '_blank',
            style: { color: 'var(--gds-color-text-primary)' }
          },
          row.link
        )
      }
    },
    {
      title: 'Phone No',
      key: 'phone',
      width: 150,
      align: 'right',
      render (row: { phone: string }) {
        return h('div', {}, [
          h(
            'span',
            {
              style: { color: 'var(--gds-color-text-neutral-light2)' }
            },
            '+91 '
          ),
          h('span', row.phone)
        ])
      }
    },
    {
      title: 'Tags',
      key: 'tags',
      width: 200,
      render (row) {
        return h('div', { style: { display: 'flex', gap: '4px' } }, [
          h(ZTag, { color: 'primary' }, 'Tag1'),
          h(ZTag, { color: 'warning' }, 'Tag2'),
          h(ZTag, { color: 'error' }, 'Tag3')
        ])
      }
    },
    {
      title: 'Email',
      key: 'email',
      width: 200,
      render (row) {
        return h(
          'span',
          {
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }
          },
          [
            h(
              'div',
              { style: { display: 'flex', alignItems: 'center', gap: '4px' } },
              [h(ZIcon, {}, () => h(Email)), h('span', row.email)]
            ),
            h(ZIcon, {}, () => h(Email))
          ]
        )
      }
    },
    {
      title: 'Amount',
      key: 'amount',
      align: 'right',
      render (_, index: number) {
        return [
          h('span', ['50', index]),
          h(
            'span',
            {
              style: { color: 'var(--gds-color-text-neutral-light2)' }
            },
            ' USD'
          )
        ]
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
      width: 200,
      fixed: 'right'
    }
  ]
}

const data = Array.from({ length: 5 }).map((_, index) => ({
  key: index,
  name: `Edward King ${index}`,
  link: 'Link to profile',
  phone: '1234567890',
  email: '@zeta.tech',
  address: `London, Park Lane no. ${index}, London, Park Lane no. ${index}`
}))

export default defineComponent({
  setup () {
    const columnsRef = ref<any>(createColumns())

    function onUpdateColumns (columns: any): any {
      columnsRef.value = columns
    }
    return {
      data,
      columns: columnsRef,
      onUpdateColumns,
      pagination: false as const
    }
  }
})
</script>

<style>
:deep(.action-button) {
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}

:deep(.email-cell:hover .action-button) {
  opacity: 1;
}
</style>
