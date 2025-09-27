<markdown>
# Validator
</markdown>

<template>
  <z-input-number v-model="value" :validator="validator" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref(0),
      validator: (x: number) => x > 0
    }
  }
})
</script>
