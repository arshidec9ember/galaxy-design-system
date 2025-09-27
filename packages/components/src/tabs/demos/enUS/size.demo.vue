<markdown>
# Size

Tabs may have different sizes.
</markdown>

<template>
  <z-space vertical>
    <z-radio-group v-model="size">
      <z-space>
        <z-radio value="small">
          Small
        </z-radio>
        <z-radio value="medium">
          Medium
        </z-radio>
        <z-radio value="large">
          Large
        </z-radio>
      </z-space>
    </z-radio-group>
    <z-tabs variant="bar" :size="size">
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
    <br>
    <z-tabs variant="line" :size="size">
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
      size: ref<'small' | 'medium' | 'large'>('medium')
    }
  }
})
</script>
