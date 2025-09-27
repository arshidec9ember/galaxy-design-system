<markdown>
# Add tooltip for option

You can use `render-option` to add tooltip for option.
</markdown>

<template>
  <z-dropdown
    v-model:show="show"
    trigger="hover"
    :options="options"
    :render-option="renderOption"
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
import { defineComponent, h, VNode } from 'vue'
import { CaretDown12Filled } from '@vicons/fluent'
import {
  useMessage,
  ZTooltip,
  DropdownOption,
  DropdownGroupOption
} from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      CaretDown12Filled,
      renderOption: ({
        node,
        option
      }: {
        node: VNode
        option: DropdownOption | DropdownGroupOption
      }) => {
        return h(
          ZTooltip,
          { keepAliveOnHover: false, style: { width: 'max-content' } },
          {
            trigger: () => [node],
            default: () => option.key
          }
        )
      },
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
