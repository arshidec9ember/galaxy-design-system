<markdown>
# Customizing Icon
</markdown>

<template>
  <z-space>
    <z-switch v-model="active" size="medium">
      <template #icon>
        🤔
      </template>
    </z-switch>
    <z-switch v-model="active" size="large">
      <template #checked-icon>
        <z-icon :component="ArrowForwardOutline" />
      </template>
      <template #unchecked-icon>
        <z-icon :component="ArrowBackOutline" />
      </template>
    </z-switch>
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ArrowBackOutline, ArrowForwardOutline } from '@vicons/ionicons5'

export default defineComponent({
  setup () {
    return {
      active: ref(false),
      ArrowBackOutline,
      ArrowForwardOutline
    }
  }
})
</script>
