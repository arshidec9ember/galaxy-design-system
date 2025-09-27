<markdown>
# Navigation List
you can select value from the list
</markdown>

<template>
  <z-list
    v-model="values"
    hoverable
    clickable
    selectable
    :show-indicator="false"
    @update:model-value="handleUpdateValue"
  >
    <z-list-item
      v-for="navigation in listNavigationData"
      :key="navigation.value"
      :value="navigation.value"
      class="card-item-nav"
    >
      <z-facade content-indented>
        <template #header>
          {{ navigation.header }}
        </template>
        <template #description>
          {{ navigation.description }}
        </template>
        {{ navigation.content }}
        <template #footer>
          {{ navigation.footer }}
        </template>
        <template #action>
          <z-space>
            <z-tag v-for="button in navigation.action.buttons" :key="button.id">
              {{ button.text }}
            </z-tag>
          </z-space>
        </template>
      </z-facade>
    </z-list-item>
  </z-list>
</template>

<script lang="ts" setup>
import { useMessage } from '@zeta-gds/components'
import { ref } from 'vue'

const listNavigationData = ref([
  {
    header: 'Money',
    description: 'Description',
    footer: 'Footer',
    value: 'Thing-1',
    content: '',
    action: {
      buttons: [
        {
          text: '1 USD',
          id: '12332'
        },
        {
          text: '10 USD',
          id: '123321'
        },
        {
          text: '100 USD',
          id: '122332'
        }
      ]
    }
  },
  {
    header: 'Another Header',
    description: 'Another Description',
    footer: 'Another Footer',
    value: 'Thing-2',
    content: '',
    action: {
      buttons: [
        {
          text: '1 USD',
          id: '12332'
        },
        {
          text: '10 USD',
          id: '123321'
        },
        {
          text: '100 USD',
          id: '122332'
        }
      ]
    }
  },
  {
    header: 'Third Header',
    description: 'Third Description',
    footer: 'Third Footer',
    value: 'Thing-3',
    content: '',
    action: {
      buttons: [
        {
          text: '1 USD',
          id: '12332'
        },
        {
          text: '10 USD',
          id: '123321'
        },
        {
          text: '100 USD',
          id: '122332'
        }
      ]
    }
  }
])

const values = ref(['Thing-1'])
const message = useMessage()

const handleUpdateValue = (value) => {
  message.info(JSON.stringify(value))
}
</script>

<style>
.card-item-nav {
  border-left: 4px solid transparent;
  border-radius: 0px;
}
.card-item-nav.z-list-item--selected {
  border-left: 4px solid var(--z-color-target);
}
</style>
