<markdown>
# Indeterminant

For all different status `info`, `success`, `warning` or `error` it has indeterminant state.
</markdown>

<template>
  <z-space vertical>
    <z-progress
      variant="line"
      status="info"
      indeterminant
      :show-indicator="false"
    />
    <z-progress
      variant="line"
      status="warning"
      indeterminant
      :show-indicator="false"
    />
    <z-progress
      variant="line"
      status="error"
      indeterminant
      :show-indicator="false"
    />
    <z-progress
      variant="line"
      status="success"
      indeterminant
      :show-indicator="false"
    />
  </z-space>
</template>
