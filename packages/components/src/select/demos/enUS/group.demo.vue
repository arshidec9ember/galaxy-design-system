<markdown>
# Group

Options can also be grouped together.
</markdown>

<template>
  <z-select v-model="value" filterable :options="options" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { SelectOption, SelectGroupOption } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const options: Array<SelectOption | SelectGroupOption> = [
      {
        type: 'group',
        label: 'Drama',
        key: 'Drama Movies',
        children: [
          {
            label: 'The Shawshank Redemption',
            value: 'movie0'
          },
          {
            label: 'Forrest Gump',
            value: 'movie1'
          },
          {
            label: 'The Godfather',
            value: 'movie2',
            disabled: true
          },
          {
            label: "Schindler's List",
            value: 'movie3'
          },
          {
            label: 'The Silence of the Lambs',
            value: 'movie4'
          },
          {
            label: 'Gladiator',
            value: 'movie5'
          },
          {
            label: 'Pulp Fiction',
            value: 'movie6'
          },
          {
            label: 'Fight Club',
            value: 'movie7',
            disabled: true
          },
          {
            label: 'Inception',
            value: 'movie8'
          },
          {
            label: 'The Dark Knight',
            value: 'movie9'
          },
          {
            label: 'Avatar',
            value: 'movie10'
          },
          {
            label: 'Memento',
            value: 'movie11'
          },
          {
            label: 'The Departed',
            value: 'movie12'
          }
        ]
      },
      {
        type: 'group',
        label: 'Comedy',
        key: 'Comedy Movies',
        children: [
          {
            label: 'Superbad',
            value: 'Superbad'
          },
          {
            label: 'Bridesmaids',
            value: 'Bridesmaids'
          },
          {
            label: 'Anchorman: The Legend of Ron Burgundy',
            value: 'Anchorman'
          },
          {
            label: 'Napoleon Dynamite',
            value: 'Napoleon Dynamite'
          },
          {
            label: 'The Hangover',
            value: 'The Hangover'
          },
          {
            label: 'Dumb and Dumber',
            value: 'Dumb and Dumber'
          },
          {
            label: 'Groundhog Day',
            value: 'Groundhog Day'
          },
          {
            label: "Ferris Bueller's Day Off",
            value: 'Ferris Bueller'
          },
          {
            label: 'The Grand Budapest Hotel',
            value: 'Grand Budapest Hotel'
          },
          {
            label:
              'This is a Very Long Movie Title That Goes On and On and On and On and On',
            value: 'movie13'
          }
        ]
      }
    ]
    return {
      value: ref(null),
      options
    }
  }
})
</script>
