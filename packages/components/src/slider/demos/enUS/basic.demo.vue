<markdown>
# Basic
</markdown>

<template>
  <z-space vertical>
    <z-slider v-model="value" :step="10" />
    <z-input-number v-model="value" size="small" />
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref(50)
    }
  }
})
</script>
