<markdown>
# Selector component

Make your cards select by radio or checkbox.
</markdown>

<template>
  <z-space>
    <z-switch v-model="multiple" />
    <strong>Multiple</strong>
  </z-space>
  <z-divider />
  <z-card-selector v-model="card" :multiple="multiple">
    <z-grid :y-gap="24" :cols="1">
      <z-gi>
        <z-card value="Pushes Open">
          <z-card-header>Pushes Open</z-card-header>
          <z-card-content>Card Content</z-card-content>
        </z-card>
      </z-gi>
      <z-gi>
        <z-card value="The Window" disabled>
          <z-card-header>The Window</z-card-header>
          <z-card-content>Card Content</z-card-content>
        </z-card>
      </z-gi>
      <z-gi>
        <z-card value="And Raises">
          <z-card-header>And Raises</z-card-header>
          <z-card-content>Card Content</z-card-content>
        </z-card>
      </z-gi>
      <z-gi>
        <z-card value="The Spyglass">
          <z-card-header>The Spyglass</z-card-header>
          <z-card-content>Card Content</z-card-content>
        </z-card>
      </z-gi>
    </z-grid>
  </z-card-selector>
</template>

<script lang="ts" setup>
import { useMessage } from '@zeta-gds/components'
import { watch, ref } from 'vue'

const message = useMessage()
const card = ref(null)
const multiple = ref(false)

watch(card, (radios) => {
  message.info(JSON.stringify(radios))
})
</script>
