<markdown>
# Icon demo

We can also have prefix icon.
</markdown>

<template>
  <z-link href="https://www.google.com/">
    <template #prefix>
      <z-icon :component="EventNote" />
    </template>
    google.com
  </z-link>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { EventNote } from '@zeta/icons'

export default defineComponent({
  setup () {
    return {
      EventNote
    }
  }
})
</script>
