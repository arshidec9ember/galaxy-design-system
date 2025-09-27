<markdown>
# Status

Tags type can be shown in different ways.
</markdown>

<template>
  <z-space>
    <z-tag color="success" :bordered="false">
      <template #icon>
        <z-icon><check-circle /></z-icon>
      </template>
      Active
    </z-tag>
    <z-tag
      :color="{
        color: 'var(--gds-color-bg-neutral-dark1)',
        textColor: '#020D4D'
      }"
      :bordered="false"
    >
      <template #icon>
        <z-icon color="var(--gds-color-icon-success)">
          <check-circle />
        </z-icon>
      </template>
      Active
    </z-tag>
    <z-tag
      :color="{ color: 'transparent', textColor: '#020D4D' }"
      :bordered="false"
    >
      <template #icon>
        <z-icon color="var(--gds-color-icon-success)">
          <check-circle />
        </z-icon>
      </template>
      Active
    </z-tag>
    <z-tag
      :color="{ color: 'transparent', textColor: '#020D4D' }"
      :bordered="false"
    >
      <template #icon>
        <z-icon color="var(--gds-color-icon-success)">
          <check-circle />
        </z-icon>
      </template>
    </z-tag>
    <z-tag color="warning" :bordered="false">
      <template #icon>
        <z-icon><warning /></z-icon>
      </template>
      Warning
    </z-tag>
    <z-tag
      :color="{ color: 'transparent', textColor: '#020D4D' }"
      :bordered="false"
    >
      <template #icon>
        <z-icon color="var(--gds-color-icon-warning)">
          <warning />
        </z-icon>
      </template>
      Warning
    </z-tag>
    <z-tag color="error" :bordered="false">
      <template #icon>
        <z-icon><dangerous /></z-icon>
      </template>
      Inactive
    </z-tag>
    <z-tag
      :color="{ color: 'transparent', textColor: '#020D4D' }"
      :bordered="false"
    >
      <template #icon>
        <z-icon color="var(--gds-color-icon-danger)">
          <dangerous />
        </z-icon>
      </template>
      Inactive
    </z-tag>
    <z-tag color="info" :bordered="false">
      <template #icon>
        <z-icon><info-filled-circle /></z-icon>
      </template>
      Info
    </z-tag>
    <z-tag
      :color="{ color: 'transparent', textColor: '#020D4D' }"
      :bordered="false"
    >
      <template #icon>
        <z-icon color="var(--gds-color-icon-info)">
          <info-filled-circle />
        </z-icon>
      </template>
      Info
    </z-tag>
  </z-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { CheckCircle, Warning, Dangerous, InfoFilledCircle } from '@zeta/icons'

export default defineComponent({
  components: {
    CheckCircle,
    Dangerous,
    InfoFilledCircle,
    Warning
  }
})
</script>
