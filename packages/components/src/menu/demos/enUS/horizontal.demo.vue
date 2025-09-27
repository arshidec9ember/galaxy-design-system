<markdown>
# Horizontal

A horiziontal menu.
</markdown>


<template>
  <z-space vertical>
    <z-space><z-switch v-model="inverted" />Inverted</z-space>
    <z-layout-header :inverted="inverted" class="layout-header-container">
      <z-menu
        v-model="activeKey"
        mode="horizontal"
        :options="menuOptions"
        :inverted="inverted"
      />
    </z-layout-header>
  </z-space>
</template>

<script lang="ts">
import { defineComponent, h, ref } from 'vue'
import type { MenuOption } from '@zeta-gds/components'

const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        'a',
        {
          href: 'https://en.wikipedia.org/wiki/Hear_the_Wind_Sing',
          target: '_blank',
          rel: 'noopenner noreferrer'
        },
        'Hear the Wind Sing'
      ),
    key: 'hear-the-wind-sing'
  },
  {
    label: 'Pinball 1973',
    key: 'pinball-1973',
    disabled: true,
    children: [
      {
        label: 'Rat',
        key: 'rat'
      }
    ]
  },
  {
    label: 'A Wild Sheep Chase',
    key: 'a-wild-sheep-chase',
    disabled: true
  },
  {
    label: 'Dance Dance Dance',
    key: 'Dance Dance Dance',
    children: [
      {
        label: 'Beverage',
        key: 'beverage'
      },
      {
        label: 'Food',
        key: 'food'
      },
      {
        label: 'The past increases. The future recedes.',
        key: 'the-past-increases-the-future-recedes'
      }
    ]
  }
]

export default defineComponent({
  setup () {
    return {
      inverted: ref(true),
      activeKey: ref<string | null>(null),
      menuOptions
    }
  }
})
</script>

<style>
.layout-header-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 32px;
  height: 48px;
}
</style>
