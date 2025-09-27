<markdown>
  # Max

  </markdown>

<template>
  <z-notification-provider :max-items="3">
    <notification-button />
  </z-notification-provider>
</template>

<script lang="ts">
import { defineComponent, ref, h } from 'vue'
import { useNotification, ZButton } from '@zeta-gds/components'

const NotificationButton = defineComponent({
  setup () {
    const notification = useNotification()
    const index = ref(0)
    return {
      notification,
      index
    }
  },
  render () {
    return h(
      ZButton,
      {
        onClick: () => {
          this.index++
          this.notification.info({
            title: `Notification index: ${this.index}`,
            description: 'You can limit the index of notifications',
            duration: 6000
          })
        }
      },
      { default: () => 'Max notification count: 3' }
    )
  }
})

export default defineComponent({
  components: {
    NotificationButton
  }
})
</script>
