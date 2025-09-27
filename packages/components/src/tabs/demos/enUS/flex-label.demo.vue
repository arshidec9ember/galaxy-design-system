<markdown>
# Flex tabs

Only works with `'line'` or `'bar'` variant tabs.
</markdown>

<template>
  <z-space vertical>
    <z-radio-group v-model="value">
      <z-space>
        <z-radio label="space-between" value="space-between" />
        <z-radio label="space-around" value="space-around" />
        <z-radio label="space-evenly" value="space-evenly" />
        <z-radio label="start" value="start" />
        <z-radio label="center" value="center" />
        <z-radio label="end" value="end" />
      </z-space>
    </z-radio-group>
    <z-card-standard title="Song of" style="margin-bottom: 16px">
      <z-tabs
        default-model-value="home"
        :justify-content="value"
        variant="line"
      >
        <z-tab-pane name="home" tab="Home">
          Tab One
        </z-tab-pane>
        <z-tab-pane name="profile">
          <template #tab>
            <div class="tab-label">
              Profile
            </div>
            <z-tag :bordered="false">
              5
            </z-tag>
          </template>
          Tab Two
        </z-tab-pane>
        <z-tab-pane name="settings" tab="Settings">
          Tab Three
        </z-tab-pane>
      </z-tabs>
    </z-card-standard>
    <z-card-standard title="Too Simple">
      <z-tabs
        default-model-value="signin"
        size="large"
        :justify-content="value"
      >
        <z-tab-pane name="signin" tab="Sign in">
          <z-form>
            <z-form-item-row label="Username">
              <z-input />
            </z-form-item-row>
            <z-form-item-row label="Password">
              <z-input />
            </z-form-item-row>
          </z-form>
          <z-button color="primary" full-width variant="outlined" strong>
            Sign In
          </z-button>
        </z-tab-pane>
        <z-tab-pane name="signup" tab="Sign up">
          <z-form>
            <z-form-item-row label="Username">
              <z-input />
            </z-form-item-row>
            <z-form-item-row label="Password">
              <z-input />
            </z-form-item-row>
            <z-form-item-row label="Reenter Password">
              <z-input />
            </z-form-item-row>
          </z-form>
          <z-button color="primary" full-width variant="outlined" strong>
            Sign up
          </z-button>
        </z-tab-pane>
      </z-tabs>
    </z-card-standard>
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref('space-evenly')
    }
  }
})
</script>

<style>
.tab-label {
  margin-right: 4px;
}
</style>
