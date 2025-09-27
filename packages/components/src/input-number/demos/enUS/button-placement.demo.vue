<markdown>
# Button placement

Button can be placed at both ends.
</markdown>

<template>
  <z-space vertical>
    <z-input-number v-model="value" button-placement="both" />
    <z-input-number v-model="value" button-placement="both">
      <template #prefix>
        $
      </template>
    </z-input-number>
    <z-input-number v-model="value" button-placement="both">
      <template #suffix>
        ฿
      </template>
    </z-input-number>
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref(0)
    }
  }
})
</script>
