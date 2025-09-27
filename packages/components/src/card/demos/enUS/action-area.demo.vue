<markdown>
# Action Area

A experimental card.
</markdown>

<template>
  <z-button-group>
    <z-button @click="animation = 'shine'">
      Shine
    </z-button>
    <z-button @click="animation = 'hover'">
      Hover
    </z-button>
  </z-button-group>
  <z-divider />
  <z-card hoverable>
    <z-card-action-area
      :animation="animation"
      @click="message.info('Action Area Clicked!')"
    >
      <z-card-media>
        <img
          src="https://v.hdfcbank.com/content/dam/hdfc-aem-microsites/new-credit-card-amp/cards/shoppers-stop146x98-blue.png"
          alt="bank"
        >
      </z-card-media>
      <z-card-header>
        Card Header
        <template #end>
          #End
        </template>
      </z-card-header>
      <z-card-content> Card Content </z-card-content>
      <z-card-footer> Card Footer </z-card-footer>
    </z-card-action-area>
    <z-card-action> Card Action </z-card-action>
  </z-card>
</template>
<script lang="ts" setup>
import { useMessage } from '@zeta-gds/components'
import { ref } from 'vue'
const message = useMessage()
const animation = ref<'hover' | 'shine'>('hover')
</script>

<style>
.z-card {
  max-width: 300px;
}

.inverse {
  color: white;
}
</style>
