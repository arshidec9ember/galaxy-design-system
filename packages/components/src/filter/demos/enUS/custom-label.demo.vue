<markdown>
# Custom Label

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
import { ZAvatar, ZEllipsis } from '@zeta-gds/components'

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
    label: 'User',
    selectors: {
      'by-value': {
        multiple: true,
        searchable: true,
        options: data.value.map((item) => {
          return {
            label: item.firstName,
            data: item,
            value: item.firstName
          }
        }),
        renderLabel: (item: any) => {
          return h(
            'div',
            {
              style: {
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginLeft: '2px'
              }
            },
            [
              h(ZAvatar, {
                src: item.data.avatar,
                round: true,
                size: 'small'
              }),
              h(
                ZEllipsis,
                {
                  style: {
                    maxWidth: '120px'
                  }
                },
                item.data.firstName + ' ' + item.data.lastName
              )
            ]
          )
        },
        actions: ['apply', 'cancel', 'reset']
      }
    }
  }
  // {
  //   field: 'lastName',
  //   label: 'Last Name',
  //   selectors: {
  //     'by-value': {
  //       multiple: true,
  //       searchable: true,
  //       options: data.value.map((item) => {
  //         return {
  //           label: item.lastName,
  //           value: item.lastName
  //         }
  //       }),
  //       value: data.value.map((item) => item.lastName).slice(0, 2),
  //       actions: ['apply', 'cancel', 'reset']
  //     }
  //   }
  // },
  // {
  //   field: 'email',
  //   label: 'Email',
  //   selectors: {
  //     'by-value': {
  //       multiple: true,
  //       searchable: true,
  //       options: data.value.map((item) => {
  //         return {
  //           label: item.email,
  //           value: item.email
  //         }
  //       }),
  //       value: data.value.map((item) => item.email).slice(0, 2),
  //       actions: ['apply', 'cancel', 'reset']
  //     }
  //   }
  // }
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
