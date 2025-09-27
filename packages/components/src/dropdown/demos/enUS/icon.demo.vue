<markdown>
# Icon

Dropdown options can also have icons!
</markdown>

<template>
  <z-dropdown v-model:show="show" :options="options" trigger="click">
    <z-button>Actions
      <template #end>
        <z-icon
          :component="CaretDown12Filled"
          size="small"
          :style="{
            top: '-3px',
            transform: `rotate(${show ? 180 : 0}deg)`,
            transition:
              'color .3s var(--z-bezier), transform .3s var(--z-bezier)'
          }"
        />
      </template>
    </z-button>
  </z-dropdown>
</template>

<script lang="ts">
import { h, defineComponent } from 'vue'
import { CaretDown12Filled } from '@vicons/fluent'
import type { Component } from 'vue'
import { ZIcon } from '@zeta-gds/components'
import {
  PersonCircleOutline as UserIcon,
  Pencil as EditIcon,
  LogOutOutline as LogoutIcon
} from '@vicons/ionicons5'

const renderIcon = (icon: Component) => {
  return () => {
    return h(ZIcon, null, {
      default: () => h(icon)
    })
  }
}

export default defineComponent({
  setup () {
    return {
      CaretDown12Filled,
      options: [
        {
          label: 'Profile',
          key: 'profile',
          icon: renderIcon(UserIcon)
        },
        {
          label: 'Edit Profile',
          key: 'editProfile',
          icon: renderIcon(EditIcon)
        },
        {
          label: 'Logout',
          key: 'logout',
          icon: renderIcon(LogoutIcon)
        }
      ]
    }
  }
})
</script>
