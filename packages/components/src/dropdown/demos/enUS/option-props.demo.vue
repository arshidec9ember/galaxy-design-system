<markdown>
# Customize option props

Bind whatever you want.
</markdown>

<template>
  <z-dropdown
    v-model:show="show"
    trigger="hover"
    :options="options"
    @select="handleSelect"
  >
    <z-button>
      Trigger Button
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
import { defineComponent } from 'vue'
import { CaretDown12Filled } from '@vicons/fluent'
import { useMessage } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      CaretDown12Filled,
      options: [
        {
          label: 'Marina Bay Sands',
          key: 'marina bay sands',
          props: {
            onClick: () => {
              message.success('Good!')
            }
          }
        },
        {
          label: "Brown's Hotel, London",
          key: "brown's hotel, london",
          children: [
            {
              label: 'Chicken',
              key: 'chicken',
              disabled: true,
              props: {
                onClick: () => {
                  message.info('Okay')
                }
              }
            },
            {
              label: 'Beef',
              key: 'beef'
            }
          ]
        },
        {
          label: 'Atlantis Bahamas, Nassau',
          key: 'atlantis nahamas, nassau',
          props: {
            onMousedown: () => {
              message.warning('Key down')
            }
          }
        }
      ],
      handleSelect (key: string | number) {
        message.info(String(key))
      }
    }
  }
})
</script>
