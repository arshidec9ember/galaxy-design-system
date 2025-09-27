<markdown>
# Body style

Setting style is sometimes useful.
</markdown>

<template>
  <z-space>
    <z-tooltip :style="{ maxWidth: '400px' }" trigger="click">
      <template #trigger>
        <z-button> Trigger Button with large text </z-button>
      </template>
      Content present inside the tooltip. Content present inside the tooltip.
      Content present inside the tooltip.
    </z-tooltip>
    <z-tooltip :style="{ maxWidth: '400px' }" trigger="click">
      <template #trigger>
        <z-button> Trigger Button with small text </z-button>
      </template>
      Tooltip content
    </z-tooltip>
  </z-space>
</template>
