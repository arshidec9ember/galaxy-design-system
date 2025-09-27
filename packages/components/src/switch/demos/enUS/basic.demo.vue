<markdown>
# Basic

Basic switch usage with labels and different states.
</markdown>

<template>
  <z-space vertical size="large" style="width: 100%">
    <!-- Basic Switch with Labels -->
    <z-space size="medium">
      <z-space size="small" align="center">
        <ZText variant="body-s">
          Default Off
        </ZText>
        <z-switch v-model="basicSwitch" />
        <ZText variant="body-s">
          Default On
        </ZText>
        <z-switch v-model="enabledSwitch" />
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
      basicSwitch: ref(false),
      enabledSwitch: ref(true)
    }
  }
})
</script>
