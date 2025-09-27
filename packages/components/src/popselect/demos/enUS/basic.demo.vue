<markdown>
# Basic
</markdown>

<template>
  <z-popselect :options="options">
    <template #default="{ option }">
      <z-button variant="filled" color="primary">
        {{ option?.label || 'Popselect' }}
      </z-button>
    </template>
  </z-popselect>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {
      options: [
        {
          label: 'Inception',
          value: 'movie0'
        },
        {
          label: 'The Shawshank Redemption',
          value: 'movie1'
        },
        {
          label: 'Pulp Fiction',
          value: 'movie2'
        },
        {
          label: 'The Godfather',
          value: 'movie3',
          disabled: true
        }
      ]
    }
  }
})
</script>
