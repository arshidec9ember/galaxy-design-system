<markdown>
# Custom Icon

You can add any icon to the popconfirm.
</markdown>

<template>
  <z-popconfirm positive-text="ok" negative-text="not ok">
    <template #icon>
      <z-icon color="red">
        <hand-icon />
      </z-icon>
    </template>
    <template #trigger>
      <z-button>Quit Game</z-button>
    </template>
    The Game is not over yet.
  </z-popconfirm>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { MdHand as HandIcon } from '@vicons/ionicons4'

export default defineComponent({
  components: {
    HandIcon
  }
})
</script>
