<markdown>
# Indeterminate
</markdown>

<template>
  <z-space item-style="display: flex;" align="center">
    <z-checkbox v-model="value" :indeterminate="indeterminate">
      checkbox
    </z-checkbox>
    <z-checkbox v-model="value" :indeterminate="indeterminate" />
    <z-checkbox v-model="value" :indeterminate="indeterminate" disabled />
    <z-button size="small" @click="value = !value">
      Check
    </z-button>
    <z-button size="small" @click="indeterminate = !indeterminate">
      Indeterminate
    </z-button>
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref(false),
      indeterminate: ref(false)
    }
  }
})
</script>
