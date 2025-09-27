<markdown>
# Customize card

You can use `next-slide-style` and `prev-slide-style` to adjust the ratio of front & back cards size ratio.
</markdown>

<template>
  <z-carousel
    effect="card"
    prev-slide-style="transform: translateX(-150%) translateZ(-800px);"
    next-slide-style="transform: translateX(50%) translateZ(-800px);"
    style="height: 240px"
    :show-dots="false"
  >
    <z-carousel-item :style="{ width: '60%' }">
      <img
        class="carousel-img"
        src="https://images.unsplash.com/photo-1577774438656-768f1e5d9ed6?auto=format&fit=crop&q=80&w=2874&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      >
    </z-carousel-item>
    <z-carousel-item :style="{ width: '60%' }">
      <img
        class="carousel-img"
        src="https://images.unsplash.com/photo-1547994985-540696199b62?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      >
    </z-carousel-item>
    <z-carousel-item :style="{ width: '60%' }">
      <img
        class="carousel-img"
        src="https://images.unsplash.com/photo-1561424412-6c2125ecb1cc?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      >
    </z-carousel-item>
    <z-carousel-item :style="{ width: '60%' }">
      <img
        class="carousel-img"
        src="https://images.unsplash.com/photo-1605457867610-e990b192418e?auto=format&fit=crop&q=80&w=2852&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      >
    </z-carousel-item>
  </z-carousel>
</template>

<style>
.carousel-img {
  margin: 0 auto;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
