<markdown>
# Date Time Selector

Date Time Selector can be used to filter data based on date and time. The Date Time Selector can be of type date, daterange, and datetimerange.
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
    field: 'birthday',
    label: 'Birthday',
    selectors: {
      'by-date': {
        format: 'dd-MMM-yyyy',
        type: 'daterange',
        showShortcuts: true,
        shortcuts: undefined
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
