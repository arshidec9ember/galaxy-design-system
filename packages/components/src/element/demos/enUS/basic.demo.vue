<markdown>
# Basic

You can use CSS variables from it. If you need to use those variables in JS, please see [useThemeVars](../docs/theme#use-theme-vars).
</markdown>

<template>
  <z-space vertical>
    <z-space>
      <z-button @click="theme = darkTheme">
        Dark
      </z-button>
      <z-button @click="theme = null">
        Light
      </z-button>
    </z-space>
    <z-config-provider :theme="theme">
      <z-card-standard>
        <z-el
          tag="span"
          style="
            color: var(--primary-color);
            transition: 0.3s var(--cubic-bezier-ease-in-out);
          "
        >
          I am a Span.
        </z-el>
      </z-card-standard>
    </z-config-provider>
  </z-space>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { darkTheme } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    return {
      darkTheme,
      theme: ref<typeof darkTheme | null>(null)
    }
  }
})
</script>
