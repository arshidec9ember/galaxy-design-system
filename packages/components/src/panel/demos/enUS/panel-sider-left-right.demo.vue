<markdown>
# Menu on left and Side Panel on right with close and expand functionality
</markdown>

<template>
  <z-space vertical>
    <z-row>
      <z-col :span="12">
        Overlay <z-switch v-model="overlay" />
      </z-col>
    </z-row>
    <z-layout has-sider class="panel-container">
      <z-layout-sider
        alignment="left"
        :overlay="false"
        :show-trigger="true"
        width="273"
        :default-collapsed="true"
        collapsed-width="5%"
        inverted
      >
        <div class="menu-container">
          Menu
        </div>
      </z-layout-sider>
      <z-data-table :columns="columns" :data="data" :bordered="false" />
      <z-layout-sider
        alignment="right"
        :overlay="overlay"
        :resizable="isResizable"
        :show-trigger="showExpandCollapseIcon"
        min-resizable-width="40%"
        max-resizable-width="50%"
        :width="width"
      >
        <z-panel
          title="Title"
          :header-actions="headerActions"
          :expandable="true"
          :open-in-new-tab="true"
          :closable="true"
          :primary-btn-props="{
            size: 'medium',
            variant: 'filled',
            color: 'primary',
            label: 'Primary'
          }"
          :secondary-btn-props="{
            size: 'medium',
            variant: 'outlined',
            label: 'Secondary'
          }"
          :previous-btn-props="{
            size: 'small',
            variant: 'subtle',
            disabled: true,
            label: 'Prev'
          }"
          :next-btn-props="{ size: 'small', variant: 'subtle', label: 'Next' }"
          :on-close="onCloseClick"
          :on-expand="onExpandToFullScreenClick"
          :on-open-in-new-tab="onOpenInNewTabClick"
          :on-header-action-select="onHeaderActionSelect"
          :on-collapse="onCollapseScreenClick"
          :on-primary-btn-click="onPrimaryBtnClick"
          :on-secondary-btn-click="onSecondaryBtnClick"
          :on-previous-btn-click="onPreviousBtnClick"
          :on-next-btn-click="onNextBtnClick"
        >
          <div class="panel-content">
            Content
          </div>
        </z-panel>
      </z-layout-sider>
    </z-layout>
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref, h } from 'vue'
import { ZButton, useMessage, DataTableColumns } from '@zeta-gds/components'

type Song = {
  no: number
  title: string
  length: string
}

const createColumns = ({
  play
}: {
  play: (row: Song) => void
}): DataTableColumns<Song> => {
  return [
    {
      title: 'No',
      key: 'no'
    },
    {
      title: 'Title',
      key: 'title'
    },
    {
      title: 'Length',
      key: 'length'
    },
    {
      title: 'Action',
      key: 'actions',
      render (row) {
        return h(
          ZButton,
          {
            strong: true,
            variant: 'light',
            size: 'small',
            onClick: () => play(row)
          },
          { default: () => 'Play' }
        )
      }
    }
  ]
}

const data: Song[] = [
  { no: 3, title: 'Wonderwall', length: '4:18' },
  { no: 4, title: "Don't Look Back in Anger", length: '4:48' },
  { no: 12, title: 'Champagne Supernova', length: '7:27' }
]

export default defineComponent({
  setup () {
    const message = useMessage()
    const width = ref('40%')
    const isResizable = ref(true)
    const showExpandCollapseIcon = ref(true)
    const overlay = ref(false)
    return {
      overlay,
      width,
      isResizable,
      showExpandCollapseIcon,
      onHeaderActionSelect (value: string) {
        message.info(value)
      },
      onCloseClick () {
        message.info('Close Button Click')
      },
      onOpenInNewTabClick () {
        message.info('Open In New Tab Button Click')
      },
      onExpandToFullScreenClick () {
        message.info('Expand to Full Screen Button Click')
      },
      onCollapseScreenClick () {
        message.info('Collapse to Initial Width Button Click')
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
      data,
      columns: createColumns({
        play (row: Song) {
          message.info(`Play ${row.title}`)
        }
      }),
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
.menu-container {
  text-align: center;
}
.z-data-table {
  padding: 24px;
}
.panel-content {
  min-height: 100%;
  padding: 16px;
}
</style>
