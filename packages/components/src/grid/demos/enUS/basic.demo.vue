<markdown>
# Basic

`z-grid-item` has an alias called `z-gi`.
</markdown>

<template>
  <z-grid x-gap="12" :cols="4">
    <z-gi>
      <div class="light-blue" />
    </z-gi>
    <z-gi>
      <div class="blue" />
    </z-gi>
    <z-gi>
      <div class="light-blue" />
    </z-gi>
    <z-gi>
      <div class="blue" />
    </z-gi>
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
