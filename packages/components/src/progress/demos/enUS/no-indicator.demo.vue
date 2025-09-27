<markdown>
# No indicator

If you don't want indicator.
</markdown>

<template>
  <z-space>
    <z-progress
      style="margin: 0 8px 12px 0"
      variant="circle"
      :show-indicator="false"
      status="success"
      :percentage="20"
    />
    <z-progress
      style="width: 120px; margin: 0 8px 12px 0"
      variant="multiple-circle"
      :percentage="[50, 25]"
      :show-indicator="false"
    />
    <z-progress
      variant="line"
      :show-indicator="false"
      status="success"
      :percentage="20"
    />
  </z-space>
</template>
