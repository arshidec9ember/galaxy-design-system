<markdown>
# Action
</markdown>

<template>
  <z-button @click="handleClick">
    With some Action
  </z-button>
</template>

<script lang="ts">
import { h, defineComponent } from 'vue'
import { useNotification, ZButton, ZLink } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const notification = useNotification()
    return {
      handleClick () {
        const n = notification.success({
          title: 'Domain Created',
          content:
            'You can start configuring your domain now to setup profiles. ',
          closable: true
        })
        const updateNotificationButton = h(
          ZButton,
          {
            size: 'small'
          },
          {
            default: () => 'Update'
          }
        )

        const linkNotificationButton = h(
          ZLink,
          {
            size: 'small',
            isBold: true
          },
          {
            default: () => 'Link'
          }
        )
        const buttonGroup = h(
          'div',
          {
            style: {
              display: 'flex',
              gap: '20px'
            }
          },
          [updateNotificationButton, linkNotificationButton]
        )

        n.action = () => buttonGroup
      }
    }
  }
})
</script>
