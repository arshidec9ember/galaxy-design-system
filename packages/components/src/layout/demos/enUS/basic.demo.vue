<markdown>
# Basic

A basic layout demo with vertical order and minimal component usage.
</markdown>

<template>
  <z-layout class="example-layout">
    <z-layout-header>Header</z-layout-header>
    <z-layout-content content-style="padding: 24px;">
      Content
    </z-layout-content>
    <z-layout-footer>Footer</z-layout-footer>
  </z-layout>
</template>

<style>
.z-layout-header,
.z-layout-footer {
  background: #fafafa;
  border: 2px dotted #9da2bf;

  padding: 24px;
}

.z-layout-sider {
  background: #fafafa;
  border: 2px dotted #9da2bf;
}

.z-layout-content {
  background: #d5d7e6;
  border: 2px dotted #9da2bf;
}
</style>
