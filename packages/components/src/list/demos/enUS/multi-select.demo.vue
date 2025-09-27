import { type } from '../../../tree-select/index';
<markdown>
# Multi-Select
you can select multiple value from the list
</markdown>

<template>
  <z-list
    v-model="value"
    hoverable
    clickable
    selectable
    multiple
    show-indicator
    :default-model-value="['Thing-1']"
    @update:model-value="handleUpdateValue"
  >
    <z-list-item value="Option-1">
      <z-facade>
        <template #description>
          <span class="list-description"> Description </span>
        </template>
        <template #header>
          <span class="list-header"> Option-1 </span>
        </template>
      </z-facade>
    </z-list-item>

    <z-list-item value="Option-2">
      <z-facade>
        <template #description>
          <span class="list-description"> Description </span>
        </template>
        <template #header>
          <span class="list-header"> Option-2 </span>
        </template>
      </z-facade>
    </z-list-item>

    <z-list-item value="Option-3">
      <z-facade>
        <template #description>
          <span class="list-description"> Description </span>
        </template>
        <template #header>
          <span class="list-header"> Option-3 </span>
        </template>
      </z-facade>
    </z-list-item>
  </z-list>
</template>

<script lang="ts">
import { useMessage } from '@zeta-gds/components'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const value = ref(null)
    const message = useMessage()
    const handleUpdateValue = (value: string | string[]) => {
      message.info(JSON.stringify(value))
    }
    return {
      value,
      handleUpdateValue
    }
  }
})
</script>

<style>
.z-list-item.z-list-item--selected {
  background-color: transparent;
}
.list-header {
  font-weight: 400;
  font-size: 14px;
}
.list-description {
  font-size: 12px;
  color: #434b79;
}
</style>
