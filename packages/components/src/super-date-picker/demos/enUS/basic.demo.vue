<markdown>
# Basic Usage
</markdown>

<template>
  <z-space vertical size="large">
    <z-space vertical size="medium">
      <z-space vertical size="small">
        <z-text strong>
          Select Date:
        </z-text>
        <z-super-date-picker
          v-model:value="singleDate"
          type="date"
          format="dd-MMM-yyyy"
          display-format="dd-MMM-yyyy"
          :show-quick-ranges="false"
          placeholder="Select single date"
          @change="handleSingleDateChange"
        />
      </z-space>

      <z-space vertical size="small">
        <z-text strong>
          Select Date and Time:
        </z-text>
        <z-super-date-picker
          v-model:value="singletimeDate"
          type="datetime"
          format="dd-MMM-yyyy HH:mm:ss"
          display-format="dd-MMM-yyyy HH:mm:ss"
          :show-quick-ranges="false"
          placeholder="Select single date"
          @change="handleSingleDateChange"
        />
      </z-space>
    </z-space>
  </z-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Reactive data following Vue 3 Composition API
const singleDate = ref<number | null>(null)
const singletimeDate = ref<number | null>(null)
function handleSingleDateChange (value: number | null) {
  console.log('Single date changed:', value)
}
</script>
