<markdown>
# Event
</markdown>

<template>
  <z-switch v-model="active" @update:model-value="handleChange" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useMessage } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      active: ref(false),
      handleChange (value: boolean) {
        message.info(`Update value: ${value}`)
      }
    }
  }
})
</script>
