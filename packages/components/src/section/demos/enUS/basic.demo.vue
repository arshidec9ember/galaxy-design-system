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
          Header Border Bottom
        </z-checkbox>
      </z-col>
      <z-col :span="12">
        <z-checkbox v-model="transparentBg">
          Transparent Header Background
        </z-checkbox>
      </z-col>
    </z-row>
    <z-row>
      <z-col :span="12">
        <z-checkbox v-model="borderTop">
          Footer Border Top
        </z-checkbox>
      </z-col>
    </z-row>
    <z-row>
      <z-radio-group v-model="justify">
        <z-space>
          <z-text>Footer Action Placement: </z-text>
          <z-radio value="start" label="Start" />
          <z-radio value="center" label="Center" />
          <z-radio value="end" label="End" />
        </z-space>
      </z-radio-group>
    </z-row>
    <z-divider />
    <z-layout style="border: 1px solid #d4d7e6">
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
          <div style="display: flex; flex: 1; flex-direction: column">
            <z-title variant="2-sb" lass="header-title">
              Add Financial Institue(s)
              <z-tag v-if="badge" style="margin-left: 8px" color="success">
                Yes It Is
              </z-tag>
            </z-title>
            <z-space v-if="description">
              <z-p variant="1-r" class="header-description">
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
      <z-layout-content
        :content-style="{
          height: '100px'
        }"
      />
      <z-layout-footer class="footer" :bordered="borderTop">
        <z-space :justify="justify">
          <z-button variant="filled" color="primary">
            Primary
          </z-button>
          <z-button>Secondary</z-button>
        </z-space>
      </z-layout-footer>
    </z-layout>
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
      justify: ref('start'),
      borderTop: ref(true),
      back: ref(false),
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
.footer {
  padding: 12px 16px;
}
</style>
