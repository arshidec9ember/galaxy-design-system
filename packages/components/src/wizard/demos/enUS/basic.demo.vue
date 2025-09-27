<markdown>
# Horizontal Wizard
</markdown>

<template>
  <z-space vertical>
    <z-stepper :current="current" :status="currentStatus">
      <z-step
        title="Personal Details"
        description="details regarding your personal information"
      />
      <z-step
        title="Contact Details"
        description="details regarding your contact information"
      />
      <z-step
        title="Other Details"
        description="details regarding your other information"
      />
      <z-step
        title="Payment Details"
        description="details regarding your payment information"
      />
    </z-stepper>
    <z-facade v-if="current === 1" style="text-align: center">
      <header>Step 1</header>
      <p>Step # 1 content</p>
    </z-facade>
    <z-facade v-if="current === 2" style="text-align: center">
      <header>Step 2</header>
      <p>Step # 2 content</p>
    </z-facade>
    <z-facade v-if="current === 3" style="text-align: center">
      <header>Step 3</header>

      <p>Step # 3 content</p>
    </z-facade>
    <z-facade v-if="current === 4" style="text-align: center">
      <header>Step 4</header>

      <p>Step # 4 content</p>
    </z-facade>
    <div>
      <div style="display: flex; justify-content: space-between">
        <z-button
          :disabled="isPrevDisabled()"
          color="primary"
          variant="outlined"
          @click="prev"
        >
          <z-icon> <md-arrow-round-back /> </z-icon> Prev
        </z-button>
        <z-button
          :disabled="isNextDisabled()"
          color="primary"
          variant="filled"
          @click="next"
        >
          Next
          <z-icon> <md-arrow-round-forward /> </z-icon>
        </z-button>
      </div>
    </div>
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
        else if (currentRef.value >= 4) currentRef.value = null
        else currentRef.value++
      },
      prev () {
        if (currentRef.value === 0) currentRef.value = null
        else if (currentRef.value === null) currentRef.value = 4
        else currentRef.value--
      },
      isPrevDisabled () {
        return currentRef.value === 1
      },
      isNextDisabled () {
        return currentRef.value === 4
      }
    }
  }
})
</script>
