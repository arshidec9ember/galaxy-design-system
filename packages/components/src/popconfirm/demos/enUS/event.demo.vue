<markdown>
# Event

You can listen to the `positive-click` and `negative-click` events to handle the actions.
</markdown>

<template>
  <z-popconfirm
    @positive-click="handlePositiveClick"
    @negative-click="handleNegativeClick"
  >
    <template #activator>
      <z-button>Quit Game</z-button>
    </template>
    Would you like to quit the game?
  </z-popconfirm>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      handlePositiveClick () {
        message.info('positive click')
      },
      handleNegativeClick () {
        message.info('negative click')
      }
    }
  }
})
</script>
