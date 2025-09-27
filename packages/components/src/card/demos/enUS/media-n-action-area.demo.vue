<markdown>
# Media and Action Area

The default Card provides a single flat surface for other components to sit on top of. Use the Card Media and Card Content components to expose multiple layers between a Card and the UI elements on its surface.

Card Media makes it possible to add images, videos, and color and gradient overlays underneath the Card Content. Hover your mouse on the demo below to see how the layers are stacked:
</markdown>

<template>
  <z-card>
    <z-card-action-area>
      <z-card-media :background="true">
        <img
          alt="landscape"
          src="https://source.unsplash.com/random/450x350?landscape"
        >
      </z-card-media>
      <z-card-content style="color: white">
        <z-facade>
          <template #header>
            Header
          </template>
          Content of the card
        </z-facade>
      </z-card-content>
    </z-card-action-area>
    <z-card-footer> Footer </z-card-footer>
  </z-card>
</template>
<style>
.z-card {
  max-width: 300px;
}

.inverse {
  color: white;
}
</style>
