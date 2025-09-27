<markdown>
# Divider

`content`, `footer` can be full divider or `inset` divider. `action` can be divider. Segment border will appear at the top of divider parts.

</markdown>

<template>
  <z-card-standard
    title="Card Divider Demo"
    :divider="{
      content: true,
      footer: 'inset'
    }"
  >
    <template #header-end>
      #header-end
    </template>
    Card Content
    <template #footer>
      #footer
    </template>
    <template #action>
      #action
    </template>
  </z-card-standard>
</template>
