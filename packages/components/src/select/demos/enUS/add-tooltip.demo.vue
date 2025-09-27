<markdown>
# Add tooltip to option

Use the `render-option` property to control rendering of the entire option. If you're adding the manual tooltip make the default tooltip as false.
</markdown>

<template>
  <z-select :options="options" :render-option="renderOption" :tooltip="false" />
</template>

<script lang="ts">
import { defineComponent, h, ref, VNode } from 'vue'
import { ZTooltip, SelectOption } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    return {
      renderOption: ({ node, option }: { node: VNode; option: SelectOption }) =>
        h(ZTooltip, null, {
          trigger: () => node,
          default: () => 'Movie Name -' + option.label
        }),
      options: ref([
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
            'This is a Very Long Movie Title That Goes On and On and On and On and On and On and On and On and On and On and On and On',
          value: 'movie12'
        }
      ])
    }
  }
})
</script>
