<markdown>
# Imperative handle

Input component exposes imperative methods to handle focus, blur, selection and scrolling.
</markdown>

<template>
  <z-space vertical>
    <z-space>
      <z-button @click="handleFocus">
        Focus
      </z-button>
      <z-button :focusable="false" @click="handleBlur">
        Blur
      </z-button>
      <z-button :focusable="false" @click="handleSelect">
        Select
      </z-button>
      <z-button :focusable="false" @click="handleScrollEnd">
        ScrollToEnd
      </z-button>
    </z-space>
    <z-input ref="inputInstRef" v-model="inputValue" />
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { InputInst } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const inputInstRef = ref<InputInst | null>(null)
    return {
      inputInstRef,
      inputValue: ref("I heard you're going to select all? ".repeat(4).trim()),
      handleFocus () {
        inputInstRef.value?.focus()
      },
      handleBlur () {
        inputInstRef.value?.blur()
      },
      handleSelect () {
        inputInstRef.value?.select()
      },
      handleScrollEnd () {
        inputInstRef.value?.scrollTo({
          behavior: 'smooth',
          left: 10000
        })
      }
    }
  }
})
</script>
