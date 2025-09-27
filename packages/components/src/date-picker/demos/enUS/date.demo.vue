<markdown>
# Date
</markdown>

<template>
  <z-date-picker
    v-model="timestamp"
    type="date"
    min-year="2000"
    max-year="2025"
    :actions="null"
  />
  <pre>{{ JSON.stringify(timestamp) }}</pre>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      timestamp: ref(1183135260000)
    }
  }
})
</script>
