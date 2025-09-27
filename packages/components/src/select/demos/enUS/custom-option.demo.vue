<markdown>
# Customize option rendering

</markdown>

<template>
  <z-select :options="options" :render-option-label="renderLabel" />
</template>

<script lang="ts">
import { defineComponent, h, VNodeChild } from 'vue'
import { ZIcon, SelectOption, SelectGroupOption } from '@zeta-gds/components'
import { MdMusicalNote as MusicIcon } from '@vicons/ionicons4'

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
              'This is a Very Long Movie Title That Goes On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On and On',
            value: 'movie13'
          }
        ]
      }
    ]

    return {
      renderLabel: (option: SelectOption): VNodeChild => {
        if (option.type === 'group') return option.label + '(Cool!)'
        return [
          h(
            ZIcon,
            {
              style: {
                verticalAlign: '-0.15em',
                marginRight: '4px'
              }
            },
            {
              default: () => h(MusicIcon)
            }
          ),
          option.label as string
        ]
      },
      options
    }
  }
})
</script>
