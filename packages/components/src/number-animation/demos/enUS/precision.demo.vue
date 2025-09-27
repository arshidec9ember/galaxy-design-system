<markdown>
# Precision

Use `precision` to set precision.
</markdown>

<template>
  <z-space vertical>
    <z-number-animation
      ref="numberAnimationInstRef"
      :from="0.0"
      :to="24.0"
      :active="false"
      :precision="2"
    />
    <z-button @click="handleClick"> Play </z-button>
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { NumberAnimationInst } from '@zeta-gds/components'

export default defineComponent({
  setup() {
    const numberAnimationInstRef = ref<NumberAnimationInst | null>(null)
    return {
      numberAnimationInstRef,
      handleClick() {
        numberAnimationInstRef.value?.play()
      }
    }
  }
})
</script>
