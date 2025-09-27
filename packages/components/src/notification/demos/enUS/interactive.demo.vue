<markdown>
# Interactive

Require users to "acknowledge" the notification by clicking "mark as read" before closing it.
</markdown>

<template>
  <z-button @click="handleClick">
    Acknowledge required
  </z-button>
</template>

<script lang="ts">
import { h, defineComponent } from 'vue'
import { useNotification, useMessage, ZButton } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const message = useMessage()
    const notification = useNotification()
    return {
      handleClick () {
        let markAsRead = false
        const n = notification.success({
          title: 'Domain Created',
          content:
            'You can start configuring your domain now to setup profiles. ',
          duration: 0,
          closable: true,
          progress: false,
          action: () =>
            h(
              ZButton,
              {
                variant: 'text',
                type: 'primary',
                onClick: () => {
                  markAsRead = true
                  n.destroy()
                }
              },
              {
                default: () => 'Mark as Read'
              }
            ),
          onClose: () => {
            if (!markAsRead) {
              message.warning('Please mark as read')
              return false
            }
          }
        })
      }
    }
  }
})
</script>
