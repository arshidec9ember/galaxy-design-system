<markdown>
# Finish callback
</markdown>

<template>
  <z-space vertical>
    <z-number-animation
      ref="numberAnimationInstRef"
      show-separator
      :from="0"
      :to="100000000"
      :active="false"
      @finish="handleFinish"
    />
    <z-button @click="handleClick"> Play </z-button>
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { NumberAnimationInst, useMessage } from '@zeta-gds/components'

export default defineComponent({
  setup() {
    const numberAnimationInstRef = ref<NumberAnimationInst | null>(null)
    const message = useMessage()
    return {
      numberAnimationInstRef,
      handleClick() {
        numberAnimationInstRef.value?.play()
      },
      handleFinish() {
        message.success('Finished')
      }
    }
  }
})
</script>
