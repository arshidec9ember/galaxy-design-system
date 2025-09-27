<markdown>
# Controlled

Modal can be controlled.
</markdown>

<template>
  <z-space>
    <z-button @click="handleClick">
      Start Me up
    </z-button>
    <z-modal :show="showModal">
      <z-card-standard
        style="width: 600px"
        title="Modal"
        :bordered="false"
        size="x-large"
        role="dialog"
        aria-modal="true"
      >
        Countdown {{ timeout / 1000 }}s
      </z-card-standard>
    </z-modal>
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const showModalRef = ref(false)
    const timeoutRef = ref(6000)

    const countdown = () => {
      if (timeoutRef.value <= 0) {
        showModalRef.value = false
      } else {
        timeoutRef.value -= 1000
        setTimeout(countdown, 1000)
      }
    }

    const handleClick = () => {
      showModalRef.value = true
      timeoutRef.value = 6000

      countdown()
    }

    return {
      showModal: showModalRef,
      timeout: timeoutRef,
      handleClick
    }
  }
})
</script>
