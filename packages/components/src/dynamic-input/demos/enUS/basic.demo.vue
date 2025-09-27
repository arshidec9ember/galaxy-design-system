<markdown>
# Use input preset

By default, the preset element of `z-dynamic-input` is `input`.
</markdown>

<template>
  <z-dynamic-input
    v-model="value"
    placeholder="Please type here"
    :min="3"
    :max="6"
  />
  <pre>{{ JSON.stringify(value, null, 2) }}</pre>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref(['', '', ''])
    }
  }
})
</script>
