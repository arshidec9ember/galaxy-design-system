<markdown>
# Size

`font-size` CSS also works, but can be overridden by setting the size (if just a number is used, it's taken as pixels).
</markdown>

<template>
  <z-gradient-text> Default </z-gradient-text>
  <br>
  <z-gradient-text type="danger">
    Danger
  </z-gradient-text>
  <br>
  <z-gradient-text :size="24" type="warning">
    Size 24
  </z-gradient-text>
  <br>
  <z-gradient-text :size="28" type="success">
    Size 28
  </z-gradient-text>
</template>

<style>
.z-gradient-text {
  font-size: 36px;
}
</style>
