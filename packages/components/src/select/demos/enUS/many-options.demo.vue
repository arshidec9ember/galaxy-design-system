<markdown>
# Lots of options

1000 times the answer to everything.
</markdown>

<template>
  <z-space vertical>
    <z-select v-model="value" :options="options" />
    <z-select v-model="values" multiple :options="options" />
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { repeat } from 'seemly'

export default defineComponent({
  setup () {
    return {
      value: ref(null),
      values: ref(null),
      options: repeat(42000, undefined).map((_, i) => ({
        label: String(i),
        value: i
      }))
    }
  }
})
</script>
