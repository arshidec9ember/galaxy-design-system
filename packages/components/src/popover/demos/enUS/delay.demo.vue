<markdown>
# Delay
</markdown>

<template>
  <z-popover trigger="hover" :delay="500" :duration="500">
    <template #trigger>
      <z-button> Delay 500, Duration 500 </z-button>
    </template>
    <span> Content of the popover will be shown post delay </span>
  </z-popover>
</template>
