<markdown>
# Size
</markdown>

<template>
  <div>
    <div style="margin-bottom: 10px">
      <z-radio-group v-model="sizeModal">
        <z-radio-button
          v-for="size in ['small', 'medium']"
          :key="size"
          :value="size"
        >
          {{ size }}
        </z-radio-button>
      </z-radio-group>
    </div>
    <z-empty :size="sizeModal" description="can be large">
      <template #actions>
        <z-button size="medium">
          Find Something New
        </z-button>
      </template>
    </z-empty>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup () {
    const sizeModal = ref('medium')
    return {
      sizeModal
    }
  }
}
</script>
