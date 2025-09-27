<markdown>
# Trigger
</markdown>

<template>
  <z-space>
    <z-tooltip placement="bottom" trigger="hover">
      <template #trigger>
        <z-button> Hover </z-button>
      </template>
      <span> Content present inside the tooltip </span>
    </z-tooltip>
    <z-tooltip placement="bottom" trigger="click">
      <template #trigger>
        <z-button> Click </z-button>
      </template>
      <span> Content present inside the tooltip </span>
    </z-tooltip>
    <z-tooltip :show="showPopover" placement="bottom">
      <template #trigger>
        <z-button @click="showPopover = !showPopover">
          Manual
        </z-button>
      </template>
      <span> Content present inside the tooltip </span>
    </z-tooltip>
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
