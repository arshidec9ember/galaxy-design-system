<markdown>
# Dropdown

It is possible to pass a custom template when you want to customize the item link to be, for example a `dropdown` or a `router-link`.
</markdown>

<template>
  <z-breadcrumb>
    <z-breadcrumb-item>
      <z-dropdown :options="options1">
        <div class="trigger">
          Home
        </div>
      </z-dropdown>
    </z-breadcrumb-item>
    <z-breadcrumb-item>
      <z-dropdown :options="options2">
        <div class="trigger">
          Product
        </div>
      </z-dropdown>
    </z-breadcrumb-item>
  </z-breadcrumb>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {
      options1: [
        {
          label: 'breadcrumb',
          key: 1
        },
        {
          label: 'dropdown',
          key: 2
        }
      ],
      options2: [
        {
          label: 'breadcrumb',
          key: 1
        },
        {
          label: 'dropdown',
          key: 2
        }
      ]
    }
  }
})
</script>

<style>
.trigger::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  border-radius: inherit;
}
</style>
