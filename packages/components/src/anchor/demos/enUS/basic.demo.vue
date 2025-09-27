<markdown>
# Basic

Custom css styles to the header can be set using header-style prop.
</markdown>

<template>
  <div>
    <z-space style="margin-bottom: 12px">
      <z-switch v-model="showRail" /> Show Rail
      <z-switch v-model="showBackground" /> Show Background
    </z-space>
    <z-anchor :show-rail="showRail" :show-background="showBackground">
      <z-anchor-link
        is-header
        title="On this page"
        href="#"
        :header-style="topHeaderStyle"
      />
      <z-anchor-link title="Demos" href="#Demos" />
      <z-anchor-link title="Basic" href="#basic.vue" />
      <z-anchor-link title="Ignore-Gap" href="#ignore-gap.vue" />
      <z-anchor-link title="Affix" href="#affix.vue" />
      <z-anchor-link title="Scroll To" href="#scrollto.vue" />
      <z-anchor-link title="API" href="#API" />
    </z-anchor>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      headerStyle: 'font-weight: 500;',
      topHeaderStyle: 'text-transform: uppercase;',
      showRail: ref(true),
      showBackground: ref(false)
    }
  }
})
</script>
