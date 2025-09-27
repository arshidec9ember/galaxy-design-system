<markdown>
# Basic

A countdown string.
</markdown>

<template>
  <z-space>
    <span style="font-variant-numeric: tabular-nums">
      <z-countdown :duration="5000" :active="active" />
    </span>
    <z-switch v-model="active" />
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      active: ref(false)
    }
  }
})
</script>
