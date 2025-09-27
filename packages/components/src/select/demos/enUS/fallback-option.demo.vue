<markdown>
# Fallback option

If you don't need fallback options, setting `fallback-option` to `false` ensures that only an option with a matching value will be displayed. If no option has that value, the selected value will be cleared.
</markdown>

<template>
  <z-space vertical>
    <z-select v-model="singleValue" :options="options" />
    <z-select
      v-model="multipleValue"
      multiple
      :fallback-option="trim"
      :options="options"
    />
    <z-select
      v-model="singleValue"
      placeholder="No Fallback"
      :fallback-option="false"
      :options="options"
    />
    <z-select
      v-model="multipleValue"
      placeholder="No Fallback"
      multiple
      :fallback-option="false"
      :options="options"
    />
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { SelectOption } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    return {
      trim: (value: string): SelectOption => {
        return {
          label: value.split(' ')[0],
          value
        }
      },
      singleValue: ref('A Nowhere Value'),
      multipleValue: ref(['First Nowhere Value', 'Second Nowhere Value']),
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
