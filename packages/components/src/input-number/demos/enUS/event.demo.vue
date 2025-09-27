<markdown>
# Event

Blur & change events are exposed.
</markdown>

<template>
  <z-input-number
    v-model="value"
    @update:model-value="handleChange"
    @focus="handleFocus"
    @blur="handleBlur"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useMessage } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      value: ref(0),
      handleChange (v: number | null) {
        message.info(`update:model-value(${v})`)
      },
      handleBlur () {
        message.info('blur')
      },
      handleFocus () {
        message.info('focus')
      }
    }
  }
})
</script>
