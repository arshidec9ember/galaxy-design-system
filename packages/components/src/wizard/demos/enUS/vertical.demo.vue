<markdown>
# Vertical Wizard
</markdown>

<template>
  <z-layout class="z-wizard">
    <z-layout-header bordered>
      <div class="z-wizard__header">
        <z-breadcrumb class="z-wizard__breadcrumbs" separator=">">
          <z-breadcrumb-item>
            <z-text variant="body-s" color="text-secondary">
              Home
            </z-text>
          </z-breadcrumb-item>
          <z-breadcrumb-item>
            <z-text variant="body-s" color="text-secondary">
              Level 1
            </z-text>
          </z-breadcrumb-item>
        </z-breadcrumb>
        <z-title variant="2-sb" class="z-wizard__header-title">
          Create Chart of Accounts
        </z-title>
      </div>
    </z-layout-header>
    <z-layout-content>
      <z-layout has-sider class="example-layout">
        <z-layout-sider content-style="padding: 24px;">
          <z-stepper
            :current="current"
            :status="currentStatus"
            vertical
            size="medium"
          >
            <z-step
              v-for="step in stepContent"
              :key="step.title"
              :title="step.title"
            />
          </z-stepper>
        </z-layout-sider>
        <z-layout>
          <z-form
            v-if="current === 1"
            ref="formRef"
            :model="formValue"
            :rules="rules"
            :validate-messages="messages"
            :on-submit="handleSubmit"
          >
            <z-layout class="z-wizard__content">
              <z-layout-header class="z-wizard__content-header">
                <z-h2>
                  {{ currentStepTitle }}
                </z-h2>
                <z-text>{{ currentStepDescription }}</z-text>
              </z-layout-header>
              <z-layout-content class="z-wizard__content-fields">
                <z-form-item label="First Name" path="user.firstName">
                  <z-input
                    v-model="formValue.user.firstName"
                    placeholder="Input Name"
                  />
                </z-form-item>
                <z-form-item label="Last Name" path="user.lastName">
                  <z-input
                    v-model="formValue.user.lastName"
                    placeholder="Input Name"
                  />
                </z-form-item>
              </z-layout-content>
            </z-layout>
            <z-layout-footer bordered class="z-wizard__footer">
              <z-form-item>
                <z-space style="gap: 8px">
                  <z-button
                    :disabled="isNextDisabled"
                    color="primary"
                    variant="filled"
                    type="submit"
                  >
                    {{ !isNextDisabled ? 'Next' : 'Done' }}
                  </z-button>
                  <z-button
                    :disabled="isPrevDisabled"
                    variant="outlined"
                    @click="prev"
                  >
                    Previous
                  </z-button>
                  <z-button
                    :disabled="isPrevDisabled"
                    variant="subtle"
                    @click="reset"
                  >
                    Cancel
                  </z-button>
                </z-space>
              </z-form-item>
            </z-layout-footer>
          </z-form>
          <z-form
            v-else-if="current === 2"
            ref="formRef"
            :model="formValue"
            :rules="rules"
            :validate-messages="messages"
            :on-submit="handleSubmit"
          >
            <z-layout class="z-wizard__content">
              <z-layout-header class="z-wizard__content-header">
                <z-h2>
                  {{ currentStepTitle }}
                </z-h2>
                <z-text>{{ currentStepDescription }}</z-text>
              </z-layout-header>
              <z-layout-content class="z-wizard__content-fields">
                <z-form-item label="Phone" path="contact.phone">
                  <z-input
                    v-model="formValue.contact.phone"
                    placeholder="Phone Number"
                  />
                </z-form-item>
                <z-form-item label="Email" path="contact.email">
                  <z-input
                    v-model="formValue.contact.email"
                    placeholder="Email Address"
                  />
                </z-form-item>
                <z-form-item label="Address" path="contact.address">
                  <z-input
                    v-model="formValue.contact.address"
                    placeholder="Address"
                  />
                </z-form-item>
                <z-form-item label="City" path="contact.city">
                  <z-input
                    v-model="formValue.contact.city"
                    placeholder="City"
                  />
                </z-form-item>
                <z-form-item label="State" path="contact.state">
                  <z-input
                    v-model="formValue.contact.state"
                    placeholder="State"
                  />
                </z-form-item>
                <z-form-item label="Zip" path="contact.zip">
                  <z-input v-model="formValue.contact.zip" placeholder="Zip" />
                </z-form-item>
              </z-layout-content>
            </z-layout>
            <z-layout-footer bordered class="z-wizard__footer">
              <z-form-item>
                <z-space style="gap: 8px">
                  <z-button
                    :disabled="isNextDisabled"
                    color="primary"
                    variant="filled"
                    type="submit"
                  >
                    {{ !isNextDisabled ? 'Next' : 'Done' }}
                  </z-button>
                  <z-button
                    :disabled="isPrevDisabled"
                    variant="outlined"
                    @click="prev"
                  >
                    Previous
                  </z-button>
                  <z-button
                    :disabled="isPrevDisabled"
                    variant="subtle"
                    @click="reset"
                  >
                    Cancel
                  </z-button>
                </z-space>
              </z-form-item>
            </z-layout-footer>
          </z-form>
          <z-form
            v-else-if="current === 3"
            ref="formRef"
            :model="formValue"
            :rules="rules"
            :validate-messages="messages"
            :on-submit="handleSubmit"
          >
            <z-layout class="z-wizard__content">
              <z-layout-header class="z-wizard__content-header">
                <z-h2>
                  {{ currentStepTitle }}
                </z-h2>
                <z-text>{{ currentStepDescription }}</z-text>
              </z-layout-header>
              <z-layout-content class="z-wizard__content-fields">
                <z-form-item label="Interests" path="additional.interests">
                  <z-input
                    v-model="formValue.additional.interests"
                    placeholder="Interests"
                  />
                </z-form-item>
                <z-form-item label="Other" path="additional.other">
                  <z-input
                    v-model="formValue.additional.other"
                    placeholder="Other"
                  />
                </z-form-item>
              </z-layout-content>
            </z-layout>
            <z-layout-footer bordered class="z-wizard__footer">
              <z-form-item>
                <z-space style="gap: 8px">
                  <z-button
                    :disabled="isNextDisabled"
                    color="primary"
                    variant="filled"
                    type="submit"
                  >
                    {{ !isNextDisabled ? 'Next' : 'Done' }}
                  </z-button>
                  <z-button
                    :disabled="isPrevDisabled"
                    variant="outlined"
                    @click="prev"
                  >
                    Previous
                  </z-button>
                  <z-button
                    :disabled="isPrevDisabled"
                    variant="subtle"
                    @click="reset"
                  >
                    Cancel
                  </z-button>
                </z-space>
              </z-form-item>
            </z-layout-footer>
          </z-form>
          <z-form
            v-else-if="current === 4"
            ref="formRef"
            :model="formValue"
            :rules="rules"
            :validate-messages="messages"
            :on-submit="handleSubmit"
          >
            <z-layout class="z-wizard__content">
              <z-layout-header class="z-wizard__content-header">
                <z-h2>
                  {{ currentStepTitle }}
                </z-h2>
                <z-text>{{ currentStepDescription }}</z-text>
              </z-layout-header>
              <z-layout-content class="z-wizard__content-fields">
                <z-form-item label="Payment Mode" path="payment.paymentMode">
                  <z-input
                    v-model="formValue.payment.paymentMode"
                    placeholder="Payment Mode"
                  />
                </z-form-item>
                <z-form-item label="Bank Details" path="payment.bankDetails">
                  <z-input
                    v-model="formValue.payment.bankDetails"
                    placeholder="Bank Details"
                  />
                </z-form-item>
              </z-layout-content>
            </z-layout>
            <z-layout-footer bordered class="z-wizard__footer">
              <z-form-item>
                <z-space style="gap: 8px">
                  <z-button
                    :disabled="isNextDisabled"
                    color="primary"
                    variant="filled"
                    type="submit"
                  >
                    {{ !isNextDisabled ? 'Next' : 'Done' }}
                  </z-button>
                  <z-button
                    :disabled="isPrevDisabled"
                    variant="outlined"
                    @click="prev"
                  >
                    Previous
                  </z-button>
                  <z-button
                    :disabled="isPrevDisabled"
                    variant="subtle"
                    @click="reset"
                  >
                    Cancel
                  </z-button>
                </z-space>
              </z-form-item>
            </z-layout-footer>
          </z-form>
          <z-result
            v-else
            class="z-wizard__content"
            style="margin-top: 40px"
            variant="icon"
            status="200"
            title="success"
            description="Some of the doors are always close to you."
          >
            <template #actions>
              <z-button color="primary" variant="filled" @click="reset">
                Start Again
              </z-button>
            </template>
          </z-result>
        </z-layout>
      </z-layout>
    </z-layout-content>
  </z-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { StepperProps, FormInst, useMessage } from '@zeta-gds/components'

const currentRef = ref<number | null>(1)
const current = currentRef
const formRef = ref<FormInst | null>(null)
const message = useMessage()
const currentStatus = ref<StepperProps['status']>('process')
const initialFormValue = {
  user: {
    firstName: '',
    lastName: ''
  },
  contact: {
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  },
  additional: {
    interests: '',
    other: ''
  },
  payment: {
    paymentMode: '',
    bankDetails: ''
  }
}
const deferencedInitialFormValue = JSON.parse(JSON.stringify(initialFormValue))
const formValue = ref(initialFormValue)

function next () {
  if (currentRef.value === null) currentRef.value = 1
  else if (currentRef.value > 4) currentRef.value = null
  else currentRef.value++
}

function prev () {
  if (currentRef.value === 0) currentRef.value = null
  else if (currentRef.value === null) currentRef.value = 4
  else currentRef.value--
}

function reset () {
  currentRef.value = null
  formValue.value = deferencedInitialFormValue
  currentStatus.value = 'process'
  currentRef.value = 1
}

const messages = {
  required: '%s is required'
}

const rules = {
  user: {
    firstName: {
      required: true,
      message: 'First Name is required',
      trigger: 'blur'
    },
    lastName: {
      required: true,
      message: 'Last Name is required',
      trigger: 'blur'
    }
  },
  contact: {
    phone: {
      required: true,
      message: 'Phone is required',
      trigger: 'blur'
    },
    email: {
      required: true,
      message: 'Email is required',
      trigger: 'blur'
    },
    address: {
      required: true,
      message: 'Address is required',
      trigger: 'blur'
    },
    city: {
      required: true,
      message: 'City is required',
      trigger: 'blur'
    },
    state: {
      required: true,
      message: 'State is required',
      trigger: 'blur'
    },
    zip: {
      required: true,
      message: 'Zip is required',
      trigger: 'blur'
    }
  },
  additional: {
    interests: {
      required: true,
      message: 'Interests is required',
      trigger: 'blur'
    },
    other: {
      required: true,
      message: 'Other is required',
      trigger: 'blur'
    }
  },
  payment: {
    paymentMode: {
      required: true,
      message: 'Payment Mode is required',
      trigger: 'blur'
    },
    bankDetails: {
      required: true,
      message: 'Bank Details is required',
      trigger: 'blur'
    }
  }
}

function handleSubmit (e: MouseEvent) {
  e.preventDefault()

  formRef.value?.validate((errors: any) => {
    if (!errors) {
      next()
      message.success('Valid')
    } else {
      message.error('Invalid')
    }
  })
}

const isPrevDisabled = computed(() => currentRef.value === 1)

const isNextDisabled = computed(() => {
  return undefined
  // return currentRef.value === 4
})

const currentStepTitle = computed(
  () => stepContent[currentRef.value - 1]?.title
)
const currentStepDescription = computed(
  () => stepContent[currentRef.value - 1]?.description
)

const stepContent = [
  {
    title: 'Personal Information',
    description:
      'This section contains comprehensive details about your individual attributes, such as name, date of birth, and any pertinent identifiers.'
  },
  {
    title: 'Contact Information',
    description:
      'In this section, you can find information crucial for communication purposes, including your phone number, email address, and physical address.'
  },
  {
    title: 'Additional Information',
    description:
      "Here, you'll discover supplementary details that provide a more comprehensive picture of you, such as interests, affiliations, or other noteworthy information."
  },
  {
    title: 'Payment Information',
    description:
      'This section pertains to specifics about your payment-related data, such as payment methods, banking details, and transaction history.'
  }
]
</script>

<style>
.z-wizard {
  border: 1px solid #dbdbdb;
}
.z-wizard__header {
  padding: var(--gds-space-4) var(--gds-space-5);
  display: flex;
  flex-direction: column;
  gap: var(--gds-space-2);
  background-color: var(--gds-color-bg-base);
  border-bottom: 1px solid var(--gds-color-border-neutral);
}
.z-wizard__breadcrumbs {
  margin-bottom: var(--gds-space-2);
}
.z-wizard__header-title {
  margin: 0;
}
.z-wizard__header-description {
  margin: 0;
  color: var(--gds-color-text-secondary);
}
.z-wizard__content {
  padding: var(--gds-space-4) var(--gds-space-6);
}
.z-wizard__content-fields {
  max-width: 400px;
  padding-right: var(--gds-space-6);
}
.z-wizard__footer {
  padding-left: var(--gds-space-6);
}
</style>
