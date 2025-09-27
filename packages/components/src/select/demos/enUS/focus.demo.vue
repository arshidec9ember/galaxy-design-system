<markdown>
# Focus & blur manually
</markdown>

<template>
  <z-space item-style="display: flex; align-item: center;">
    <z-button @click="handleClick">
      Focus then blur in 1 second
    </z-button>
    <z-select ref="selectInstRef" style="width: 200px" />
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { SelectInst } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const selectInstRef = ref<SelectInst | null>(null)
    return {
      handleClick () {
        selectInstRef.value?.focus()
        setTimeout(() => {
          selectInstRef.value?.blur()
        }, 1000)
      },
      selectInstRef
    }
  }
})
</script>
