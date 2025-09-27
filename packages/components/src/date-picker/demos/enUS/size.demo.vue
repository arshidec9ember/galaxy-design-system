<markdown>
# Size

Date Picker can be `small`, `medium` or `large` sized.
</markdown>

<template>
  <z-space vertical>
    <z-date-picker v-model="timestamp" size="small" type="date" />
    <z-date-picker v-model="timestamp" size="medium" type="date" />
    <z-date-picker v-model="timestamp" size="large" type="date" />
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
