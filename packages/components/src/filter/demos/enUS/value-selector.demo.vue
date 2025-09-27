<markdown>
  # Value Selectors

  Value Selectors are used to filter the data based on the list of options provided. It can be single or multi-select filters. It also provides the option to search the list of options.
  </markdown>

<template>
  <z-space vertical>
    <z-filter v-model="filterModel" v-model:data="data" :filters="filters" />
    <z-data-table :data="data" :columns="columns" />
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
    desc: faker.lorem.sentence(80),
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

const filters = [
  {
    field: 'firstName',
    label: 'First Name',
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
        actions: ['apply', 'cancel']
      }
    }
  },
  {
    field: 'lastName',
    label: 'Last Name',
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
    field: 'email',
    label: 'Email',
    selectors: {
      'by-value': {
        multiple: true,
        searchable: true,
        options: data.value.map((item) => {
          return {
            label: item.email,
            value: item.email
          }
        }),
        value: data.value.map((item) => item.email).slice(0, 2),
        actions: ['apply', 'cancel']
      }
    }
  }
]

export default defineComponent({
  setup () {
    return {
      filters,
      data,
      filterModel: ref({}),
      columns: [
        {
          key: 'avatar',
          title: 'Avatar',
          width: '60px',
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
          key: 'desc',
          title: 'Description',
          ellipsis: true
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
