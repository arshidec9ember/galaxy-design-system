<markdown>
# Year
</markdown>

<template>
  <z-date-picker v-model="timestamp" type="year" :actions="null" clearable />
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
