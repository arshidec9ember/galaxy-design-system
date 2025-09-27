<markdown>
# Multiple

Select multiple value in popselect.
</markdown>

<template>
  <z-popselect
    v-model="selectedOptions.value"
    multiple
    :options="options"
    scrollable
    trigger="click"
    :width="264"
    @update:model-value="handleUpdate"
  >
    <z-button variant="filled" color="primary">
      <z-ellipsis style="max-width: 240px; min-width: 240px">
        {{
          Array.isArray(selectedOptions.label) && selectedOptions.label.length
            ? selectedOptions.label
            : 'Nothing'
        }}
      </z-ellipsis>
    </z-button>
  </z-popselect>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

interface SelectedOptions {
  label: string[]
  value: string[] | null
}

export default defineComponent({
  setup () {
    const selectedOptions = ref<SelectedOptions>({
      label: [],
      value: null
    })
    return {
      selectedOptions,
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
      ],
      handleUpdate: (
        val: string[],
        option: { label: string; value: string }[]
      ) => {
        selectedOptions.value.label = option.map((opt) => opt.label)
      }
    }
  }
})
</script>
