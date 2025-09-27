<markdown>
# Closable

Set `closable` to make message closable by a click.
</markdown>

<template>
  <z-button @click="createMessage">
    Create a Message
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
          "In our pursuit of excellence, let's remain open to unexpected possibilities.",
          {
            closable: true,
            duration: 5000
          }
        )
      }
    }
  }
})
</script>
