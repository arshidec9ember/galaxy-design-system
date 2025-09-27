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
import { useFloatingPanel, useMessage } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const message = useMessage()
    const floatingPanel = useFloatingPanel()
    return {
      handleClick () {
        floatingPanel.create({
          title: 'Transaction ID copied',
          content: `Read me
          What do Keanu Reeves and baby Yoda have in common? 
          They age at the same rate.

          How many goats does it take to change a lightbulb? 
          Just one, but you have to goat them into it.
              `,
          action: 'Footer Text',
          containerElement: document.body,
          onClose: () => {
            message.success("Wouldn't it be Nice")
            return true
          }
        })
      }
    }
  }
})
</script>
