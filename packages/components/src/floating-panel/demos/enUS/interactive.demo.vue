<markdown>
# Interactive

Require users to "acknowledge" the floatingPanel by clicking "mark as read" before closing it.
</markdown>

<template>
  <z-button @click="handleClick">
    Acknowledge required
  </z-button>
</template>

<script lang="ts">
import { h, defineComponent } from 'vue'
import { useFloatingPanel, useMessage, ZButton } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const message = useMessage()
    const floatingPanel = useFloatingPanel()
    return {
      handleClick () {
        let markAsRead = false
        const n = floatingPanel.create({
          title: 'Domain Created',
          content:
            'You can start configuring your domain now to setup profiles. ',
          closable: true,
          action: () =>
            h(
              ZButton,
              {
                variant: 'text',
                type: 'primary',
                onClick: () => {
                  markAsRead = true
                  n.close()
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
