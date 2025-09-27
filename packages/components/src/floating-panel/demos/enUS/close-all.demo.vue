<markdown>
# Close All

All the panels can be closed at once by calling the `destroyAll` method.

</markdown>

<template>
  <z-space>
    <z-button @click="open">
      Open it
    </z-button>
    <z-button :disabled="!z" @click="destroyAll">
      Close all
    </z-button>
  </z-space>
</template>

<script lang="ts">
import { useFloatingPanel, FloatingPanelReactive } from '@zeta-gds/components'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const floatingPanel = useFloatingPanel()
    const zRef = ref<FloatingPanelReactive | null>(null)
    return {
      z: zRef,
      open () {
        const arr = [1, 2, 3, 4, 5]
        arr.forEach(
          () =>
            (zRef.value = floatingPanel.create({
              title: 'Many FloatingPanels',
              action: 'Try to close',
              content: `
              The content of this floating panel is scrollable.
              All the elements in the content are scrollable.

              ${'\n'.repeat(20)}
              `
            }))
        )
      },
      destroyAll () {
        floatingPanel.destroyAll()
      }
    }
  }
})
</script>
