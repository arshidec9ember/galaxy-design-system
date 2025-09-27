<markdown>
# Slots

Add content in different slots to customize the page banner.
</markdown>

<template>
  <z-row>
    <z-col :span="12">
      <z-checkbox v-model="avatar">
        Avatar
      </z-checkbox>
    </z-col>
    <z-col :span="12">
      <z-checkbox v-model="background">
        Background
      </z-checkbox>
    </z-col>
  </z-row>
  <z-row>
    <z-col :span="12">
      <z-checkbox v-model="header">
        Navigation
      </z-checkbox>
    </z-col>
    <z-col :span="12">
      <z-checkbox v-model="extra">
        Actions
      </z-checkbox>
    </z-col>
  </z-row>
  <z-row>
    <z-col :span="12">
      <z-checkbox v-model="footer">
        Footer
      </z-checkbox>
    </z-col>
    <z-col :span="12">
      <z-checkbox v-model="title">
        Title
      </z-checkbox>
    </z-col>
  </z-row>
  <z-row>
    <z-col :span="12">
      <z-checkbox v-model="back">
        Back
      </z-checkbox>
    </z-col>
    <z-col :span="12">
      <z-checkbox v-model="description">
        Description
      </z-checkbox>
    </z-col>
  </z-row>
  <z-divider title-placement="left">
    Sizes
  </z-divider>
  <z-radio-group v-model="sizeModal">
    <z-radio-button
      v-for="size in ['x-small', 'small', 'medium', 'large', 'x-large']"
      :key="size"
      :value="size"
    >
      {{ size }}
    </z-radio-button>
  </z-radio-group>
  <z-divider title-placement="left">
    Radius
  </z-divider>
  <z-radio-group v-model="radiusSizeModal">
    <z-radio-button
      v-for="size in ['x-small', 'small', 'medium', 'large', 'x-large']"
      :key="size"
      :value="size"
    >
      {{ size }}
    </z-radio-button>
  </z-radio-group>
  <z-divider />
  <z-page-header
    :size="sizeModal"
    :radius="radiusSizeModal"
    :description="
      description
        ? 'Tree view of the names of the Accounts (Ledgers and Groups)'
        : undefined
    "
    class="header-x"
    @back="handleBack"
  >
    <template v-if="background" #background>
      <img
        role="presentation"
        src="https://www.zeta.tech/wp-content/uploads/sites/3/2022/12/fusion-backoffice-in-fusion-backoffice-banner-right-illustration2.webp"
      >
    </template>
    <template v-if="title" #title>
      Chart of Accounts
      <z-tag size="small" color="success" :bordered="false">
        <template #icon>
          <z-icon :component="CheckmarkCircle" />
        </template>
        Active
      </z-tag>
    </template>
    <template v-if="header" #navigation>
      <z-breadcrumb>
        <z-breadcrumb-item>Accounts</z-breadcrumb-item>
        <z-breadcrumb-item>Finances</z-breadcrumb-item>
        <z-breadcrumb-item>Finance Account</z-breadcrumb-item>
        <z-breadcrumb-item>Account chart</z-breadcrumb-item>
      </z-breadcrumb>
    </template>
    <template v-if="avatar" #avatar>
      <z-avatar
        src="https://cdnimg103.lizhi.fm/user/2017/02/04/2583325032200238082_160x160.jpg"
      />
    </template>
    <template v-if="extra" #actions>
      <z-space>
        <z-button variant="filled" color="primary">
          Refresh
        </z-button>
        <z-dropdown :options="options">
          <z-button :bordered="false" style="background: white">
            ···
          </z-button>
        </z-dropdown>
      </z-space>
    </template>
    <template v-if="footer" #footer>
      As of April 3, 2021
    </template>
  </z-page-header>
</template>

<script lang="ts" setup>
import { useMessage } from '@zeta-gds/components'
import { computed, ref } from 'vue'
import { CheckmarkCircle } from '@vicons/ionicons5'

type Size = 'x-small' | 'small' | 'medium' | 'large' | 'x-large'

const avatar = ref(false)
const header = ref(true)
const title = ref(true)
const extra = ref(false)
const footer = ref(true)
const background = ref(true)
const back = ref(false)
const description = ref(true)
const sizeModal = ref<Size>('medium')
const radiusSizeModal = ref<Size>('medium')
const message = useMessage()

const handleBack = computed(() => {
  if (!back.value) return
  return () => {
    message.info('Back')
  }
})

const options = ref([
  {
    label: 'Account Details',
    key: '1'
  },
  {
    label: 'Finance Details',
    key: '2'
  },
  {
    label: 'Profile Info',
    key: '3'
  }
])
</script>
<style>
.header-x {
  background: #ffefdf;
}

.header-title-tag {
  margin-left: 8px;
}
</style>
