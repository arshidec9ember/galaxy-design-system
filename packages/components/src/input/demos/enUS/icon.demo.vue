<markdown>
# Prefix & suffix

Input supports prefix and suffix. With the help of `z-icon`, you can easily create an input with icon.
</markdown>

<template>
  <z-space vertical>
    <z-input placeholder="Flash">
      <template #prefix>
        <z-icon :component="FlashOutline" />
      </template>
    </z-input>
    <z-input round placeholder="1,400,000">
      <template #suffix>
        $
      </template>
    </z-input>
    <z-input round placeholder="Flash">
      <template #suffix>
        <z-icon :component="FlashOutline" />
      </template>
    </z-input>
  </z-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { FlashOutline } from '@vicons/ionicons5'

export default defineComponent({
  setup () {
    return {
      FlashOutline
    }
  }
})
</script>
