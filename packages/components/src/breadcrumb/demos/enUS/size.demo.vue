<markdown>
  # Size Variants

  Breadcrumb component comes in three sizes: small, medium (default), and large.
</markdown>

<template>
  <z-space vertical>
    <z-breadcrumb size="small" weight="regular">
      <z-breadcrumb-item>
        <z-icon><home /></z-icon>
      </z-breadcrumb-item>
      <z-breadcrumb-item href="/components">
        Components
      </z-breadcrumb-item>
      <z-breadcrumb-item href="/components/breadcrumb">
        Breadcrumb
      </z-breadcrumb-item>
      <z-breadcrumb-item> Small Size, Regular Weight </z-breadcrumb-item>
    </z-breadcrumb>

    <z-breadcrumb size="small" weight="medium">
      <z-breadcrumb-item>
        <z-icon><home /></z-icon>
      </z-breadcrumb-item>
      <z-breadcrumb-item href="/components">
        Components
      </z-breadcrumb-item>
      <z-breadcrumb-item href="/components/breadcrumb">
        Breadcrumb
      </z-breadcrumb-item>
      <z-breadcrumb-item> Small Size, Medium Weight </z-breadcrumb-item>
    </z-breadcrumb>

    <z-breadcrumb size="medium" weight="regular">
      <z-breadcrumb-item>
        <z-icon><home /></z-icon>
      </z-breadcrumb-item>
      <z-breadcrumb-item href="/components">
        Components
      </z-breadcrumb-item>
      <z-breadcrumb-item href="/components/breadcrumb">
        Breadcrumb
      </z-breadcrumb-item>
      <z-breadcrumb-item> Medium Size, Regular Weight </z-breadcrumb-item>
    </z-breadcrumb>

    <z-breadcrumb size="medium" weight="medium">
      <z-breadcrumb-item>
        <z-icon><home /></z-icon>
      </z-breadcrumb-item>
      <z-breadcrumb-item href="/components">
        Components
      </z-breadcrumb-item>
      <z-breadcrumb-item href="/components/breadcrumb">
        Breadcrumb
      </z-breadcrumb-item>
      <z-breadcrumb-item> Medium Size, Medium Weight </z-breadcrumb-item>
    </z-breadcrumb>

    <z-breadcrumb size="large" weight="regular">
      <z-breadcrumb-item>
        <z-icon><home /></z-icon>
      </z-breadcrumb-item>
      <z-breadcrumb-item href="/components">
        Components
      </z-breadcrumb-item>
      <z-breadcrumb-item href="/components/breadcrumb">
        Breadcrumb
      </z-breadcrumb-item>
      <z-breadcrumb-item> Large Size, Regular Weight </z-breadcrumb-item>
    </z-breadcrumb>

    <z-breadcrumb size="large" weight="medium">
      <z-breadcrumb-item>
        <z-icon><home /></z-icon>
      </z-breadcrumb-item>
      <z-breadcrumb-item href="/components">
        Components
      </z-breadcrumb-item>
      <z-breadcrumb-item href="/components/breadcrumb">
        Breadcrumb
      </z-breadcrumb-item>
      <z-breadcrumb-item> Large Size, Medium Weight </z-breadcrumb-item>
    </z-breadcrumb>
  </z-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Home } from '@vicons/ionicons5'

export default defineComponent({
  components: {
    Home
  }
})
</script>
