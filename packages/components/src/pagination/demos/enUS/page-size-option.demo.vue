<markdown>
# Page Size Option

</markdown>

<template>
  <z-space>
    <p>
      <b>Current Page Number : </b>
      {{ page }}
    </p>
    <p>
      <b>Current Page Size: </b>
      {{ pageSize }}
    </p>
  </z-space>
  <p>
    <b>Cat Fact:</b> <i>{{ catFact }}</i>
  </p>
  <z-pagination
    v-model:page="page"
    v-model:page-size="pageSize"
    :item-count="100"
    show-size-picker
    :page-sizes="pageSizes"
    :on-update:page="handlePageChange"
  >
    <template #prefix="{ itemCount, startIndex, endIndex }">
      {{ startIndex + 1 }} - {{ endIndex + 1 }} of {{ itemCount }}
    </template>
  </z-pagination>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
async function catfactDetail (page: number) {
  const resp = await fetch('https://catfact.ninja/fact?page=' + page)
  const catfact = await resp.json()
  return catfact
}
export default defineComponent({
  setup () {
    const page = ref(1)
    const catFact = ref('')
    const pageSizes = [10, 20, 30, 40]

    const handlePageChange = async (item: number) => {
      const result = await catfactDetail(item)
      catFact.value = result.fact
      page.value = item
    }

    return {
      page,
      catFact,
      pageSize: ref(20),
      pageSizes,
      handlePageChange
    }
  },
  async mounted () {
    const result = await catfactDetail(this.page)
    this.catFact = result.fact
  }
})
</script>
