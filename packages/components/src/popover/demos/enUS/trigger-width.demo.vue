<markdown>
# Use trigger width

Set `width="trigger"` to make popover's width the same as its trigger.
</markdown>

<template>
  <z-popover width="trigger">
    <template #trigger>
      <z-button>Trigger Button</z-button>
    </template>
    Content inside the popover taking the trigger element's width
  </z-popover>
</template>
