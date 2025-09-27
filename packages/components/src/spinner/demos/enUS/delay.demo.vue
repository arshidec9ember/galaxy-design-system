<markdown>
# Delay

Delay can be specified for displaying spin. If spinning ends during delay, spin won't appear.
</markdown>

<template>
  <z-space vertical>
    <z-spinner :show="show" :delay="1000">
      <z-alert title="Spinner" color="success">
        Click on the button below to trigger the spinner
      </z-alert>
    </z-spinner>
    <z-button @click="show = !show">
      {{ show ? 'Click to stop Spin' : 'Click to Spin' }}
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
