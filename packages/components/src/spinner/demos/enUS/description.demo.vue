<markdown>
# Description

Description can be added under the spin.
</markdown>

<template>
  <z-space vertical>
    <z-spinner :show="show">
      <z-alert title="Spinner" color="success">
        Click on the button below to trigger the spinner
      </z-alert>
      <template #description>
        This is the description for the spinner
      </template>
    </z-spinner>
    <z-button @click="show = !show">
      Click to Spin
    </z-button>
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      show: ref(false)
    }
  }
})
</script>
