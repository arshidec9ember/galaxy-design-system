<markdown>
# No pane

`z-tabs` always display a pane. If you only want to show tab, use `z-tab` instead of `z-tab-pane`.
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
    <z-tabs :variant="value">
      <z-tab name="Riders On the Storm">
        Riders On the Storm
      </z-tab>
      <z-tab name="Light My Fire">
        Light My Fire
      </z-tab>
      <z-tab name="Break On Through">
        Break On Through
      </z-tab>
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
