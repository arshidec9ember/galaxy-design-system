<markdown>
# Slots

Use `header` or `footer` slot to customize header or footer.
</markdown>

<template>
  <z-popover trigger="click">
    <template #trigger>
      <z-button>There's a divider</z-button>
    </template>
    <template #header>
      <z-text strong depth="1">
        Divider is on the bottom.
      </z-text>
    </template>
    Content.
    <template #footer>
      Divider is on the top.
    </template>
  </z-popover>
</template>
