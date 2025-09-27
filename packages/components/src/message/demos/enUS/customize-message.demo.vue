<markdown>
# Customize message

</markdown>

<template>
  <z-button @click="handleClick">
    Lpsum
  </z-button>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'
import { ZAlert, useMessage } from '@zeta-gds/components'
import type { MessageRenderMessage } from '@zeta-gds/components'

const renderMessage: MessageRenderMessage = (props) => {
  const { type } = props
  return h(
    ZAlert,
    {
      closable: props.closable,
      onClose: props.onClose,
      color: type === 'loading' ? 'default' : type,
      title: 'Lorem ipsum dolor sit amet',
      style: {
        boxShadow: 'var(--z-box-shadow)',
        maxWidth: 'calc(100vw - 32px)',
        width: '480px'
      }
    },
    {
      default: () => props.content
    }
  )
}

export default defineComponent({
  setup () {
    const { error } = useMessage()
    function handleClick () {
      error('Lorem ipsum dolor sit amet, consectetur adipiscing elit', {
        render: renderMessage,
        closable: true
      })
    }
    return {
      handleClick
    }
  }
})
</script>
