<markdown>
# Using katex options
</markdown>

<template>
  <z-config-provider :katex="katex">
    <z-equation :value="equation" :katex-options="katexOptions" />
  </z-config-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import katex from 'katex'

export default defineComponent({
  setup () {
    const equation = `\\f\\relax{x} = \\int_{-\\infty}^\\infty
    \\f\\hat\\xi\\,e^{2 \\pi i \\xi x}
    \\,d\\xi`
    return {
      katex,
      katexOptions: {
        displayMode: true,
        fleqn: true,
        macros: {
          '\\f': '#1f(#2)'
        }
      },
      equation
    }
  }
})
</script>
