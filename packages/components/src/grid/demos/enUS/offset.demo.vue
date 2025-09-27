<markdown>
# Offset
</markdown>

<template>
  <z-grid :x-gap="12" :cols="4">
    <z-grid-item :offset="1">
      <div class="light-blue" />
    </z-grid-item>
    <z-grid-item :offset="1">
      <div class="blue" />
    </z-grid-item>
  </z-grid>
</template>

<style>
.light-blue {
  height: 108px;
  background-color: rgba(43, 79, 240, 0.6);
}
.blue {
  height: 108px;
  background-color: rgba(43, 79, 240, 0.8);
}
</style>
