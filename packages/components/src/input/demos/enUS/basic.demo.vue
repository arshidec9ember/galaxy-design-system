<markdown>
# Basic

Basic use of `z-input`.
</markdown>

<template>
  <z-space vertical>
    <z-input v-model="value" type="text" placeholder="Basic Input" />
    <z-input v-model="value" type="textarea" placeholder="Basic Textarea" />
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
