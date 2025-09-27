<markdown>
  # Basic
  </markdown>

<template>
  <z-button @click="handleClick">
    Open
  </z-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useNotification, useMessage } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const message = useMessage()
    const notification = useNotification()
    return {
      handleClick () {
        notification.info({
          title: 'Transaction ID copied',
          duration: 6000,
          description:
            'You can start configuring your domain now to setup profiles.',
          onAfterLeave: () => {
            message.success("Wouldn't it be Nice")
          }
        })
      }
    }
  }
})
</script>
