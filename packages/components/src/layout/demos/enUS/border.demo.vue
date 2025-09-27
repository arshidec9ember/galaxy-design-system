<markdown>
# Border

You can set `bordered` on sider、footer、header.
</markdown>

<template>
  <z-layout has-sider>
    <z-layout-sider bordered content-style="padding: 24px;">
      Aside
    </z-layout-sider>
    <z-layout>
      <z-layout-header bordered>
        Header
      </z-layout-header>
      <z-layout-content content-style="padding: 24px;">
        Content
      </z-layout-content>
      <z-layout-footer bordered>
        Footer
      </z-layout-footer>
    </z-layout>
  </z-layout>
</template>

<style>
.z-layout-header {
  padding: 24px;
}

.z-layout-footer {
  padding: 24px;
}
</style>
