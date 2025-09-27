<markdown>
# Events

Upon clicking the 'Close' button, an event will be triggered. Subsequently, another event will occur upon the disappearance of the alert from the screen.
</markdown>

<template>
  <z-space vertical>
    <z-alert
      title="Transaction ID copied"
      color="success"
      closable
      @close="handleClose"
      @after-leave="handleClick"
    >
      You can start configuring your domain now to setup profiles.
      <template #action>
        <div class="button-group">
          <z-button variant="outlined" size="small">
            Update
          </z-button>
          <z-button variant="link" href="#" size="small">
            Link
          </z-button>
        </div>
      </template>
    </z-alert>
  </z-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      handleClose () {
        message.info('tag close')
      },
      handleClick () {
        message.info('Ater leave event')
      }
    }
  }
})
</script>
<style>
.button-group {
  display: flex;
  gap: 20px;
}
</style>
