<markdown>
# Customize action

Sometimes you may want to customize `action` and `content` .
</markdown>

<template>
  <z-space>
    <z-button @click="handleConfirm">
      Use Render Function
    </z-button>
  </z-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useDialog } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const dialog = useDialog()
    return {
      handleConfirm () {
        dialog.warning({
          title: 'Use Render Function',
          content: () => 'Content',
          action: () => 'Action'
        })
      }
    }
  }
})
</script>
