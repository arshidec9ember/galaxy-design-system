<markdown>
# Link

You can render buttons with anchor tags while passing variant as link.

In any button which is not behaving as a link, We also have a provision of navigating to a particular url of the basis of href and target prop
</markdown>

<template>
  <z-space align="baseline">
    <z-button variant="link" href="https://gds.zeta.tech/" target="_blank">
      <template #icon>
        <z-icon>
          <add-icon />
        </z-icon>
      </template>
      GDS Tech
    </z-button>
    <z-button variant="filled" color="primary" href="https://gds.zeta.tech/">
      <template #icon>
        <z-icon>
          <add-icon />
        </z-icon>
      </template>
      GDS Tech
    </z-button>
    <z-button variant="outlined" href="https://gds.zeta.tech/" target="_self">
      <template #icon>
        <z-icon>
          <add-icon />
        </z-icon>
      </template>
      GDS Tech
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
