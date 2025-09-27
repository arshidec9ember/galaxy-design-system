<markdown>
  # Checkable Cards

  Make your cards checkable.
  </markdown>

<template>
  <z-checkbox-group v-model="cards">
    <z-grid :y-gap="24" :cols="1">
      <z-gi>
        <z-checkbox value="Be Side">
          <z-card>
            <z-card-header>Be Side</z-card-header>
            <z-card-content>Card Content</z-card-content>
          </z-card>
        </z-checkbox>
      </z-gi>
      <z-gi>
        <z-checkbox value="Be Helpful">
          <z-card>
            <z-card-header>Be Helpful</z-card-header>
            <z-card-content>Card Content</z-card-content>
          </z-card>
        </z-checkbox>
      </z-gi>
    </z-grid>
  </z-checkbox-group>
</template>

<script lang="ts" setup>
import { useMessage } from '@zeta-gds/components'
import { watch, ref } from 'vue'

const message = useMessage()
const cards = ref([])

watch(cards, (checkboxes) => {
  message.info(JSON.stringify(checkboxes))
})
</script>

<style>
.z-card {
  width: 300px;
}
</style>
