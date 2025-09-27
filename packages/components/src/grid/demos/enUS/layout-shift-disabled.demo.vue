<markdown>
# Avoid SSR layout shift

By default, `z-grid` will compute grid content based on window size and container size. This would cause 2 side effects: Content may shift in SSR mode; Render items has layout shift and it would influence performance slightly.

If you don't need any responsive functionality, you can use `layout-shift-disabled` to get rid of side effects of it.

Please note that set `layout-shift-disabled` will disabled all responsive functionality of `z-grid` and `suffix`, `offset` of `z-grid-item`.
</markdown>

<template>
  <z-grid :x-gap="12" :y-gap="12" :cols="4" layout-shift-disabled>
    <z-gi>
      <div class="light-blue" />
    </z-gi>
    <z-gi :span="2">
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
