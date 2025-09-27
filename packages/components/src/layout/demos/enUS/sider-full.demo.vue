<markdown>
# Sider Full

The sider component can be used as a full aside side navigation area for content outside of the main view of a page.
</markdown>

<template>
  <z-layout has-sider class="example-layout">
    <z-layout-sider content-style="padding: 24px;">
      Aside Full
    </z-layout-sider>
    <z-layout>
      <z-layout-header>Header</z-layout-header>
      <z-layout-content content-style="padding: 24px;">
        Content
      </z-layout-content>
      <z-layout-footer>Footer</z-layout-footer>
    </z-layout>
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
