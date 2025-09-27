<markdown>
# Customize tooltip content

Use the `tooltip` slot to customize the tooltip content.
</markdown>

<template>
  <z-ellipsis style="max-width: 240px">
    This is the content of the tooltip which will be clipped depending on the
    max width. Entire content will be displayed on hover.
    <template #tooltip>
      <div style="text-align: center">
        Any custom content can also be placed to be displayed on tooltip
      </div>
    </template>
  </z-ellipsis>
</template>
