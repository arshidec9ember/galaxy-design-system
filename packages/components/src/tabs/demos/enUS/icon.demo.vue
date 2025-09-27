<markdown>
# With Icon
</markdown>

<template>
  <z-tabs variant="line" animated>
    <z-tab-pane name="home">
      <template #tab>
        <z-icon class="tab-icon">
          <Home />
        </z-icon>
        <div class="tab-label">
          Home
        </div>
      </template>
      Tab One
    </z-tab-pane>
    <z-tab-pane name="profile">
      <template #tab>
        <div class="tab-label">
          Profile
        </div>
        <z-tag :bordered="false" color="info" size="small">
          Info
        </z-tag>
      </template>
      Tab Two
    </z-tab-pane>
    <z-tab-pane name="settings">
      <template #tab>
        <div class="tab-label">
          Settings
        </div>
        <z-icon class="tab-icon">
          <Layers />
        </z-icon>
      </template>
      Tab Three
    </z-tab-pane>
  </z-tabs>
</template>

<script lang="ts">
import { Layers, Home } from '@vicons/ionicons5'
import { defineComponent } from 'vue'
export default defineComponent({
  components: {
    Layers,
    Home
  }
})
</script>

<style>
.tab-label {
  margin-left: 4px;
  margin-right: 4px;
}
</style>
