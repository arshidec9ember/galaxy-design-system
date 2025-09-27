<markdown>
# Disabled

Inputs can also be disabled.
</markdown>

<template>
  <z-space vertical>
    <z-input
      type="text"
      size="small"
      placeholder="Oops! It is disabled."
      :disabled="!active"
      round
    />
    <z-input
      type="textarea"
      size="small"
      placeholder="Oops! It is disabled."
      :disabled="!active"
      round
    />
    <z-input pair separator="to" clearable :disabled="!active">
      <template #affix>
        <z-icon :component="FlashOutline" />
      </template>
    </z-input>
    <z-switch v-model="active" />
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { FlashOutline } from '@vicons/ionicons5'

export default defineComponent({
  setup () {
    return {
      FlashOutline,
      active: ref(false)
    }
  }
})
</script>
