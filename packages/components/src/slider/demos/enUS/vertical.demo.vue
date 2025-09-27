<markdown>
# Vertical

Set `vertical` to enable the vertical mode. Its height depends on the height of the container by default, and you can also customize the height.
</markdown>

<template>
  <z-space style="height: 300px; justify-content: center">
    <z-slider :default-model-value="77" vertical />
    <z-slider :default-model-value="20" vertical reverse />
    <z-slider :default-model-value="30" vertical disabled />
    <z-slider v-model="value" :marks="marks" vertical range />
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref([20, 70]),
      marks: {
        0: '0°C',
        20: '20°C',
        37: '37°C',
        100: '100°C'
      }
    }
  }
})
</script>
