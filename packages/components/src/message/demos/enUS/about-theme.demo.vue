<markdown>
# Caveat about theme

If you don't specify the theme, the theme of created message will be the same as its `z-message-provider`.
</markdown>

<template>
  <z-button @click="info">
    You can change the theme while the message is active
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
          "Your attention to detail is crucial, let's ensure it shines through.",
          { duration: 5000 }
        )
      }
    }
  }
})
</script>
