<markdown>
# Customize color

If you are not satisfied with builtin colors.
</markdown>

<template>
  <z-progress
    style="margin: 0 8px 12px 0"
    variant="circle"
    :percentage="20"
    :color="{
      color: themeVars.successColor,
      railColor: changeColor(themeVars.successColor, { alpha: 0.2 }),
      indicatorTextColor: themeVars.successColor
    }"
  />
  <z-progress
    style="width: 120px; margin: 0 8px 12px 0"
    variant="multiple-circle"
    :stroke-width="10"
    :circle-gap="10"
    :percentage="[50, 25]"
    :color="{
      color: [themeVars.infoColor, themeVars.infoColor],
      railColor: [
        changeColor(themeVars.infoColor, { alpha: 0.2 }),
        changeColor(themeVars.infoColor, { alpha: 0.2 })
      ]
    }"
  />
  <z-progress
    variant="line"
    indicator-placement="inside"
    :color="{
      color: themeVars.errorColor,
      railColor: changeColor(themeVars.errorColor, { alpha: 0.2 })
    }"
    :percentage="20"
  />
  <z-progress
    variant="line"
    :color="{
      color: themeVars.warningColor,
      railColor: changeColor(themeVars.warningColor, { alpha: 0.2 }),
      indicatorTextColor: themeVars.warningColor
    }"
    :percentage="20"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { changeColor } from 'seemly'
import { useThemeVars } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    return {
      changeColor,
      themeVars: useThemeVars()
    }
  }
})
</script>
