<markdown>
# Use in form
</markdown>

<template>
  <z-form :model="model" :rules="rules">
    <z-form-item path="tags" :show-label="false">
      <z-dynamic-tags v-model="model.tags" />
    </z-form-item>
  </z-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      model: ref({
        tags: ['teacher', 'programmer']
      }),
      rules: {
        tags: {
          trigger: ['change'],
          validator (rule: unknown, value: string[]) {
            if (value.length >= 5) return new Error('Up to 4 tags')
            return true
          }
        }
      }
    }
  }
})
</script>
