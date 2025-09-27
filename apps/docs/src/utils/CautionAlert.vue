<template>
  <z-alert color="error" title="Caveat" :bordered="false">
    This component is not compliant with GDS standards. It's important to
    exercise caution when using this experimental feature. The terms of the
    contract are subject to potential modification, necessitating discussions
    with the design team for potential repurposing.
  </z-alert>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CautionAlert'
})
</script>
