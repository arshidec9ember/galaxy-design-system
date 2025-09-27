<markdown>
# Format
</markdown>

<template>
  <z-space vertical>
    <z-date-picker
      v-model="timestamp"
      type="datetime"
      clearable
      :format="format"
    />
    <z-date-picker
      v-model="timestamp2"
      type="datetime"
      :format="format"
      clearable
    />
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      timestamp: ref(null),
      timestamp2: ref(1183135260000),
      format: 'yyyy/MM/dd - HH:mm'
    }
  }
})
</script>
