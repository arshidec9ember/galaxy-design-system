<markdown>
# Separator

The number is too large to count the digits.
</markdown>

<template>
  <z-space vertical>
    <z-number-animation
      ref="numberAnimationInstRef"
      show-separator
      :from="0"
      :to="100000000"
      :active="false"
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
