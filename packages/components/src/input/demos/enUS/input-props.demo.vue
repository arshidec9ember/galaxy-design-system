<markdown>
# Input props

Input element has some special attributes, such as `auto-complete` or `type`. You can use `input-props` to set it.
</markdown>

<template>
  <z-space vertical>
    <z-input v-model="value" :input-props="{ type: 'url' }" placeholder="URL" />
    <z-input v-model="value" :input-props="{ type: 'tel' }" placeholder="Tel" />
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref(null)
    }
  }
})
</script>
