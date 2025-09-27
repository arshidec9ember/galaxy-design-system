<template>
  <z-layout
    id="doc-layout"
    :has-sider="showSider"
    :position="isMobile ? 'static' : 'absolute'"
    :style="{
      top: isMobile ? '' : 'var(--header-height)'
    }"
  >
    <z-layout-sider
      v-if="showSider"
      :native-scrollbar="false"
      :collapsed-width="20"
      collapse-mode="transform"
      trigger-style="top: 44px;"
      collapsed-trigger-style="top: 44px;"
      bordered
      show-trigger="arrow-circle"
      :inverted="true"
    >
      <z-menu
        :model-value="menuValue"
        :options="options"
        :render-label="renderMenuLabel"
        :inverted="true"
      />
    </z-layout-sider>
    <z-layout
      ref="layoutInstRef"
      :scrollbar-props="layoutScrollbarProps"
      :native-scrollbar="false"
      :position="isMobile || showSider ? 'static' : 'absolute'"
      content-style="min-height: calc(100vh - var(--header-height)); display: flex; flex-direction: column;"
    >
      <router-view />
      <site-footer />
    </z-layout>
  </z-layout>
</template>

<script lang="ts">
// Frame component for components & docs page
import { defineComponent, computed, watch, toRef, ref } from 'vue'
import { useRoute } from 'vue-router'
import { findMenuValue } from '../utils/route'
import { useIsMobile, useIsTablet } from '../utils/composables'
import SiteFooter from './home/Footer.vue'
import { useComponentOptions, useFoundationOptions, usePatternOptions, useGettingStartedOptions } from '../store'
import { renderMenuLabel } from '../store/menu-options'
import { useMemo } from '@zeta-gds/components/_external-dependencies/vooks'

export default defineComponent({
  components: {
    SiteFooter
  },
  setup () {
    const route = useRoute()
    const layoutInstRef = ref(null)
    const componentOptionsRef = useComponentOptions()
    const foundationOptionsRef = useFoundationOptions()
    const patternOptionsRef = usePatternOptions()
    const gettingStartedOptionsRef = useGettingStartedOptions()
    const optionsRef = computed(() => {
      if (route.path.includes('/components')) {
        return componentOptionsRef.value
      } else if (route.path.includes('/foundation')) {
        return foundationOptionsRef.value
      } else if (route.path.includes('/pattern')) {
        return patternOptionsRef.value
      } else if (route.path.includes('/getting-started')) {
        return gettingStartedOptionsRef.value
      } else {
        return docOptionsRef.value
      }
    })

    const menuValueRef = computed(() => {
      return findMenuValue(optionsRef.value, route.path)
    })
    watch(toRef(route, 'path'), (value, oldValue) => {
      const langAndThemeReg = /\/(zh-CN|en-US)\/(light|dark|os-theme)/g
      // only theme & lang change do not restore the scroll status
      if (
        value.replace(langAndThemeReg, '') !==
        oldValue.replace(langAndThemeReg, '')
      ) {
        layoutInstRef.value.scrollTo(0, 0)
      }
    })
    const isMobileRef = useIsMobile()
    const isTabletRef = useIsTablet()

    return {
      layoutScrollbarProps: {
        containerClass: 'document-scroll-container'
      },
      renderMenuLabel,
      showSider: useMemo(() => {
        return !isMobileRef.value && !isTabletRef.value
      }),
      layoutInstRef,
      options: optionsRef,
      menuValue: menuValueRef,
      isMobile: isMobileRef
    }
  }
})
</script>
