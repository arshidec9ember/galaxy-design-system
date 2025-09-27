<markdown>
# Update value on close
</markdown>

<template>
  <z-space vertical>
    <z-date-picker
      type="datetime"
      :default-model-value="Date.now()"
      :update-value-on-close="updateValueOnClose"
    />
    <z-date-picker
      :default-model-value="[Date.now(), Date.now()]"
      :update-value-on-close="updateValueOnClose"
      type="daterange"
    />
    <z-date-picker
      :default-model-value="[Date.now(), Date.now()]"
      :update-value-on-close="updateValueOnClose"
      type="datetimerange"
    />
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      updateValueOnClose: ref(true)
    }
  }
})
</script>
