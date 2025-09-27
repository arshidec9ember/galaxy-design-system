<markdown>
# Modify exist message
</markdown>

<template>
  <z-space>
    <z-button @click="createMessage">
      Create a Message Firstly
    </z-button>
    <z-button @click="changeType">
      Change Type
    </z-button>
    <z-button @click="plus">
      Plus 1
    </z-button>
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useMessage, MessageReactive, MessageType } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const message = useMessage()
    const types: MessageType[] = [
      'success',
      'info',
      'warning',
      'error',
      'loading'
    ]
    const countRef = ref(0)
    let typeIndex = 0
    let msgReactive: MessageReactive | null = null

    return {
      plus () {
        if (msgReactive) {
          countRef.value++
          msgReactive.content = '' + countRef.value
        }
      },
      changeType () {
        if (msgReactive) {
          typeIndex = (typeIndex + 1) % types.length
          msgReactive.type = types[typeIndex]
        }
      },
      createMessage () {
        msgReactive = message.create('' + countRef.value, {
          type: types[typeIndex],
          duration: 10000
        })
      }
    }
  }
})
</script>
