<markdown>
# Raw content
</markdown>

<template>
  <z-popover trigger="hover" raw :show-arrow="false">
    <template #trigger>
      <z-button> Hover </z-button>
    </template>
    <div
      style="
        width: 100px;
        height: 100px;
        background-color: red;
        transform-origin: inherit;
      "
    >
      Content inside the popover
    </div>
  </z-popover>
</template>
