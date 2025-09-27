<markdown>
# Mark
</markdown>

<template>
  <z-space vertical>
    <z-slider v-model="value" range :marks="marks" :step="10" />
    <z-space>
      <z-input-number v-model="value[0]" size="small" />
      <z-input-number v-model="value[1]" size="small" />
    </z-space>
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref([50, 70]),
      marks: {
        34: 'Amazing',
        75: 'Good'
      }
    }
  }
})
</script>
