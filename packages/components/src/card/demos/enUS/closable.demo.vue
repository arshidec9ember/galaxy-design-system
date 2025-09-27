<markdown>
# Closable

You may need this when using it in a modal. This can also be used to make closable cards.
</markdown>

<template>
  <z-card>
    <z-card-header closable @close="handleClose">
      Card Header
    </z-card-header>
    <z-card-content>Card Content</z-card-content>
  </z-card>
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
