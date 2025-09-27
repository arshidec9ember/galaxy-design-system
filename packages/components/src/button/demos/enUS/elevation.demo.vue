<markdown>
# Elevation

Using elevation, You can show the buttons as a floating type
</markdown>

<template>
  <z-space vertical>
    <z-radio-group v-model="elevationValue">
      <z-radio
        v-for="_elevation in elevation"
        :key="_elevation"
        :value="_elevation"
        style="padding-right: 12px"
      >
        {{ _elevation }}
      </z-radio>
    </z-radio-group>
    <z-space>
      <z-button
        variant="filled"
        color="primary"
        :elevation="elevationValue"
        loading-type="overlay"
      >
        <template #icon>
          <z-icon>
            <add-icon />
          </z-icon>
        </template>
        Click Me
      </z-button>
      <z-button
        :elevation="elevationValue"
        loading-type="overlay"
        icon-placement="start"
      >
        Click Me
      </z-button>
      <z-button
        variant="outlined"
        color="info"
        :elevation="elevationValue"
        loading-type="overlay"
      >
        <template #icon>
          <z-icon>
            <add-icon />
          </z-icon>
        </template>
        Click Me
      </z-button>
      <z-button
        variant="filled"
        color="warning"
        :elevation="elevationValue"
        loading-type="overlay"
        round
      >
        <template #icon>
          <z-icon>
            <add-icon />
          </z-icon>
        </template>
        Click Me
      </z-button>
      <z-button
        variant="outlined"
        color="error"
        :elevation="elevationValue"
        loading-type="overlay"
        icon-placement="start"
        round
      >
        Click Me
      </z-button>
    </z-space>
  </z-space>
</template>

<script lang="ts">
import { Add as AddIcon } from '@vicons/ionicons5'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: {
    AddIcon
  },
  setup () {
    const elevationRef = ref<0 | 1 | 2 | 3 | 4>(3)
    return {
      elevationValue: elevationRef,
      elevation: [0, 1, 2, 3, 4]
    }
  }
})
</script>
