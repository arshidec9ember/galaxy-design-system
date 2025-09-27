<markdown>
# Custom color

</markdown>

<template>
  <z-space align="center">
    <z-button variant="filled" color="#8a2be2">
      <template #icon>
        <z-icon>
          <add-icon />
        </z-icon>
      </template>
      #8a2be2
    </z-button>
    <z-button variant="filled" color="#ff69b4">
      <template #icon>
        <z-icon>
          <add-icon />
        </z-icon>
      </template>
      #ff69b4
    </z-button>
    <z-button
      variant="subtle"
      :color="{ color: '#8a2be2', textColor: '#8a2be2', iconColor: '#8a2be2' }"
    >
      <template #icon>
        <z-icon>
          <add-icon />
        </z-icon>
      </template>
      #8a2be2
    </z-button>
    <z-button
      variant="subtle"
      :color="{ color: '#ff69b4', textColor: '#ff69b4', iconColor: '#ff69b4' }"
    >
      <template #icon>
        <z-icon>
          <add-icon />
        </z-icon>
      </template>
      #ff69b4
    </z-button>
  </z-space>
</template>

<script lang="ts">
import { Add as AddIcon } from '@vicons/ionicons5'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    AddIcon
  }
})
</script>
