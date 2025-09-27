<markdown>
# Scrollable

Change the property will cause all existing floatingPanels to be cleaned, so please make sure you change this property at proper time.
</markdown>

<template>
  <z-button @click="handleClick">
    See how it scrolls
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
        const arr = [1, 2, 3, 4, 5]
        arr.forEach(() =>
          floatingPanel.create({
            title: 'Many FloatingPanels',
            meta: 'scrollable',
            content: `Try to scroll
                Try to scroll
                Try to scroll
                Try to scroll
                Try to scroll
                Try to scroll
                Try to scroll
                Try to scroll
                Try to scroll
                Try to scroll
                Try to scroll
                Try to scroll
                Try to scroll
                Try to scroll
                Try to scroll
                Try to scroll
                Try to scroll
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
