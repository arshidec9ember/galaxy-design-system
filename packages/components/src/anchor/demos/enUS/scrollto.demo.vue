<markdown>
# Scroll to
</markdown>

<template>
  <div style="height: 200px; padding-left: 200px">
    <z-anchor
      ref="anchorRef"
      affix
      :trigger-top="24"
      :top="88"
      :bound="24"
      style="z-index: 1"
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
  <z-space style="padding-left: 400px">
    <z-button @click="scrollTo('#basic.vue')">
      Basic
    </z-button>
    <z-button @click="scrollTo('#affix.vue')">
      Affix
    </z-button>
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { AnchorInst } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const anchorRef = ref<AnchorInst | null>(null)
    const scrollTo = (href: string) => {
      anchorRef.value?.scrollTo(href)
    }
    return {
      anchorRef,
      scrollTo,
      headerStyle: 'font-weight: 500;'
    }
  }
})
</script>
