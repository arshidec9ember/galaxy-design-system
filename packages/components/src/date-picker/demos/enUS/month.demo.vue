<markdown>
  # Month
  </markdown>

<template>
  <z-date-picker
    v-model="timestamp"
    type="month"
    :actions="['confirm']"
    clearable
    min-year="2000"
    max-year="2025"
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
