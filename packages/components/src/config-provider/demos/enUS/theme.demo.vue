<markdown>
# Theme

Set theme of inner components of `z-config-provider`.
</markdown>

<template>
  <z-config-provider :theme="theme">
    <z-card-standard>
      <z-space>
        <z-button @click="theme = darkTheme">
          Dark
        </z-button>
        <z-button @click="theme = null">
          Light
        </z-button>
      </z-space>
    </z-card-standard>
  </z-config-provider>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { darkTheme } from '@zeta-gds/components'
import type { GlobalTheme } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    return {
      darkTheme,
      theme: ref<GlobalTheme | null>(null)
    }
  }
})
</script>
