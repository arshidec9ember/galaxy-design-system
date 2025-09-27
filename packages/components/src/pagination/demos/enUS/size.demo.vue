<markdown>
# Size

Pagination can be set to different sizes by setting the `size` prop to `small`, `medium` or `large`.
</markdown>

<template>
  <z-space vertical>
    <z-radio-group v-model="size">
      <z-radio-button
        v-for="s in ['small', 'medium', 'large']"
        :key="s"
        :value="s"
      >
        {{ s }}
      </z-radio-button>
    </z-radio-group>
    <z-pagination
      v-model:page="page"
      :page-count="100"
      :size="size"
      show-quick-jumper
      show-size-picker
    />
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const sizeRef = ref('medium')

    return {
      page: ref(2),
      size: sizeRef
    }
  }
})
</script>
