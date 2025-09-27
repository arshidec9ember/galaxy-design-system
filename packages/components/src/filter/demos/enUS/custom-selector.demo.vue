<markdown>
# Custom Selector

</markdown>
<template>
  <z-space vertical>
    <z-filter v-model="filters" :filters="filterList" :data="data" />
    <z-code language="js" word-wrap :code="JSON.stringify(filters, null, 2)" />
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref, inject } from 'vue'
import { faker } from '@faker-js/faker'
import {
  ZInput,
  ZSelect,
  createFilterItemSelector,
  filterItemInjectionKey
} from '@zeta-gds/components'

const options = [
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

const filterList = [
  {
    field: 'name',
    label: 'Name',
    selectors: {
      'custom-selector': {
        options,
        value: []
        // actions: []
      },
      'custom-input-selector': {}
    }
  }
]

const data = Array(10)
  .fill(0)
  .map(() => {
    const name = faker.person.firstName()
    const username = faker.internet.userName({ firstName: name })
    return { name, username }
  })

const filtersRef = {
  name: {
    type: 'custom-selector',
    value: 'Bob'
  }
}

createFilterItemSelector('custom-selector', {
  label: 'Custom Value',
  component: {
    props: {
      value: {
        type: [String, Array],
        default: () => []
      }
    },
    components: {
      ZSelect
    },
    setup (props) {
      const Filter = inject(filterItemInjectionKey, null)
      const value = ref<string | string[] | null>(
        Array.isArray(props.value) ? props.value : [props.value]
      )

      return {
        options,
        value,
        handler (data) {
          Filter?.updateValue(data)
        }
      }
    },
    template: `
    <div style="padding:16px; width:300px">
      <z-select multiple v-model="value" @update:modelValue="handler" :options="options" />
    </div>
    `
  },
  filterFn: (value, model) => {
    return value === model.value
  }
})

createFilterItemSelector('custom-input-selector', {
  label: 'Custom Input Selector',
  component: {
    props: {
      value: [String, Array]
    },
    components: {
      ZInput
    },
    setup (props) {
      const Filter = inject(filterItemInjectionKey, null)
      const value = ref<string | string[] | null>(
        Array.isArray(props.value) ? props.value : [props.value]
      )
      return {
        options,
        value,
        handler (data) {
          Filter?.updateValue(data)
        }
      }
    },
    template: `
     <div style="padding:16px; width:300px"> <z-input v-model="value" @update:modelValue="handler" placeholder="Please enter a value" /></div>
    `
  },
  filterFn: (value, model) => {
    return value === model.value
  }
})

export default defineComponent({
  setup () {
    return {
      filterList,
      filters: ref(filtersRef),
      data: ref(data)
    }
  }
})
</script>
