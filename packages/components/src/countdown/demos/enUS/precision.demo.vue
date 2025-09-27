<markdown>
# Precision

🧐🧐🧐
</markdown>

<template>
  <z-space>
    <span style="font-variant-numeric: tabular-nums; white-space: nowrap">
      <z-countdown :duration="3600 * 1000" :active="active" />
    </span>
    <span style="font-variant-numeric: tabular-nums; white-space: nowrap">
      <z-countdown :duration="3600 * 1000" :active="active" :precision="1" />
    </span>
    <span style="font-variant-numeric: tabular-nums; white-space: nowrap">
      <z-countdown :duration="3600 * 1000" :active="active" :precision="2" />
    </span>
    <span style="font-variant-numeric: tabular-nums; white-space: nowrap">
      <z-countdown :duration="3600 * 1000" :active="active" :precision="3" />
    </span>
    <z-switch v-model="active" />
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      active: ref(false)
    }
  }
})
</script>
