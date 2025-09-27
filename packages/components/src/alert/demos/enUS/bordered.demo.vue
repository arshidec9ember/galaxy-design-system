<markdown>
# Bordered
</markdown>

<template>
  <z-space vertical :size="12">
    <z-switch v-model="bordered" />
    <z-alert title="Could be no border" color="info" :bordered="bordered">
      You can start configuring your domain now to setup profiles
    </z-alert>
  </z-space>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {
      bordered: ref(true)
    }
  }
})
</script>
