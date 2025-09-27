<markdown>
# Icon

</markdown>

<template>
  <z-breadcrumb>
    <z-breadcrumb-item>
      <template #start>
        <z-icon>
          <home />
        </z-icon> </template>Home</z-breadcrumb-item>
    <z-breadcrumb-item>
      <template #end>
        <z-icon><bag-check /></z-icon> </template>Product</z-breadcrumb-item>
    <z-breadcrumb-item>
      <template #start>
        <z-icon><images /></z-icon> </template>Images</z-breadcrumb-item>
  </z-breadcrumb>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { Home, BagCheck, Images } from '@vicons/ionicons5'

export default defineComponent({
  components: {
    Home,
    BagCheck,
    Images
  }
})
</script>
