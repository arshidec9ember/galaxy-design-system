<markdown>
# Filter

The Filter component enables data filtering through user selection or input. It integrates various filtering elements such as lists, date pickers, selects, and inputs. Certain filters can be displayed initially via the model-value property. Additionally, setting the fixed property on filters prevents them from being closed.

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

const filterList = [
  {
    field: 'gender',
    label: 'Gender',
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
        actions: ['apply', 'cancel']
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
            label: item.firstName.toUpperCase(),
            value: item.firstName
          }
        }),
        actions: ['apply', 'cancel']
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
        actions: ['apply', 'cancel']
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
        actions: ['apply', 'cancel']
      }
    }
  },
  {
    field: 'date.created',
    label: 'Date',
    selectors: {
      'by-date': {
        format: 'dd-MMM-yyyy',
        type: 'daterange'
      }
    }
  }
]

export default defineComponent({
  setup () {
    const filters = ref({})

    return {
      filterList,
      filters
    }
  }
})
</script>
