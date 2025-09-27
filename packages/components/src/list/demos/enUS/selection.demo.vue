<markdown>
# Selection
you can select value from the list
</markdown>

<template>
  <z-list
    v-model="values"
    hoverable
    clickable
    selectable
    :show-indicator="showIndicator"
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
    const values = ref(['Thing-1'])
    const message = useMessage()
    const handleUpdateValue = (value: string | string[]) => {
      message.info(JSON.stringify(value))
    }
    return {
      values,
      handleUpdateValue,
      showIndicator: ref(true)
    }
  }
})
</script>

<style>
.z-list-item.z-list-item--z-list-item--selected {
  background-color: transparent;
}

.list-header {
  font-weight: 400;
  font-size: 14px;
}
.list-description {
  font-size: 12px;
}
</style>
