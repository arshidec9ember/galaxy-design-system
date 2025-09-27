<markdown>
# Basic
</markdown>

<template>
  <z-space vertical>
    <z-number-animation
      ref="numberAnimationInstRef"
      :from="9.96"
      :to="0.07"
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
