<markdown>
# Ellipsis

Dropdown has auto ellipsis in case we give width in the styles
</markdown>

<template>
  <z-space vertical>
    <z-dropdown
      v-model:show="show"
      style="width: 200px"
      trigger="click"
      :options="options"
      @select="handleSelect"
    >
      <z-button>200px Width
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
    <z-dropdown
      style="width: 120px"
      trigger="click"
      :options="options"
      @select="handleSelect"
    >
      <z-button>120px Width
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
    <z-dropdown trigger="click" :options="options" @select="handleSelect">
      <z-button>No Width
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
  </z-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { CaretDown12Filled } from '@vicons/fluent'
import { useMessage } from '@zeta-gds/components'

const options = [
  {
    label: 'Marina Bay Sands',
    key: 'Marina Bay Sands',
    disabled: true
  },
  {
    label: "Brown's Hotel, London",
    key: "Brown's Hotel, London"
  },
  {
    label: 'Atlantis Bahamas, Nassau',
    key: 'Atlantis Bahamas, Nassau'
  },
  {
    label: 'The Beverly Hills Hotel, Los Angeles',
    key: 'The Beverly Hills Hotel, Los Angeles'
  }
]

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      CaretDown12Filled,
      options,
      handleSelect (key: string | number) {
        message.info(String(key))
      }
    }
  }
})
</script>
