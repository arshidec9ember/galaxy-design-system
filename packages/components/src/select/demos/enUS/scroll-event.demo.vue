<markdown>
# Scroll event

</markdown>

<template>
  <z-select
    :options="options"
    :reset-menu-on-options-change="false"
    @scroll="handleScroll"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const optionsRef = ref([
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
    ])

    return {
      options: optionsRef,
      handleScroll (e: Event) {
        const currentTarget = e.currentTarget as HTMLElement
        if (
          currentTarget.scrollTop + currentTarget.offsetHeight >=
          currentTarget.scrollHeight
        ) {
          optionsRef.value.push(
            {
              label: `v1-${optionsRef.value.length}`,
              value: `v1-${optionsRef.value.length}`
            },
            {
              label: `v2-${optionsRef.value.length}`,
              value: `v2-${optionsRef.value.length}`
            }
          )
        }
      }
    }
  }
})
</script>
