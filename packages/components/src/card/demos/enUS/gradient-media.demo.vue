<markdown>
# Gradient Media

Gradient example using card media component.
</markdown>

<template>
  <z-button-group>
    <z-button ghost @click="handleGenerateRandomGradient()">
      Generate
    </z-button>
    <z-button ghost :disabled="disablePrev" @click="handlePrev">
      Previous
    </z-button>
  </z-button-group>
  <z-card class="new-card">
    <!-- parent for card media -->
    <z-facade class="background-root">
      <z-card-media
        :style="{ height: '1200px', background: linearGradient }"
        background
      />
      <template #header>
        <z-image
          preview-disabled
          object-fit="background"
          style="padding: 12px"
          height="60"
          width="60"
          src="https://source.unsplash.com/random/900×900/?fruit"
        />
      </template>
      <z-card-header>
        <span
          :style="{
            color: textColor
          }"
        >Composite Header</span>
      </z-card-header>
    </z-facade>
    <z-card-content> Content Component </z-card-content>
    <z-card-footer> Footer Component </z-card-footer>
  </z-card>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

const linearGradient = ref('#BFDFBF')
const prevLinearGradient = ref(linearGradient.value)
const startGradientColor = ref(linearGradient.value)
const disablePrev = ref(true)

const getRandomColor = () => {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; ++i) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

function generateRandomGradient () {
  const startColor = getRandomColor()
  const endColor = getRandomColor()
  startGradientColor.value = startColor
  const directions = ['to right', 'to bottom', 'to bottom right']
  const direction = directions[Math.floor(Math.random() * directions.length)]
  const gradientStyle = `linear-gradient(${direction}, ${startColor}, ${endColor})`
  return gradientStyle
}

const textColor = computed(() => {
  const hexcolor: string = startGradientColor.value.replace('#', '')
  const r = parseInt(hexcolor.substr(0, 2), 16)
  const g = parseInt(hexcolor.substr(2, 2), 16)
  const b = parseInt(hexcolor.substr(4, 2), 16)
  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq >= 128 ? '#000' : '#FFF'
})

const handlePrev = () => {
  disablePrev.value = true
  linearGradient.value = prevLinearGradient.value
}

const handleGenerateRandomGradient = () => {
  disablePrev.value = false
  prevLinearGradient.value = linearGradient.value
  linearGradient.value = generateRandomGradient()
}
</script>
<style>
.background-root {
  position: relative;
  min-height: 120px;
  overflow: hidden;
  /* display: flex;
  align-items: flex-end; */
}

.inverse {
  color: white;
}
</style>
