<markdown>
# Disabled
</markdown>

<template>
  <z-space vertical size="large" style="width: 100%">
    <!-- Basic Switch with Labels -->
    <z-space size="medium">
      <z-space size="small" align="center">
        <ZText variant="body-s">
          Disabled On
        </ZText>
        <z-switch v-model="disabledSwitch" disabled />
        <ZText variant="body-s">
          Disabled Off
        </ZText>
        <z-switch disabled />
      </z-space>
    </z-space>
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ZText } from '@zeta-gds/components'

export default defineComponent({
  components: {
    ZText
  },
  setup () {
    return {
      disabledSwitch: ref(true)
    }
  }
})
</script>
