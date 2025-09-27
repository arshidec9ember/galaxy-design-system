<markdown>
  # Change Content Dynamically

  You can change any parts of notifications existed.
  </markdown>

<template>
  <z-space>
    <z-button @click="open">
      Open it
    </z-button>
    <z-button :disabled="!n" @click="change">
      Change it
    </z-button>
  </z-space>
</template>

<script lang="ts">
import { h, ref, defineComponent } from 'vue'
import {
  ZAvatar,
  useNotification,
  NotificationReactive
} from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const notification = useNotification()
    const nRef = ref<NotificationReactive | null>(null)
    return {
      n: nRef,
      open () {
        nRef.value = notification.create({
          title: 'Dynamic Content',
          description: 'Click on change button',
          duration: 0,
          progress: false,
          content: 'Write your text',
          meta: '2023-11-4 15:11',
          avatar: () =>
            h(ZAvatar, {
              size: 'small',
              round: true,
              objectFit: 'cover',
              src: 'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            }),
          onClose: () => {
            nRef.value = null
          }
        })
      },
      change () {
        if (nRef.value) {
          nRef.value.content = () =>
            h('div', {
              innerHTML: 'content change'
            })
        }
      }
    }
  }
})
</script>
