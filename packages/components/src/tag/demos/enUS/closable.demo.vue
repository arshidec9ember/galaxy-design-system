<markdown>
# Closable
</markdown>

<template>
  <z-space vertical>
    <z-switch v-model="round">
      <template #checked>
        Unrounded
      </template>
      <template #unchecked>
        Rounded
      </template>
    </z-switch>
    <z-space>
      <z-tag :round="round" closable @close="handleClose">
        Real Love
      </z-tag>
      <z-tag :round="round" color="success" closable @close="handleClose">
        Active
      </z-tag>
      <z-tag :round="round" color="warning" closable @close="handleClose">
        Warning
      </z-tag>
      <z-tag :round="round" color="error" closable @close="handleClose">
        Inactive
      </z-tag>
      <z-tag
        color="info"
        closable
        :round="round"
        :trigger-click-on-close="false"
        @click="handleClick"
        @close="handleClose"
      >
        Info
      </z-tag>
    </z-space>
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useMessage } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      round: ref(false),
      handleClose () {
        message.info('tag close')
      },
      handleClick () {
        message.info('tag click')
      }
    }
  }
})
</script>
