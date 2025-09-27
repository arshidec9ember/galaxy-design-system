<markdown>
# Border Styles

Use `dashed` to show a dashed button.
Use `dotted` to show a dotted button.

</markdown>

<template>
  <z-space>
    <z-button variant="outlined">
      Neutral
    </z-button>
    <z-button variant="outlined" color="primary" border-style="dashed">
      Primary
    </z-button>
    <z-button variant="outlined" color="success" border-style="dotted">
      Success
    </z-button>
    <z-button variant="outlined" color="warning" border-style="dashed" round>
      Warning
    </z-button>
    <z-button variant="outlined" color="error" border-style="dotted" circle>
      <template #icon>
        <add-icon />
      </template>
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
