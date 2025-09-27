<markdown>
# Click to switch

If `@update:current` is set, you can switch step by click.
</markdown>

<template>
  <z-stepper v-model:current="current">
    <z-step title="I Me Mine" />
    <z-step title="Let It Be" />
    <z-step title="Come Together" />
    <z-step disabled title="Something" />
  </z-stepper>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const currentRef = ref<number | undefined>(1)
    return {
      current: currentRef
    }
  }
})
</script>
