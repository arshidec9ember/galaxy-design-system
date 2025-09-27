<markdown>
# Toggle Tab
Create a tab based on a v-if condition. By default, the tab is present, but it can be hidden with the assistance of a toggle button

</markdown>

<template>
  <z-space vertical>
    <z-switch v-model="togglePane">
      <template #checked>
        Remove a Home Tab
      </template>
      <template #unchecked>
        Add a Home Tab
      </template>
    </z-switch>
    <z-tabs default-model-value="profile">
      <z-tab-pane v-if="togglePane" name="home" tab="Home">
        Tab One
      </z-tab-pane>
      <z-tab-pane name="profile" tab="Profile">
        Tab Two
      </z-tab-pane>
      <z-tab-pane name="settings" tab="Settings">
        Tab Three
      </z-tab-pane>
    </z-tabs>
    <hr>
    <z-tabs default-model-value="profile">
      <z-tab v-if="togglePane" name="home">
        Home
      </z-tab>
      <z-tab name="profile">
        Profile
      </z-tab>
      <z-tab name="settings">
        Settings
      </z-tab>
    </z-tabs>
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      togglePane: ref(true)
    }
  }
})
</script>
