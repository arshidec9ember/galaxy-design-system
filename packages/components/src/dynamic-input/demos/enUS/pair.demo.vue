<markdown>
# Using pair preset

You can use the `pair` preset to create a pair of key-value inputs.
</markdown>

<template>
  <z-dynamic-input
    v-model="value"
    preset="pair"
    key-placeholder="Please input the key"
    value-placeholder="Please input the value"
  />
  <pre>{{ JSON.stringify(value, null, 2) }}</pre>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref([
        {
          key: '',
          value: ''
        }
      ])
    }
  }
})
</script>
