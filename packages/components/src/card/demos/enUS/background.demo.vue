<markdown>
# Background Layering

Multiple Card Media can be layered in backgrounds as a media component.
</markdown>

<template>
  <z-card>
    <z-card-action-area @click="message.info('Card Clicked!')">
      <z-card-media background>
        <img
          src="https://images.unsplash.com/photo-1542773998-9325f0a098d7?auto=format&fit=crop&w=320"
          srcSet="https://images.unsplash.com/photo-1542773998-9325f0a098d7?auto=format&fit=crop&w=320&dpr=2 2x"
          loading="lazy"
          height="320"
          alt=""
        >
      </z-card-media>
      <z-card-media
        background
        style="
          background: linear-gradient(
              to top,
              rgba(0, 0, 0, 0.4),
              rgba(0, 0, 0, 0) 200px
            ),
            linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0) 300px);
        "
      />
      <z-card-content>
        <z-space vertical justify="end" style="height: 180px">
          <z-h2 style="color: white; margin: 0">
            Yosemite National Park
          </z-h2>
          <div style="color: white">
            California, USA
          </div>
        </z-space>
      </z-card-content>
    </z-card-action-area>
  </z-card>
</template>

<script setup lang="ts">
import { useMessage } from '@zeta-gds/components'

const message = useMessage()
</script>

<style>
.z-card {
  width: 320px;
}
</style>
