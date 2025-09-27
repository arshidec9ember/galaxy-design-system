<markdown>
# Content size

Text is resized to fit the avatar.
</markdown>

<template>
  <z-space vertical item-style="line-height: 0;">
    <z-space>
      <z-avatar>{{ value }}</z-avatar>
      <z-avatar round>
        {{ value }}
      </z-avatar>
    </z-space>
    <z-input v-model="value" />
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref('Image')
    }
  }
})
</script>
