<markdown>
# Customize checked value

Use `checked-value` and `unchecked-value` to customize respective values.
</markdown>

<template>
  <z-switch
    checked-value="Foo"
    unchecked-value="Bar"
    @update:model-value="handleUpdateValue"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      handleUpdateValue (value: string) {
        message.info(value)
      }
    }
  }
})
</script>
