<markdown>
# Timing

Specify the duration of messages.
</markdown>

<template>
  <z-button @click="createMessage">
    Last for 5 second
  </z-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      createMessage () {
        message.info(
          "In our pursuit of excellence, let's remain open to unexpected possibilities",
          { duration: 5000 }
        )
      }
    }
  }
})
</script>
