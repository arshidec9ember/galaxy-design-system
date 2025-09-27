<markdown>
# Use object formatted value

You can use `@create` to produce `{ label, value }` formatted value.
</markdown>

<template>
  <z-dynamic-tags v-model="value" @create="onCreate" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const valueRef = ref([
      {
        label: 'Strategic Coffee Consumption',
        value: 'coffee-strategy-001'
      },
      { label: 'Advanced Procrastination', value: 'procrastination-9000' },
      {
        label: 'Meetings, Meetings, Meetings',
        value: 'endless-meetings-123'
      },
      {
        label: 'Excel Wizardry',
        value: 'excel-sorcery-007'
      }
    ])
    return {
      onCreate: (label: string) => {
        return {
          label,
          value: 'v' + label
        }
      },
      value: valueRef
    }
  }
})
</script>
