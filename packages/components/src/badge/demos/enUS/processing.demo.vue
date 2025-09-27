<markdown>
# Processing

Set `processing` prop to indicate it is processing.
</markdown>

<template>
  <z-space :size="24" align="center">
    <z-badge dot processing>
      <z-avatar />
    </z-badge>
    <z-badge :value="20" processing>
      <z-avatar />
    </z-badge>
    <z-badge dot color="info" processing>
      <z-avatar />
    </z-badge>
  </z-space>
</template>
