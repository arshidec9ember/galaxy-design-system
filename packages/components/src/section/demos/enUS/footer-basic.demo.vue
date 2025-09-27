<markdown>
# Basic
</markdown>

<template>
  <z-space vertical>
    <z-row>
      <z-col :span="12">
        <z-checkbox v-model="borderTop">
          Border Top
        </z-checkbox>
      </z-col>
      <z-col :span="12">
        <z-checkbox v-model="shadow">
          Box Shadow
        </z-checkbox>
      </z-col>
    </z-row>
    <z-row>
      <z-radio-group v-model="justify">
        <z-space>
          <z-text>Footer Action Placement: </z-text>
          <z-radio value="start" label="Start" />
          <z-radio value="center" label="Center" />
          <z-radio value="end" label="End" />
        </z-space>
      </z-radio-group>
    </z-row>
    <z-divider />
    <z-layout-footer
      :class="`footer footer--${shadow ? 'shadow' : ''}`"
      :bordered="borderTop"
    >
      <z-space :justify="justify">
        <z-button variant="filled" color="primary">
          Primary
        </z-button>
        <z-button>Secondary</z-button>
      </z-space>
    </z-layout-footer>
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup () {
    return {
      justify: ref('start'),
      borderTop: ref(false),
      shadow: ref(true)
    }
  }
})
</script>

<style>
.footer {
  padding: 12px 16px;
}
.footer--shadow {
  box-shadow: 0px 2px 5px 0px hsla(231, 95%, 15%, 0.1),
    0px -2px 5px 0px hsla(231, 95%, 15%, 0.1);
}
</style>
