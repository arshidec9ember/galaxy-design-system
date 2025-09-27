<markdown>
# Hook before tab switching

You can prevent or postpone tab switching.
</markdown>

<template>
  <z-tabs
    variant="line"
    default-model-value="okay"
    @before-leave="handleBeforeLeave"
    @update:model-value="handleUpdateValue"
  >
    <z-tab-pane name="wait" tab="Wait for 1s">
      +1s
    </z-tab-pane>
    <z-tab-pane name="not-allowed" tab="Not allowed">
      ???
    </z-tab-pane>
    <z-tab-pane name="okay" tab="Okay">
      Just so so
    </z-tab-pane>
  </z-tabs>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      handleBeforeLeave: (tabName: string) => {
        switch (tabName) {
          case 'not-allowed':
            message.error('Not allowed')
            return false
          case 'wait':
            return new Promise<boolean>((resolve) => {
              const messageInstance = message.loading('Wait for 1s')
              setTimeout(() => {
                messageInstance.destroy()
                resolve(true)
              }, 1000)
            })
          default:
            return true
        }
      },
      handleUpdateValue: (value: string) => {
        message.info(value)
      }
    }
  }
})
</script>
