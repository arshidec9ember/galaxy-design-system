<markdown>
# Loading
</markdown>

<template>
  <z-space>
    <z-switch :rubber-band="false" loading />
    <z-switch
      :rubber-band="false"
      :model-value="active"
      :loading="loading"
      @update:model-value="handleUpdateValue"
    />
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const activeRef = ref(false)
    const loadingRef = ref(false)
    return {
      active: activeRef,
      loading: loadingRef,
      handleUpdateValue (value: boolean) {
        loadingRef.value = true
        setTimeout(() => {
          activeRef.value = value
          loadingRef.value = false
        }, 2000)
      }
    }
  }
})
</script>
