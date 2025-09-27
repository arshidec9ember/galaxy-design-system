<markdown>
# Focus & blur manually
</markdown>

<template>
  <z-space item-style="display: flex; align-item: center;">
    <z-button @click="handleClick">
      Focus then blur in 1 second
    </z-button>
    <z-date-picker ref="datePickerInstRef" style="width: 200px" />
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { DatePickerInst } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const datePickerInstRef = ref<DatePickerInst | null>(null)
    return {
      handleClick () {
        datePickerInstRef.value?.focus()
        setTimeout(() => {
          datePickerInstRef.value?.blur()
        }, 1000)
      },
      datePickerInstRef
    }
  }
})
</script>
