<markdown>
# Centered

Set `centered-slides` to center all `slides`, this is only useful when `effect` is `slide` and `card`.
</markdown>

<template>
  <z-carousel
    :space-between="30"
    :loop="false"
    slides-per-view="auto"
    centered-slides
    draggable
  >
    <z-carousel-item style="width: 30%">
      <img
        class="carousel-img"
        src="https://images.unsplash.com/photo-1577774438656-768f1e5d9ed6?auto=format&fit=crop&q=80&w=2874&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      >
    </z-carousel-item>
    <z-carousel-item style="width: 20%">
      <img
        class="carousel-img"
        src="https://images.unsplash.com/photo-1547994985-540696199b62?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      >
    </z-carousel-item>
    <z-carousel-item style="width: 30%">
      <img
        class="carousel-img"
        src="https://images.unsplash.com/photo-1561424412-6c2125ecb1cc?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      >
    </z-carousel-item>
    <z-carousel-item style="width: 40%">
      <img
        class="carousel-img"
        src="https://images.unsplash.com/photo-1605457867610-e990b192418e?auto=format&fit=crop&q=80&w=2852&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      >
    </z-carousel-item>
  </z-carousel>
</template>

<style>
.carousel-img {
  width: 100%;
  height: 240px;
  object-fit: cover;
}
</style>
