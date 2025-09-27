<markdown>
# Size
</markdown>

<template>
  <z-space vertical>
    <z-input-number v-model="value" size="small" />
    <z-input-number v-model="value" size="medium" />
    <z-input-number v-model="value" size="large" />
  </z-space>
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
