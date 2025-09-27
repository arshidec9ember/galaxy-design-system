<markdown>
# Custom Items

Icons can be used in buttons or any custom items as well. You can use `render-icon` prop or `icon` slot to display one icon and then use icon-placement prop to change its direction.
In case, you want to display multple icons or any custom item, you can make use of `render-start` or `render-end` slot to display in respective positions or also
make use of `start` and `end` slot
</markdown>

<template>
  <z-space>
    <z-button :render-icon="renderIcon">
      +100$
    </z-button>
    <z-button icon-placement="end">
      <template #icon>
        <z-icon>
          <add-icon />
        </z-icon>
      </template>
      +100$
    </z-button>
    <z-button :render-start="renderIcon" :render-end="renderIcon">
      +100$
    </z-button>
    <z-button>
      <template #start>
        <z-icon>
          <add-icon />
        </z-icon>
      </template>
      <template #end>
        <z-icon>
          <add-icon />
        </z-icon>
      </template>
      +100$
    </z-button>
  </z-space>
</template>

<script lang="ts">
import { Add as AddIcon } from '@vicons/ionicons5'
import { ZIcon } from '@zeta-gds/components'
import { defineComponent, h } from 'vue'

export default defineComponent({
  components: {
    AddIcon
  },
  setup () {
    return {
      renderIcon () {
        return h(
          ZIcon,
          {
            size: 20
          },
          {
            default: () => h(AddIcon)
          }
        )
      }
    }
  }
})
</script>
