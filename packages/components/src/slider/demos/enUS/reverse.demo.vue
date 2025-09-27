<markdown>
# Reverse

Set `reverse` to invert the track.
</markdown>

<template>
  <z-space vertical>
    <z-slider v-model="value" :step="10" reverse />
    <z-input-number v-model="value" size="small" />
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref(0)
    }
  }
})
</script>
