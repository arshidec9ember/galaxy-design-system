<markdown>
# Trim

Input supports `trim` prop to trim input value. It is useful when you want to remove whitespace from the beginning and end of a string.
</markdown>

<template>
  <z-space vertical>
    <z-input v-model="value" type="text" trim />
    <z-input v-model="value" type="textarea" trim />
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref(null)
    }
  }
})
</script>
