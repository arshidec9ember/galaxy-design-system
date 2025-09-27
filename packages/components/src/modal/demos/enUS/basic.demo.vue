<markdown>
# Basic

Basic usage of modal. You can put anything in modal, a card for example.
</markdown>

<template>
  <z-space>
    <z-button @click="showModal = true">
      Start Me up
    </z-button>
    <z-modal v-model:show="showModal">
      <z-card-standard
        style="width: 600px"
        title="Modal"
        :bordered="false"
        size="x-large"
        role="dialog"
        aria-modal="true"
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
