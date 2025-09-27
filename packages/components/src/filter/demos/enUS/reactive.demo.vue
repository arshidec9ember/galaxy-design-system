<markdown>
# Reactive

Update the UI when the filter list is updated and also update the UI when the filter model is updated

</markdown>

<template>
  <z-space vertical>
    <z-button @click="onUpdateFilterValue">
      Update Model Value
    </z-button>
    <z-button @click="onUpdateFilters">
      Update Filters
    </z-button>
    <z-filter
      v-model="filters"
      :filters="filterList"
      @update:model-value="onUpdateValue"
    />
    <z-code language="js" word-wrap :code="JSON.stringify(filters, null, 2)" />
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { faker } from '@faker-js/faker'
import { uniqBy } from 'lodash-es'
import { format } from 'date-fns'

function createRandomUser () {
  const gender = faker.person.sexType()
  const firstName = faker.person.firstName(gender)
  const lastName = faker.person.lastName()
  const email = faker.internet.email({ firstName, lastName })

  return {
    _id: faker.string.uuid(),
    avatar: faker.image.avatar(),
    birthday: format(faker.date.birthdate(), 'dd-MMM-yyyy'),
    email,
    firstName,
    lastName,
    gender,
    subscriptionTier: faker.helpers.arrayElement(['free', 'basic', 'business'])
  }
}

const data = ref([
  ...Array(10)
    .fill(0)
    .map(() => createRandomUser())
])

export default defineComponent({
  setup () {
    const filters = ref({})
    const filterList = ref<any>([
      {
        field: 'gender',
        label: 'Gender',
        onApply (value) {
          console.log('onApply', value)
        },
        selectors: {
          'by-value': {
            multiple: true,
            searchable: true,
            options: uniqBy(
              data.value.map((item) => {
                return {
                  label: item.gender.toUpperCase(),
                  value: item.gender
                }
              }),
              'value'
            ),
            actions: ['apply', 'cancel', 'reset']
          }
        }
      },
      {
        field: 'subscriptionTier',
        label: 'Subscription Tier',
        selectors: {
          'by-value': {
            multiple: true,
            searchable: true,
            options: uniqBy(
              data.value.map((item) => {
                return {
                  label: item.subscriptionTier.toUpperCase(),
                  value: item.subscriptionTier
                }
              }),
              'value'
            )
          }
        }
      },
      {
        field: 'firstName',
        label: 'First Name',
        fixed: true,
        selectors: {
          'by-value': {
            multiple: true,
            searchable: true,
            options: data.value.map((item) => {
              return {
                label: item.firstName,
                value: item.firstName
              }
            }),
            valueTransformer: (value) => {
              return 'valueTransformer: ' + value
            },
            actions: ['apply', 'cancel', 'reset']
          }
        }
      },
      {
        field: 'email',
        label: 'Email',
        selectors: {
          'by-value': {
            multiple: false,
            searchable: true,
            showIndicator: true,
            options: data.value.map((item) => {
              return {
                label: item.email,
                value: item.email
              }
            }),
            actions: ['apply', 'cancel', 'reset']
          }
        }
      },
      {
        field: 'birthday',
        label: 'Birthday',
        selectors: {
          'by-date': {
            format: 'dd-MMM-yyyy',
            type: 'daterange'
          }
        }
      },
      {
        field: 'lastName',
        label: 'Last Name',
        fixed: true,
        selectors: {
          'by-value': {
            multiple: true,
            searchable: true,
            options: data.value.map((item) => {
              return {
                label: item.lastName,
                value: item.lastName
              }
            }),
            value: data.value.map((item) => item.lastName).slice(0, 2),
            actions: ['apply', 'cancel', 'reset']
          }
        }
      }
    ])

    function onUpdateFilterValue () {
      const x = {
        firstName: {
          type: 'text',
          value: null,
          selector: 'by-value'
        },
        lastName: {
          type: 'text',
          value: null,
          selector: 'by-value'
        },
        gender: {
          type: 'text[]',
          value: ['female'],
          selector: 'by-value'
        }
      }
      filters.value = x
    }
    function onUpdateFilters () {
      const filterVal = filterList.value.map((item) => {
        if (item.field === 'subscriptionTier') {
          item.selectors['by-value'].options = [
            {
              label: 'hello',
              value: 'hello'
            },
            {
              label: 'world',
              value: 'world'
            },
            {
              label: 'world2',
              value: 'world2'
            }
          ]
        }
        if (item.field === 'firstName') {
          item.selectors['by-value'].options = [
            {
              label: 'hello',
              value: 'hello'
            },
            {
              label: 'world',
              value: 'world'
            },
            {
              label: 'world2',
              value: 'world2'
            }
          ]
        }
        return item
      })
      filterList.value = filterVal
    }

    return {
      filterList,
      filters,
      onUpdateValue (value) {
        // filters.value = value
        console.log('hello', value)
      },
      onUpdateFilterValue,
      onUpdateFilters
    }
  }
})
</script>
