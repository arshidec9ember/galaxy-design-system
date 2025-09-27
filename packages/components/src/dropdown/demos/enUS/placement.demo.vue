<markdown>
# Placement

Dropdown options can be aligned using the `placement` property.
</markdown>

<template>
  <z-dropdown
    v-model:show="show"
    trigger="hover"
    placement="bottom-start"
    :options="options"
    @select="handleSelect"
  >
    <z-button>Select a Country
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
          label: 'India',
          key: 'ind'
        },
        {
          label: 'United States',
          key: 'us'
        },
        {
          label: 'Canada',
          key: 'ca'
        },
        {
          label: 'United Kingdom',
          key: 'uk'
        },
        {
          label: 'Germany',
          key: 'de'
        },
        {
          label: 'France',
          key: 'fr'
        },
        {
          label: 'Japan',
          key: 'jp'
        }
      ],
      handleSelect (key: string | number) {
        message.info(String(key))
      }
    }
  }
})
</script>
