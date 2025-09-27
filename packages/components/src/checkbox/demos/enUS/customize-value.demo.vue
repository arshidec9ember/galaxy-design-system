<markdown>
# Customizing checked value

Use `checked-value` and `unchecked-value` to customize value.
</markdown>

<template>
  <z-checkbox
    checked-value="Foo"
    unchecked-value="Bar"
    @update:checked="handleUpdateChecked"
  >
    FooBar
  </z-checkbox>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      handleUpdateChecked (value: boolean) {
        message.info(String(value))
      }
    }
  }
})
</script>
