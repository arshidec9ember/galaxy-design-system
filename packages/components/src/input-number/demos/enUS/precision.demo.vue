<markdown>
# Precision

Set the `precision` property to control the numerical precision.

Use `precision` will disable `update-value-on-input`.
</markdown>

<template>
  <z-space vertical>
    <z-input-number clearable :precision="2" />
    <z-input-number clearable :precision="0" />
  </z-space>
</template>
