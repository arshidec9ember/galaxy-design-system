<markdown>
# Slot

We can customize the key-value pair.
</markdown>

<template>
  <z-json-viewer
    :data="data"
    :show-line-number="false"
    :show-icon="false"
    :collapsed-on-click-brackets="false"
  >
    <template #node-key="{ defaultKey }">
      {{ defaultKey }}
    </template>
    <template #node-value="{ node }">
      <template v-if="node.content == 'Cake'">
        {{ node.content }}
        <z-icon class="cake-icon" :size="16">
          <food-cake16-regular />
        </z-icon>
      </template>
      <template v-else>
        {{ node.content }}
      </template>
    </template>
  </z-json-viewer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FoodCake16Regular from '@vicons/fluent/FoodCake16Regular'
export default defineComponent({
  components: {
    FoodCake16Regular
  },
  setup () {
    return {
      data: [
        {
          id: '0001',
          type: 'donut',
          name: 'Cake',
          ppu: 0.55,
          batters: {
            batter: [
              { id: '1001', type: 'Regular' },
              { id: '1002', type: 'Chocolate' },
              { id: '1003', type: 'Blueberry' },
              { id: '1004', type: "Devil's Food" }
            ]
          }
        }
      ]
    }
  }
})
</script>
<style>
.cake-icon {
  color: #e30f34;
}
</style>
