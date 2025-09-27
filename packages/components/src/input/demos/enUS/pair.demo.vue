<markdown>
# Pairwise value

Pairwise value can be set using `pair` prop. `separator` prop can be used to set the separator.

</markdown>

<template>
  <z-input
    pair
    separator="-"
    :placeholder="placeholder"
    clearable
    @blur="handleInputBlur"
    @focus="handleInputFocus"
    @change="handleInputChange"
    @update:model-value="handleInputInput"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      placeholder: ['From', 'To'] as const,
      handleInputBlur () {
        message.info('Pairwise Value：Blur')
      },
      handleInputFocus () {
        message.info('Pairwise Value：Focus')
      },
      handleInputInput () {
        message.info('Pairwise Value：Input')
      },
      handleInputChange () {
        message.info('Pairwise Value：Change')
      }
    }
  }
})
</script>
