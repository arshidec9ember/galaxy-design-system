<markdown>
# Basic
</markdown>

<template>
  <z-space vertical>
    <z-row>
      <z-col :span="12">
        <z-checkbox v-model="back">
          Back Button
        </z-checkbox>
      </z-col>
      <z-col :span="12">
        <z-checkbox v-model="close">
          Close Button
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
        <z-checkbox v-model="badge">
          Badge
        </z-checkbox>
      </z-col>
    </z-row>
    <z-row>
      <z-col :span="12">
        <z-checkbox v-model="borderBottom">
          Border Bottom
        </z-checkbox>
      </z-col>
      <z-col :span="12">
        <z-checkbox v-model="transparentBg">
          Transparent Background
        </z-checkbox>
      </z-col>
    </z-row>
    <z-divider />
    <z-layout-header
      :class="`header header--colored ${transparentBg ? 'transparent' : ''}`"
      :bordered="borderBottom"
    >
      <div style="display: flex; gap: 8px">
        <z-button v-if="back" variant="subtle">
          <template #icon>
            <z-icon>
              <ArrowBack />
            </z-icon>
          </template>
        </z-button>
        <div class="header-center-section">
          <z-h3 class="header-title">
            Add Financial Institue(s)
            <z-tag v-if="badge" style="margin-left: 8px" color="success">
              Yes It Is
            </z-tag>
          </z-h3>
          <z-space v-if="description">
            <z-p class="header-description">
              Choose how you want to add your data and lets see what more can
              you do here heheheh
            </z-p>
          </z-space>
        </div>
        <z-button v-if="close" variant="subtle">
          <template #icon>
            <z-icon>
              <Close />
            </z-icon>
          </template>
        </z-button>
      </div>
    </z-layout-header>
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ArrowBack, Close } from '@zeta/icons'
export default defineComponent({
  components: {
    ArrowBack,
    Close
  },
  setup () {
    return {
      back: ref(true),
      close: ref(true),
      badge: ref(true),
      description: ref(true),
      borderBottom: ref(true),
      transparentBg: ref(false)
    }
  }
})
</script>

<style>
.header {
  padding: 16px;
}
.header-title,
.header-description {
  margin: 0px;
  line-height: unset;
}
.header--colored {
  background-color: #ffefdf;
}
.transparent {
  background: transparent;
}
.header-center-section {
  display: flex;
  flex: 1;
  flex-direction: column;
}
</style>
