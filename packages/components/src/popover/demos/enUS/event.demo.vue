<markdown>
# Event
</markdown>

<template>
  <z-space>
    <z-popover
      placement="bottom"
      trigger="hover"
      @update:show="handleUpdateShow"
    >
      <template #trigger>
        <z-button>Hover</z-button>
      </template>
      <span>Content present inside the popover</span>
    </z-popover>
    <z-popover
      placement="bottom"
      trigger="click"
      @update:show="handleUpdateShow"
    >
      <template #trigger>
        <z-button>Click</z-button>
      </template>
      <span>Content present inside the popover</span>
    </z-popover>
    <z-popover
      :show="showPopover"
      placement="bottom"
      trigger="manual"
      @update:show="handleUpdateShow"
    >
      <template #trigger>
        <z-button @click="showPopover = !showPopover">
          Manual
        </z-button>
      </template>
      <span>Content present inside the popover</span>
    </z-popover>
  </z-space>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useMessage } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      showPopover: ref(false),
      handleUpdateShow (show: boolean) {
        message.success(show ? 'show' : 'hide')
      }
    }
  }
})
</script>
