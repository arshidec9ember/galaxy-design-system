<markdown>
# Custom

Card provides `content-style`, `header-style`, `footer-style` to help you customize style. For example you want an card with no padding to put whatever you want.
</markdown>

<template>
  <z-card-standard content-style="padding: 0;">
    <z-tabs
      variant="line"
      size="large"
      :tabs-padding="20"
      pane-style="padding: 20px;"
    >
      <z-tab-pane name="PARKLIFE">
        PARKLIFE
      </z-tab-pane>
      <z-tab-pane name="ROCKLIFE">
        ROCKLIFE
      </z-tab-pane>
    </z-tabs>
  </z-card-standard>
</template>
