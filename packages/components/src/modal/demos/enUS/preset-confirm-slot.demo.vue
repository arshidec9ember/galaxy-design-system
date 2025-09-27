<markdown>
# Use preset dialog (slot)

Slots are also related to preset.
</markdown>

<template>
  <z-space>
    <z-button @click="showModal = true">
      Start Me up
    </z-button>
    <z-modal v-model:show="showModal" preset="dialog" title="Dialog">
      <template #header>
        <div>title</div>
      </template>
      <div>content</div>
      <template #action>
        <div>action</div>
      </template>
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
