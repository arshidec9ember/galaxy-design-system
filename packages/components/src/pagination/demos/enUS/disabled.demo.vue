<markdown>
# Disabled

Pagination can be disabled by setting the `disabled` prop to `true`..
</markdown>

<template>
  <z-space vertical>
    <z-pagination
      v-model:page="page"
      v-model:page-size="pageSize"
      :page-count="100"
      show-size-picker
      :page-sizes="[10, 20, 30, 40]"
      show-quick-jumper
      :disabled="disabled"
    />
    <z-switch v-model="disabled" />
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      page: ref(2),
      pageSize: ref(20),
      disabled: ref(true)
    }
  }
})
</script>
