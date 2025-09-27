<template>
  <div :id="dynamicComponentContainer" ref="current" />
</template>

<script lang="ts" setup>
import {
  ZMessageProvider,
  ZDialogProvider,
  ZNotificationProvider
} from '@zeta-gds/components'
import { defineCustomElement, onMounted, nextTick, h, useSlots, ref } from 'vue'
import { uniqueId } from 'lodash-es'
import { siteSetup } from '../store'

const slots = useSlots()

const dynamicComponentContainer = uniqueId('gds-custom-element-')

const {
  configProvider: configProviderRef,
  hljs,
  themeName: themeNameRef,
  theme: themeRef,
  locale: localeRef,
  dateLocale: dateLocaleRef
} = siteSetup()

const current = ref<HTMLElement | null>(null)

const CustomElementWrapper = defineCustomElement({
  // TODO: add styles coming from slots
  render () {
    return h(
      configProviderRef.value,
      {
        class: 'demo',
        namespace: 'gds-component-demo',
        'preflight-style-disabled': true,
        'theme-name': themeNameRef.value,
        theme: themeRef.value,
        locale: localeRef.value,
        'date-locale': dateLocaleRef.value,
        hljs: hljs.value,
        shadowMode: true
      },
      [
        h(ZMessageProvider, {}, [
          h(ZNotificationProvider, {}, [
            h(ZDialogProvider, null, slots?.default)
          ])
        ])
      ]
    )
  }
})

customElements.define(dynamicComponentContainer, CustomElementWrapper)

onMounted(async () => {
  await nextTick() // wait for the next tick to ensure the container with **styles** is mounted
  current?.value?.appendChild?.(new CustomElementWrapper())
})
</script>
