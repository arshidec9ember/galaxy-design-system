<markdown>
# Dashboard

Maybe you also need `gap-degree` and `gap-offset-degree` properties to customize the dashboard.
</markdown>

<template>
  <z-space>
    <z-progress variant="dashboard" gap-position="bottom" :percentage="80" />
    <z-progress
      variant="dashboard"
      :gap-offset-degree="120"
      :gap-degree="120"
      :percentage="80"
    />
  </z-space>
</template>
