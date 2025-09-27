<markdown>
# Event
</markdown>

<template>
  <z-space>
    <z-tooltip
      placement="bottom"
      trigger="hover"
      @update:show="handleUpdateShow"
    >
      <template #trigger>
        <z-button> Hover </z-button>
      </template>
      <span> Content present inside the tooltip </span>
    </z-tooltip>
    <z-tooltip
      placement="bottom"
      trigger="click"
      @update:show="handleUpdateShow"
    >
      <template #trigger>
        <z-button> Click </z-button>
      </template>
      <span> Content present inside the tooltip </span>
    </z-tooltip>
    <z-tooltip :show="showPopover" trigger="manual" placement="bottom">
      <template #trigger>
        <z-button @click="showPopover = !showPopover">
          Manual (No event will be emitted)
        </z-button>
      </template>
      <span> Content present inside the tooltip </span>
    </z-tooltip>
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
        message.success(show + '')
      }
    }
  }
})
</script>
