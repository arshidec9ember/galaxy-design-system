<markdown>
# Avatar Group Vertical

Vertical alignment of avatar group
</markdown>

<template>
  <z-avatar-group :options="options" :size="40" :max-items="3" vertical>
    <template #avatar="{ option: { name, src } }">
      <z-tooltip>
        <template #trigger>
          <z-avatar :src="src" />
        </template>
        {{ name }}
      </z-tooltip>
    </template>
    <template #rest="{ options: restOptions, rest }">
      <z-dropdown :options="createDropdownOptions(restOptions)" placement="top">
        <z-avatar>+{{ rest }}</z-avatar>
      </z-dropdown>
    </template>
  </z-avatar-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {
      options: [
        {
          name: 'Poonam Agrawal',
          src: 'https://robohash.org/0e01f2b7f17b44c5db9f7602631e7240?set=set4&bgset=bg1&size=400x400'
        },
        {
          name: 'Sai Naidu Varudu',
          src: 'https://robohash.org/099ce3f550f66b6865fe629491dfd7ea?set=set4&bgset=bg1&size=400x400'
        },
        {
          name: 'Janakiraman Ramaiya',
          src: 'https://robohash.org/21aaef479ddf20c8acb4c09467e7a356?set=set1&bgset=&size=400x400'
        },
        {
          name: 'Vishwajeet Kushmariya',
          src: 'https://robohash.org/4a43d063534d80aa7621afaca948f9a1?set=set2&bgset=&size=400x400'
        },
        {
          name: 'Arindam Pradhan',
          src: 'https://robohash.org/35ecc8a1e1a84e2141066bd61376ac1e?set=set1&bgset=&size=400x400'
        },
        {
          name: 'Surya Prakash',
          src: 'https://robohash.org/f1857a6888cdd1f88825011889a8f154?set=set1&bgset=&size=400x400'
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
