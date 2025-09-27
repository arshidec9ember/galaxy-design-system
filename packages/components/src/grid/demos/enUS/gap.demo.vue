<markdown>
# Gap

Set x gap & y gap.
</markdown>

<template>
  <z-grid :x-gap="12" :y-gap="8" :cols="4">
    <z-grid-item>
      <div class="light-blue" />
    </z-grid-item>
    <z-grid-item>
      <div class="blue" />
    </z-grid-item>
    <z-grid-item>
      <div class="light-blue" />
    </z-grid-item>
    <z-grid-item>
      <div class="blue" />
    </z-grid-item>
    <z-grid-item>
      <div class="light-blue" />
    </z-grid-item>
    <z-grid-item>
      <div class="blue" />
    </z-grid-item>
    <z-grid-item>
      <div class="light-blue" />
    </z-grid-item>
    <z-grid-item>
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
