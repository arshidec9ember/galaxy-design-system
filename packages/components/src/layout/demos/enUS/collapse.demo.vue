<markdown>
# Collapse sider

Use `show-trigger` to use builtin button.
</markdown>

<template>
  <z-space vertical size="large">
    <z-layout has-sider>
      <z-layout-sider
        collapse-mode="width"
        :collapsed-width="120"
        :width="240"
        show-trigger="bar"
        content-style="padding: 24px;"
        bordered
      >
        <p>
          Non adipisicing aliquip cupidatat cillum eu laboris et amet. Cupidatat
          laboris in nisi irure labore voluptate est sint.
        </p>
      </z-layout-sider>
      <z-layout-content content-style="padding: 24px;">
        Content
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
        <z-h2>Left Aside</z-h2>
      </z-layout-sider>
      <z-layout-content content-style="padding: 24px;">
        Pingshan Road
      </z-layout-content>
    </z-layout>
  </z-space>
</template>
