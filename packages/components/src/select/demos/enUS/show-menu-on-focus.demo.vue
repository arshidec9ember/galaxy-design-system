<markdown>
# Show Menu on Focus

Make the menu available on focus state via keyboard input.
</markdown>

<template>
  <z-space vertical>
    <z-select
      v-model="selectedValue"
      :options="options"
      clearable
      show-on-focus
    />
    <z-select
      v-model="selectedArray"
      multiple
      :options="options"
      clearable
      show-on-focus
    />
    <z-select
      v-model="selectedValue"
      :options="options"
      filterable
      clearable
      show-on-focus
    />
    <z-select
      v-model="selectedArray"
      multiple
      :options="options"
      filterable
      clearable
      show-on-focus
    />
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      selectedValue: ref(null),
      selectedArray: ref([]),
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
        },
        {
          label: 'The Lord of the Rings: The Return of the King',
          value: 'movie11',
          disabled: true
        },
        {
          label:
            'This is a Very Long Movie Title That Goes On and On and On and On and On',
          value: 'movie12'
        }
      ]
    }
  }
})
</script>
