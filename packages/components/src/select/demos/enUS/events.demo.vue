<markdown>
# UpdateValue event

</markdown>
<template>
  <z-space vertical>
    <z-select
      placeholder="Please select a movie"
      :options="options"
      @update:model-value="handleUpdateValue"
    />
    <z-select
      multiple
      placeholder="Please Select Movies"
      :options="options"
      @update:model-value="handleUpdateValue"
    />
  </z-space>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage, SelectOption } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      handleUpdateValue (value: string, option: SelectOption) {
        message.info('value: ' + JSON.stringify(value))
        message.info('option: ' + JSON.stringify(option))
      },
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
