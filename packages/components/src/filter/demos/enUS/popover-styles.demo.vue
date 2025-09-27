<markdown>
# Popover Styles

The `popoverStyle` prop can be used to customize the style of the popover. The prop accepts an object with CSS properties as keys.

</markdown>
<template>
  <z-space vertical>
    <z-filter v-model="filters" :filters="filterList" />
    <z-code language="js" word-wrap :code="JSON.stringify(filters, null, 2)" />
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { faker } from '@faker-js/faker'
import { DataFilterItemConfig, FilterState, Option } from '../../src/interface'

const options: Option[] = [
  {
    label: 'Alice',
    value: 'Alice'
  },
  {
    label: 'Bob',
    value: 'Bob'
  },
  ...Array(10)
    .fill(0)
    .map(() => {
      const name = faker.person.firstName()
      const label = name
      const value = faker.internet.userName({ firstName: name })
      return { label, value }
    })
]

const filterList: DataFilterItemConfig[] = [
  {
    field: 'firstName',
    label: 'First Name',
    popoverStyle: { width: '400px' },
    selectors: {
      'by-value': {
        multiple: true,
        searchable: true,
        options
      }
    }
  }
]

const filtersRef: FilterState = {
  firstName: {
    type: 'by-value',
    value: ['Bob']
  }
}

export default defineComponent({
  setup () {
    return {
      filterList,
      filters: ref(filtersRef)
    }
  }
})
</script>
