<markdown>
# Divider

`content`, `footer` can be full divider or `inset` divider. `action` can be divider. Segment border will appear at the top of divider parts.

</markdown>

<template>
  <z-card
    :divider="{
      content: true,
      footer: 'inset'
    }"
  >
    <z-card-header>Card Divider Demo
      <template #end>
        #end
      </template>
    </z-card-header>
    <z-card-content> Card Content </z-card-content>
    <z-card-footer> Card Footer </z-card-footer>
    <z-card-action> Card Action </z-card-action>
  </z-card>
</template>
