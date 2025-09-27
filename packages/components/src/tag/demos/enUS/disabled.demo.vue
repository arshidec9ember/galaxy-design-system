<markdown>
# Disabled
</markdown>

<template>
  <z-space align="center" item-style="display: flex;">
    <z-tag closable :disabled="disabled" @close="handleClose">
      Real Love
    </z-tag>
    <z-tag color="success" closable :disabled="disabled" @close="handleClose">
      Active
    </z-tag>
    <z-tag color="warning" closable :disabled="disabled" @close="handleClose">
      Warning
    </z-tag>
    <z-tag color="error" closable :disabled="disabled" @close="handleClose">
      Inactive
    </z-tag>
    <z-tag color="info" closable :disabled="disabled" @close="handleClose">
      Info
    </z-tag>
    <z-switch v-model="disabled" />
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useMessage } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      disabled: ref(true),
      handleClose () {
        message.info('tag close')
      }
    }
  }
})
</script>
