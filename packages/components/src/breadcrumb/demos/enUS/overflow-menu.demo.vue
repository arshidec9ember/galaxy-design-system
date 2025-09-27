<markdown>
# Overflow-menu

The hidden additional breadcrumb items become visible in a dropdown menu upon clicking the ellipses.
</markdown>

<template>
  <z-space vertical>
    <z-breadcrumb :max-items="2" :items-before-collapse="2" show-overflow-menu>
      <z-breadcrumb-item> Item 1 </z-breadcrumb-item>
      <z-breadcrumb-item> Item 2 </z-breadcrumb-item>
      <z-breadcrumb-item> Item 3 </z-breadcrumb-item>
      <z-breadcrumb-item> Item 4 </z-breadcrumb-item>
      <z-breadcrumb-item> Item 5 </z-breadcrumb-item>
    </z-breadcrumb>

    <p>Trigger type: Click</p>
    <z-breadcrumb
      :max-items="2"
      :items-after-collapse="2"
      show-overflow-menu
      overflow-menu-trigger="click"
    >
      <z-breadcrumb-item> Images 1 </z-breadcrumb-item>
      <z-breadcrumb-item> Images 2 </z-breadcrumb-item>
      <z-breadcrumb-item>
        <router-link to="/en-US/os-theme/components/button" />Images 3
      </z-breadcrumb-item>
      <z-breadcrumb-item> Images 4 </z-breadcrumb-item>
      <z-breadcrumb-item> Images 5 </z-breadcrumb-item>
    </z-breadcrumb>
  </z-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Images } from '@vicons/ionicons5'

export default defineComponent({
  setup () {
    return {
      Images
    }
  }
})
</script>

<style>
.breadcrumb-item-icon {
  margin-right: 4px;
}
</style>
