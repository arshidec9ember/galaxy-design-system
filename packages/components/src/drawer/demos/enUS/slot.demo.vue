<markdown>
# Slots
</markdown>

<template>
  <z-row>
    <z-col :span="12">
      <z-checkbox v-model="title">
        Title
      </z-checkbox>
    </z-col>
    <z-col :span="12">
      <z-checkbox v-model="description">
        Description
      </z-checkbox>
    </z-col>
  </z-row>
  <z-row>
    <z-col :span="12">
      <z-checkbox v-model="headerLeft">
        Header Left
      </z-checkbox>
    </z-col>
    <z-col :span="12">
      <z-checkbox v-model="headerRight">
        Header Right
      </z-checkbox>
    </z-col>
  </z-row>
  <z-row>
    <z-col :span="12">
      <z-checkbox v-model="footer">
        Footer
      </z-checkbox>
    </z-col>
  </z-row>
  <z-button-group style="padding-top: 16px">
    <z-button @click="activate">
      Open
    </z-button>
  </z-button-group>
  <z-drawer v-model:show="active" :width="700">
    <z-drawer-content
      header-style="
      background: #FFEFDF;border-bottom: 0px"
    >
      <template v-if="headerLeft" #header-left>
        <div style="display: flex; padding-right: 16px">
          <z-button variant="text">
            <template #icon>
              <z-icon size="20">
                <log-in-icon />
              </z-icon>
            </template>
          </z-button>
        </div>
      </template>
      <template v-if="title" #title>
        Add Financial Institue(s)
        <span style="display: flex; padding-left: 12px">
          <z-tag color="success">Tag</z-tag>
        </span>
      </template>
      <template v-if="description" #description>
        Choose how you want to add your data and lets see what more can you do
        here heheheh
      </template>
      <template v-if="headerRight" #header-right>
        <div style="display: flex; align-items: center; gap: 8px">
          <z-button>Action 1</z-button>
          <z-button>Action 2</z-button>
        </div>
      </template>
      <template v-if="footer" #footer>
        <z-button color="primary" variant="filled">
          Primary
        </z-button>
      </template>
    </z-drawer-content>
  </z-drawer>
</template>

<script lang="ts">
import { LogInOutline as LogInIcon } from '@vicons/ionicons5'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: {
    LogInIcon
  },
  setup () {
    const active = ref(false)
    const activate = () => {
      active.value = true
    }
    return {
      active,
      activate,
      title: ref(true),
      description: ref(true),
      headerLeft: ref(true),
      headerRight: ref(true),
      footer: ref(true)
    }
  }
})
</script>
