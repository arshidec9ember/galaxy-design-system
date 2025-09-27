<markdown>
# Custom indicator

You can custom the indicator.
</markdown>

<template>
  <z-space vertical>
    <z-progress variant="circle" :percentage="20">
      <span style="text-align: center">20% is small</span>
    </z-progress>
    <z-progress variant="line" status="success" :percentage="20">
      Don't put too much content here.
    </z-progress>
  </z-space>
</template>
