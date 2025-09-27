<markdown>
# Customizing action

You can customize the action buttons by using the `action` slot. that will receive an object with the following properties: `index`, `create`, `remove`, `move`.
</markdown>

<template>
  <z-dynamic-input v-model="value" placeholder="Come on" :min="3" :max="6">
    <template #action="{ index, create, remove, move }">
      <z-space style="margin-left: 20px">
        <z-button @click="() => create(index)">
          <z-icon>
            <add-icon />
          </z-icon>
        </z-button>
        <z-button disabled @click="() => remove(index)">
          <z-icon>
            <remove-icon />
          </z-icon>
        </z-button>
        <z-button @click="() => move('up', index)">
          <z-icon>
            <up-icon />
          </z-icon>
        </z-button>
        <z-button @click="() => move('down', index)">
          <z-icon>
            <down-icon />
          </z-icon>
        </z-button>
      </z-space>
    </template>
  </z-dynamic-input>
  <pre>{{ JSON.stringify(value, null, 2) }}</pre>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import {
  BagAddOutline as AddIcon,
  BagRemoveOutline as RemoveIcon,
  ChevronUpCircleOutline as UpIcon,
  ChevronDownCircleOutline as DownIcon
} from '@vicons/ionicons5'

export default defineComponent({
  components: {
    AddIcon,
    RemoveIcon,
    UpIcon,
    DownIcon
  },
  setup () {
    return {
      value: ref(['Vue', 'Vue3', 'React'])
    }
  }
})
</script>
