<markdown>
# Icon
</markdown>

<template>
  <z-button @click="createMessage">
    Hourglass Icon
  </z-button>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'
import { ZIcon, useMessage } from '@zeta-gds/components'
import { MdHourglass } from '@vicons/ionicons4'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      createMessage () {
        message.warning(
          'Anticipating diverging paths necessitates astute preparation.',
          {
            icon: () => h(ZIcon, null, { default: () => h(MdHourglass) })
          }
        )
      }
    }
  }
})
</script>
