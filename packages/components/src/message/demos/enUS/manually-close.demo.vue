<markdown>
# Manually close
</markdown>

<template>
  <z-space>
    <z-button @click="createMessage">
      Create
    </z-button>
    <z-button @click="removeMessage">
      Destroy
    </z-button>
  </z-space>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount } from 'vue'
import { useMessage, MessageReactive } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const message = useMessage()
    let messageReactive: MessageReactive | null = null

    const removeMessage = () => {
      if (messageReactive) {
        messageReactive.destroy()
        messageReactive = null
      }
    }

    onBeforeUnmount(removeMessage)

    return {
      removeMessage,
      createMessage () {
        if (!messageReactive) {
          messageReactive = message.info('3 * 3 * 4 * 4 * ?', {
            duration: 0
          })
        }
      }
    }
  }
})
</script>
