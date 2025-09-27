<markdown>
# Error Slot
</markdown>

<template>
  <z-data-table :columns="columns" :data="data" :has-error="true">
    <template #error>
      <z-result
        title="This is the Error"
        description="Error occurred"
        variant="image"
        status="404"
      />
    </template>
  </z-data-table>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

const createColumns = () => {
  return [
    {
      title: 'Name',
      key: 'name'
    },
    {
      title: 'Age',
      key: 'age'
    },
    {
      title: 'Address',
      key: 'address'
    },
    {
      title: 'Tags',
      key: 'tags'
    },
    {
      title: 'Action',
      key: 'actions'
    }
  ]
}

export default defineComponent({
  setup () {
    return {
      data: ref([]),
      columns: createColumns()
    }
  }
})
</script>
