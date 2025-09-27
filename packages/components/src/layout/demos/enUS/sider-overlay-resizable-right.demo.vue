<markdown>
# Right Draggable Sider used as an overlay
</markdown>

<template>
  <z-space class="overlay-title">
    Overlay
    <z-switch v-model="isOverlay" />
  </z-space>
  <z-space class="overlay-title">
    Resizable
    <z-switch v-model="isResizable" />
  </z-space>
  <z-layout has-sider>
    <z-layout>
      <z-layout-header>Header</z-layout-header>
      <z-layout-content content-style="padding: 24px;">
        Content
      </z-layout-content>
      <z-layout-footer>Footer</z-layout-footer>
    </z-layout>
    <z-layout-sider
      alignment="right"
      :overlay="isOverlay"
      :resizable="isResizable"
      :show-trigger="true"
      content-style="padding: 24px;"
    >
      Layout Sider
    </z-layout-sider>
  </z-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup () {
    return {
      isOverlay: ref(true),
      isResizable: ref(true)
    }
  }
})
</script>

<style>
.overlay-title {
  padding-bottom: 16px;
}
.z-layout-header,
.z-layout-footer {
  background: #fafafa;
  outline: 2px dotted #9da2bf;
  padding: 60px;
}

.z-layout-sider {
  background: #fafafa;
}

.z-layout-content {
  background: #d5d7e6;
  outline: 2px dotted #9da2bf;
  padding: 36px;
}
</style>
