<markdown>
# Format tooltip
</markdown>

<template>
  <z-slider
    :default-model-value="50"
    :step="10"
    :format-tooltip="formatTooltip"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {
      formatTooltip: (value: number) => `${value}%`
    }
  }
})
</script>
