<markdown>
# Click on mask

Click on button to close.
</markdown>

<template>
  <z-button @click="handleButtonClick">
    Callback on Mask Clicked
  </z-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage, useDialog } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const message = useMessage()
    const dialog = useDialog()
    return {
      handleButtonClick () {
        dialog.success({
          title: 'Close',
          content: 'Are you sure?',
          positiveText: 'Sure',
          negativeText: 'Not Sure',
          maskClosable: false,
          onMaskClick: () => {
            message.success('cannot close')
          },
          onEsc: () => {
            message.success('close by esc')
          }
        })
      }
    }
  }
})
</script>
