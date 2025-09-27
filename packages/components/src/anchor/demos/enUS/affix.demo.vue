<markdown>
# Affix

When in affix mode, Anchor can recieve addition props as same as Affix.
</markdown>

<template>
  <div style="height: 200px">
    <z-anchor
      affix
      listen-to=".document-scroll-container"
      :trigger-top="24"
      :top="88"
      style="z-index: 1"
      :bound="24"
    >
      <z-anchor-link title="Demos" href="#Demos" :header-style="headerStyle">
        <z-anchor-link is-sub-title title="Basic" href="#basic.vue" />
        <z-anchor-link is-sub-title title="Ignore-Gap" href="#ignore-gap.vue" />
        <z-anchor-link is-sub-title title="Affix" href="#affix.vue" />
        <z-anchor-link is-sub-title title="Scroll To" href="#scrollto.vue" />
      </z-anchor-link>
      <z-anchor-link title="API" href="#API" :header-style="headerStyle" />
    </z-anchor>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {
      headerStyle: 'font-weight: 500;'
    }
  }
})
</script>
