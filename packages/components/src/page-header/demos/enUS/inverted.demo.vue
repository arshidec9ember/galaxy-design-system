<markdown>
# Inverted

Add an inverted mode to the page banner.
</markdown>

<template>
  <z-page-header
    description="Tree view of the names of the Accounts (Ledgers and Groups) "
    class="page-banner-inverted"
    inverted
    @back="handleBack"
  >
    <template #background>
      <img
        role="presentation"
        src="https://www.zeta.tech/wp-content/uploads/sites/3/2022/12/fusion-backoffice-in-fusion-backoffice-banner-right-illustration2.webp"
      >
    </template>
    <template #title>
      Chart of Accounts
      <z-tag color="primary" class="header-title-tag">
        Active
      </z-tag>
    </template>
    <template #navigation>
      Back
    </template>
    <template #avatar>
      <z-avatar
        src="https://cdnimg103.lizhi.fm/user/2017/02/04/2583325032200238082_160x160.jpg"
      />
    </template>
    <template #footer>
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
    Chart of Accounts is a tree view of the names of the Accounts (Ledgers and
    Groups) that a Company requires to manage its books of accounts.
  </z-page-header>
</template>

<script lang="ts" setup>
import { useMessage } from '@zeta-gds/components'
import { ref } from 'vue'
const message = useMessage()

const handleBack = () => {
  message.info('[onBack]')
}

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
.page-banner-inverted {
  padding: 64px 146px;
}
.header-title-tag {
  margin-left: 8px;
  background-color: white;
}
</style>
