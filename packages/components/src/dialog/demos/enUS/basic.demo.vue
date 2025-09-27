<markdown>
# Basic

Inject `dialog` to create a dialog.
</markdown>

<template>
  <z-space>
    <z-button @click="handleConfirm">
      Confirm
    </z-button>
    <z-button @click="handleSuccess">
      Success
    </z-button>
    <z-button @click="handleError">
      Error
    </z-button>
  </z-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage, useDialog } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const message = useMessage()
    const dialog = useDialog()
    return {
      handleConfirm () {
        dialog.warning({
          title: 'Confirm',
          content: 'Are you sure?',
          positiveText: 'Sure',
          negativeText: 'Not Sure',
          onPositiveClick: () => {
            message.success('Sure')
          },
          onNegativeClick: () => {
            message.error('Not Sure')
          }
        })
      },
      handleSuccess () {
        dialog.success({
          title: 'Success',
          content: 'Cool',
          positiveText: 'Wow!',
          onPositiveClick: () => {
            message.success('Great!')
          }
        })
      },
      handleError () {
        dialog.error({
          title: 'Error',
          content: 'A mistake.',
          positiveText: 'Ahhh!',
          onPositiveClick: () => {
            message.success('I knew it...')
          }
        })
      }
    }
  }
})
</script>
