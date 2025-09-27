<markdown>
# Max
</markdown>

<template>
  <z-message-provider :max-items="3">
    <message-button />
  </z-message-provider>
</template>

<script lang="ts">
import { defineComponent, ref, h } from 'vue'
import { useMessage, ZButton } from '@zeta-gds/components'

const MessageButton = defineComponent({
  setup () {
    const message = useMessage()
    const index = ref(0)
    return {
      message,
      index
    }
  },
  render () {
    return h(
      ZButton,
      {
        onClick: () => {
          this.index++
          this.message.info(
            `Your attention to detail ${this.index} is crucial, let's ensure it shines through.`,
            {
              keepAliveOnHover: true
            }
          )
        }
      },
      { default: () => 'Max message count: 3' }
    )
  }
})

export default defineComponent({
  components: {
    MessageButton
  }
})
</script>
