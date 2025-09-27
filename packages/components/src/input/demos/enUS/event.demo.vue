<markdown>
# Events

Events can be used to trigger actions when the user interacts with the input. Events available are `blur`, `focus`, `change`, `keyup` and `input`.
</markdown>

<template>
  <z-space vertical>
    <z-input
      placeholder="Interact to trigger events"
      @blur="handleBlur"
      @focus="handleFocus"
      @change="handleChange"
      @keyup="handleKeyUp"
      @input="handleInput"
    />
    <z-input
      type="textarea"
      placeholder="Interact to trigger events"
      @blur="handleBlur"
      @focus="handleFocus"
      @change="handleChange"
      @keyup="handleKeyUp"
      @input="handleInput"
    />
  </z-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      handleFocus () {
        message.info('[Event focus]')
      },
      handleBlur () {
        message.info('[Event blur]')
      },
      handleChange (v: string) {
        message.info('[Event change]: ' + v)
      },
      handleKeyUp () {
        message.info('[Event keyup]')
      },
      handleInput (v: string) {
        message.info('[Event input]: ' + v)
      }
    }
  }
})
</script>
