<markdown>
# Set Padding

Custom padding can be set for `z-layout-sider` and `z-layout-content` by using `content-style` and `sider-style` props.
</markdown>

<template>
  <z-space vertical size="large" class="example-layout">
    <z-layout has-sider style="height: 240px">
      <z-layout-sider style="padding: 24px">
        <z-h2>... Not Recommended</z-h2>
        <z-h2>... Not Recommended</z-h2>
        <z-h2>... Not Recommended</z-h2>
        <z-h2>... Not Recommended</z-h2>
        <z-h2>... Not Recommended</z-h2>
        <z-h2>... Not Recommended</z-h2>
        <z-h2>... Not Recommended</z-h2>
        <z-h2>... Not Recommended</z-h2>
      </z-layout-sider>
    </z-layout>
    <z-layout has-sider style="height: 240px">
      <z-layout-sider content-style="padding: 24px;">
        <z-h2>Recommended</z-h2>
        <z-h2>Recommended</z-h2>
        <z-h2>Recommended</z-h2>
        <z-h2>Recommended</z-h2>
        <z-h2>Recommended</z-h2>
        <z-h2>Recommended</z-h2>
        <z-h2>Recommended</z-h2>
        <z-h2>Recommended</z-h2>
      </z-layout-sider>
    </z-layout>
  </z-space>
</template>
<style>
.z-layout-sider {
  background: #d5d7e6;
}
</style>
