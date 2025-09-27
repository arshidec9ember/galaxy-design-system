<markdown>
# Use as a component

Sometimes you may want to use a component.
</markdown>

<template>
  <z-dialog
    title="Dialog"
    content="Are you sure?"
    negative-text="Cancel"
    positive-text="Submit"
    @positive-click="handlePositiveClick"
    @negative-click="handleNegativeClick"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      handleNegativeClick () {
        message.warning('Cancel')
      },
      handlePositiveClick () {
        message.success('Confirm')
      }
    }
  }
})
</script>
