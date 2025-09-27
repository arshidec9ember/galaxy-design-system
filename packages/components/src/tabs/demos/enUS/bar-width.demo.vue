<markdown>
# Set the width of the bar

</markdown>

<template>
  <z-tabs :bar-width="28" variant="line">
    <z-tab-pane name="home" tab="Home">
      Tab One
    </z-tab-pane>
    <z-tab-pane name="profile" tab="Profile">
      Tab Two
    </z-tab-pane>
    <z-tab-pane name="settings" tab="Settings">
      Tab Three
    </z-tab-pane>
  </z-tabs>
</template>

<style>
.custom-tabs .z-tabs-bar {
  background-color: transparent !important;
}

.custom-tabs .z-tabs-bar::after {
  position: absolute;
  content: '';
  left: 0;
  right: 0;
  top: 0;
  bottom: -2px;
  border-radius: var(--gds-border-radius-xxs);
  background-color: var(--bar-color);
}
</style>
