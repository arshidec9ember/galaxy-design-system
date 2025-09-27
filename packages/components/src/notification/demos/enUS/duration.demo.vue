<markdown>
  # Duration

  Auto close.
  </markdown>

<template>
  <z-button @click="handleClick">
    Duration: 10000
  </z-button>
</template>

<script lang="ts">
import { useNotification } from '@zeta-gds/components'
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    const notification = useNotification()
    return {
      handleClick () {
        let count = 10
        const n = notification.create({
          title:
            'What comes once in a minute, twice in a moment, but never in a thousand years?',
          description: `You have ${count} seconds to answer the question.`,
          duration: 10000,
          closable: false,
          onAfterEnter: () => {
            const minusCount = () => {
              count--
              n.description = `You have ${count} seconds to answer the question.`
              if (count > 0) {
                window.setTimeout(minusCount, 1000)
              }
            }
            window.setTimeout(minusCount, 1000)
          },
          onAfterLeave: () => {
            notification.create({
              title: 'Answer: M',
              duration: 100000
            })
          }
        })
      }
    }
  }
})
</script>
