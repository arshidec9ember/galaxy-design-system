<markdown>
# Use form item alone

You can also use `z-form-item` outside of an `z-form` element.
</markdown>

<template>
  <z-form-item
    help-message="This is help message"
    description="This is description"
    label="This is a FormItem"
    :rule="rule"
  >
    <z-input v-model="value" />
  </z-form-item>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

const message = 'It is not in a Form'

export default defineComponent({
  setup () {
    const valueRef = ref(message)
    return {
      value: valueRef,
      rule: {
        trigger: ['input', 'blur'],
        validator () {
          if (valueRef.value !== message) {
            return new Error(message)
          }
        }
      }
    }
  }
})
</script>
