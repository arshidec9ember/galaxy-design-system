<markdown>
# Result

Use result component inside modal.
</markdown>

<template>
  <z-space>
    <z-button @click="showModal = true">
      Start Me up
    </z-button>
    <z-modal v-model:show="showModal">
      <div class="modal-feedback">
        <z-result
          align="left"
          status="error"
          title="Unexpected Error"
          description="The request could not be understood by the server due to malformed syntax or invalid request."
        >
          <template #actions>
            <z-button-overflow :max-item="2">
              <z-button
                variant="filled"
                color="primary"
                @click="tryCallback"
              >Try Again</z-button>
              <z-button @click="backCallback">
                Back to Home
              </z-button>
            </z-button-overflow>
          </template>
        </z-result>
      </div>
    </z-modal>
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useMessage } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const message = useMessage()
    const showModal = ref(false)
    return {
      showModal,
      tryCallback () {
        message.success('Try Again')
      },
      backCallback () {
        message.success('Back to Home')
        showModal.value = false
      }
    }
  }
})
</script>
<style>
.modal-feedback {
  padding: 24px;
  background-color: #fff;
  max-width: 448px;
  border-radius: var(--gds-border-radius-m);
}
</style>
