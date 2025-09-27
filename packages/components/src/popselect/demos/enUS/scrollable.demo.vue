<markdown>
# Scrollable

Please hover.
</markdown>

<template>
  <z-popselect
    v-model="option.value"
    :options="options"
    size="medium"
    scrollable
    @update:model-value="(val, opt) => (option = opt)"
  >
    <z-button style="margin-right: 8px" variant="filled" color="primary">
      {{ option.label || 'Popselect' }}
    </z-button>
  </z-popselect>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      option: ref({
        label: 'Inception',
        value: 'movie0'
      }),
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
        },
        {
          label: 'The Dark Knight',
          value: 'movie4'
        },
        {
          label: 'Fight Club',
          value: 'movie5'
        },
        {
          label: 'Forrest Gump',
          value: 'movie6'
        },
        {
          label: 'The Matrix',
          value: 'movie7',
          disabled: true
        },
        {
          label: 'Gladiator',
          value: 'movie8'
        },
        {
          label: "Schindler's List",
          value: 'movie9'
        },
        {
          label: 'Avatar',
          value: 'movie10'
        }
      ]
    }
  }
})
</script>
