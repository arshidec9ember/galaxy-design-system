<markdown>
# Select your Card

Make your cards select by radio.
</markdown>

<template>
  <z-radio-group v-model="card" style="display: block">
    <z-grid :y-gap="24" :cols="1">
      <z-gi>
        <z-radio value="Be Side">
          <z-card-standard title="Be Side">
            <div>Card Content</div>
          </z-card-standard>
        </z-radio>
      </z-gi>
      <z-gi>
        <z-radio value="Be Helpful">
          <z-card-standard title="Be Helpful">
            Card Content
          </z-card-standard>
        </z-radio>
      </z-gi>
    </z-grid>
  </z-radio-group>
</template>

<script lang="ts" setup>
import { useMessage } from '@zeta-gds/components'
import { watch, ref } from 'vue'

const message = useMessage()
const card = ref(null)

watch(card, (radios) => {
  message.info(JSON.stringify(radios))
})
</script>

<style>
.z-card {
  width: 300px;
}
</style>
