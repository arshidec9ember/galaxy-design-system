<markdown>
# More than 2 handles

Although I don't know where it can be used, but it looks cool.
</markdown>

<template>
  <z-space vertical>
    <z-slider v-model="value" range :step="1" />
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref([50, 70, 80, 90])
    }
  }
})
</script>
