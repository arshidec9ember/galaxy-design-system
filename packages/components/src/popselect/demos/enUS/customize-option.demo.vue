<markdown>
# Customize Option

Check the colored menu.
</markdown>

<template>
  <z-popselect
    v-model="value"
    :options="options"
    class="custom-select"
    :show-checkmark="false"
    trigger="click"
    :style="{ backgroundColor: 'pink' }"
  >
    <template #default="{ option }">
      <z-button variant="filled" color="primary">
        {{ option?.label || 'Popselect' }}
      </z-button>
    </template>
  </z-popselect>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref('movie0'),
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
