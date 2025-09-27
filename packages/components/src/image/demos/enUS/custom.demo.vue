<markdown>
# Customizing toolbar by theme variables

The default style of toolbar may not meet your demand, let's make some configuration.
</markdown>

<template>
  <z-image-group :theme-overrides="imageGroupThemeOverrides">
    <z-space>
      <z-image
        width="100"
        src="https://images.unsplash.com/photo-1498084393753-b411b2d26b34?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8Y2l0eXx8fHx8fDE2OTQ0MzYwNzM&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=900"
      />
      <z-image
        width="100"
        src="https://images.unsplash.com/photo-1471306224500-6d0d218be372?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8Y2l0eXx8fHx8fDE2OTQ0MzYxMTM&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=900"
      />
    </z-space>
  </z-image-group>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { GlobalThemeOverrides, useThemeVars } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    return {
      imageGroupThemeOverrides: computed(() => {
        const { popoverColor, boxShadow2, textColor2, borderRadius } =
          useThemeVars().value
        const themeOverrides: NonNullable<GlobalThemeOverrides['Image']> = {
          toolbarColor: popoverColor,
          toolbarBoxShadow: boxShadow2,
          toolbarIconColor: textColor2,
          toolbarBorderRadius: borderRadius
        }
        return themeOverrides
      })
    }
  }
})
</script>
