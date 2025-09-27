<markdown>
# Customize icon
</markdown>

<template>
  <z-spinner :show="show">
    <template #icon>
      <z-icon>
        <Reload />
      </z-icon>
    </template>
  </z-spinner>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import { Reload } from '@vicons/ionicons5'

export default defineComponent({
  components: {
    Reload
  },
  setup () {
    return {
      show: ref(false)
    }
  }
})
</script>
