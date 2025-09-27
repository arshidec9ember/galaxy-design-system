<markdown>
# Loading
</markdown>

<template>
  <z-space align="center">
    <z-input-number clearable :loading="loading" />
    <z-switch v-model="loading" />
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      loading: ref(false)
    }
  }
})
</script>
