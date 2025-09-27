<markdown>
# Expand Collapse Icon

Depending on whether the popover is open or not, Expanded and Collapsed icon on the trigger button can be set.
`v-model:show` used here has been inherited from [popover props](popover#Popover-Props).
</markdown>

<template>
  <z-popselect v-model:show="isExpanded" :options="options">
    <template #default>
      <z-button>
        Actions
        <template #end>
          <z-icon v-if="isExpanded" size="20">
            <ArrowDropUp />
          </z-icon>
          <z-icon v-else size="20">
            <ArrowDropDown />
          </z-icon>
        </template>
      </z-button>
    </template>
  </z-popselect>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ArrowDropDown, ArrowDropUp } from '@zeta/icons'
export default defineComponent({
  components: {
    ArrowDropDown,
    ArrowDropUp
  },
  setup () {
    const isExpanded = ref(false)
    return {
      isExpanded,
      options: [
        {
          label: 'Inception',
          value: 'movie0'
        },
        {
          label: 'The Shawshank Redemption',
          value: 'movie1'
        },
        {
          label: 'Pulp Fiction',
          value: 'movie2'
        },
        {
          label: 'The Godfather',
          value: 'movie3',
          disabled: true
        }
      ]
    }
  }
})
</script>
