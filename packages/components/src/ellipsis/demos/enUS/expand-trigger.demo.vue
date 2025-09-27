<markdown>
# Expand trigger

Use `expand-trigger="click"` with the `line-clamp` parameter to achieve the function of clicking the abbreviated text to expand the complete text.
</markdown>

<template>
  <z-ellipsis expand-trigger="click" line-clamp="2" :tooltip="false">
    This is the content of the tooltip which will be clipped depending<br>
    on the max width. Entire content will be displayed on hover. Using <br>
    line-clamp prop, we can define the no of lines post which ellipsis <br>
    post which ellipsis will be shown.
  </z-ellipsis>
</template>
