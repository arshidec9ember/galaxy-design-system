<markdown>
# Basic
</markdown>

<template>
  <z-icon size="40">
    <account-tree />
  </z-icon>
  <z-icon size="40" color="#0e7a0d">
    <account-balance />
  </z-icon>
  <z-icon size="40" :component="AccessTime" />
</template>

<script lang="ts">
import { AccessTime, AccountBalance, AccountTree } from '@zeta/icons'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    AccountTree,
    AccountBalance
  },
  setup () {
    return {
      AccessTime
    }
  }
})
</script>
