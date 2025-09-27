<markdown>
# No icon
</markdown>

<template>
  <z-button @click="createMessage">
    No icon
  </z-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      createMessage () {
        message.warning(
          'Adjustments may be needed to navigate the challenges ahead.',
          {
            showIcon: false
          }
        )
      }
    }
  }
})
</script>
