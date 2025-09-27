<markdown>
  # Basic
  </markdown>

<template>
  <z-data-table
    :columns="columns"
    :data="data"
    :pagination="pagination"
    :bordered="false"
    :row-class-name="rowClassName"
  />
</template>

<script lang="ts">
import { h, defineComponent } from 'vue'
import {
  ZButton,
  useMessage,
  DataTableColumns,
  ZIcon
} from '@zeta-gds/components'
import {
  PersonCircleOutline as UserIcon,
  Pencil as EditIcon,
  LogOutOutline as LogoutIcon,
  CopyOutline as CopyIcon,
  TrashOutline as DeleteIcon
} from '@vicons/ionicons5'
type Song = {
  no: number
  title: string
  length: string
}

const renderIcon = (icon: any) => () =>
  h(ZIcon, null, {
    default: () => h(icon)
  })

const createColumns = ({
  play,
  copyRow,
  deleteRow
}: {
  play: (row: Song) => void
  copyRow: (row: Song) => void
  deleteRow: (row: Song) => void
}): DataTableColumns<Song> => {
  return [
    {
      title: 'No',
      description: 'Select rows for batch operations',
      key: 'no'
    },
    {
      title: 'Title',
      key: 'title',
      ellipsis: true,
      description: 'Select rows for batch operations',
      icon: renderIcon(UserIcon)
    },
    {
      title: 'Length',
      key: 'length',
      ellipsis: true,
      description:
        'Select rows for batch operations to see if ellipse will be present',
      icon: renderIcon(EditIcon)
    },
    {
      title: 'Icon + Text + Actions',
      key: 'combined',
      description: 'Combined cell with icon, text and action buttons',
      icon: renderIcon(LogoutIcon),
      render (row) {
        return h(
          'div',
          {
            class: 'combined-cell',
            style: {
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              justifyContent: 'space-between',
              width: '100%'
            }
          },
          [
            // Icon + Text section
            h(
              'div',
              {
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  flex: 1
                }
              },
              [
                h(
                  ZIcon,
                  { size: '16px', color: 'var(--gds-color-icon-neutral)' },
                  {
                    default: () => h(UserIcon)
                  }
                ),
                h(
                  'div',
                  {
                    style: {
                      display: 'flex'
                    }
                  },
                  [h('span', {}, `${row.length}`)]
                )
              ]
            ),
            // Action buttons section
            h(
              'div',
              {
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }
              },
              [
                h(
                  ZButton,
                  {
                    strong: true,
                    variant: 'light',
                    size: 'x-small',
                    onClick: () => play(row)
                  },
                  { default: () => 'Play' }
                ),
                h(
                  ZButton,
                  {
                    size: 'x-small',
                    variant: 'text',
                    onClick: (e) => {
                      e.stopPropagation()
                      copyRow(row)
                    },
                    class: 'action-button',
                    'aria-label': 'Copy row',
                    title: 'Copy row'
                  },
                  { icon: () => h(ZIcon, null, { default: () => h(CopyIcon) }) }
                ),
                h(
                  ZButton,
                  {
                    size: 'x-small',
                    variant: 'text',
                    onClick: (e) => {
                      e.stopPropagation()
                      deleteRow(row)
                    },
                    class: 'action-button',
                    'aria-label': 'Delete row',
                    title: 'Delete row'
                  },
                  {
                    icon: () => h(ZIcon, null, { default: () => h(DeleteIcon) })
                  }
                )
              ]
            )
          ]
        )
      }
    }
  ]
}

const data: Song[] = [
  { no: 3, title: 'Wonderwall', length: '4:18' },
  { no: 4, title: "Don't Look Back in Anger", length: '4:48' },
  { no: 12, title: 'Champagne Supernova', length: '7:27' }
]

export default defineComponent({
  setup () {
    const message = useMessage()

    const copyRow = (row: Song) => {
      const text = `No: ${row.no}, Title: ${row.title}, Length: ${row.length}`
      navigator.clipboard
        .writeText(text)
        .then(() => message.success(`Copied: ${row.title}`))
        .catch(() => message.error('Failed to copy'))
    }

    const deleteRow = (row: Song) => {
      message.info(`Delete ${row.title}`)
    }

    const rowClassName = () => 'hoverable-row'

    return {
      data,
      columns: createColumns({
        play (row: Song) {
          message.info(`Play ${row.title}`)
        },
        copyRow,
        deleteRow
      }),
      pagination: false as const,
      rowClassName
    }
  }
})
</script>

<style>
.action-button {
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}

.hoverable-row:hover .action-button {
  opacity: 1;
}
</style>
