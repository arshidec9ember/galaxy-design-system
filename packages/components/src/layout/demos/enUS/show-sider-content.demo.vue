<markdown>
# Hide sider content

Sometimes you don't want to see content inside sider after it's collapsed. Set `show-collapsed-content` to `false` on sider.
</markdown>

<template>
  <z-space vertical size="large">
    <z-layout has-sider>
      <z-layout-sider
        collapse-mode="width"
        :collapsed-width="120"
        :width="240"
        :show-collapsed-content="false"
        show-trigger="arrow-circle"
        content-style="padding: 24px;"
        bordered
      >
        Handian Bridge Handian Bridge Handian Bridge Handian Bridge Handian
        Bridge
      </z-layout-sider>
      <z-layout-content content-style="padding: 24px;">
        Pingshan Road
      </z-layout-content>
    </z-layout>
    <z-layout has-sider>
      <z-layout-sider
        collapse-mode="transform"
        :collapsed-width="120"
        :width="240"
        show-trigger="arrow-circle"
        content-style="padding: 24px;"
        bordered
      >
        <z-h2>Handian Bridge</z-h2>
      </z-layout-sider>
      <z-layout-content content-style="padding: 24px;">
        Pingshan Road
      </z-layout-content>
    </z-layout>
  </z-space>
</template>
