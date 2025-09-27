<markdown>
# Filterable

You can type and select an option from the list.
</markdown>

<template>
  <z-space vertical>
    <z-icon :size="24">
      <keyboard12324-regular />
    </z-icon>
    <z-select
      v-model="selectedValue"
      filterable
      placeholder="Please select a movie"
      :options="options"
    />
    <z-select
      v-model="selectedValues"
      multiple
      filterable
      placeholder="Please Select Movies"
      :options="options"
    />
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Keyboard12324Regular from '@vicons/fluent/Keyboard12324Regular'

export default defineComponent({
  components: {
    Keyboard12324Regular
  },
  setup () {
    return {
      selectedValue: ref('movie0'),
      selectedValues: ref(['movie0']),
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
