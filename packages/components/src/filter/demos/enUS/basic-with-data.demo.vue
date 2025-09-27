<markdown>
# Filter with data

</markdown>

<template>
  <z-space vertical>
    <z-filter v-model="filters" v-model:data="data" :filters="filterList" />
    <z-data-table :data="data" :columns="columns" />

    <z-text strong>
      Filter Model
    </z-text>
    <z-code language="js" word-wrap :code="JSON.stringify(filters, null, 2)" />
  </z-space>
</template>

<script lang="ts">
import { defineComponent, h, ref } from 'vue'
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
    dataFiltering: true,
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
        actions: ['apply', 'cancel']
      },
      'by-condition': {
        type: 'text',
        caseSensitive: false
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
  }
]

export default defineComponent({
  setup () {
    const filters = ref({
      email: {
        type: 'by-value',
        value: data.value.map((item) => item.email).slice(0, 2)
      }
    })

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
