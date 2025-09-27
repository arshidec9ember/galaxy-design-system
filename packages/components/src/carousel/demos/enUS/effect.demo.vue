<markdown>
# Effect

If you want to customize the transition effect, you can use `transition-props` and set `effect` to `custom`.
</markdown>

<template>
  <z-radio-group v-model="myEffect" style="margin-bottom: 10px">
    <z-radio-button v-for="effect in effects" :key="effect" :value="effect">
      {{ effect }}
    </z-radio-button>
  </z-radio-group>
  <z-carousel
    :key="myEffect"
    :effect="myEffect"
    :centered-slides="isCard"
    :slides-per-view="isCard ? 'auto' : 1"
    draggable
    style="height: 240px"
  >
    <z-carousel-item :style="{ width: isCard ? '60%' : '100%' }">
      <img
        class="carousel-img"
        src="https://images.unsplash.com/photo-1577774438656-768f1e5d9ed6?auto=format&fit=crop&q=80&w=2874&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      >
    </z-carousel-item>
    <z-carousel-item :style="{ width: isCard ? '60%' : '100%' }">
      <img
        class="carousel-img"
        src="https://images.unsplash.com/photo-1547994985-540696199b62?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      >
    </z-carousel-item>
    <z-carousel-item :style="{ width: isCard ? '60%' : '100%' }">
      <img
        class="carousel-img"
        src="https://images.unsplash.com/photo-1561424412-6c2125ecb1cc?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      >
    </z-carousel-item>
    <z-carousel-item :style="{ width: isCard ? '60%' : '100%' }">
      <img
        class="carousel-img"
        src="https://images.unsplash.com/photo-1605457867610-e990b192418e?auto=format&fit=crop&q=80&w=2852&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      >
    </z-carousel-item>
  </z-carousel>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  setup () {
    const effectRef = ref<'slide' | 'fade' | 'card'>('slide')
    const isCardRef = computed(() => effectRef.value === 'card')
    return {
      isCard: isCardRef,
      myEffect: effectRef,
      effects: ['slide', 'fade', 'card']
    }
  }
})
</script>

<style>
.carousel-img {
  margin: 0 auto;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
