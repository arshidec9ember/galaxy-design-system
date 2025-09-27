<markdown>
  # Type
  </markdown>

<template>
  <z-space>
    <z-button @click="notify('info')">
      Info
    </z-button>
    <z-button @click="notify('success')">
      Success
    </z-button>
    <z-button @click="notify('warning')">
      Warning
    </z-button>
    <z-button @click="notify('error')">
      Error
    </z-button>
  </z-space>
</template>

<script lang="ts">
import { useNotification, NotificationType } from '@zeta-gds/components'
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    const notification = useNotification()
    return {
      notify (type: NotificationType) {
        notification[type]({
          title: 'What to say?',
          description: "I don't know",
          duration: 6000
        })
      }
    }
  }
})
</script>
