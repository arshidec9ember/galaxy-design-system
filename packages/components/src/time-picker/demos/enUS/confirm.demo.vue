<markdown>
# Confirm
</markdown>

<template>
  <z-space>
    <z-time-picker
      default-formatted-value="00:12:13"
      @confirm="handleConfirm"
    />
  </z-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      handleConfirm (value: number | null) {
        message.success('Confirm' + value)
      }
    }
  }
})
</script>
