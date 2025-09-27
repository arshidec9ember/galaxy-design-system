<markdown>
# Size
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
      <z-tag
        color="success"
        :bordered="false"
        :round="round"
        size="small"
        @close="handleClose"
      >
        Active
      </z-tag>
      <z-tag
        color="success"
        :bordered="false"
        :round="round"
        @close="handleClose"
      >
        Active
      </z-tag>
      <z-tag
        :bordered="false"
        :round="round"
        color="success"
        size="large"
        @close="handleClose"
      >
        Active
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
      }
    }
  }
})
</script>
