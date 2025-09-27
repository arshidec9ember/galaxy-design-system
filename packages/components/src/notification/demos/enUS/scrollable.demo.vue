<markdown>
# Scrollable

Change the property will cause all existing notifications to be cleaned, so please make sure you change this property at proper time.
</markdown>

<template>
  <z-button @click="handleClick">
    See how it scrolls
  </z-button>
</template>

<script lang="ts">
import { useNotification } from '@zeta-gds/components'
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    const notification = useNotification()
    return {
      handleClick () {
        const arr = [1, 2, 3, 4, 5]
        arr.forEach(() =>
          notification.info({
            title: 'Many Notifications',
            duration: 6000,
            content: `Try to scroll
                Try to scroll
                Try to scroll
                Try to scroll
                Try to scroll
              `
          })
        )
      }
    }
  }
})
</script>
