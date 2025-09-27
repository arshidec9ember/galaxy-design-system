<markdown>
# Dots

Set `dot-type` to change the style of the dots. You can use `:show-dots="false"` to hide the dots.

Set `dot-placement` to change the position of the dots.
</markdown>

<template>
  <z-space vertical>
    <z-radio-group v-model="type">
      <z-radio-button v-for="_type in types" :key="_type" :value="_type">
        {{ _type }}
      </z-radio-button>
    </z-radio-group>
    <z-radio-group v-model="placement">
      <z-radio-button
        v-for="_placement in placements"
        :key="_placement"
        :value="_placement"
      >
        {{ _placement }}
      </z-radio-button>
    </z-radio-group>
    <z-radio-group v-model="direction">
      <z-radio-button
        v-for="_direction in directions"
        :key="_direction"
        :value="_direction"
      >
        {{ _direction }}
      </z-radio-button>
    </z-radio-group>
    <z-switch v-model="showArrow">
      <template #checked>
        Show arrow
      </template>
      <template #unchecked>
        No arrow
      </template>
    </z-switch>
    <z-carousel
      :direction="direction"
      :show-arrow="showArrow"
      :dot-type="type"
      :dot-placement="placement"
      style="height: 240px"
    >
      <img
        class="carousel-img"
        src="https://images.unsplash.com/photo-1577774438656-768f1e5d9ed6?auto=format&fit=crop&q=80&w=2874&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      >
      <img
        class="carousel-img"
        src="https://images.unsplash.com/photo-1547994985-540696199b62?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      >
      <img
        class="carousel-img"
        src="https://images.unsplash.com/photo-1561424412-6c2125ecb1cc?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      >
      <img
        class="carousel-img"
        src="https://images.unsplash.com/photo-1605457867610-e990b192418e?auto=format&fit=crop&q=80&w=2852&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      >
    </z-carousel>
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const typeRef = ref<'dot' | 'line'>('dot')
    const placementRef = ref<'top' | 'bottom' | 'left' | 'right'>('bottom')
    const directionRef = ref<'horizontal' | 'vertical'>('horizontal')
    return {
      showArrow: ref(false),
      type: typeRef,
      types: ['dot', 'line'],
      placement: placementRef,
      placements: ['top', 'bottom', 'left', 'right'],
      direction: directionRef,
      directions: ['horizontal', 'vertical']
    }
  }
})
</script>

<style>
.carousel-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
