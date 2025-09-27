<markdown>
# Responsive grid item

When `span` is 0, `z-grid-item` won't be displayed.
</markdown>

<template>
  <z-divider>Self Responsive</z-divider>
  <z-grid cols="4" item-responsive>
    <z-grid-item span="0 400:1 600:2 800:3">
      <div class="light-blue">
        0 ~ 400px: hidden<br>
        400 ~ 600px: span 1<br>
        600 ~ 800px: span 2<br>
        800px +: span 3
      </div>
    </z-grid-item>
    <z-grid-item>
      <div class="blue">
        2
      </div>
    </z-grid-item>
  </z-grid>
  <z-divider>Screen Responsive</z-divider>
  <z-grid cols="4" item-responsive responsive="screen">
    <z-grid-item span="0 m:1 l:2">
      <div class="light-blue">
        m-: hidden<br>
        m ~ l: span 1<br>
        l+: span 2
      </div>
    </z-grid-item>
    <z-grid-item>
      <div class="blue">
        2
      </div>
    </z-grid-item>
  </z-grid>
</template>

<style>
.light-blue {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  background-color: rgba(43, 79, 240, 0.6);
}
.blue {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  background-color: rgba(43, 79, 240, 0.8);
}
</style>
