<markdown>
# Trigger

Different ways to `trigger`/`show` a dropdown.
</markdown>

<template>
  <z-space>
    <z-dropdown
      v-model:show="show"
      trigger="hover"
      :options="options"
      @select="handleSelect"
    >
      <z-button>Hover!
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
      v-model:show="show"
      trigger="click"
      :options="options"
      @select="handleSelect"
    >
      <z-button>Click!
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
      v-model:show="show"
      :show="showDropdown"
      :options="options"
      @select="handleSelect"
    >
      <z-button @click="handleClick">
        Manual!
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
import { defineComponent, ref } from 'vue'
import { CaretDown12Filled } from '@vicons/fluent'
import { useMessage } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const message = useMessage()
    const showDropdownRef = ref(false)
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
      showDropdown: showDropdownRef,
      handleSelect (key: string | number) {
        message.info(String(key))
      },
      handleClick () {
        showDropdownRef.value = !showDropdownRef.value
      }
    }
  }
})
</script>
