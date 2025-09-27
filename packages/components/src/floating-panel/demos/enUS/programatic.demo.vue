<markdown>
  # Basic
  </markdown>

<template>
  <z-space>
    <z-button @click="handleClick">
      Open
    </z-button>
    <z-button @click="handleToggle">
      Toggle Panel
    </z-button>
    <z-button @click="handleMinimize">
      Minimise Panel
    </z-button>
    <z-button @click="handlemaximize">
      Maximise Panel
    </z-button>
    <z-button @click="handleClose">
      Close
    </z-button>
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useFloatingPanel, useMessage } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const message = useMessage()
    const floatingPanel = useFloatingPanel()
    const test = ref<any>(null)

    function handleClick () {
      test.value = floatingPanel.create({
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

    function handleToggle () {
      test.value.togglePanel()
    }

    function handleMinimize () {
      test.value.minimizePanel()
    }

    function handlemaximize () {
      test.value.maximizePanel()
    }

    function handleClose () {
      test.value.close()
    }
    return {
      handleClick,
      handleToggle,
      handleClose,
      handleMinimize,
      handlemaximize
    }
  }
})
</script>
