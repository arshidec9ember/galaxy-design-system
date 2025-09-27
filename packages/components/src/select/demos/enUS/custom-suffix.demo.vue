<markdown>
# Customize arrow

Make arrow a bit different.
</markdown>

<template>
  <z-space vertical>
    <z-select
      v-model:show="show1"
      placeholder="Please select a movie"
      :options="options"
    >
      <template #arrow>
        <flash-checkmark16-regular v-if="show1" />
        <flash16-regular v-else />
      </template>
    </z-select>
  </z-space>
</template>

<script lang="ts">
import Flash16Regular from '@vicons/fluent/Flash16Regular'
import FlashCheckmark16Regular from '@vicons/fluent/FlashCheckmark16Regular'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: {
    Flash16Regular,
    FlashCheckmark16Regular
  },
  setup () {
    return {
      show1: ref(false),
      show2: ref(false),
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

<style>
:deep(.slide-left-enter-active),
:deep(.slide-left-leave-active) {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

:deep(.slide-left-enter-from),
:deep(.slide-left-leave-to) {
  position: absolute;
  opacity: 0;
}

:deep(.slide-left-enter-from) {
  transform: translateX(-10px);
}

:deep(.slide-left-leave-to) {
  transform: translateX(10px);
}
</style>
