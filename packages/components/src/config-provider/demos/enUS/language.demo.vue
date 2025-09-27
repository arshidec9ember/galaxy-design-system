<markdown>
# Locale
</markdown>

<template>
  <z-space vertical>
    <z-space>
      <z-button
        @click="
          () => {
            locale = null
            dateLocale = null
          }
        "
      >
        en-US
      </z-button>
    </z-space>
    <z-config-provider :locale="locale" :date-locale="dateLocale">
      <z-date-picker />
    </z-config-provider>
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { ZLocale, ZDateLocale } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    return {
      locale: ref<ZLocale | null>(null),
      dateLocale: ref<ZDateLocale | null>(null)
    }
  }
})
</script>
