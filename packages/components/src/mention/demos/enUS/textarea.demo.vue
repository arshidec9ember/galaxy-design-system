<markdown>
# Textarea

The input `type` can be set to `'textarea'`.
</markdown>

<template>
  <z-mention type="textarea" :options="options" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {
      options: [
        {
          label: 'Poonam Agrawal',
          value: 'Poonam Agrawal'
        },
        {
          label: 'Sai Varudu',
          value: 'Sai Varudu'
        },
        {
          label: 'Vishwajeet',
          value: 'Vishwajeet'
        },
        {
          label: 'Surya Prakash',
          value: 'Surya Prakash'
        },
        {
          label: 'Arindam Pradhan',
          value: 'Arindam Pradhan'
        }
      ]
    }
  }
})
</script>
