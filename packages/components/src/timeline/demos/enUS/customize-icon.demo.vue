<markdown>
# Customize icon
</markdown>

<template>
  <z-timeline>
    <z-timeline-item color="grey" content="Oops">
      <template #icon>
        <z-icon>
          <NeutralIcon />
        </z-icon>
      </template>
    </z-timeline-item>
    <z-timeline-item
      color="success"
      title="Success"
      content="success content"
      time="2018-04-03 20:46"
    >
      <template #icon>
        <z-icon>
          <SuccessIcon />
        </z-icon>
      </template>
    </z-timeline-item>
    <z-timeline-item
      color="error"
      content="error content"
      time="2018-04-03 20:46"
    >
      <template #icon>
        <z-icon>
          <ErrorIcon />
        </z-icon>
      </template>
    </z-timeline-item>
    <z-timeline-item
      color="warning"
      title="Warning"
      content="warning content"
      time="2018-04-03 20:46"
    >
      <template #icon>
        <z-icon>
          <WarningIcon />
        </z-icon>
      </template>
    </z-timeline-item>
    <z-timeline-item
      color="info"
      title="Info"
      content="info content"
      time="2018-04-03 20:46"
    >
      <template #icon>
        <z-icon>
          <InfoIcon />
        </z-icon>
      </template>
    </z-timeline-item>
  </z-timeline>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  CheckCircleOutline as SuccessIcon,
  WarningAmber as WarningIcon,
  ErrorOutline as ErrorIcon,
  InfoFilledCircle as InfoIcon,
  AccessTime as NeutralIcon
} from '@zeta/icons'
export default defineComponent({
  components: {
    SuccessIcon,
    WarningIcon,
    ErrorIcon,
    InfoIcon,
    NeutralIcon
  }
})
</script>
