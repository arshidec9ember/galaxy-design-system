<markdown>
# Debug
</markdown>

<template>
  <z-space vertical>
    <z-space>
      <z-switch v-model="multiple" />Multiple
      <z-switch v-model="checkable" />Checkable
      <z-switch v-model="cascade" />Cascade
      <z-switch v-model="filterable" />Filterable
    </z-space>
    <z-tree-select
      default-expand-all
      :options="options"
      :multiple="multiple"
      :checkable="checkable"
      :cascade="cascade"
      :filterable="filterable"
    />
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { TreeSelectOption } from '@zeta-gds/components'

function createData (level = 4, baseKey = ''): TreeSelectOption[] | undefined {
  if (!level) return undefined
  return Array.from({ length: 6 - level }).map((_, index) => {
    const key = '' + baseKey + level + index
    return {
      label: key,
      key,
      children: createData(level - 1, key)
    }
  })
}

export default defineComponent({
  setup () {
    return {
      multiple: ref(false),
      checkable: ref(false),
      cascade: ref(false),
      filterable: ref(false),
      options: createData()
    }
  }
})
</script>
