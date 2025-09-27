<markdown>
# Customizing field

You can change the label-field and value-field.
</markdown>

<template>
  <z-space vertical>
    <z-select
      label-field="Movielabel"
      value-field="Movievalue"
      children-field="Moviechildren"
      filterable
      :options="options"
    />
    <z-select
      label-field="Movielabel"
      value-field="Movievalue"
      children-field="Moviechildren"
      filterable
      multiple
      :options="options"
    />
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { SelectOption, SelectGroupOption } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const options: Array<SelectOption | SelectGroupOption> = [
      {
        type: 'group',
        Movielabel: 'Drama',
        key: 'Drama Movies',
        Moviechildren: [
          {
            Movielabel: 'The Shawshank Redemption',
            Movievalue: 'movie0'
          },
          {
            Movielabel: 'Forrest Gump',
            Movievalue: 'movie1'
          },
          {
            Movielabel: 'The Godfather',
            Movievalue: 'movie2',
            disabled: true
          },
          {
            Movielabel: "Schindler's List",
            Movievalue: 'movie3'
          },
          {
            Movielabel: 'The Silence of the Lambs',
            Movievalue: 'movie4'
          },
          {
            Movielabel: 'Gladiator',
            Movievalue: 'movie5'
          },
          {
            Movielabel: 'Pulp Fiction',
            Movievalue: 'movie6'
          },
          {
            Movielabel: 'Fight Club',
            Movievalue: 'movie7',
            disabled: true
          },
          {
            Movielabel: 'Inception',
            Movievalue: 'movie8'
          },
          {
            Movielabel: 'The Dark Knight',
            Movievalue: 'movie9'
          },
          {
            Movielabel: 'Avatar',
            Movievalue: 'movie10'
          },
          {
            Movielabel: 'Memento',
            Movievalue: 'movie11'
          },
          {
            Movielabel: 'The Departed',
            Movievalue: 'movie12'
          }
        ]
      },
      {
        type: 'group',
        Movielabel: 'Comedy',
        key: 'Comedy Movies',
        Moviechildren: [
          {
            Movielabel: 'Superbad',
            Movievalue: 'Superbad'
          },
          {
            Movielabel: 'Bridesmaids',
            Movievalue: 'Bridesmaids'
          },
          {
            Movielabel: 'Anchorman: The Legend of Ron Burgundy',
            Movievalue: 'Anchorman'
          },
          {
            Movielabel: 'Napoleon Dynamite',
            Movievalue: 'Napoleon Dynamite'
          },
          {
            Movielabel: 'The Hangover',
            Movievalue: 'The Hangover'
          },
          {
            Movielabel: 'Dumb and Dumber',
            Movievalue: 'Dumb and Dumber'
          },
          {
            Movielabel: 'Groundhog Day',
            Movievalue: 'Groundhog Day'
          },
          {
            Movielabel: "Ferris Bueller's Day Off",
            Movievalue: 'Ferris Bueller'
          },
          {
            Movielabel: 'The Grand Budapest Hotel',
            Movievalue: 'Grand Budapest Hotel'
          },
          {
            Movielabel:
              'This is a Very Long Movie Title That Goes On and On and On and On and On and On and On and On and On',
            Movievalue: 'movie13'
          }
        ]
      }
    ]

    return {
      whateverValue: ref(null),
      options
    }
  }
})
</script>
