<markdown>
# Controlled checkbox
</markdown>

<template>
  <z-space align="center" item-style="display: flex;">
    <z-checkbox :model-value="value">
      Checkbox
    </z-checkbox>
    <z-switch v-model="value" />
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref(false)
    }
  }
})
</script>
