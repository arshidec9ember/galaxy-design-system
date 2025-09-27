<markdown>
# Show sort button

You can show the sort button by setting the `show-sort-button` prop to `true`.
</markdown>

<template>
  <z-dynamic-input v-model="value" placeholder="Come on" show-sort-button />
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
