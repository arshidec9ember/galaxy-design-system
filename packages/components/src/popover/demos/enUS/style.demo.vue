<markdown>
# Style

You can use `style` to set popover's style. You can set `scrollable` to make popover's content scrollable. If popover is scrollable, You can use `content-style` to set popover's content style.
</markdown>

<template>
  <z-space>
    <z-popover style="width: 500px" trigger="click">
      <template #trigger>
        <z-button> Width 500px </z-button>
      </template>
      Content present inside the popover will be of the width set in styles
    </z-popover>
    <z-popover style="max-width: 100px" trigger="click">
      <template #trigger>
        <z-button> Max width 100px </z-button>
      </template>
      Any content present inside the popover will take the max width set in
      styles
    </z-popover>
    <z-popover style="max-height: 240px" trigger="click" scrollable>
      <template #trigger>
        <z-button>Max height 240px</z-button>
      </template>
      Put whatever you want.<br>
      Put whatever you want.<br>
      Put whatever you want.<br>
      Put whatever you want.<br>
      Put whatever you want.<br>
      Put whatever you want.<br>
      Put whatever you want.<br>
      Put whatever you want.<br>
      Put whatever you want.<br>
      Put whatever you want.<br>
      Put whatever you want.<br>
      Put whatever you want.<br>
    </z-popover>
    <z-popover style="padding: 0" trigger="click">
      <template #trigger>
        <z-button> No padding </z-button>
      </template>
      Put whatever you want.
    </z-popover>
    <z-popover
      style="max-height: 240px"
      content-style="padding: 0;"
      trigger="click"
      scrollable
    >
      <template #trigger>
        <z-button>Scrollable & no padding</z-button>
      </template>
      Put whatever you want.<br>
      Put whatever you want.<br>
      Put whatever you want.<br>
      Put whatever you want.<br>
      Put whatever you want.<br>
      Put whatever you want.<br>
      Put whatever you want.<br>
      Put whatever you want.<br>
      Put whatever you want.<br>
      Put whatever you want.<br>
      Put whatever you want.<br>
      Put whatever you want.<br>
    </z-popover>
    <z-popover
      trigger="click"
      content-style="padding: 0;"
      header-style="padding: 0;"
    >
      <template #trigger>
        <z-button>With header & no padding</z-button>
      </template>
      <template #header>
        <z-text strong depth="1">
          Divider is on the bottom.
        </z-text>
      </template>
      Divider is on the top.
    </z-popover>
  </z-space>
</template>
