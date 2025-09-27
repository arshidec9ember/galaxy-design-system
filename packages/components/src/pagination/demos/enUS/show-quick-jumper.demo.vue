<markdown>
# Show Quick Jumper

Hide the quick jumper if not needed. This can be used in the case where we don't have the total count.
</markdown>

<template>
  <z-pagination
    v-model:page="page"
    :has-next="hasNext"
    :page-size="pageSize"
    :show-size-picker="true"
    :page-sizes="pageSizes"
    :show-quick-jumper="false"
    :on-update:page="handlePageChange"
    :on-update:page-size="handlePageSizeChange"
  >
    <template #prefix="{ startIndex, endIndex }">
      {{ startIndex + 1 }} - {{ endIndex + 1 }}
    </template>
  </z-pagination>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const page = ref(1)
    const pageSize = ref(5)
    const handlePageSizeChange = async (item: number) => {
      pageSize.value = item
      page.value = 1
      if (page.value >= 5) {
        hasNext.value = false
      } else {
        hasNext.value = true
      }
    }
    const hasNext = ref(true)
    const handlePageChange = async (item: number) => {
      page.value = item
      if (page.value >= 5) {
        hasNext.value = false
      } else {
        hasNext.value = true
      }
    }
    return {
      page,
      pageSize,
      showSizePicker: true,
      hasNext,
      pageSizes: ref([5, 10, 20]),
      handlePageChange,
      handlePageSizeChange
    }
  }
})
</script>
