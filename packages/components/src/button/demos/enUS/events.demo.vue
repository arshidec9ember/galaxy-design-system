<markdown>
# Events

Handle events of buttons.
</markdown>

<template>
  <z-button @click="handleClick">
    Click Me
  </z-button>
</template>
<script setup lang="ts">
import { useMessage } from '@zeta-gds/components'

const message = useMessage()
const handleClick = () => {
  message.info('Button Clicked')
}
</script>
