<markdown>
# Time zone
</markdown>

<template>
  <z-grid :cols="2" :x-gap="12" :y-gap="12">
    <z-grid-item>
      <z-form-item label="Shanghai" :show-feedback="false">
        <z-time-picker
          v-model="value"
          style="width: 100%"
          time-zone="Asia/Shanghai"
        />
      </z-form-item>
    </z-grid-item>
    <z-grid-item>
      <z-form-item label="Pittsburgh" :show-feedback="false">
        <z-time-picker
          v-model="value"
          style="width: 100%"
          time-zone="America/New_York"
        />
      </z-form-item>
    </z-grid-item>
    <z-grid-item>
      <z-form-item label="UTC" :show-feedback="false">
        <z-time-picker v-model="value" style="width: 100%" time-zone="UTC" />
      </z-form-item>
    </z-grid-item>
  </z-grid>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref(Date.now())
    }
  }
})
</script>
