<markdown>
  # Placement
  You can change the placement Dynamically also
  </markdown>

<template>
  <z-notification-provider :placement="placement">
    <placement-buttons @placement-change="handlePlacementChange" />
  </z-notification-provider>
</template>

<script lang="ts">
import { defineComponent, h, ref, PropType } from 'vue'
import {
  useNotification,
  ZButton,
  ZSpace,
  NotificationPlacement
} from '@zeta-gds/components'

const PlacementButtons = defineComponent({
  props: {
    onPlacementChange: Function as PropType<
      (placement: NotificationPlacement) => void
    >
  },
  setup () {
    const notification = useNotification()
    const placementList = [
      { placement: 'top-left', text: 'Toast' },
      { placement: 'top-right', text: 'Toast' },
      { placement: 'bottom-left', text: 'Toast' },
      { placement: 'bottom-right', text: 'Toast' },
      { placement: 'bottom', text: 'Toast' },
      { placement: 'top', text: 'Toast' }
    ] as const
    return {
      notification,
      placementList
    }
  },
  render () {
    return h(ZSpace, null, {
      default: () =>
        this.placementList.map((item) =>
          h(
            ZButton,
            {
              onClick: () => {
                this.onPlacementChange?.(item.placement)
                this.notification.info({
                  title: item.text,
                  duration: 6000,
                  content: 'You can change the placement'
                })
              }
            },
            { default: () => item.placement }
          )
        )
    })
  }
})

export default defineComponent({
  components: {
    PlacementButtons
  },
  setup () {
    const placementRef = ref<NotificationPlacement>('bottom-right')
    return {
      placement: placementRef,
      handlePlacementChange (val: NotificationPlacement) {
        placementRef.value = val
      }
    }
  }
})
</script>
