<markdown>
# Keyboard

Whether to switch the carousel by pressing the key, it is only valid when the focus is on Dots.
</markdown>

<template>
  <z-space vertical>
    <z-radio-group v-model="direction">
      <z-radio-button
        v-for="_direction in directions"
        :key="_direction"
        :value="_direction"
      >
        {{ _direction }}
      </z-radio-button>
    </z-radio-group>
    <z-carousel
      keyboard
      :direction="direction"
      :dot-placement="direction === 'vertical' ? 'right' : 'bottom'"
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
    const directionRef = ref<'horizontal' | 'vertical'>('horizontal')
    return {
      direction: directionRef,
      directions: ['horizontal', 'vertical']
    }
  }
})
</script>

<style>
.carousel-img {
  width: 100%;
  height: 240px;
  object-fit: cover;
}
</style>
