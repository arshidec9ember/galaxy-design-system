<markdown>
# Responsive columns

You can customize [breakpoints](config-provider#API) in `z-config-provider`.
</markdown>

<template>
  <z-divider>Self Responsive</z-divider>
  <z-grid cols="2 400:4 600:6">
    <z-grid-item>
      <div class="light-blue">
        1
      </div>
    </z-grid-item>
    <z-grid-item>
      <div class="blue">
        2
      </div>
    </z-grid-item>
    <z-grid-item>
      <div class="light-blue">
        3
      </div>
    </z-grid-item>
    <z-grid-item>
      <div class="blue">
        4
      </div>
    </z-grid-item>
    <z-grid-item>
      <div class="light-blue">
        5
      </div>
    </z-grid-item>
    <z-grid-item>
      <div class="blue">
        6
      </div>
    </z-grid-item>
  </z-grid>
  <z-divider>Screen Responsive</z-divider>
  <z-grid cols="2 s:3 m:4 l:5 xl:6 2xl:7" responsive="screen">
    <z-grid-item>
      <div class="light-blue">
        1
      </div>
    </z-grid-item>
    <z-grid-item>
      <div class="blue">
        2
      </div>
    </z-grid-item>
    <z-grid-item>
      <div class="light-blue">
        3
      </div>
    </z-grid-item>
    <z-grid-item>
      <div class="blue">
        4
      </div>
    </z-grid-item>
    <z-grid-item>
      <div class="light-blue">
        5
      </div>
    </z-grid-item>
    <z-grid-item>
      <div class="blue">
        6
      </div>
    </z-grid-item>
    <z-grid-item>
      <div class="light-blue">
        7
      </div>
    </z-grid-item>
  </z-grid>
</template>

<style>
.light-blue {
  height: 108px;
  background-color: rgba(43, 79, 240, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
}
.blue {
  height: 108px;
  background-color: rgba(43, 79, 240, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
