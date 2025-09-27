<markdown>
# Focus & blur manually
</markdown>

<template>
  <z-space item-style="display: flex; align-item: center;">
    <z-button @click="handleClick">
      Focus then blur in 1 second
    </z-button>
    <z-cascader ref="cascaderInstRef" style="width: 200px" />
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { CascaderInst } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const cascaderInstRef = ref<CascaderInst | null>(null)
    return {
      handleClick () {
        cascaderInstRef.value?.focus()
        setTimeout(() => {
          cascaderInstRef.value?.blur()
        }, 1000)
      },
      cascaderInstRef
    }
  }
})
</script>
