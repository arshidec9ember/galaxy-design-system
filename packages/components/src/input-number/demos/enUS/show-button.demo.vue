<markdown>
# Hide button

Use `show-button` prop to control whether to show control buttons.
</markdown>

<template>
  <z-space align="center">
    <z-switch v-model="disabled" />
    <z-input-number v-model="value" :show-button="disabled" />
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref(0),
      disabled: ref(true)
    }
  }
})
</script>
