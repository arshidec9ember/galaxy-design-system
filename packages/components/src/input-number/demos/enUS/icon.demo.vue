<markdown>
# Prefix & suffix

Add prefix and suffix contents.
</markdown>

<template>
  <z-space vertical>
    <z-input-number v-model="value">
      <template #prefix>
        $
      </template>
    </z-input-number>
    <z-input-number v-model="value">
      <template #suffix>
        %
      </template>
    </z-input-number>
    <z-input-number v-model="value" :show-button="false">
      <template #suffix>
        %
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
