<markdown>
# Basic
</markdown>

<template>
  <z-space item-style="display: flex;" align="center">
    <z-checkbox v-model="value">
      Checkbox
    </z-checkbox>
    <z-checkbox v-model="value" />
    <z-checkbox v-model="value" :disabled="disabled">
      Checkbox
    </z-checkbox>
    <z-button size="small" @click="disabled = !disabled">
      Disabled
    </z-button>
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref(false),
      disabled: ref(true)
    }
  }
})
</script>
