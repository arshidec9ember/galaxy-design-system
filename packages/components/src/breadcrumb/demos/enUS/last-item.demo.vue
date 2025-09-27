<markdown>
# Separator in last item
</markdown>

<template>
  <z-breadcrumb>
    <z-breadcrumb-item><template #start>
      <z-icon :component="Home" /> </template>Home</z-breadcrumb-item>
    <z-breadcrumb-item>
      <template #end>
        <z-icon :component="BagCheck" /> </template>Product</z-breadcrumb-item>
    <z-breadcrumb-item>
      <template #start>
        <z-icon :component="Images" /> </template>Images</z-breadcrumb-item>
    <z-breadcrumb-item />
  </z-breadcrumb>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Home, BagCheck, Images } from '@vicons/ionicons5'

export default defineComponent({
  setup () {
    return {
      Home,
      BagCheck,
      Images
    }
  }
})
</script>
