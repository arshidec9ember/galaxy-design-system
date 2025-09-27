<markdown>
# I18n

Use `locale` to set i18n language.

Please note that, the feature uses `Intl` API. For compitability refers to [format](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/format) and [formatToParts](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/formatToParts).

</markdown>

<template>
  <z-space vertical>
    <z-number-animation
      ref="numberAnimationInstRef"
      :from="0.0"
      :to="699700.699"
      :active="false"
      :precision="3"
      locale="ru-RU"
      show-separator
    />
    <z-button @click="handleClick"> Play </z-button>
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { NumberAnimationInst } from '@zeta-gds/components'

export default defineComponent({
  setup() {
    const numberAnimationInstRef = ref<NumberAnimationInst | null>(null)
    return {
      numberAnimationInstRef,
      handleClick() {
        numberAnimationInstRef.value?.play()
      }
    }
  }
})
</script>
