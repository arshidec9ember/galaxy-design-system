<markdown>
# Collapse

Collapsing works in responsive layout.
</markdown>

<template>
  <z-grid :cols="2">
    <z-form-item-gi label="Item Count">
      <z-input-number v-model="gridItemCount" :min="1" />
    </z-form-item-gi>
    <z-form-item-gi label="Max Rows After Collapsed">
      <z-input-number v-model="gridCollapsedRows" :min="1" />
    </z-form-item-gi>
    <z-form-item-gi label="Show Suffix Node">
      <z-switch v-model="showSuffix" />
    </z-form-item-gi>
    <z-form-item-gi label="Grid Collapsed">
      <z-switch v-model="gridCollapsed" />
    </z-form-item-gi>
  </z-grid>
  <z-grid
    :cols="5"
    :collapsed="gridCollapsed"
    :collapsed-rows="gridCollapsedRows"
  >
    <z-gi
      v-for="i in gridItemCount"
      :key="i"
      :class="i % 2 ? 'blue' : 'light-blue'"
    >
      {{ i }}
    </z-gi>
    <z-gi v-if="showSuffix" suffix class="suffix" #="{ overflow }">
      {{ overflow ? 'Node Overflows Exists' : 'No Node Overflows' }}
    </z-gi>
  </z-grid>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      gridCollapsed: ref(false),
      gridCollapsedRows: ref(1),
      gridItemCount: ref(4),
      showSuffix: ref(true)
    }
  }
})
</script>

<style>
.suffix {
  height: 108px;
  border: 1px solid rgba(43, 79, 240, 0.36);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}
.light-blue {
  height: 108px;
  background-color: rgba(43, 79, 240, 0.6);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}
.blue {
  height: 108px;
  background-color: rgba(43, 79, 240, 0.8);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
