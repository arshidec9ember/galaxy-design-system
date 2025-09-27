<markdown>
# Multiple line
</markdown>

<template>
  <z-button @click="info">
    Multiple Line
  </z-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      info () {
        message.info(
          "I've discovered that debugging code is a lot like untangling headphones – it requires patience, a systematic approach, and sometimes, a little bit of luck."
        )
      }
    }
  }
})
</script>
