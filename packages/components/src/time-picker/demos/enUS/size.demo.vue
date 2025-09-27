<markdown>
# Size

The Time Picker can be a `small`, `medium` or `large` size.
</markdown>
<template>
  <z-space vertical>
    <z-time-picker v-model="timestamp" size="small" />
    <z-time-picker v-model="timestamp" size="medium" />
    <z-time-picker v-model="timestamp" size="large" />
  </z-space>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      timestamp: ref(null)
    }
  }
})
</script>
