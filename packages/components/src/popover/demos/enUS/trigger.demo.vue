<markdown>
# Trigger
</markdown>

<template>
  <z-space>
    <z-popover trigger="hover">
      <template #trigger>
        <z-button>Hover</z-button>
      </template>
      <span>Content inside the popover</span>
    </z-popover>
    <z-popover trigger="hover" :keep-alive-on-hover="false">
      <template #trigger>
        <z-button>Hover (ignore popup)</z-button>
      </template>
      <span>Content inside the popover</span>
    </z-popover>
    <z-popover trigger="click">
      <template #trigger>
        <z-button>Click</z-button>
      </template>
      <span>Content inside the popover</span>
    </z-popover>
    <z-popover trigger="focus">
      <template #trigger>
        <z-button>Focus</z-button>
      </template>
      <span>Content inside the popover</span>
    </z-popover>
    <z-popover trigger="manual" :show="showPopover">
      <template #trigger>
        <z-button @click="showPopover = !showPopover">
          Manual
        </z-button>
      </template>
      <span>Content inside the popover</span>
    </z-popover>
  </z-space>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      showPopover: ref(false)
    }
  }
})
</script>
