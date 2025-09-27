<markdown>
# Size
</markdown>

<template>
  <z-space vertical>
    <z-auto-complete
      v-model="value"
      :options="options"
      placeholder="Email"
      size="small"
    />
    <z-auto-complete
      v-model="value"
      :options="options"
      placeholder="Email"
      size="medium"
    />
    <z-auto-complete
      v-model="value"
      :options="options"
      placeholder="Email"
      size="large"
    />
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  setup () {
    const valueRef = ref('')
    return {
      value: valueRef,
      options: computed(() => {
        return ['@gmail.com', '@163.com', '@qq.com'].map((suffix) => {
          const prefix = valueRef.value.split('@')[0]
          return {
            label: prefix + suffix,
            value: prefix + suffix
          }
        })
      })
    }
  }
})
</script>
