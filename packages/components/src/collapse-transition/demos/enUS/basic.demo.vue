<markdown>
# Basic
</markdown>

<template>
  <z-space vertical>
    <z-switch v-model="show">
      <template #checked>
        Show
      </template>
      <template #unchecked>
        Hide
      </template>
    </z-switch>
    <z-collapse-transition :show="show">
      "There is no single development, in either technology or management
      technique, which by itself promises even one order of magnitude [tenfold]
      improvement within a decade in productivity, in reliability, in
      simplicity."
    </z-collapse-transition>
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      show: ref(true)
    }
  }
})
</script>
