<markdown>
# Use preset card

Modal has some presets, which means you can use props & slots of the preset after set it.
</markdown>

<template>
  <z-space>
    <z-button @click="showModal = true">
      Start Me up
    </z-button>
    <z-modal
      v-model:show="showModal"
      class="custom-card"
      preset="card"
      title="Modal"
      :style="bodyStyle"
      :bordered="false"
      size="x-large"
      :divider="divider"
    >
      <template #header-end>
        Oops!
      </template>
      Content
      <template #footer>
        Footer
      </template>
    </z-modal>
  </z-space>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup () {
    return {
      bodyStyle: {
        width: '600px'
      },
      divider: {
        content: 'soft',
        footer: 'soft'
      } as const,
      showModal: ref(false)
    }
  }
})
</script>
