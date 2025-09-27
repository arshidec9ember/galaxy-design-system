<markdown>
# Action
</markdown>

<template>
  <z-button @click="handleClick">
    With some Action
  </z-button>
</template>

<script lang="ts">
import { h, defineComponent } from 'vue'
import { useFloatingPanel, ZButton, ZLink } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const floatingPanel = useFloatingPanel()
    return {
      handleClick () {
        const z = floatingPanel.create({
          title: 'Domain Created',
          content:
            'You can start configuring your domain now to setup profiles. ',
          closable: true
        })
        const updateFloatingPanelButton = h(
          ZButton,
          {
            size: 'small'
          },
          {
            default: () => 'Update'
          }
        )

        const linkFloatingPanelButton = h(
          ZLink,
          {
            size: 'small',
            isBold: true
          },
          {
            default: () => 'Link'
          }
        )
        const buttonGroup = h(
          'div',
          {
            style: {
              display: 'flex',
              gap: '20px'
            }
          },
          [updateFloatingPanelButton, linkFloatingPanelButton]
        )
        z.action = () => buttonGroup
      }
    }
  }
})
</script>
