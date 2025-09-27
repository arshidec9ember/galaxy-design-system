<markdown>
# Borderless
</markdown>

<template>
  <z-space vertical>
    <z-switch v-model="bordered">
      <template #checked>
        Bordered
      </template>
      <template #unchecked>
        Borderless
      </template>
    </z-switch>
    <z-space>
      <z-tag :bordered="bordered">
        Real Love
      </z-tag>
      <z-tag :bordered="bordered" color="success">
        Active
      </z-tag>
      <z-tag :bordered="bordered" color="warning">
        Warning
      </z-tag>
      <z-tag :bordered="bordered" color="error">
        Inactive
      </z-tag>
      <z-tag :bordered="bordered" color="info">
        Info
      </z-tag>
    </z-space>
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      bordered: ref(false)
    }
  }
})
</script>
