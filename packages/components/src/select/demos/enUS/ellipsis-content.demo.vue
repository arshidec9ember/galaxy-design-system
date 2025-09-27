<markdown>
# Add tooltip for ellipsed content

Use the `render-option-label` property to control rendering.
</markdown>

<template>
  <z-select
    :options="options"
    :render-option-label="renderLabel"
    :tooltip="false"
  />
</template>

<script lang="ts">
import { defineComponent, h, ref } from 'vue'
import { ZEllipsis, SelectOption } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    return {
      renderLabel: (option: SelectOption) => {
        return [
          h(ZEllipsis, null, {
            default: () => option.label
          })
        ]
      },
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
