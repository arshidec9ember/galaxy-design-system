<markdown>
# Customize handle

You can use `handle` slot to customize handle button.
</markdown>

<template>
  <z-space vertical>
    <z-slider v-model="value" :step="10">
      <template #thumb>
        <z-icon-wrapper :size="24" :border-radius="12">
          <z-icon :size="18" :component="AnimalCat24Regular" />
        </z-icon-wrapper>
      </template>
    </z-slider>
    <z-input-number v-model="value" size="small" />
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import AnimalCat24Regular from '@vicons/fluent/AnimalCat24Regular'

export default defineComponent({
  setup () {
    return {
      AnimalCat24Regular,
      value: ref(50)
    }
  }
})
</script>
