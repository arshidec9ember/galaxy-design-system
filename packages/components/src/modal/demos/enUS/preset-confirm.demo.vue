<markdown>
# Use preset dialog

An example of preset `dialog`.
</markdown>

<template>
  <z-space>
    <z-button @click="showModal = true">
      Start Me up
    </z-button>
    <z-modal
      v-model:show="showModal"
      preset="dialog"
      title="Dialog"
      content="Are you sure?"
      positive-text="Submit"
      negative-text="Cancel"
      @positive-click="submitCallback"
      @negative-click="cancelCallback"
    />
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useMessage } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const message = useMessage()

    return {
      showModal: ref(false),
      cancelCallback () {
        message.success('Cancel')
      },
      submitCallback () {
        message.success('Submit')
      }
    }
  }
})
</script>
