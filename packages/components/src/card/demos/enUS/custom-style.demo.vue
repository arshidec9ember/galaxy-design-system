<markdown>
# Custom

Card provides customized styles. For example you want an card with no padding to put whatever you want.
</markdown>

<template>
  <z-card>
    <z-tabs
      variant="line"
      size="large"
      :tabs-padding="20"
      pane-style="padding: 16px;"
    >
      <z-tab-pane name="PARKLIFE">
        PARKLIFE
      </z-tab-pane>
      <z-tab-pane name="ROCKLIFE">
        ROCKLIFE
      </z-tab-pane>
    </z-tabs>
  </z-card>
</template>
