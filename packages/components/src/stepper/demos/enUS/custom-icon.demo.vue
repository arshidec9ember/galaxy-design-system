<markdown>
# Customizing icon

`'finish'` and `'error'` states icon or index icon can be customized.
</markdown>

<template>
  <z-space vertical>
    <z-stepper :current="current" :status="currentStatus">
      <template #finish-icon>
        <z-icon>
          <md-happy />
        </z-icon>
      </template>
      <template #error-icon>
        <z-icon>
          <md-sad />
        </z-icon>
      </template>
      <z-step title="I Me Mine" />
      <z-step title="Let It Be" />
      <z-step title="Come Together" />
      <z-step title="Something">
        <template #icon>
          <z-icon>
            <md-cafe />
          </z-icon>
        </template>
      </z-step>
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
      <z-radio-group v-model="currentStatus" size="medium" name="basic">
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
import {
  MdArrowRoundBack,
  MdArrowRoundForward,
  MdHappy,
  MdSad,
  MdCafe
} from '@vicons/ionicons4'
import { StepperProps } from '@zeta-gds/components'

export default defineComponent({
  components: {
    MdArrowRoundBack,
    MdArrowRoundForward,
    MdHappy,
    MdSad,
    MdCafe
  },
  setup () {
    const currentRef = ref<number | null>(1)
    return {
      currentStatus: ref<StepperProps['status']>('finish'),
      current: currentRef,
      next () {
        if (currentRef.value === null) currentRef.value = 1
        else if (currentRef.value >= 4) currentRef.value = null
        else currentRef.value++
      },
      prev () {
        if (currentRef.value === 0) currentRef.value = null
        else if (currentRef.value === null) currentRef.value = 4
        else currentRef.value--
      }
    }
  }
})
</script>
