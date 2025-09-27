<markdown>
# Focus & blur manually
</markdown>

<template>
  <z-space item-style="display: flex; align-items: center;">
    <z-button @click="handleClick">
      Focus then blur in 1 second
    </z-button>
    <z-checkbox ref="checkboxInstRef" />
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { CheckboxInst } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const checkboxInstRef = ref<CheckboxInst | null>(null)
    return {
      handleClick () {
        checkboxInstRef.value?.focus()
        setTimeout(() => {
          checkboxInstRef.value?.blur()
        }, 1000)
      },
      checkboxInstRef
    }
  }
})
</script>
