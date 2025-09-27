<markdown>
# Adjust the popover

Use `flip` to decide whether to adjust, use `shift` to decide whether to shift.
</markdown>

<template>
  <z-popover
    trigger="click"
    placement="bottom-start"
    :flip="true"
    :flip-level="1"
  >
    <template #trigger>
      <z-button> Offset </z-button>
    </template>
    <span>
      The default is to adjust within the existing position. If the existing
      position is not satisfied, then you can set `shift` prop, which will be
      offset appropriately at the same latitude. Note: if the popover is large
      enough, any offset will be blocked!
    </span>
  </z-popover>
</template>
