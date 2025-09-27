<markdown>
# Actions after select

Choose whether the element blurs after a selection is made with `blur-after-select`.
</markdown>

<template>
  <z-space vertical>
    <z-auto-complete
      v-model="value"
      :options="options"
      clear-after-select
      placeholder="Clear After Select"
    />
    <z-auto-complete
      v-model="value"
      :options="options"
      blur-after-select
      placeholder="Blur After Select"
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
          const value = valueRef.value === null ? '' : valueRef.value
          const prefix = value.split('@')[0]
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
