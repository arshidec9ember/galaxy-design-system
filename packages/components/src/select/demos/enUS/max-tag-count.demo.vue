<markdown>
# Max tag count

Maximum selected options to display. This can be a fixed number or the string `responsive` to set a responsive max count.
</markdown>

<template>
  <z-space vertical>
    <z-select
      v-model="value"
      placeholder="maxTagCount = responsive"
      multiple
      :options="options"
      max-tag-count="responsive"
    />
    <z-select
      v-model="value"
      placeholder="maxTagCount = 3"
      multiple
      :options="options"
      :max-tag-count="3"
    />
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref(null),
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
