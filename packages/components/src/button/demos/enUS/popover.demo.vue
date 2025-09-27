<markdown>
# Using popover in disabled state

The native disabled button won't trigger some mouse events so `z-popover` can't listen to it. If you need to use it, you can use `tag` prop to change button's behavior.
</markdown>

<template>
  <z-tooltip>
    <template #trigger>
      <z-button variant="filled" color="primary" disabled>
        Disabled button as div
      </z-button>
    </template>
    Lpsum
  </z-tooltip>
</template>
