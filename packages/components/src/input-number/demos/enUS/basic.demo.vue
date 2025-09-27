<markdown>
# Basic
</markdown>

<template>
  <z-input-number v-model="value" clearable />
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
