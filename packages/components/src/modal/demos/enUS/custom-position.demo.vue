<markdown>
# Customizing position

Use fixed position to set the position of the modal.
</markdown>

<template>
  <z-space>
    <z-button @click="showModal = true">
      Start Me up
    </z-button>
    <z-modal v-model:show="showModal">
      <z-card-standard
        title="Modal"
        :bordered="false"
        size="x-large"
        role="dialog"
        aria-modal="true"
        style="width: 600px; position: fixed; right: 100px; bottom: 100px"
      >
        <template #header-end>
          Oops!
        </template>
        Content
        <template #footer>
          Footer
        </template>
      </z-card-standard>
    </z-modal>
  </z-space>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      showModal: ref(false)
    }
  }
})
</script>
