<markdown>
# Basic
</markdown>

<template>
  <z-space>
    <z-button @click="info">
      Info(Hover will keep alive)
    </z-button>
    <z-button @click="error">
      Error
    </z-button>
    <z-button @click="warning">
      Warning
    </z-button>
    <z-button @click="success">
      Success
    </z-button>
    <z-button @click="loading">
      Loading
    </z-button>
  </z-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      info () {
        message.info(
          "Your attention to detail is crucial, let's ensure it shines through.",
          {
            keepAliveOnHover: true
          }
        )
      },
      error () {
        message.error('Unexpected errors have arisen. Please review.')
      },
      warning () {
        message.warning(
          'Adjustments may be needed to navigate the challenges ahead.'
        )
      },
      success () {
        message.success(
          'Confronting change often yields opportunities for invaluable growth.'
        )
      },
      loading () {
        message.loading(
          'Upon introspection, the depth of affection often reveals itself in unforeseen dimensions.'
        )
      }
    }
  }
})
</script>
