<markdown>
# Fixed and Visible Filters

Filters can be shown as Fixed and Visible Filters where the user can see the filter which have been passed in model-value prop. Fixed and Visible Filters can be used to show the important filters to the user. Only difference is fixed filters cannot be removed by the user.
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
      return { label: name, value: name }
    })
]

const filterList: DataFilterItemConfig[] = [
  {
    field: 'firstName',
    label: 'First Name',
    fixed: true,
    selectors: {
      'by-value': {
        multiple: true,
        searchable: true,
        options,
        value: []
      }
    }
  },
  {
    field: 'lastName',
    label: 'Last Name',
    popoverStyle: { width: '400px' },
    selectors: {
      'by-value': {
        multiple: true,
        searchable: true,
        options,
        value: ['Alice', 'Bob']
      }
    }
  },
  {
    field: 'datePicker',
    label: 'Date',
    type: 'date',
    selectors: {
      'by-date': {
        type: 'date',
        value: 1709652435546,
        hideFooter: true
      }
    }
  },
  {
    field: 'conditionalNumber',
    label: 'Conditonal Number Filter',
    selectors: {
      'by-condition': {
        type: 'number',
        condition: 'GREATER_THAN',
        value: 23
      }
    }
  }
]

const filtersRef: FilterState = {
  firstName: {
    type: 'by-value',
    value: ['Alice']
  },
  lastName: {
    type: 'by-value',
    value: ['Alice', 'Bob']
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
