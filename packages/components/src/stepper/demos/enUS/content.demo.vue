<markdown>
# Use slot in step
</markdown>

<template>
  <z-space vertical>
    <z-stepper class="content" :current="current" :status="currentStatus">
      <z-step title="I Me Mine">
        <div class="z-step-description">
          <z-button
            v-if="current === 1"
            :color="buttonType"
            size="small"
            variant="outlined"
            @click="handleButtonClick"
          >
            Next
          </z-button>
        </div>
      </z-step>
      <z-step title="Let It Be">
        <div class="z-step-description">
          <z-button
            v-if="current === 2"
            variant="outlined"
            :color="buttonType"
            size="small"
            @click="handleButtonClick"
          >
            Next
          </z-button>
        </div>
      </z-step>
      <z-step title="Come Together">
        <div class="z-step-description">
          <z-button
            v-if="current === 3"
            :color="buttonType"
            variant="outlined"
            size="small"
            @click="handleButtonClick"
          >
            Next
          </z-button>
        </div>
      </z-step>
      <z-step title="Something">
        <div class="z-step-description">
          <z-button
            v-if="current === 4"
            :color="buttonType"
            variant="outlined"
            size="small"
            @click="handleButtonClick"
          >
            Next
          </z-button>
        </div>
      </z-step>
    </z-stepper>
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
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { StepperProps } from '@zeta-gds/components'

export default defineComponent({
  setup () {
    const currentRef = ref(1)
    const currentStatusRef = ref<StepperProps['status']>('process')

    const buttonTypeRef = computed(() => {
      switch (currentStatusRef.value) {
        case 'error':
          return 'error'
        case 'finish':
          return 'success'
        default:
          return 'neutral'
      }
    })

    return {
      current: currentRef,
      currentStatus: currentStatusRef,
      handleButtonClick () {
        currentRef.value = (currentRef.value % 4) + 1
      },
      buttonType: buttonTypeRef
    }
  }
})
</script>
<style>
.content button {
  border-color: #020d4d !important;
}
.content button:hover {
  background-color: #fff !important;
  color: #fff !important;
}
.content button span {
  color: #020d4d;
}
</style>
