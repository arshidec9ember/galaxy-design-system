<markdown>
# Unclosable

You can make it unclosable.
</markdown>

<template>
  <z-button @click="handleClick">
    Unclosable
  </z-button>
</template>

<script lang="ts">
import { useFloatingPanel } from '@zeta-gds/components'
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    const floatingPanel = useFloatingPanel()
    return {
      handleClick () {
        floatingPanel.create({
          title: 'Close Me if You Can',
          content: 'You can not close me',
          onAfterLeave: () => {
            floatingPanel.create({
              title: 'Ha Ha Ha Ha!',
              content: 'You can not close me',
              onClose: () => {
                floatingPanel.create({
                  content: `No!${'\n'.repeat(
                    20
                  )}You will need to refresh the page to close me.`,
                  title: "No, You Can't",
                  closable: false
                })
                return true
              }
            })
          }
        })
      }
    }
  }
})
</script>
