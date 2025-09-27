<markdown>
# Focus & blur manually
</markdown>

<template>
  <z-space item-style="display: flex; align-item: center;">
    <z-button @click="handleClick">
      Focus then blur in 1 second
    </z-button>
    <z-time-picker ref="timePickerInstRef" />
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { TimePickerInst } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const timePickerInstRef = ref<TimePickerInst | null>(null)
    return {
      handleClick () {
        timePickerInstRef.value?.focus()
        setTimeout(() => {
          timePickerInstRef.value?.blur()
        }, 1000)
      },
      timePickerInstRef
    }
  }
})
</script>
