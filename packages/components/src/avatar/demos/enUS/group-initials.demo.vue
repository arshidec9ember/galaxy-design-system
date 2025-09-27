<markdown>
# Avatar Group Initial

Option to show user initial.
</markdown>

<template>
  <z-space>
    <z-avatar-group
      :options="options"
      :size="40"
      :max-items="3"
      :max-style="{ backgroundColor: '#dbddf3' }"
    />
    <z-avatar-group :options="options" :size="40" :max-items="3">
      <template #avatar="{ option: { name } }">
        <z-tooltip>
          <template #trigger>
            <z-avatar :name="name" />
          </template>
          {{ name }}
        </z-tooltip>
      </template>
      <template #rest="{ options: restOptions, rest }">
        <z-dropdown
          :options="createDropdownOptions(restOptions)"
          placement="top"
        >
          <z-avatar>+{{ rest }}</z-avatar>
        </z-dropdown>
      </template>
    </z-avatar-group>
  </z-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {
      options: [
        {
          name: 'Poonam Agrawal'
        },
        {
          name: 'Sai Naidu Varudu'
        },
        {
          name: 'Janakiraman Ramaiya'
        },
        {
          name: 'Vishwajeet Kushmariya'
        },
        {
          name: 'Arindam Pradhan'
        },
        {
          name: 'Surya Prakash'
        }
      ],
      createDropdownOptions: (options: Array<{ name: string; src: string }>) =>
        options.map((option) => ({
          key: option.name,
          label: option.name
        }))
    }
  }
})
</script>
