<markdown>
# Cascade

Dropdown options can be cascaded.
</markdown>

<template>
  <z-dropdown
    v-model:show="show"
    :options="options"
    placement="bottom-start"
    trigger="click"
    @select="handleSelect"
  >
    <z-button>Select a Cuisine
      <template #end>
        <z-icon
          :component="CaretDown12Filled"
          size="small"
          :style="{
            top: '-3px',
            transform: `rotate(${show ? 180 : 0}deg)`,
            transition:
              'color .3s var(--z-bezier), transform .3s var(--z-bezier)'
          }"
        />
      </template>
    </z-button>
  </z-dropdown>
</template>

<script lang="ts">
import { h, defineComponent } from 'vue'
import { ZIcon, useMessage } from '@zeta-gds/components'
import { CashOutline as CashIcon } from '@vicons/ionicons5'
import { CaretDown12Filled } from '@vicons/fluent'

const options = [
  {
    label: 'Japanese',
    key: 'japanese'
  },
  {
    label: 'Korean',
    icon () {
      return h(ZIcon, null, {
        default: () => h(CashIcon)
      })
    },
    key: 'korean'
  },
  {
    type: 'divider',
    key: 'd1'
  },
  {
    label: 'Asian',
    key: 'asian'
  },
  {
    label: 'Others',
    key: 'others',
    children: [
      {
        label: 'Chinese',
        key: 'chinese'
      },
      {
        label: 'Spanish',
        key: 'spanish'
      },
      {
        label: 'Others',
        key: 'others1',
        disabled: true,
        children: [
          {
            label: 'Italian',
            key: 'italian'
          },
          {
            label: 'Greek',
            key: 'greek'
          }
        ]
      }
    ]
  }
]

export default defineComponent({
  data () {
    const message = useMessage()
    return {
      options,
      CaretDown12Filled,
      handleSelect (key: string | number) {
        message.info(String(key))
      }
    }
  }
})
</script>
