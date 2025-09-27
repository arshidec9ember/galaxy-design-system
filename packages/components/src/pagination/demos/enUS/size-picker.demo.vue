<markdown>
# Size picker

Pagination can be enable size picker by setting the `show-size-picker` prop to `true`.
</markdown>

<template>
  <z-pagination
    v-model:page="page"
    v-model:page-size="pageSize"
    :page-count="100"
    show-size-picker
    :page-sizes="[10, 20, 30, 40]"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      page: ref(2),
      pageSize: ref(20)
    }
  }
})
</script>
