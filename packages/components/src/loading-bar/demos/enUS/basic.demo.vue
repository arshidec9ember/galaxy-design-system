<markdown>
# Basic
</markdown>

<template>
  <z-space>
    <z-button @click="handleStart">
      start
    </z-button>
    <z-button :disabled="disabled" @click="handleFinish">
      finish
    </z-button>
    <z-button @click="handleError">
      error
    </z-button>
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useLoadingBar } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const loadingBar = useLoadingBar()
    const disabledRef = ref(true)
    return {
      disabled: disabledRef,
      handleStart () {
        loadingBar.start()
        disabledRef.value = false
      },
      handleFinish () {
        loadingBar.finish()
        disabledRef.value = true
      },
      handleError () {
        disabledRef.value = true
        loadingBar.error()
      }
    }
  }
})
</script>
