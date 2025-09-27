<markdown>
# Size
</markdown>

<template>
  <div>
    <div :style="{ marginBottom: '16px' }">
      <z-radio-group v-model="sizeModalRef" size="medium" name="size">
        <z-radio-button
          v-for="size in ['small', 'medium', 'large']"
          :key="size"
          :value="size"
        >
          {{ size }}
        </z-radio-button>
      </z-radio-group>
    </div>

    <z-space vertical>
      <z-stepper
        :size="sizeModalRef"
        :current="current"
        :status="currentStatus"
      >
        <z-step title="I Me Mine" />
        <z-step title="Let It Be" />
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
        <z-radio-group v-model="currentStatus" size="medium" name="size">
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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { MdArrowRoundBack, MdArrowRoundForward } from '@vicons/ionicons4'

export default defineComponent({
  components: {
    MdArrowRoundBack,
    MdArrowRoundForward
  },
  setup () {
    const currentRef = ref<number | null>(1)
    const sizeModalRef = ref('medium')
    return {
      currentStatus: ref('process'),
      current: currentRef,
      sizeModalRef,
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
