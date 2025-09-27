<markdown>
  # Change Content Dynamically

  You can change any parts of floatingPanels existed.
  </markdown>

<template>
  <z-space>
    <z-button @click="open">
      Open it
    </z-button>
    <z-button :disabled="!z" @click="change">
      Change it
    </z-button>
  </z-space>
</template>

<script lang="ts">
import { h, ref, defineComponent } from 'vue'
import { useFloatingPanel, FloatingPanelReactive } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const openIt = ref(null)
    const floatingPanel = useFloatingPanel()
    const zRef = ref<FloatingPanelReactive | null>(null)

    return {
      z: zRef,
      open () {
        zRef.value = floatingPanel.create({
          title: 'Dynamic Content',
          content: `Do voluptate sit pariatur ullamco. 
            Nulla excepteur laborum duis irure consequat anim enim culpa. Exercitation ipsum anim pariatur veniam ullamco irure veniam eu eiusmod mollit. Eiusmod labore sunt voluptate minim ut non consectetur eu commodo magna consequat. Officia adipisicing culpa ea aliquip esse qui in laboris nisi consectetur aute sit amet enim. Tempor voluptate dolor proident aliqua amet in non non ad velit minim mollit. Reprehenderit fugiat commodo veniam in reprehenderit Lorem Lorem fugiat magna qui anim.`,
          action: '2023-11-4 15:11',
          onClose: () => {
            zRef.value = null
          }
        })
      },
      openIt,
      change () {
        if (zRef.value) {
          zRef.value.content = () =>
            h('div', {
              innerHTML: 'content change'
            })
        }
      }
    }
  }
})
</script>
