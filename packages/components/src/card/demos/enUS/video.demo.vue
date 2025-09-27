<markdown>
# Video

Use an image or a video element inside the Card background to display media. The component uses `object-fit: background` to fill the whole Card by default.
</markdown>

<template>
  <z-card>
    <z-card-action-area @click="message.info('Video Card Clicked!')">
      <z-card-media background>
        <video
          autoPlay
          loop
          muted
          poster="https://assets.codepen.io/6093409/river.jpg"
        >
          <source
            src="https://assets.codepen.io/6093409/river.mp4"
            type="video/mp4"
          >
        </video>
      </z-card-media>
      <z-card-content>
        <z-space vertical justify="end" style="height: 190px">
          <z-h2 style="color: white; margin: 0">
            Video
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
