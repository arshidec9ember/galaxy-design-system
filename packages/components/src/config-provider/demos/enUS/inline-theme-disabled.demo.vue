<markdown>
# Disable inline theme

By default, @zeta-gds/components uses inline style to hold theme variables, so every component is bound with large amount of inline CSS. If you need SSR, or just make your devtools clear, you can enable `inline-theme-disabled` prop.

Note that if you will change `theme-overrides` frequently, it's not recommended to enable the prop. Many outdated style elements will be keeped after `theme-overrides` changes.

The prop is not responsive.
</markdown>

<template>
  <z-config-provider inline-theme-disabled>
    <z-button>No inline CSS variable on the button</z-button>
  </z-config-provider>
</template>
