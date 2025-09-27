<markdown>
# Basic
</markdown>

<template>
  <z-space align="center">
    <z-radio
      :model-value="checkedValue === 'Mumbai'"
      value="Mumbai"
      name="basic-demo"
      @change="handleChange"
    >
      Mumbai
    </z-radio>
    <z-radio
      :model-value="checkedValue === 'Bangalore'"
      value="Bangalore"
      name="basic-demo"
      @change="handleChange"
    >
      Bangalore
    </z-radio>
    <z-radio
      :model-value="checkedValue === 'Bangalore'"
      value="Bangalore"
      :disabled="disabled"
      name="basic-demo"
      label="Bangalore"
      @change="handleChange"
    />
    <z-switch v-model="disabled" />
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const checkedValueRef = ref<string | null>(null)

    return {
      disabled: ref(true),
      checkedValue: checkedValueRef,
      handleChange (e: Event) {
        checkedValueRef.value = (e.target as HTMLInputElement).value
      }
    }
  }
})
</script>
