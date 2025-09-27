<markdown>
# Use OS theme

Galaxy Design Components provides `useOsTheme` to get the current theme of your OS.
</markdown>

<template>
  <z-config-provider :theme="theme">
    <z-card-standard>
      Your current system theme is {{ osTheme }}.
    </z-card-standard>
  </z-config-provider>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useOsTheme, darkTheme } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const osThemeRef = useOsTheme()
    return {
      theme: computed(() => (osThemeRef.value === 'dark' ? darkTheme : null)),
      osTheme: osThemeRef
    }
  }
})
</script>
