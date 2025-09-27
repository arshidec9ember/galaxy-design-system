<markdown>
# Tabs placement
</markdown>

<template>
  <z-space vertical>
    <z-radio-group v-model="placement">
      <z-space>
        <z-radio label="top" value="top" />
        <z-radio label="bottom" value="bottom" />
        <z-radio label="left" value="left" />
        <z-radio label="right" value="right" />
      </z-space>
    </z-radio-group>
    <z-radio-group v-model="type">
      <z-space>
        <z-radio label="card" value="card" />
        <z-radio label="bar" value="bar" />
        <z-radio label="line" value="line" />
      </z-space>
    </z-radio-group>
    <z-tabs
      :key="type + placement"
      :variant="type"
      animated
      :placement="placement"
      :style="
        placement === 'left' || placement === 'right'
          ? { height: '240px' }
          : undefined
      "
    >
      <z-tab-pane name="home" tab="Home">
        Home Content
      </z-tab-pane>
      <z-tab-pane name="profile" tab="Profile" disabled>
        Profile Content
      </z-tab-pane>
      <z-tab-pane name="settings" tab="Settings">
        Settings Content
      </z-tab-pane>
      <z-tab-pane name="products" tab="Products">
        Products Content
      </z-tab-pane>
      <z-tab-pane name="services" tab="Services">
        Services Content
      </z-tab-pane>
      <z-tab-pane name="gallery" tab="Gallery">
        Gallery Content
      </z-tab-pane>
      <z-tab-pane name="about" tab="About">
        About Content
      </z-tab-pane>
      <z-tab-pane name="contact" tab="Contact">
        Contact Content
      </z-tab-pane>
      <z-tab-pane name="faq" tab="FAQ">
        FAQ Content
      </z-tab-pane>
      <z-tab-pane name="news" tab="News">
        News Content
      </z-tab-pane>
      <z-tab-pane name="offers" tab="Offers">
        Offers Content
      </z-tab-pane>
      <z-tab-pane name="events" tab="Events">
        Events Content
      </z-tab-pane>
      <z-tab-pane name="testimonials" tab="Testimonials">
        Testimonials Content
      </z-tab-pane>
      <z-tab-pane name="reviews" tab="Reviews">
        Reviews Content
      </z-tab-pane>
    </z-tabs>
  </z-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { TabsProps } from '@zeta-gds/components'

const placement = ref<NonNullable<TabsProps['placement']>>('left')
const type = ref<TabsProps['type']>('line')
</script>
