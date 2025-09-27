<markdown>
# Scroll to
</markdown>

<template>
  <z-space vertical size="large">
    <z-space>
      <z-button @click="siderRef?.scrollTo({ top: 120, behavior: 'smooth' })">
        Sider scroll to 120px
      </z-button>
      <z-button @click="contentRef?.scrollTo({ top: 120, behavior: 'smooth' })">
        Content scroll to 120px
      </z-button>
    </z-space>
    <z-layout style="height: 360px">
      <z-layout-header style="height: 64px; padding: 24px" bordered>
        Header
      </z-layout-header>
      <z-layout has-sider position="absolute" style="top: 64px; bottom: 64px">
        <z-layout-sider ref="siderRef" bordered content-style="padding: 24px;">
          <z-h2>Left Aside</z-h2>
          <z-h2>1</z-h2>
          <z-h2>2</z-h2>
          <z-h2>3</z-h2>
          <z-h2>4</z-h2>
          <z-h2>5</z-h2>
          <z-h2>6</z-h2>
          <z-h2>7</z-h2>
          <z-h2>8</z-h2>
          <z-h2>9</z-h2>
          <z-h2>10</z-h2>
          <z-h2>11</z-h2>
        </z-layout-sider>
        <z-layout-content
          ref="contentRef"
          content-style="padding: 24px;"
          :native-scrollbar="false"
        >
          <z-h2>Right Content</z-h2>
          <z-text tag="p">
            Aute et duis mollit Lorem sit ad. Pariatur ea pariatur nostrud
            cillum nostrud veniam. Occaecat ut mollit anim magna enim ipsum.
          </z-text>
          <z-text tag="p">
            Pariatur sit in aute dolor nisi magna commodo. Anim deserunt et
            tempor in ut anim ea mollit est. Sunt sunt sint amet amet irure
            eiusmod cupidatat fugiat ipsum veniam anim id pariatur.
          </z-text>
          <z-text tag="p">
            Laboris laborum tempor amet velit et non eu laborum irure. Proident
            sint quis magna reprehenderit. Magna anim consequat quis duis sunt
            elit proident.
          </z-text>
          <z-text tag="p">
            Adipisicing aliqua eiusmod irure exercitation. Quis aute pariatur
            occaecat laborum aliqua dolore mollit do exercitation aliquip
            laboris voluptate qui veniam. Nulla irure nulla fugiat adipisicing
            magna incididunt incididunt dolor adipisicing nostrud. Officia do
            commodo est fugiat laboris laboris sint irure qui velit pariatur
            velit tempor eu. Cillum proident mollit qui nisi et velit et elit
            deserunt reprehenderit labore tempor. Cupidatat incididunt velit do
            deserunt sint nostrud eu.
          </z-text>
          <z-text tag="p">
            Et nostrud fugiat aliqua ullamco labore incididunt laborum duis
            proident minim aute ex non minim. Nisi minim ut est proident do
            eiusmod ullamco qui labore tempor esse officia nulla amet. Esse
            ullamco pariatur pariatur labore esse aute voluptate aliquip tempor
            magna mollit aliqua. Amet proident mollit incididunt adipisicing
            enim aliquip.
          </z-text>
          <z-text tag="p">
            Ea irure enim id ut est commodo. Laboris nisi fugiat Lorem velit
            reprehenderit ea sint enim tempor eu sint ea. Ut eu in laborum
            eiusmod duis. Excepteur voluptate labore cupidatat minim velit
            laborum velit veniam in dolor ea fugiat.
          </z-text>
        </z-layout-content>
      </z-layout>
      <z-layout-footer
        bordered
        position="absolute"
        style="height: 64px; padding: 24px"
      >
        Footer
      </z-layout-footer>
    </z-layout>
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { LayoutInst, LayoutSiderInst } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const siderRef = ref<LayoutSiderInst | null>(null)
    const contentRef = ref<LayoutInst | null>(null)
    return {
      siderRef,
      contentRef
    }
  }
})
</script>
