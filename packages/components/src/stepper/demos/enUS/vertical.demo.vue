<markdown>
# Vertical
</markdown>

<template>
  <z-space vertical>
    <z-stepper vertical :current="current" :status="currentStatus">
      <z-step title="I Me Mine" />
      <z-step title="Let It Be" />
      <z-step title="Break" />
      <z-step title="Come Together" />
      <z-step title="Something" />
    </z-stepper>
    <z-space>
      <z-button-group>
        <z-button @click="prev">
          <template #icon>
            <z-icon>
              <md-arrow-round-back />
            </z-icon>
          </template>
        </z-button>
        <z-button @click="next">
          <template #icon>
            <z-icon>
              <md-arrow-round-forward />
            </z-icon>
          </template>
        </z-button>
      </z-button-group>
      <z-radio-group v-model="currentStatus" size="medium" name="vertical">
        <z-radio-button value="error">
          Error
        </z-radio-button>
        <z-radio-button value="process">
          Process
        </z-radio-button>
        <z-radio-button value="wait">
          Wait
        </z-radio-button>
        <z-radio-button value="finish">
          Finish
        </z-radio-button>
      </z-radio-group>
    </z-space>
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { MdArrowRoundBack, MdArrowRoundForward } from '@vicons/ionicons4'
import { StepperProps } from '@zeta-gds/components'

export default defineComponent({
  components: {
    MdArrowRoundBack,
    MdArrowRoundForward
  },
  setup () {
    const currentRef = ref<number | null>(1)
    return {
      currentStatus: ref<StepperProps['status']>('process'),
      current: currentRef,
      next () {
        if (currentRef.value === null) currentRef.value = 1
        else if (currentRef.value >= 5) currentRef.value = null
        else currentRef.value++
      },
      prev () {
        if (currentRef.value === 0) currentRef.value = null
        else if (currentRef.value === null) currentRef.value = 5
        else currentRef.value--
      }
    }
  }
})
</script>
