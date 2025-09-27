<markdown>
# Date range
</markdown>

<template>
  <z-date-picker
    v-model="range"
    type="daterange"
    min-year="2006"
    max-year="2025"
    clearable
  />
  <pre>{{ JSON.stringify(range) }}</pre>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      range: ref<[number, number]>([1183135260000, Date.now()])
    }
  }
})
</script>
