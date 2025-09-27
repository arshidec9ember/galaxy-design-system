<markdown>
# Custom separator by item

Use separator prop or separator slot to custom separator of an item. When both are present, separator slot will be used.
</markdown>

<template>
  <z-breadcrumb>
    <z-breadcrumb-item separator=">">
      <template #start>
        <z-icon><home /></z-icon> </template>Home
    </z-breadcrumb-item>
    <z-breadcrumb-item>
      <template #start>
        <z-icon><bag-check /></z-icon> </template>Product <template #separator>
        ~
      </template></z-breadcrumb-item>
    <z-breadcrumb-item>
      <template #start>
        <z-icon><images /></z-icon> </template>Images
      <template #separator>
        <z-icon size="14">
          <chevron-forward />
        </z-icon> </template></z-breadcrumb-item>
    <z-breadcrumb-item>
      <template #start>
        <z-icon><layers /></z-icon> </template>Settings</z-breadcrumb-item>
  </z-breadcrumb>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  Home,
  BagCheck,
  Images,
  Layers,
  ChevronForward
} from '@vicons/ionicons5'

export default defineComponent({
  components: {
    Home,
    BagCheck,
    Images,
    ChevronForward,
    Layers
  }
})
</script>
