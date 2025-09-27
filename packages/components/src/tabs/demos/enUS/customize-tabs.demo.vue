<markdown>
# Customize Tabs

We can customize the space before and after tabs, and also can add pane-style.
</markdown>

<template>
  <z-space vertical>
    <z-radio-group v-model="value">
      <z-space vertical>
        <z-radio label="line" value="line" />
        <z-radio label="bar" value="bar" />
        <z-radio label="card" value="card" />
        <z-radio label="segment" value="segment" />
      </z-space>
    </z-radio-group>
    <z-tabs
      :variant="value"
      animated
      :tabs-padding="40"
      pane-style="padding: 40px;"
    >
      <z-tab-pane name="home" tab="Home">
        Tab One
      </z-tab-pane>
      <z-tab-pane name="profile" tab="Profile">
        Tab Two
      </z-tab-pane>
      <z-tab-pane name="settings" tab="Settings">
        Tab Three
      </z-tab-pane>
    </z-tabs>
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref('line')
    }
  }
})
</script>
