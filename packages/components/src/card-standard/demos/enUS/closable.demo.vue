<markdown>
# Closable

You may need this when using it in a modal. This can also be used to make closable cards.
</markdown>

<template>
  <z-card-standard title="Card" closable @close="handleClose">
    Card Content
  </z-card-standard>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      handleClose () {
        message.info('Card Close')
      }
    }
  }
})
</script>
