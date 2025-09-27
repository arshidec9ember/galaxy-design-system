<markdown>
# Basic

Facade provides the following slots to customize.
</markdown>

<template>
  <z-space> <z-switch v-model="showIntended" /> Show indented </z-space>
  <br>
  <z-row>
    <z-col :span="12">
      <z-checkbox v-model="avatar">
        Avatar
      </z-checkbox>
    </z-col>
    <z-col :span="12">
      <z-checkbox v-model="action">
        Action
      </z-checkbox>
    </z-col>
  </z-row>
  <z-row>
    <z-col :span="12">
      <z-checkbox v-model="header">
        Header
      </z-checkbox>
    </z-col>
    <z-col :span="12">
      <z-checkbox v-model="headerEnd">
        Header End
      </z-checkbox>
    </z-col>
  </z-row>
  <z-row>
    <z-col :span="12">
      <z-checkbox v-model="description">
        Description
      </z-checkbox>
    </z-col>
    <z-col :span="12">
      <z-checkbox v-model="footer">
        Footer
      </z-checkbox>
    </z-col>
  </z-row>
  <z-divider />
  <z-facade :content-indented="showIntended">
    <template v-if="avatar" #avatar>
      <z-avatar>
        <z-icon>
          <cash-icon />
        </z-icon>
      </z-avatar>
    </template>
    <template v-if="header" #header>
      Money
    </template>
    <template v-if="headerEnd" #header-end>
      <z-button circle size="small">
        <template #icon>
          <cash-icon />
        </template>
      </z-button>
    </template>
    <template v-if="description" #description>
      Description
    </template>
    Money is any item or verifiable record that is generally accepted as payment
    for goods and services and repayment of debts, such as taxes, in a
    particular country or socio-economic context.
    <template v-if="footer" #footer>
      Footer
    </template>
    <template v-if="action" #action>
      <z-space>
        <z-button size="small">
          <template #icon>
            <z-icon>
              <cash-icon />
            </z-icon>
          </template>
          1$
        </z-button>
        <z-button size="small">
          <template #icon>
            <z-icon>
              <cash-icon />
            </z-icon>
          </template>
          10$
        </z-button>
        <z-button size="small">
          <template #icon>
            <z-icon>
              <cash-icon />
            </z-icon>
          </template>
          100$
        </z-button>
      </z-space>
    </template>
  </z-facade>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { CashOutline as CashIcon } from '@vicons/ionicons5'

export default defineComponent({
  components: {
    CashIcon
  },
  setup () {
    return {
      avatar: ref(true),
      header: ref(true),
      headerEnd: ref(true),
      description: ref(true),
      footer: ref(true),
      action: ref(true),
      showIntended: ref(true)
    }
  }
})
</script>
