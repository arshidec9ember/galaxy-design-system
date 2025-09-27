<markdown>
# Basic
</markdown>

<template>
  <z-space vertical>
    <z-row>
      <z-col :span="12">
        <z-checkbox v-model="closable">
          Closable
        </z-checkbox>
      </z-col>
      <z-col :span="12">
        <z-checkbox v-model="openInNewTab">
          Open in New Tab
        </z-checkbox>
      </z-col>
    </z-row>
    <z-row>
      <z-col :span="12">
        <z-checkbox v-model="expandable">
          Expandable
        </z-checkbox>
      </z-col>
      <z-col :span="12">
        <z-checkbox v-model="expanded">
          Expanded
        </z-checkbox>
      </z-col>
    </z-row>
    <z-row>
      <z-col :span="12">
        <z-checkbox v-model="headerActionsActive">
          Header Actions
        </z-checkbox>
      </z-col>
      <z-col :span="12">
        <z-checkbox v-model="primaryBtnPropsActive">
          Primary Button Props
        </z-checkbox>
      </z-col>
    </z-row>
    <z-row>
      <z-col :span="12">
        <z-checkbox v-model="secondaryBtnPropsActive">
          Secondary Button Props
        </z-checkbox>
      </z-col>
      <z-col :span="12">
        <z-checkbox v-model="previousBtnPropsActive">
          Previous Button Props
        </z-checkbox>
      </z-col>
    </z-row>
    <z-row>
      <z-col :span="12">
        <z-checkbox v-model="nextBtnPropsActive">
          Next Button Props
        </z-checkbox>
      </z-col>
      <z-col :span="12">
        <z-checkbox v-model="titleActive">
          Title
        </z-checkbox>
      </z-col>
    </z-row>
    <div class="panel-container">
      <z-panel
        :title="titleActive ? 'Header Title' : undefined"
        description="A small description of the header"
        :header-actions="headerActionsActive ? headerActions : []"
        :expandable="expandable"
        :expanded="expanded"
        :collapsable="collapsable"
        :open-in-new-tab="openInNewTab"
        :primary-btn-props="
          primaryBtnPropsActive
            ? {
              size: 'medium',
              variant: 'filled',
              color: 'primary',
              label: 'Primary'
            }
            : undefined
        "
        :secondary-btn-props="
          secondaryBtnPropsActive
            ? {
              size: 'medium',
              variant: 'outlined',
              label: 'Secondary'
            }
            : undefined
        "
        :previous-btn-props="
          previousBtnPropsActive
            ? {
              size: 'small',
              variant: 'subtle',
              disabled: true,
              label: 'Prev'
            }
            : undefined
        "
        :next-btn-props="
          nextBtnPropsActive
            ? { size: 'small', variant: 'subtle', label: 'Next' }
            : undefined
        "
        :closable="closable"
        :on-close="onClose"
        :on-expand="onExpandToFullWidth"
        :on-collapse="onCollapseToInitialWidth"
        :on-open-in-new-tab="onOpenInNewTab"
        :on-header-action-select="onHeaderActionSelect"
        :on-primary-btn-click="onPrimaryBtnClick"
        :on-secondary-btn-click="onSecondaryBtnClick"
        :on-previous-btn-click="onPreviousBtnClick"
        :on-next-btn-click="onNextBtnClick"
      >
        <div class="panel-content">
          Content
        </div>
      </z-panel>
    </div>
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useMessage } from '@zeta-gds/components'
export default defineComponent({
  setup () {
    const message = useMessage()
    const closable = ref(true)
    const expandable = ref(true)
    const collapsable = ref(true)
    const openInNewTab = ref(true)
    const canCollapse = ref(true)
    const footerStartSlot = ref(true)
    const footerEndSlot = ref(true)
    const expanded = ref(false)
    const headerActionsActive = ref(true)
    const primaryBtnPropsActive = ref(true)
    const secondaryBtnPropsActive = ref(true)
    const previousBtnPropsActive = ref(true)
    const nextBtnPropsActive = ref(true)
    const titleActive = ref(true)
    return {
      closable,
      expandable,
      collapsable,
      openInNewTab,
      canCollapse,
      footerStartSlot,
      footerEndSlot,
      expanded,
      headerActionsActive,
      primaryBtnPropsActive,
      secondaryBtnPropsActive,
      previousBtnPropsActive,
      nextBtnPropsActive,
      titleActive,
      onHeaderActionSelect (value: string) {
        message.info(value)
      },
      onPrimaryBtnClick () {
        message.info('Primary Button Click')
      },
      onSecondaryBtnClick () {
        message.info('Secondary Button Click')
      },
      onPreviousBtnClick () {
        message.info('Previous Button Click')
      },
      onNextBtnClick () {
        message.info('Next Button Click')
      },
      onClose () {
        message.info('Close Button Click')
      },
      onOpenInNewTab () {
        message.info('Open In New Tab Button Click')
      },
      onExpandToFullWidth () {
        expanded.value = true
        message.info('Expand Button Click')
      },
      onCollapseToInitialWidth () {
        expanded.value = false
        message.info('Collapse Button Click')
      },
      headerActions: [
        {
          label: 'Action 1',
          key: 'action1'
        },
        {
          label: 'Action 2',
          key: 'action2'
        },
        {
          label: 'Action 3',
          key: 'action3'
        }
      ]
    }
  }
})
</script>

<style>
.panel-container {
  height: 600px;
  border: 1px solid #d4d7e6;
}
.panel-content {
  min-height: 70%;
  padding: 16px;
}
</style>
