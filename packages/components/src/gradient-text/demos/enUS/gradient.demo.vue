<markdown>
# Gradient

You can decide 2 different colors with degrees or linear-gradient.
</markdown>

<template>
  <z-gradient-text
    :gradient="{
      from: 'blue',
      to: 'red'
    }"
  >
    Custom Color
  </z-gradient-text>
  <br>
  <z-gradient-text
    :gradient="{
      deg: 180,
      from: 'rgb(85, 85, 85)',
      to: 'rgb(170, 170, 170)'
    }"
  >
    Custom Color
  </z-gradient-text>
  <br>
  <z-gradient-text
    gradient="linear-gradient(90deg, red 0%, green 50%, blue 100%)"
  >
    A Scribbled Color
  </z-gradient-text>
</template>

<style>
.z-gradient-text {
  font-size: 24px;
}
</style>
