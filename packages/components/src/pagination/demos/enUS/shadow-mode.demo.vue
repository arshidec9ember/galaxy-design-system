<markdown>
# Shadow Mode
</markdown>

<template>
  <z-space vertical :size="32">
    <z-pagination
      show-shadow
      :page="page1"
      :page-count="10"
      :page-size="10"
      :item-count="100"
      show-size-picker
      show-quick-jumper
      @update-page="page1 = $event"
    />
  </z-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const page1 = ref(1)
</script>
