<markdown>
# Push & pull

See codes to know what happens. Basically it is relative position change.
</markdown>

<template>
  <z-row :gutter="12">
    <z-col :span="6" :push="6">
      <div class="light-blue" />
    </z-col>
    <z-col :span="6" :pull="6">
      <div class="blue" />
    </z-col>
    <z-col :span="6">
      <div class="light-blue" />
    </z-col>
    <z-col :span="6">
      <div class="blue" />
    </z-col>
  </z-row>
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
