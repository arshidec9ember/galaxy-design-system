<markdown>
# Basic usage
</markdown>

<template>
  <z-config-provider :katex="katex">
    <z-equation :value="equation" />
  </z-config-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import katex from 'katex'

export default defineComponent({
  setup () {
    const equation = '\\displaystyle= \\frac{k(k+1)}{2}+k+1'
    return {
      equation,
      katex
    }
  }
})
</script>
