<markdown>
# Step

Set how much the buttons change the value.
</markdown>

<template>
  <z-input-number v-model="value" :step="2" />
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
