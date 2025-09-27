<markdown>
  # Topbar

  A basic topbar header with search bar.
</markdown>

<template>
  <z-page-header class="example-border">
    <template #title>
      <z-space align="center">
        <z-text strong tag="h4">
          Postings
        </z-text>
        <z-input type="text" placeholder="Search">
          <template #prefix>
            <z-icon size="large" :component="Search" />
          </template>
        </z-input>
      </z-space>
    </template>
    <template #actions>
      <z-space align="center">
        View By:
        <z-radio-group v-model="viewType">
          <z-radio-button v-for="view in tabs" :key="view" :value="view">
            {{ view }}
          </z-radio-button>
        </z-radio-group>
        <z-divider vertical />
        <z-link class="link" href="https://google.com/">
          View Posting Summary
        </z-link>
      </z-space>
    </template>
  </z-page-header>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Search } from '@zeta/icons'

const viewType = ref('transactions')
const tabs = ['transactions', 'postings']
</script>

<style>
.link {
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
}
.example-border {
  border: 1px solid rgba(212, 215, 230, 1);
  border-radius: 5px;
}
</style>
