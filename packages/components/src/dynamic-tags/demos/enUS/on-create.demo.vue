<markdown>
# Custom tag creation

Use `on-create` to custom tags.
</markdown>

<template>
  <z-dynamic-tags @create="handleCreate" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {
      handleCreate: (label: string) => {
        return (
          {
            0: 'Elevate',
            1: 'Innovate',
            2: 'Optimize'
          }[Math.floor(Math.random() * 3)] + label
        )
      }
    }
  }
})
</script>
