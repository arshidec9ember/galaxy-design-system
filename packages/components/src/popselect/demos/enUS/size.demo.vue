<markdown>
# Size

Pop-select has `small`, `medium`, and `large` sizes.
</markdown>

<template>
  <z-space>
    <z-popselect
      v-model="option.value"
      :options="options"
      size="small"
      :width="214"
      trigger="click"
      scrollable
      @update:model-value="(val, opt) => (option = opt)"
    >
      <z-button size="small">
        <z-ellipsis style="width: 190px">
          {{ option?.label || 'Popselect' }}
        </z-ellipsis>
      </z-button>
    </z-popselect>
    <z-popselect
      v-model="option.value"
      :options="options"
      size="medium"
      trigger="click"
      :width="239"
      scrollable
      @update:model-value="(val, opt) => (option = opt)"
    >
      <z-button>
        <z-ellipsis style="width: 215px">
          {{ option?.label || 'Popselect' }}
        </z-ellipsis>
      </z-button>
    </z-popselect>
    <z-popselect
      v-model="option.value"
      :options="options"
      :width="264"
      size="large"
      trigger="click"
      scrollable
      @update:model-value="(val, opt) => (option = opt)"
    >
      <z-button size="large">
        <z-ellipsis style="width: 240px">
          {{ option?.label || 'Popselect' }}
        </z-ellipsis>
      </z-button>
    </z-popselect>
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      option: ref({
        label: 'Inception',
        value: 'movie0'
      }),
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
