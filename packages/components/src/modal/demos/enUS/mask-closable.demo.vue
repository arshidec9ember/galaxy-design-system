<markdown>
# Mask closable

Use `mask-closable=false` to make modal not emit the event which may close the modal.
</markdown>

<template>
  <z-space>
    <z-button @click="showModal = true">
      Start Me up
    </z-button>
    <z-modal
      v-model:show="showModal"
      :mask-closable="false"
      preset="dialog"
      title="Dialog"
      icon-placement="left"
      content="Are you sure?"
      positive-text="Confirm"
      negative-text="Cancel"
      @positive-click="onPositiveClick"
      @negative-click="onNegativeClick"
    />
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useMessage } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const message = useMessage()
    const showModalRef = ref(false)

    return {
      showModal: showModalRef,
      onPositiveClick () {
        message.success('Submit')
        showModalRef.value = false
      },
      onNegativeClick () {
        message.success('Cancel')
        showModalRef.value = false
      }
    }
  }
})
</script>
