<markdown>
# Action
</markdown>

<template>
  <z-space vertical>
    <z-alert
      title="Transaction ID copied"
      color="info"
      action-placement="right"
      closable
      @close="handleClose"
      @after-leave="handleClick"
    >
      You can start configuring your domain now to setup profiles.
      <template #action>
        <div class="button-group">
          <z-button size="small">
            Update
          </z-button>
          <z-link href="#" size="small" is-bold>
            Link
          </z-link>
        </div>
      </template>
    </z-alert>
    <z-alert
      title="Transaction ID copied"
      color="info"
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
          <z-link href="#" size="small" is-bold>
            Link
          </z-link>
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
.z-alert-action .z-a {
  text-decoration: unset;
}
</style>
