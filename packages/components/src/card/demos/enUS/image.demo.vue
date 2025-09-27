<markdown>
  # Image

  Use an image or a video element inside the Card background to display media. The component uses `object-fit: background` to fill the whole Card by default.
  </markdown>

<template>
  <z-divider dashed>
    Image
  </z-divider>
  <z-card>
    <z-card-action-area @click="message.info('Image Card Clicked!')">
      <z-card-media background>
        <img
          src="https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800"
          srcSet="https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800&dpr=2 2x"
          loading="lazy"
          alt=""
        >
      </z-card-media>
      <z-card-content>
        <z-space vertical justify="end" style="height: 180px">
          <z-h2 style="color: white; margin: 0">
            Image
          </z-h2>
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
