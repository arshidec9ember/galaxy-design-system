<markdown>
# Reset
</markdown>

<template>
  <z-space>
    <span style="font-variant-numeric: tabular-nums">
      <z-countdown ref="countdown" :duration="86400000" :active="active" />
    </span>
    <z-button size="x-small" @click="handleReset">
      Reset
    </z-button>
    <z-switch v-model="active" />
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { CountdownInst } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const activeRef = ref(true)
    const countdownRef = ref<CountdownInst | null>()
    function handleReset () {
      countdownRef.value?.reset()
    }
    return {
      active: activeRef,
      countdown: countdownRef,
      handleReset
    }
  }
})
</script>
