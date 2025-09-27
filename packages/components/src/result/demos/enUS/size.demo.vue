<markdown>
# Size
</markdown>

<template>
  <div :style="{ margin: '8px' }">
    <z-radio-group v-model="variantModal">
      <z-radio-button
        v-for="variant in ['icon', 'image']"
        :key="variant"
        :value="variant"
      >
        {{ variant }}
      </z-radio-button>
    </z-radio-group>
  </div>
  <div :style="{ margin: '8px' }">
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
  <z-result
    :variant="variantModal"
    status="404"
    title="XLarge! XLarge!"
    description="Like this"
    :size="sizeModal"
  >
    <template #actions>
      <z-button>Just So So</z-button>
    </template>
  </z-result>
</template>
<script>
import { ref } from 'vue'
export default {
  setup () {
    const variantModal = ref('icon')
    const sizeModal = ref('medium')
    return {
      variantModal,
      sizeModal
    }
  }
}
</script>
