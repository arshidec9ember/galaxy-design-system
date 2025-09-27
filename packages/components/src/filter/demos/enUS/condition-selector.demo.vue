<markdown>
# Conditional Selector

A condition selector is used to select elements based on a specific condition. It provides a way to filter elements based on a given condition.
</markdown>

<template>
  <z-space vertical>
    <z-filter v-model="filters" v-model:data="data" :filters="filterList" />
    <z-data-table :data="data" :columns="columns" />
    <z-code language="js" word-wrap :code="JSON.stringify(filters, null, 2)" />
  </z-space>
</template>

<script lang="ts">
import { defineComponent, h, ref } from 'vue'
import { faker } from '@faker-js/faker'
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
    field: 'firstName',
    label: 'First Name',
    selectors: {
      'by-condition': {
        type: 'text'
      }
    }
  },
  {
    field: 'lastName',
    label: 'Last Name',
    selectors: {
      'by-condition': {
        type: 'text'
      }
    }
  },
  {
    field: 'number',
    label: 'Number Conditions',
    selectors: {
      'by-condition': {
        type: 'number'
      }
    }
  },
  {
    field: 'email',
    label: 'Email',
    selectors: {
      'by-condition': {
        type: 'text',
        caseSensitive: true
      }
    }
  }
]

export default defineComponent({
  setup () {
    const filters = ref({})

    return {
      filterList,
      filters,
      data,
      columns: [
        {
          key: 'avatar',
          title: 'Avatar',
          width: '50px',
          render: (rowData: any) => {
            return h('img', {
              src: rowData.avatar,
              style: {
                width: '32px',
                height: '32px',
                borderRadius: '50%'
              }
            })
          }
        },
        {
          key: 'firstName',
          title: 'First Name'
        },
        {
          key: 'lastName',
          title: 'Last Name'
        },
        {
          key: 'gender',
          title: 'Gender'
        },
        {
          key: 'email',
          title: 'Email'
        },
        {
          key: 'subscriptionTier',
          title: 'Subscription Tier'
        },
        {
          key: 'birthday',
          title: 'Birthday'
        }
      ]
    }
  }
})
</script>
